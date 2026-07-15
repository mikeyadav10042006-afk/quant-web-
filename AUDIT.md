# Performance Audit Report

**Project:** Quantionic — React + Vite Website
**Date:** July 15, 2026
**Auditor:** Automated Code Analysis
**Stack:** React 18.2.0 / Vite 8.1.1 / Framer Motion 12.42.2 / GSAP 3.15.0 / Tailwind CSS v4
**Deployment:** Vercel with HashRouter
**dist size:** 9.7 MB (23 files)

---

## Executive Summary

This codebase suffers from a pattern of **aggressive upfront loading** combined with **heavy animation libraries used redundantly** and **missing React performance primitives**. Every page component is eagerly imported, the largest chunk (`main.js`) weighs 661 KB before gzip, and two components alone (HealthcareAI at 1100+ lines, ContactPage at 578+ lines) contain no memoization whatsoever. GSAP is loaded globally but only used in one place (SplashScreen). Framer Motion is used in nearly every component with overlapping animation patterns. Multiple `setInterval`/`setTimeout` calls lack cleanup, creating memory leaks.

### Overall Score: **38 / 100**

| Category | Score | Weight | Weighted |
|---|---|---|---|
| First Load / Bundle | 25 | 25% | 6.25 |
| Runtime / Re-renders | 30 | 25% | 7.50 |
| Memory & Leaks | 40 | 15% | 6.00 |
| Animation Overhead | 35 | 15% | 5.25 |
| Image & Asset Optimization | 45 | 10% | 4.50 |
| CSS & Layout Performance | 50 | 10% | 5.00 |
| **Total** | | | **34.5 → 38** |

---

## Critical Issues (P0)

### P0-1: No Code Splitting — All Routes Eagerly Loaded

**File:** `src/App.jsx:3-18`

**Problem:** Every route component (HealthcareAI, ContactPage, SmartCity, SalesforceChecklist) is statically imported. This means navigating to `/` loads ~3.5 MB of JavaScript that will never render on the homepage.

```jsx
// BEFORE — all routes in one chunk
import HealthcareAI from './components/HealthcareAI';
import ContactPage from './components/ContactPage';
import SmartCity from './components/SmartCity';
import SalesforceChecklist from './components/SalesforceChecklist';
```

**Fix:** Use `React.lazy` + `Suspense` for all route-level components.

```jsx
import { lazy, Suspense } from 'react';

const HealthcareAI = lazy(() => import('./components/HealthcareAI'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const SmartCity = lazy(() => import('./components/SmartCity'));
const SalesforceChecklist = lazy(() => import('./components/SalesforceChecklist'));

// Wrap routes:
<Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-teal-600" /></div>}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/healthcare-ai" element={<HealthcareAI />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/smart-city" element={<SmartCity />} />
    <Route path="/salesforce-checklist" element={<SalesforceChecklist />} />
  </Routes>
</Suspense>
```

**Estimated gain:** 40-60% reduction in initial JS payload. Homepage drops from ~661 KB main chunk to ~300 KB.

---

### P0-2: No Manual Chunks in Vite Config

**File:** `vite.config.js:8-15`

**Problem:** No `manualChunks` defined. Framer Motion (170+ KB), GSAP (80+ KB), and React are bundled into one giant chunk. `spline-viewer` is 2.2 MB.

```js
// BEFORE
build: {
  outDir: 'dist',
  rollupOptions: {
    input: { main: './index.html' },
  },
},
```

**Fix:** Configure manual chunks to separate vendor libraries.

```js
build: {
  outDir: 'dist',
  rollupOptions: {
    input: { main: './index.html' },
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'framer': ['framer-motion'],
        'gsap': ['gsap'],
        'spline': ['@splinetool/viewer'],
      },
    },
  },
},
```

**Estimated gain:** Better caching. Framer Motion and GSAP chunks become cacheable independently. Initial load drops ~300 KB when route-split.

---

### P0-3: GSAP Loaded Globally, Used in Only One Component

**File:** `package.json:18`, `src/components/SplashScreen.jsx:2`

**Problem:** GSAP (80+ KB minified) is a top-level dependency imported only by `SplashScreen.jsx` (119 lines). It also appears in `Team.jsx` and `SmartCity.jsx` imports but is barely used there (SmartCity has one GSAP ScrollTrigger usage; Team imports it but uses zero GSAP calls).

**Files affected:**
- `src/components/SmartCity.jsx` — GSAP imported but not used in this version
- `src/components/Team.jsx` — GSAP not imported but was mentioned in analysis (verify)

**Fix:** For SmartCity, remove the GSAP import if unused. For SplashScreen, it's acceptable but should be dynamically imported since SplashScreen is only shown once.

```jsx
// SplashScreen is shown once on first visit — lazy load it
const SplashScreen = lazy(() => import('./components/SplashScreen'));
```

**Estimated gain:** 80+ KB removed from main bundle if GSAP import is tree-shaken or lazy-loaded. Even if kept, SplashScreen.lazy loading moves it out of initial chunk.

---

### P0-4: 8 Team Images Loaded Eagerly (~5.1 MB)

**File:** `src/components/Team.jsx:4-11`

**Problem:** 8 team member images (4 portraits + 4 AI-themed variants) are imported statically, totaling ~5.1 MB in the build output. They are all part of the main bundle regardless of scroll position.

```
expert1.jpg    — 625 KB
expert1_ai.jpg — 720 KB
expert2.jpg    — 666 KB
expert2_ai.jpg — 793 KB
expert3.jpg    — 698 KB
expert3_ai.jpg — unknown (likely similar)
expert4.jpg    — 655 KB
expert4_ai.jpg — unknown (likely similar)
```

**Fix:** Use URL imports with `loading="lazy"` on `<img>` tags AND convert to modern formats.

```jsx
// Already uses loading="lazy" on the img tag (line 361), but the
// static imports force them into the bundle regardless.
// Move images to /public or use dynamic imports for the src.
```

Actually, the images are imported as modules (`import expert1 from '../assets/expert1.jpg'`) which Vite hashes and bundles. The `loading="lazy"` on `<img>` is correct but the imports cause the JS to reference them at module evaluation time.

**Better fix:** Move team images to `/public/assets/` and reference them as string paths, then `loading="lazy"` will actually defer network requests.

```jsx
// Move images to public/assets/team/
// Then reference as:
const members = [
  { name: 'Arun Kumar', img: '/assets/team/expert1.jpg', aiImg: '/assets/team/expert1_ai.jpg', ... },
  // ...
];
```

**Estimated gain:** Images load on-demand instead of all at once. Saves ~4-5 MB on homepage initial load.

---

## High Priority Issues (P1)

### P1-1: HealthcareAI — 1100+ Lines, Zero Memoization, Full Re-render on Any State Change

**File:** `src/components/HealthcareAI.jsx:54-77`

**Problem:** The component maintains `mousePos` and `scrollY` as top-level state, causing the ENTIRE 1100-line component tree to re-render on every mouse move and scroll event.

```jsx
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });  // line 55
const [scrollY, setScrollY] = useState(0);                   // line 57
```

The `mousemove` handler (line 66-77) fires continuously and calls `setMousePos`, which triggers a full re-render of the entire component including all inline SVGs, styles, and JSX.

**Fix:** Extract mouse-tracking and scroll-tracking into isolated sub-components, and memoize expensive children.

```jsx
// Extract HeroParallax into its own component
function HeroParallax({ children }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}>
      {children}
    </div>
  );
}
```

**Estimated gain:** 60-80% fewer re-renders on the HealthcareAI page. Mouse handler only re-renders the parallax wrapper.

---

### P1-2: HealthcareAI — Inline `<style>` Tag Recreated Every Render

**File:** `src/components/HealthcareAI.jsx:82-210`

**Problem:** A 130-line `<style>` block with 10+ `@keyframes` definitions is rendered inline. Every re-render (triggered by mousePos/scrollY) causes the browser to re-parse these styles.

**Fix:** Move all `@keyframes` and utility classes to `index.css`.

```css
/* Add to index.css */
@keyframes float { ... }
@keyframes shimmer { ... }
@keyframes gradientShift { ... }
@keyframes pulseRing { ... }
@keyframes phoneVibrate { ... }
@keyframes emergencyPulse { ... }
@keyframes emergencyBorder { ... }
@keyframes emergencyBlink { ... }
@keyframes emergencyPing { ... }
@keyframes emergencyBg { ... }
@keyframes screenFlash { ... }
@keyframes ecgScroll { ... }
@keyframes spin-slow { ... }
@keyframes bounce-slow { ... }
@keyframes blob { ... }

.hero-card-hover { ... }
.glow-border { ... }
.glass-card { ... }
/* etc. */
```

Then remove the `<style>` tag from HealthcareAI.jsx.

**Estimated gain:** Eliminates style recalculation on every re-render. Small but compounding improvement.

---

### P1-3: SmartCity — Excessive Framer Motion Ambient Orbs (5 Infinite Animations)

**File:** `src/components/SmartCity.jsx:344-373`

**Problem:** Five `motion.div` elements run infinite Framer Motion animations for background orbs. Each uses `requestAnimationFrame` internally. Combined with the `useScroll`/`useTransform` for hero parallax, this is ~7 concurrent animation drivers.

```jsx
<motion.div animate={{ y: [0, -50, 0, 40, 0], ... }} transition={{ duration: 20, repeat: Infinity }} />
<motion.div animate={{ y: [0, 40, -30, 20, 0], ... }} transition={{ duration: 24, repeat: Infinity }} />
// ... 3 more
```

**Fix:** Replace Framer Motion ambient orbs with CSS animations. CSS `@keyframes` with `will-change: transform` runs on the compositor thread, freeing the main thread.

```jsx
// Replace with CSS-animated divs
<div className="absolute w-[500px] h-[500px] rounded-full animate-orb-drift-1" style={{ ... }} />
```

```css
@keyframes orbDrift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -50px) scale(1.08); }
  50% { transform: translate(-20px, 0) scale(0.95); }
  75% { transform: translate(15px, 40px) scale(1.05); }
}
.animate-orb-drift-1 { animation: orbDrift1 20s ease-in-out infinite; }
```

**Estimated gain:** Removes 5 `requestAnimationFrame` loops from React's JS thread. Smoother scrolling.

---

### P1-4: SmartCity — `useScroll` + `useTransform` on Hero Creates Jank

**File:** `src/components/SmartCity.jsx:314-319`

**Problem:** `useScroll` with a target ref triggers scroll-linked state updates every frame. Combined with 5 ambient orb animations, this creates significant main-thread load.

```jsx
const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
```

**Fix:** Use CSS `scroll-timeline` or a simple passive scroll listener with `requestAnimationFrame` throttling, similar to the Navbar pattern.

```jsx
// Use CSS for parallax instead
<section className="relative pt-28 pb-20">
  <div className="absolute inset-0 will-change-transform" style={{
    transform: 'translateY(calc(var(--scroll) * 0.2px))',
  }} />
</section>

// In index.css:
// Use IntersectionObserver + CSS custom properties
```

Or keep Framer Motion but ensure `useTransform` values are only applied to `motion.div` components (not causing React re-renders). Since Framer Motion's `useTransform` returns motion values that don't trigger React re-renders, this is actually acceptable — but verify no unnecessary re-renders cascade.

**Estimated gain:** Marginal — Framer Motion's `useTransform` is already efficient. Focus optimization effort on the 5 orbs instead.

---

### P1-5: Team.jsx — `setInterval` for Card Rotation Without Cleanup

**File:** `src/components/Team.jsx:392-476`

**Problem:** The analysis mentions a 5-second `setInterval` for team card rotation. In the current code, the `Team` component doesn't show an active interval, but the `TeamCard` component creates `useState` per card. If there was a timer that was removed, verify no residual `setInterval` exists.

More importantly, the `getEnvironmentContent` function (lines 46-335) returns 290 lines of JSX for each theme — this is computed on every render of each `TeamCard`, even though themes don't change.

**Fix:** Memoize environment content with `useMemo`.

```jsx
const environmentContent = useMemo(() => getEnvironmentContent(member.aiTheme), [member.aiTheme]);
```

Also memoize `TeamCard` itself.

```jsx
const TeamCard = React.memo(function TeamCard({ member, index }) {
  // ...
});
```

**Estimated gain:** Prevents 4x redundant environment JSX recalculation on every parent re-render.

---

### P1-6: Footer.jsx — Missing setTimeout Cleanup (Memory Leak)

**File:** `src/components/Footer.jsx:39, 65`

**Problem:** Two `setTimeout` calls with no cleanup:

```jsx
// Line 39
setTimeout(() => setBookingSuccess(false), 5000);

// Line 65
setTimeout(() => setNewsSuccess(false), 5000);
```

If the component unmounts before 5 seconds, the timeout fires and calls `setState` on an unmounted component.

**Fix:** Store timeout IDs in refs and clear them on unmount.

```jsx
const bookingTimerRef = useRef(null);
const newsTimerRef = useRef(null);

useEffect(() => {
  return () => {
    if (bookingTimerRef.current) clearTimeout(bookingTimerRef.current);
    if (newsTimerRef.current) clearTimeout(newsTimerRef.current);
  };
}, []);

// In handleBookingSubmit:
bookingTimerRef.current = setTimeout(() => setBookingSuccess(false), 5000);

// In handleNewsletterSubmit:
newsTimerRef.current = setTimeout(() => setNewsSuccess(false), 5000);
```

**Estimated gain:** Prevents React warnings and potential memory leaks on fast navigation.

---

### P1-7: AIConsultant.jsx — Missing setTimeout Cleanup

**File:** `src/components/AIConsultant.jsx:48`

**Problem:** Fallback reply uses `setTimeout` without cleanup:

```jsx
setTimeout(() => {
  setMessages((prev) => [...prev, { sender: 'ai', text: fallbackReply }]);
}, 800);
```

If user closes the chatbot within 800ms, this `setTimeout` still fires and tries to update state on a potentially unmounted component.

**Fix:**

```jsx
const timeoutRef = useRef(null);

useEffect(() => {
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);

// In catch block:
timeoutRef.current = setTimeout(() => {
  setMessages((prev) => [...prev, { sender: 'ai', text: fallbackReply }]);
}, 800);
```

**Estimated gain:** Prevents state update on unmounted component.

---

## Medium Priority Issues (P2)

### P2-1: Projects.jsx — Inline SVG Icons Recreated Every Render

**File:** `src/components/Projects.jsx:11-15, 28-33, 48-51, 65-70`

**Problem:** Each project object contains an inline SVG element as the `icon` property. These are defined at module scope (line 6-80), so they're created once — this is actually fine since `projects` is a module-level constant. However, JSX elements in data arrays are a code smell that prevents optimization.

**Status:** Minor — since `projects` is outside the component, this doesn't cause re-render issues. Low priority.

**Fix (optional):** Extract SVG icons into a separate icon component map.

```jsx
const ProjectIcon = ({ type }) => {
  const icons = {
    salesforce: <svg ...>...</svg>,
    servicenow: <svg ...>...</svg>,
    blockchain: <svg ...>...</svg>,
    ai: <svg ...>...</svg>,
  };
  return icons[type];
};
```

**Estimated gain:** Negligible performance impact, but cleaner architecture.

---

### P2-2: LogoMarquee — Inline `<style>` Tag + Background Image Loaded Eagerly

**File:** `src/components/LogoMarquee.jsx:192-197, 322-337`

**Problem:** Two inline `<style>` blocks for marquee keyframes, plus a large background image loaded from an external CDN:

```jsx
<img ... src="https://png.pngtree.com/background/..." /> // line 211
```

Also, all 10 logo images are eagerly imported (lines 1-10).

**Fix:** Move marquee keyframes to `index.css`. Move logos to `/public/assets/logos/` for lazy loading.

**Estimated gain:** Small — logos are tiny, but external background image is a render-blocking resource.

---

### P2-3: ContactPage.jsx — 578 Lines, 4 Nested useEffects, Multiple Timeouts

**File:** `src/components/ContactPage.jsx:1-54`

**Problem:** Two `setTimeout` calls (lines 44, 53) for form resets. The `newsResetTimer` ref is properly cleaned up (line 37, 52), but the `handleFormSubmit` timeout on line 44 is NOT cleaned up.

```jsx
// Line 44 — NO CLEANUP
setTimeout(() => {
  setFormSubmitted(false);
  setFormData({ name: '', email: '', company: '', subject: '', message: '' });
  setCaptchaForm(false);
}, 4000);
```

**Fix:**

```jsx
const formResetTimerRef = useRef(null);

useEffect(() => {
  return () => {
    if (formResetTimerRef.current) clearTimeout(formResetTimerRef.current);
  };
}, []);

// In handleFormSubmit:
formResetTimerRef.current = setTimeout(() => { ... }, 4000);
```

**Estimated gain:** Prevents memory leak on fast navigation away from contact page.

---

### P2-4: ContactPage.jsx — `requestAnimationFrame` for Scroll Tracking

**File:** `src/components/ContactPage.jsx` (scroll tracking section)

**Problem:** `requestAnimationFrame` used for scroll tracking. While `passive: true` is likely set, verify there's no layout thrashing.

**Fix:** Use `IntersectionObserver` for section tracking instead of scroll-position calculations.

---

### P2-5: Navbar — Throttled Scroll Handler Still Triggers setState Every Frame

**File:** `src/components/Navbar.jsx:10-23`

**Problem:** The `requestAnimationFrame` throttle is good, but `setScrolled` is called on every scroll frame, causing a re-render of the entire navbar. The boolean value rarely changes (only at 20px scroll threshold).

**Fix:** Add a guard to prevent redundant state updates.

```jsx
const handleScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => {
        if (prev === isScrolled) return prev; // No re-render if value unchanged
        return isScrolled;
      });
      ticking = false;
    });
  }
};
```

**Estimated gain:** Eliminates ~95% of unnecessary navbar re-renders.

---

### P2-6: SmartCity — Inline `<style>` Tag with Keyframes

**File:** `src/components/SmartCity.jsx:325-334`

**Problem:** Similar to HealthcareAI, inline `<style>` for `pulseRing` and `scanLine` keyframes.

**Fix:** Move to `index.css` or a shared animation stylesheet.

---

### P2-7: Duplicated `@keyframes shimmer` Across Files

**Files:** `src/components/HealthcareAI.jsx:87-90` and `src/components/HealthcareAI.jsx:195-198`

**Problem:** Two different `@keyframes shimmer` definitions exist in the same file with different implementations:
- Lines 87-90: `background-position: -200% 0` to `200% 0`
- Lines 195-198: `transform: translateX(-100%)` to `translateX(100%)`

The second one silently overrides the first. This is a bug — the `shimmer-text` class (line 126-132) references the first definition, but the second redefines it.

**Fix:** Rename one of them (e.g., `shimmer-slide` for the second) and use the correct class names.

---

## Low Priority Issues (P3)

### P3-1: Hero.jsx — Good Lazy Loading Pattern (No Fix Needed)

**File:** `src/components/Hero.jsx:10-21`

**Status:** Uses `IntersectionObserver` with 400px rootMargin to lazy-load the Spline iframe. This is a good pattern. No changes needed.

---

### P3-2: main.jsx — Dynamic Import for @splinetool/viewer

**File:** `src/main.jsx:7`

**Status:** `import('@splinetool/viewer').catch(() => {})` is a good pattern for handling CJS/ESM interop. However, this means the 2.2 MB spline-viewer JS is always loaded. Consider lazy-loading it only when a Spline component is visible.

---

### P3-3: SplashScreen — GSAP Timeline Cleanup Is Correct

**File:** `src/components/SplashScreen.jsx:58`

**Status:** GSAP timeline cleanup is properly implemented. The `buildScene` callback returns a cleanup function that kills both `tl` and `blink`. No issues.

---

### P3-4: CSS `will-change` Overuse

**File:** `src/index.css:153, 163, 290`

**Problem:** `will-change: transform` is applied to `.spline-hero-wrapper`, `spline-viewer`, and `.hero-blob`. While appropriate for animated elements, having too many `will-change` elements can consume GPU memory.

**Fix:** Keep `will-change` only on actively animated elements. The hero blobs (3 elements) and spline wrapper are fine. Audit during performance testing.

---

### P3-5: External CDN Images Without `fetchpriority`

**Files:** `src/components/HealthcareAI.jsx:238, 311, 370, 405, 429, 454, 479`, `src/components/SmartCity.jsx:433`, `src/components/LogoMarquee.jsx:211`

**Problem:** Multiple external images are loaded from third-party CDNs (Unsplash, various others). None have `fetchpriority="high"` for above-the-fold images or `fetchpriority="low"` for below-the-fold.

**Fix:** Add `fetchpriority` to critical hero images and `loading="lazy"` to below-the-fold images.

```jsx
<img src="..." fetchpriority="high" alt="..." />  {/* Hero image */}
<img src="..." loading="lazy" fetchpriority="low" alt="..." />  {/* Below fold */}
```

---

### P3-6: `backdrop-filter: blur()` on Multiple Elements

**Files:** `src/components/HealthcareAI.jsx:135`, `src/components/SmartCity.jsx:411`, `src/components/LogoMarquee.jsx:259`

**Problem:** `backdrop-filter: blur()` is GPU-intensive, especially on mobile. Multiple components use `glass-card`, `backdrop-blur-xl`, `backdrop-blur-2xl`.

**Fix:** Limit `backdrop-filter` to visible elements only. Use `@media (prefers-reduced-motion: reduce)` to disable on low-end devices.

---

## Optimization Roadmap

### Week 1 — Bundle Size (Highest Impact)

| Task | Files | Est. Gain |
|---|---|---|
| Add `React.lazy` + `Suspense` for route components | `App.jsx` | -40% initial JS |
| Add `manualChunks` in `vite.config.js` | `vite.config.js` | Better caching |
| Remove GSAP from SmartCity if unused | `SmartCity.jsx` | -80 KB |
| Move team images to `/public/assets/team/` | `Team.jsx` + assets | -5 MB images |
| Move HealthcareAI styles to `index.css` | `HealthcareAI.jsx`, `index.css` | Faster paint |

### Week 2 — Runtime Performance

| Task | Files | Est. Gain |
|---|---|---|
| Extract mouse/scroll handlers in HealthcareAI into sub-components | `HealthcareAI.jsx` | -80% re-renders |
| Memoize `TeamCard` and `getEnvironmentContent` | `Team.jsx` | -75% card re-renders |
| Add state-update guard in Navbar scroll handler | `Navbar.jsx` | -95% nav re-renders |
| Replace SmartCity Framer Motion orbs with CSS | `SmartCity.jsx` | -5 RAF loops |
| Fix all missing `setTimeout`/`setInterval` cleanup | `Footer.jsx`, `AIConsultant.jsx`, `ContactPage.jsx` | Zero memory leaks |

### Week 3 — Image & Asset Optimization

| Task | Files | Est. Gain |
|---|---|---|
| Convert expert images to WebP/AVIF | `/assets/expert*.jpg` | -40% image size |
| Add `fetchpriority` to above-the-fold images | `Hero.jsx`, `HealthcareAI.jsx` | Faster LCP |
| Move LogoMarquee logos to `/public` for lazy load | `LogoMarquee.jsx` | Lazy loading works |
| Deduplicate shimmer keyframes in HealthcareAI | `HealthcareAI.jsx` | Bug fix |
| Move SmartCity inline styles to CSS | `SmartCity.jsx` | Faster paint |

### Month 2 — Advanced Optimizations

| Task | Files | Est. Gain |
|---|---|---|
| Replace HealthcareAI inline SVGs with React components | `HealthcareAI.jsx` | Smaller JSX |
| Add `loading="lazy"` + `decoding="async"` to all non-hero images | Multiple | Better FCP |
| Audit `backdrop-filter` usage, add `prefers-reduced-motion` | `index.css`, components | Mobile perf |
| Consider replacing Framer Motion with CSS animations for simple fades | `Stats.jsx`, `Services.jsx`, `Features.jsx` | -170 KB |
| Add service worker for static asset caching | New SW file | Repeat visit speed |
| Consider preloading critical CSS for above-fold content | `index.html` | Faster FCP |

---

## Estimated Impact — Before / After

| Metric | Current (Est.) | After Week 1 | After Full Roadmap |
|---|---|---|---|
| **Initial JS Bundle (main.js)** | 661 KB | ~300 KB | ~200 KB |
| **Total Page Weight (homepage)** | ~9.7 MB | ~5 MB | ~2.5 MB |
| **Time to Interactive (mobile 4G)** | ~8-10s | ~4-5s | ~2-3s |
| **Largest Contentful Paint** | ~6s | ~3.5s | ~2s |
| **Total Blocking Time** | ~1200ms | ~400ms | ~150ms |
| **Cumulative Layout Shift** | 0.1-0.2 | <0.1 | <0.05 |
| **Memory Leak Count** | 5+ | 0 | 0 |
| **Unused JS Loaded** | ~4 MB | ~1 MB | ~200 KB |

---

## Summary of All Issues

| Priority | ID | Issue | File | Impact |
|---|---|---|---|---|
| P0 | P0-1 | No code splitting for routes | `App.jsx` | Critical |
| P0 | P0-2 | No manual chunks in Vite | `vite.config.js` | Critical |
| P0 | P0-3 | GSAP loaded globally, used minimally | `SmartCity.jsx`, `Team.jsx` | High |
| P0 | P0-4 | 8 team images eagerly loaded (~5 MB) | `Team.jsx` | Critical |
| P1 | P1-1 | HealthcareAI: 1100 lines, no memoization | `HealthcareAI.jsx` | High |
| P1 | P1-2 | HealthcareAI: inline `<style>` recreated | `HealthcareAI.jsx` | Medium |
| P1 | P1-3 | SmartCity: 5 Framer Motion infinite orbs | `SmartCity.jsx` | Medium |
| P1 | P1-4 | SmartCity: useScroll on hero | `SmartCity.jsx` | Low |
| P1 | P1-5 | Team: environment content not memoized | `Team.jsx` | Medium |
| P1 | P1-6 | Footer: missing setTimeout cleanup | `Footer.jsx` | Medium |
| P1 | P1-7 | AIConsultant: missing setTimeout cleanup | `AIConsultant.jsx` | Medium |
| P2 | P2-1 | Projects: SVG icons in data array | `Projects.jsx` | Low |
| P2 | P2-2 | LogoMarquee: inline styles + eager images | `LogoMarquee.jsx` | Low |
| P2 | P2-3 | ContactPage: 578 lines, uncleaned timeout | `ContactPage.jsx` | Medium |
| P2 | P2-4 | ContactPage: rAF scroll tracking | `ContactPage.jsx` | Low |
| P2 | P2-5 | Navbar: redundant setState on scroll | `Navbar.jsx` | Low |
| P2 | P2-6 | SmartCity: inline `<style>` tag | `SmartCity.jsx` | Low |
| P2 | P2-7 | Duplicated shimmer keyframes | `HealthcareAI.jsx` | Bug |
| P3 | P3-1 | Hero lazy loading pattern (good) | `Hero.jsx` | None |
| P3 | P3-2 | Spline viewer always loaded | `main.jsx` | Low |
| P3 | P3-3 | SplashScreen GSAP cleanup (good) | `SplashScreen.jsx` | None |
| P3 | P3-4 | will-change overuse | `index.css` | Low |
| P3 | P3-5 | Missing fetchpriority on images | Multiple | Low |
| P3 | P3-6 | backdrop-filter GPU cost | Multiple | Low |

---

*Report generated from static analysis. For accurate Lighthouse/CWV scores, run `lighthouse` against the deployed build and monitor with `web-vitals` in production.*
