# Quantionic — Full-Stack Web Platform for AI Consultancy

A production-grade website built for **Quantionic** (quantionics.com) — a technology consultancy specializing in Agentic AI, Node.js engineering, and Salesforce/CRM integrations.

This isn't a template or a weekend project. It's a full-stack application with a React frontend, Express + MongoDB backend, real-time AI chat, authentication, form submissions with reCAPTCHA, email notifications, and a complete test suite. Everything was built to be handed over as a working deliverable.

---

## What This Project Does

The website serves as Quantionic's digital presence — showcasing services, capturing leads through consultation bookings and newsletter signups, and providing an AI-powered consultant that can answer technical questions 24/7.

**The core idea:** a potential client lands on the site, explores what Quantionic offers, chats with the AI consultant to understand capabilities, and books a consultation — all without picking up the phone.

### Pages

| Route | What It Does |
|---|---|
| `/` | Homepage — hero, stats, services, features, values, projects, team |
| `/contact` | Dedicated contact form with reCAPTCHA and EmailJS notifications |
| `/healthcare-ai` | Industry-specific landing page for healthcare AI solutions |
| `/smart-city` | Smart city IoT solutions landing page |
| `/salesforce-checklist` | Salesforce integration assessment tool |
| `*` | Custom 404 page with navigation back to home |

---

## Tech Stack

### Frontend
- **React 18** with React Router v6 for client-side routing
- **Vite 8** for instant dev server and optimized production builds
- **Tailwind CSS v4** for utility-first styling
- **Framer Motion** for page transitions and micro-interactions
- **GSAP** for the splash screen animation sequence
- **Lucide React** for consistent iconography
- **Axios** for API communication
- **EmailJS** for client-side email notifications

### Backend
- **Express 4** with Helmet for security headers
- **MongoDB** with Mongoose for data persistence (with JSON file fallback)
- **JWT** authentication with bcrypt password hashing
- **Google reCAPTCHA v3** for spam prevention
- **Rate limiting** on all public endpoints

### Testing
- **Vitest** + Testing Library for unit and integration tests
- **Playwright** for end-to-end browser tests
- **72 passing tests** across unit and integration suites

### Deployment
- **Frontend:** Vercel (with SPA rewrite rules)
- **Backend:** Render (with `render.yaml` blueprint)
- **Database:** MongoDB Atlas (cloud-hosted)

---

## Features

### AI Consultant Chat
An AI-powered chatbot that answers questions about Quantionic's services, technologies, and booking process. It connects to the Express backend which can route queries through Gemini for intelligent responses — with a smart fallback system when the server is offline.

### Consultation Booking
A multi-field booking form in the footer that captures name, email, enterprise domain, and technical requirements. Submissions go to MongoDB, trigger reCAPTCHA validation, and send confirmation emails through EmailJS.

### Newsletter Subscription
Email capture with duplicate detection (returns a clean 409 if already subscribed). Falls back to localStorage if the backend is unreachable.

### Admin Dashboard
JWT-protected admin panel for viewing booked consultations and newsletter subscribers. Accessible through a login modal with proper authentication flow.

### Responsive Design
Fully responsive across all breakpoints — tested at 320px, 375px, 768px, 1024px, 1280px, and 1536px. Mobile navigation uses a slide-out drawer with touch-friendly targets (44px minimum).

### Accessibility
Built to WCAG 2.1 AA standards:
- All interactive elements have proper `aria-labels`
- Modal dialogs include `role="dialog"`, `aria-modal`, focus trapping, and Escape key support
- Form inputs are associated with labels via `htmlFor`/`id`
- Skip-to-content link for keyboard navigation
- Screen reader announcements via `aria-live` regions
- Minimum 44x44px touch targets on mobile

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or Atlas)
- A Google reCAPTCHA v3 site key
- An EmailJS account (for contact emails)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/quant-web.git
cd quant-web

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quantionic
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key
```

The frontend reads `VITE_API_URL` optionally — if not set, it defaults to the same origin in production.

### Running Locally

```bash
# Start both frontend and backend together
npm run dev

# Or start them separately:
npm run client    # Vite dev server on port 5173
npm run server    # Express backend on port 5000
```

The Vite dev server proxies `/api` requests to the backend automatically.

---

## Testing

This project has three layers of testing — each one catching a different class of bugs.

### Unit Tests
Component-level tests that verify rendering, accessibility attributes, and basic behavior.

```bash
npm test
```

### Integration Tests
Multi-step tests that simulate real user interactions — filling forms, submitting them, and verifying that the correct API calls are made with the right data. These tests mock the API layer to stay fast and deterministic.

### End-to-End Tests
Full browser tests using Playwright that verify navigation flows, modal interactions, and mobile responsiveness across the actual running application.

```bash
npm run test:e2e
```

### What's Tested

| Area | Unit | Integration | E2E |
|---|---|---|---|
| AIConsultant | 11 | 9 | 4 |
| LoginModal | 11 | 6 | 4 |
| ContactPage | 6 | 6 | 4 |
| Navbar | 6 | — | 5 |
| Footer | 8 | 4 | 2 |
| Stats | 5 | — | 1 |
| Navigation | — | — | 6 |
| **Total** | **47** | **25** | **30** |

---

## Project Structure

```
quant-web/
├── public/                    # Static assets (images, icons)
├── src/
│   ├── components/            # React components (20 total)
│   │   ├── Hero.jsx           # Landing section with CTA
│   │   ├── Navbar.jsx         # Fixed nav with mobile drawer
│   │   ├── Services.jsx       # Service cards
│   │   ├── Features.jsx       # Feature highlights
│   │   ├── Stats.jsx          # Animated counter section
│   │   ├── Projects.jsx       # Portfolio showcase
│   │   ├── Team.jsx           # Team members
│   │   ├── Values.jsx         # Company values
│   │   ├── Footer.jsx         # Booking form + newsletter
│   │   ├── ContactPage.jsx    # Dedicated contact route
│   │   ├── AIConsultant.jsx   # AI chat sidebar
│   │   ├── LoginModal.jsx     # Admin authentication
│   │   ├── AdminDashboard.jsx # Protected admin panel
│   │   ├── SplashScreen.jsx   # Animated intro (GSAP)
│   │   ├── LogoMarquee.jsx    # Client logo carousel
│   │   ├── HealthcareAI.jsx   # Healthcare landing page
│   │   ├── SmartCity.jsx      # Smart city landing page
│   │   ├── SalesforceChecklist.jsx
│   │   ├── NotFoundPage.jsx   # 404 page
│   │   └── LazySection.jsx    # Intersection Observer wrapper
│   ├── api.js                 # Axios instance + reCAPTCHA + EmailJS
│   ├── App.jsx                # Router + route definitions
│   └── test/                  # 11 test files (unit + integration)
├── e2e/                       # Playwright end-to-end tests
├── server/
│   ├── index.js               # Express API (8 endpoints)
│   ├── data/                  # JSON fallback storage
│   └── package.json           # Backend dependencies
├── playwright.config.js       # E2E test configuration
├── vite.config.js             # Vite + Vitest configuration
├── render.yaml                # Render deployment blueprint
└── vercel.json                # Vercel SPA rewrite rules
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | No | Authenticate admin, returns JWT |
| `POST` | `/api/auth/register` | Admin | Create new admin user |
| `GET` | `/api/auth/me` | JWT | Get current user profile |
| `POST` | `/api/consultations` | No | Submit a consultation booking |
| `POST` | `/api/newsletter` | No | Subscribe to newsletter |
| `GET` | `/api/admin/data` | Admin | Fetch all bookings + subscribers |
| `POST` | `/api/chat` | No | Send message to AI consultant |

All public endpoints have rate limiting (5 requests/minute) and input sanitization to prevent HTML injection.

---

## Deployment

### Frontend (Vercel)
The `vercel.json` handles SPA routing — all non-asset requests rewrite to `index.html` so React Router works correctly.

```bash
vercel --prod
```

### Backend (Render)
The `render.yaml` blueprint defines the service. Just connect your repo and set the environment variables in Render's dashboard.

### Database
Uses MongoDB Atlas. The backend falls back to local JSON files in `server/data/` if MongoDB is unreachable — so the site degrades gracefully instead of crashing.

---

## Code Quality

- **Linting:** Oxlint configured with custom rules in `.oxlintrc.json`
- **No TypeScript** — JavaScript was chosen intentionally for faster iteration during the internship
- **Lazy loading:** All route components and heavy sections use `React.lazy()` with `Suspense`
- **Bundle splitting:** Manual chunks separate React vendor, Framer Motion, and GSAP
- **Performance audit:** Full audit available in `AUDIT.md` (720 lines of analysis)

---

## License

This project was built as part of an internship at Quantionic. The codebase is available for reference and educational purposes.

---

## Acknowledgments

Built with care by the Quantionic engineering team. Special thanks to:

- [React](https://react.dev) — UI library
- [Vite](https://vitejs.dev) — Build tool
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Playwright](https://playwright.dev) — E2E testing
- [Express](https://expressjs.com) — Backend framework
- [MongoDB](https://www.mongodb.com) — Database
