import { useRef, useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, Target, Calendar, DollarSign, BarChart3,
  Rocket, Users, GraduationCap, Settings, ChevronDown,
  ArrowRight, Sparkles, ClipboardCheck,
} from 'lucide-react';
import Footer from './Footer';

const steps = [
  {
    num: '01',
    icon: <Target className="w-6 h-6" />,
    accent: '#3b82f6',
    accentRgb: '59,130,246',
    gradient: 'from-blue-500 to-cyan-400',
    title: 'Plan and Get Ready',
    subtitle: 'Lay the foundation for success',
    points: [
      'Define clear business goals and expected outcomes from the Salesforce implementation',
      'Appoint a dedicated System Administrator who will own the platform',
      'Set a realistic budget covering licensing, consulting, and training',
      'Identify key stakeholders and form an internal project team',
    ],
    tip: 'Start with a discovery workshop to align all departments on shared objectives before any technical work begins.',
  },
  {
    num: '02',
    icon: <Calendar className="w-6 h-6" />,
    accent: '#8b5cf6',
    accentRgb: '139,92,246',
    gradient: 'from-violet-500 to-purple-400',
    title: 'Create a Project Schedule',
    subtitle: 'Map milestones and timelines',
    points: [
      'Break the implementation into phases with clear deliverables and deadlines',
      'Assign responsibilities to each team member with accountability checkpoints',
      'Build in buffer time for testing, feedback rounds, and unexpected delays',
      'Use a project management tool to track progress and communicate status',
    ],
    tip: 'A phased rollout (pilot → department → org-wide) reduces risk compared to a big-bang launch.',
  },
  {
    num: '03',
    icon: <DollarSign className="w-6 h-6" />,
    accent: '#10b981',
    accentRgb: '16,185,129',
    gradient: 'from-emerald-500 to-teal-400',
    title: 'Plan Your Expenses',
    subtitle: 'Understand the full cost picture',
    points: [
      'Consultation fees for Salesforce partners or certified consultants',
      'Licensing costs based on user count, editions, and add-on products',
      'Data migration expenses including cleansing, mapping, and validation',
      'Training budgets for admin certification and end-user onboarding',
    ],
    tip: 'Request a Total Cost of Ownership (TCO) breakdown from your Salesforce partner — hidden costs often lurk in integrations.',
  },
  {
    num: '04',
    icon: <BarChart3 className="w-6 h-6" />,
    accent: '#f59e0b',
    accentRgb: '245,158,11',
    gradient: 'from-amber-500 to-orange-400',
    title: 'Specify Your Success Metrics',
    subtitle: 'Define measurable KPIs',
    points: [
      'Set baseline measurements before implementation for accurate before/after comparison',
      'Define KPIs like lead conversion rate, case resolution time, and pipeline velocity',
      'Establish reporting dashboards to track these metrics in real-time post-launch',
      'Schedule quarterly reviews to assess ROI and adjust strategy as needed',
    ],
    tip: 'Metrics without baselines are meaningless — capture your "before" state rigorously before Day 1.',
  },
  {
    num: '05',
    icon: <Rocket className="w-6 h-6" />,
    accent: '#ef4444',
    accentRgb: '239,68,68',
    gradient: 'from-red-500 to-rose-400',
    title: 'Get Ready to Launch',
    subtitle: 'Clean data, prep users, test everything',
    points: [
      'Audit and cleanse existing data — remove duplicates, fix formatting, archive stale records',
      'Configure Salesforce environments (sandbox, staging, production) properly',
      'Run comprehensive UAT (User Acceptance Testing) with real-world scenarios',
      'Prepare rollback procedures in case critical issues surface post-launch',
    ],
    tip: 'Run a "data day" where the team collectively reviews and cleans their records — ownership drives quality.',
  },
  {
    num: '06',
    icon: <Users className="w-6 h-6" />,
    accent: '#06b6d4',
    accentRgb: '6,182,212',
    gradient: 'from-cyan-500 to-sky-400',
    title: 'Develop a Change Management Plan',
    subtitle: 'Navigate the human side of transformation',
    points: [
      'Communicate the "why" behind the change \u2014 people resist what they do not understand',
      'Identify change champions in each department to advocate and support adoption',
      'Create a timeline for when old processes sunset and new Salesforce workflows go live',
      'Plan for emotional responses — excitement, resistance, and everything in between',
    ],
    tip: 'Organizations with formal change management are 6x more likely to meet implementation objectives.',
  },
  {
    num: '07',
    icon: <GraduationCap className="w-6 h-6" />,
    accent: '#ec4899',
    accentRgb: '236,72,153',
    gradient: 'from-pink-500 to-fuchsia-400',
    title: 'Offer Instruction and Encourage Adoption',
    subtitle: 'Train, support, and empower your team',
    points: [
      'Build role-specific training modules — admins, managers, and end-users learn differently',
      'Create a library of video tutorials, quick-reference guides, and FAQ documents',
      'Set up an internal help desk or Slack channel for real-time Salesforce support',
      'Celebrate early wins publicly to build momentum and reduce resistance',
    ],
    tip: 'The "2-minute rule" — if a common task takes more than 2 minutes to figure out, your training materials need work.',
  },
  {
    num: '08',
    icon: <Settings className="w-6 h-6" />,
    accent: '#059669',
    accentRgb: '5,150,105',
    gradient: 'from-emerald-600 to-green-500',
    title: 'Create a Post-Implementation Strategy',
    subtitle: 'Keep the momentum going after Day 1',
    points: [
      'Establish a regular cadence for platform reviews and optimization sprints',
      'Monitor adoption metrics — login rates, feature usage, and support ticket trends',
      'Plan for Salesforce releases (3x/year) and evaluate new features for your org',
      'Build a continuous feedback loop with end-users to identify pain points early',
    ],
    tip: 'Salesforce is a living platform — the best implementations evolve continuously, not just at launch.',
  },
];

/* ── Step Card ── */
const StepCard = memo(function StepCard({ step, index, isLeft }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [open, setOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, type: 'spring', stiffness: 70 }}
      className={`relative w-full md:w-[calc(50%-40px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
    >
      {/* Ambient glow — follows mouse, very subtle */}
      <div
        className="absolute -inset-1 rounded-[20px] opacity-0 transition-opacity duration-700 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at ${mouse.x * 100}% ${mouse.y * 100}%, ${step.accent}10, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative bg-white rounded-[16px] border border-[#e2e4e8] transition-all duration-500 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.1)] hover:border-[#d0d3d8] hover:-translate-y-[2px] group overflow-hidden"
      >
        {/* Mouse-following radial highlight */}
        <div
          className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${mouse.x * 100}% ${mouse.y * 100}%, ${step.accent}06, transparent 60%)`,
          }}
        />

        {/* Shimmer sweep line on hover — very subtle */}
        <div
          className="absolute top-0 -left-full w-[200%] h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(105deg, transparent 42%, ${step.accent}06 46%, ${step.accent}0a 50%, ${step.accent}06 54%, transparent 58%)`,
            animation: hovered ? 'cardShimmer 3s ease-in-out infinite' : 'none',
          }}
        />

        {/* Top accent line — Vention-style left-aligned */}
        <div
          className="absolute top-0 left-0 w-16 h-[2px] rounded-t-[16px] transition-all duration-500"
          style={{
            backgroundColor: step.accent,
            opacity: hovered ? 1 : 0.6,
            width: hovered ? '100%' : '64px',
            borderRadius: hovered ? '16px 16px 0 0' : '16px 0 0 0',
          }}
        />

        {/* Bottom accent line on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${step.accent}40, transparent 60%)` }}
        />

        <div className="relative p-6 md:p-8">
          <div className="flex items-start gap-5">
            {/* Number badge */}
            <div className="shrink-0 relative">
              <div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center transition-all duration-500 group-hover:scale-105`}
                style={{ boxShadow: `0 2px 8px -2px rgba(${step.accentRgb},0.25)` }}
              >
                <span className="text-white font-bold text-sm tracking-tight">{step.num}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-400 group-hover:text-slate-500 transition-colors duration-300">{step.icon}</span>
                <span className="text-xs font-bold uppercase tracking-widest transition-colors duration-300" style={{ color: hovered ? step.accent : `${step.accent}99` }}>Step {step.num}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1 group-hover:text-slate-950 transition-colors duration-300">{step.title}</h3>
              <p className="text-sm text-slate-400 font-medium group-hover:text-slate-500 transition-colors duration-300">{step.subtitle}</p>
            </div>
          </div>

          {/* View Details button + expandable */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 text-sm font-bold cursor-pointer select-none transition-all duration-300 group/btn"
              style={{ color: step.accent }}
            >
              <span className="relative">
                {open ? 'Hide Details' : 'View Details'}
                <span className="absolute -bottom-0.5 left-0 w-0 group-hover/btn:w-full h-[1.5px] transition-all duration-300" style={{ backgroundColor: step.accent }} />
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : 'group-hover/btn:translate-y-0.5'}`} />
            </button>

            <div
              className="transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                maxHeight: open ? '600px' : '0px',
                opacity: open ? 1 : 0,
                overflow: 'hidden',
              }}
            >
              <div className="pt-5 space-y-3">
                {step.points.map((pt, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start group/point"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? 'translateX(0)' : 'translateX(-12px)',
                      transition: `all 0.4s ease ${0.1 + i * 0.07}s`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 transition-all duration-300 group-hover/point:scale-150 group-hover/point:shadow-md" style={{ backgroundColor: step.accent }} />
                    <span className="text-sm text-slate-600 leading-relaxed">{pt}</span>
                  </div>
                ))}

                <div
                  className="mt-4 p-4 rounded-xl border border-dashed transition-all duration-300 hover:border-solid"
                  style={{
                    borderColor: `${step.accent}30`,
                    backgroundColor: `${step.accent}05`,
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateX(0)' : 'translateX(-12px)',
                    transition: `all 0.4s ease 0.4s`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: step.accent }} />
                    <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: step.accent }}>Pro Tip</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.tip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ── S-Curve SVG ── */
function SCurveSVG() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const stepCount = 8;
  const cardHeight = 220;
  const gap = 32;
  const totalH = stepCount * (cardHeight + gap);

  // Generate S-curve path
  const cx = 50; // center x in %
  const leftX = 15;
  const rightX = 85;
  let d = '';
  for (let i = 0; i < stepCount; i++) {
    const y = i * (cardHeight + gap) + cardHeight / 2;
    const x = i % 2 === 0 ? leftX : rightX;
    if (i === 0) {
      d += `M ${cx} ${y - cardHeight / 2 - gap / 2} `;
    }
    // Curve from center to card position
    const prevY = i === 0 ? y - cardHeight / 2 - gap / 2 : (i - 1) * (cardHeight + gap) + cardHeight / 2;
    const midY = (prevY + y) / 2;
    d += `C ${cx} ${midY}, ${x} ${midY}, ${x} ${y} `;
    // Curve from card position back to center for next
    if (i < stepCount - 1) {
      const nextY = (i + 1) * (cardHeight + gap) + cardHeight / 2;
      const nextMidY = (y + nextY) / 2;
      d += `C ${x} ${nextMidY}, ${cx} ${nextMidY}, ${cx} ${nextY} `;
    }
  }

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
      <svg
        viewBox={`0 0 100 ${totalH}`}
        preserveAspectRatio="none"
        className="absolute left-0 top-0 w-full h-full"
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s ease' }}
      >
        <defs>
          <linearGradient id="scurveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d={d}
          fill="none"
          stroke="url(#scurveGrad)"
          strokeWidth="0.4"
          strokeLinecap="round"
          style={{
            strokeDasharray: inView ? 'none' : '2000',
            strokeDashoffset: inView ? '0' : '2000',
            transition: 'stroke-dashoffset 2s ease',
          }}
        />
        {/* Dots at each step */}
        {Array.from({ length: stepCount }).map((_, i) => {
          const y = i * (cardHeight + gap) + cardHeight / 2;
          const x = i % 2 === 0 ? leftX : rightX;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.2"
              fill={steps[i].accent}
              opacity={inView ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${0.3 + i * 0.15}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Steps Section Background ── */
function StepsSectionBG() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        backgroundImage: 'url(https://img.magnific.com/free-vector/gradient-white-monochrome-background_23-2149014955.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Soft overlay for card readability */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.50) 30%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.60) 100%)' }} />

      {/* Subtle vertical separator lines — Swiss grid feel */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '80px 100%',
      }} />

      {/* Horizontal subtle rules between steps */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(0deg, #000 1px, transparent 1px)',
        backgroundSize: '100% 252px',
      }} />

      {/* Left edge accent line — very subtle */}
      <div className="absolute top-0 left-0 w-[3px] h-full opacity-[0.06]" style={{ background: 'linear-gradient(180deg, transparent 0%, #3155FF 30%, #101C57 50%, #3155FF 70%, transparent 100%)' }} />

      {/* Right edge accent line — very subtle */}
      <div className="absolute top-0 right-0 w-[1px] h-full opacity-[0.04]" style={{ background: 'linear-gradient(180deg, transparent 0%, #3155FF 40%, transparent 100%)' }} />

      {/* Center spine glow — matches S-curve center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-full opacity-[0.03]" style={{ background: 'linear-gradient(180deg, transparent, rgba(49,85,255,0.3) 20%, rgba(16,28,87,0.2) 50%, rgba(49,85,255,0.3) 80%, transparent)' }} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />
    </div>
  );
}

/* ── Zigzag Steps Layout ── */
function StepsZigzag() {
  return (
    <div className="relative max-w-6xl mx-auto">
      <SCurveSVG />
      <div className="relative z-10 space-y-8 md:space-y-10">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} isLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function SalesforceChecklist() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50/50">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[600px]">
        {/* Spline 3D background */}
        <div className="absolute inset-0">
          <iframe
            title="Spline 3D Diagram"
            src="https://my.spline.design/webdiagram-W20iwxjTl0tosfMl8ppwXo76/"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(10,26,20,0.75) 0%, rgba(13,40,24,0.60) 30%, rgba(15,32,39,0.65) 60%, rgba(10,26,20,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: 'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-400/[0.04] blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-sm font-bold text-emerald-300/70 hover:text-emerald-200 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 mb-8">
              <ClipboardCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Salesforce Readiness</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6"
          >
            Salesforce Implementation{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Checklist
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-emerald-100/40 max-w-2xl leading-relaxed mb-10"
          >
            Set up Salesforce in <span className="text-emerald-300 font-bold">8 simple steps</span> for market readiness. A strategic roadmap designed for enterprise-grade deployments.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 md:gap-14"
          >
            {[
              { value: '8', label: 'Steps' },
              { value: '32', label: 'Action Items' },
              { value: '8', label: 'Pro Tips' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-emerald-300/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
        <StepsSectionBG />

        <div className="relative z-10">
          <StepsZigzag />
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-6 relative overflow-hidden min-h-[400px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://www.winklix.com/blog/wp-content/uploads/2025/11/Salesforce-Consulting-Services-01-1024x1024-1.png"
            alt=""
            width="1024" height="1024" loading="lazy" decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(250,251,252,0.92) 0%, rgba(240,253,244,0.88) 40%, rgba(245,243,255,0.90) 70%, rgba(250,251,252,0.92) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.2]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(5,150,105,0.3) 0.6px, transparent 0.6px)',
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#059669] to-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#059669]/20">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Ready to Implement?
            </h2>
            <p className="text-slate-500 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
              Our team has guided 150+ Salesforce implementations across industries. Let's make yours seamless.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#059669] to-emerald-500 text-white font-bold text-sm px-9 py-4 rounded-2xl shadow-xl shadow-[#059669]/25 hover:shadow-[#059669]/40 hover:scale-[1.03] transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-[#059669] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2.5">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm px-9 py-4 rounded-2xl hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
