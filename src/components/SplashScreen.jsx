import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const PARTICLE_COUNT = 18;
const PARTICLE_COLORS = ['#00A878', '#06b6d4', '#009966', '#0891b2'];

function SplashParticle({ color, delay, x, y, size, animDuration }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0,
        boxShadow: `0 0 6px ${color}`,
        animation: `particleDrift ${animDuration}s ${delay}s ease-out infinite`,
      }}
    />
  );
}

export default function SplashScreen({ onComplete }) {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);
  const iconRef = useRef(null);
  const ringsRef = useRef([]);
  const burstRef = useRef(null);

  const particles = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => ({
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      delay: Math.random() * 2,
      x: 15 + Math.random() * 70,
      y: 20 + Math.random() * 60,
      size: 4 + Math.random() * 4,
      animDuration: 4 + Math.random() * 3,
    }))
  ).current;

  const buildScene = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.set(iconRef.current, { opacity: 0, scale: 0.2, rotate: -120 });
    gsap.set(textRef.current, { opacity: 0, scale: 0.85, y: 12, filter: 'blur(12px)' });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });
    gsap.set(burstRef.current, { opacity: 0, scale: 0.3 });
    ringsRef.current.forEach(r => {
      if (r) gsap.set(r, { opacity: 0, scale: 0.5 });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root, {
          opacity: 0, duration: 0.8, ease: 'power2.inOut', onComplete,
        });
      },
    });

    // Phase 1: Icon scales in with bounce
    tl.to(iconRef.current, {
      opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)',
    })
    // Phase 2: Orbital rings pulse outward one by one
    .to(ringsRef.current, {
      opacity: 1, scale: 1.6, duration: 0.9, ease: 'power2.out',
      stagger: 0.2,
    }, '-=0.5')
    .to(ringsRef.current, {
      opacity: 0, scale: 2.2, duration: 0.8, ease: 'power2.in',
      stagger: 0.2,
    }, '-=0.4')
    // Phase 3: Burst glow behind icon
    .to(burstRef.current, { opacity: 0.8, scale: 1.5, duration: 0.5, ease: 'power2.out' }, '-=0.7')
    .to(burstRef.current, { opacity: 0, scale: 2.5, duration: 0.7, ease: 'power2.in' }, '-=0.4')
    // Phase 4: Text appears — blur to sharp + scale up + glow
    .to(textRef.current, {
      opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
      duration: 1, ease: 'power3.out',
    }, '-=0.5')
    // Phase 5: Gradient line expands from center
    .to(lineRef.current, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, '-=0.4')
    // Phase 6: Tagline
    .to(taglineRef.current, { opacity: 0.5, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
    // Hold
    .to({}, { duration: 0.9 });

    return () => { tl.kill(); };
  }, [onComplete]);

  useEffect(() => {
    const cleanup = buildScene();
    return () => { if (typeof cleanup === 'function') cleanup(); };
  }, [buildScene]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 45%, #0a2e1f 0%, #061a12 40%, #030d09 70%, #010504 100%)',
      }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <SplashParticle key={i} {...p} />
      ))}

      {/* Orbital rings */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          ref={el => { ringsRef.current[i] = el; }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 120 + i * 40,
            height: 120 + i * 40,
            border: `1px solid rgba(0,168,120,${0.4 - i * 0.08})`,
            boxShadow: `0 0 30px rgba(0,168,120,${0.15 - i * 0.03}), inset 0 0 15px rgba(6,182,212,${0.08 - i * 0.02})`,
            opacity: 0,
            transform: 'scale(0.5)',
          }}
        />
      ))}

      {/* Burst glow */}
      <div
        ref={burstRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(0,168,120,0.5) 0%, rgba(6,182,212,0.25) 35%, rgba(0,153,102,0.1) 55%, transparent 70%)',
          opacity: 0,
          transform: 'scale(0.3)',
        }}
      />

      {/* Atom Icon */}
      <div ref={iconRef} className="relative z-10 mb-6 sm:mb-8" style={{ opacity: 0, transform: 'scale(0.2) rotate(-120deg)' }}>
        <svg width="56" height="56" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="4" fill="url(#splashGrad)" />
          <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#splashGrad)" strokeWidth="1.2" fill="none" opacity="0.5" />
          <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#splashGrad)" strokeWidth="1.2" fill="none" opacity="0.5" transform="rotate(60 18 18)" />
          <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#splashGrad)" strokeWidth="1.2" fill="none" opacity="0.5" transform="rotate(120 18 18)" />
          <circle cx="18" cy="18" r="2" fill="#00A878" />
          <defs>
            <linearGradient id="splashGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A878" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 rounded-full blur-2xl opacity-50" style={{ background: 'radial-gradient(circle, #00A878, transparent)' }} />
      </div>

      {/* QUANTIONIC text */}
      <div ref={textRef} className="relative z-10" style={{ opacity: 0, transform: 'scale(0.85) translateY(12px)', filter: 'blur(12px)' }}>
        <span className="text-[38px] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider select-none">
          <span style={{
            background: 'linear-gradient(180deg, #f0f4f8, #cbd5e1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>QUAN</span>
          <span style={{
            background: 'linear-gradient(135deg, #00A878, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>TIONIC</span>
        </span>
      </div>

      {/* Loading line from center */}
      <div className="mt-6 sm:mt-7 w-40 sm:w-52 md:w-60 h-[1.5px] rounded-full overflow-hidden relative z-10" style={{
        background: 'rgba(0,168,120,0.08)',
      }}>
        <div ref={lineRef} className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(90deg, transparent, #00A878, #06b6d4, #00A878, transparent)',
          boxShadow: '0 0 12px rgba(0,168,120,0.4), 0 0 24px rgba(6,182,212,0.15)',
          transform: 'scaleX(0)',
        }} />
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="mt-5 sm:mt-6 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.28em] font-medium relative z-10"
        style={{ color: 'rgba(255,255,255,0.3)', opacity: 0, transform: 'translateY(10px)' }}
      >
        BRINGING AI TO REAL WORLD
      </p>
    </div>
  );
}
