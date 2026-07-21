import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Cpu, Zap, Shield, Trash2, Lightbulb, Activity, AlertTriangle, Camera, ChevronRight, MapPin, Wifi, Eye, BarChart3, Layers, Globe, Users } from 'lucide-react';
import Footer from './Footer';

const pageBackground = { background: 'linear-gradient(160deg, #ecfdf5 0%, #f8fafb 15%, #f0fdf4 30%, #f5f3ff 50%, #f0fdf4 70%, #f8fafb 85%, #ecfdf5 100%)' };

const baseGradientMesh = {
  background: 'radial-gradient(ellipse 80% 60% at 15% 20%, rgba(5,150,105,0.08) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 85% 35%, rgba(139,92,246,0.06) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 30% 60%, rgba(245,158,11,0.04) 0%, transparent 45%)',
};

const orb1Style = { top: '8%', left: '-5%', background: 'radial-gradient(circle, rgba(5,150,105,0.10) 0%, rgba(5,150,105,0.03) 50%, transparent 70%)', filter: 'blur(40px)' };
const orb2Style = { top: '25%', right: '-8%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 50%, transparent 70%)', filter: 'blur(40px)' };
const orb3Style = { bottom: '15%', left: '30%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)', filter: 'blur(35px)' };
const orb4Style = { top: '55%', left: '5%', background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.015) 50%, transparent 70%)', filter: 'blur(35px)' };
const orb5Style = { top: '70%', right: '10%', background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)', filter: 'blur(30px)' };

const wave1Style = { top: '20%', background: 'linear-gradient(90deg, transparent, rgba(5,150,105,0.08), transparent)', rotate: '-3deg' };
const wave2Style = { top: '50%', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.06), transparent)', rotate: '2deg' };
const wave3Style = { top: '75%', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.05), transparent)', rotate: '-1deg' };

const dotGridStyle = {
  backgroundImage: 'radial-gradient(circle, rgba(5,150,105,0.4) 0.7px, transparent 0.7px)',
  backgroundSize: '30px 30px',
};

const noiseStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundSize: '180px 180px',
};

const features = [
  {
    icon: <Activity className="w-7 h-7" />,
    accent: '#3b82f6',
    accentRgb: '59,130,246',
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/10',
    bgImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=60',
    title: 'AI-Powered Traffic Management',
    subtitle: 'Reduce congestion by 40% with intelligent routing',
    points: [
      'Real-time traffic signal optimization using computer vision and sensor fusion',
      'Ambulance & emergency vehicle prioritization with green corridor generation',
      'Predictive congestion modeling using historical + live traffic data',
      'Dynamic rerouting for public transport and logistics fleets',
    ],
    stat: '40%',
    statLabel: 'Less Congestion',
    iconExtra: <MapPin className="w-4 h-4" />,
  },
  {
    icon: <Trash2 className="w-7 h-7" />,
    accent: '#10b981',
    accentRgb: '16,185,129',
    gradient: 'from-emerald-500 to-green-400',
    bgGlow: 'bg-emerald-500/10',
    bgImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=60',
    title: 'Smart Waste Management',
    subtitle: 'Cut collection costs by 60% with sensor-driven pickups',
    points: [
      'IoT sensors in dustbins monitoring fill levels in real time',
      'AI-optimized collection truck routes — only visit full bins',
      'Predictive waste generation analytics for festival/event planning',
      'Automated alerts to municipal teams for overflow prevention',
    ],
    stat: '60%',
    statLabel: 'Cost Reduction',
    iconExtra: <Wifi className="w-4 h-4" />,
  },
  {
    icon: <Lightbulb className="w-7 h-7" />,
    accent: '#f59e0b',
    accentRgb: '245,158,11',
    gradient: 'from-amber-500 to-yellow-400',
    bgGlow: 'bg-amber-500/10',
    bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=60',
    title: 'Intelligent Energy Grids',
    subtitle: 'Save 35% energy waste with AI-driven automation',
    points: [
      'Automated street light dimming based on pedestrian & vehicle presence',
      'Smart load balancing across residential and commercial zones',
      'Solar + grid hybrid optimization for renewable energy integration',
      'Real-time anomaly detection for power theft and equipment failure',
    ],
    stat: '35%',
    statLabel: 'Energy Saved',
    iconExtra: <Zap className="w-4 h-4" />,
  },
  {
    icon: <Camera className="w-7 h-7" />,
    accent: '#ef4444',
    accentRgb: '239,68,68',
    gradient: 'from-red-500 to-rose-400',
    bgGlow: 'bg-red-500/10',
    title: 'Next-Gen Public Safety',
    subtitle: 'Faster response with AI-driven incident detection',
    bgImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=60',
    points: [
      'AI CCTV cameras for real-time accident and theft detection',
      'Automated police & ambulance alerts with GPS-precise locations',
      'Crowd density monitoring for event safety and stampede prevention',
      'Facial recognition integration for wanted persons identification',
    ],
    stat: '3x',
    statLabel: 'Faster Response',
    iconExtra: <Eye className="w-4 h-4" />,
  },
];

/* ── Feature Row (Side Image + Rectangular Card) ── */
const FeatureRow = memo(function FeatureRow({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 1; // 0,2 = image LEFT | 1,3 = image RIGHT

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -5, y: x * 5 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const imageEl = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 70 }}
      className="hidden lg:block w-[220px] xl:w-[260px] flex-shrink-0"
    >
      <div
        className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden group/img cursor-pointer"
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -8px rgba(0,0,0,0.15), 0 0 25px -5px rgba(${feature.accentRgb},0.15)`
            : '0 8px 25px -6px rgba(0,0,0,0.08)',
        }}
      >
        <img
          src={feature.bgImage}
          alt={feature.title}
          width="260" height="347" loading="lazy" decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
        />
        <div
          className="absolute inset-0 opacity-30 group-hover/img:opacity-20 transition-opacity duration-500"
          style={{ background: `linear-gradient(180deg, ${feature.accent}40, transparent 50%, ${feature.accent}20)` }}
        />
        {/* Label at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <span className="text-xs font-bold text-white/90 uppercase tracking-wider">{feature.title.split(' ').slice(0, 2).join(' ')}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-10`}>
      {imageEl}

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, rotateX: 6 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 6 }}
        transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 70 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          flex: '1 1 0%',
          minWidth: 0,
        }}
        className="group relative"
      >
        {/* Outer glow ring */}
        <div
          className="absolute -inset-[1px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${feature.accent}40, transparent 40%, ${feature.accent}20, transparent 70%, ${feature.accent}30)`,
            filter: 'blur(1px)',
          }}
        />

        {/* Card body */}
        <div
          className="relative bg-white/[0.92] backdrop-blur-xl rounded-[24px] border border-white/60 px-8 py-12 md:px-12 md:py-14 overflow-hidden transition-all duration-500 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.005 : 1})`,
            transformStyle: 'preserve-3d',
            boxShadow: isHovered
              ? `0 30px 60px -12px rgba(0,0,0,0.12), 0 0 40px -8px rgba(${feature.accentRgb},0.15), inset 0 1px 0 rgba(255,255,255,0.8)`
              : '0 4px 20px -4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          {/* Background image inside card */}
          <div
            className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700 rounded-[24px]"
            style={{
              backgroundImage: `url(${feature.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Scan line */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${feature.accent}50, transparent)`,
                animation: 'smartScanLine 3s linear infinite',
              }}
            />
          </div>

          {/* Background glow orb */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle, ${feature.accent}, transparent 70%)`,
              transform: 'translateZ(30px)',
            }}
          />

          {/* Top accent strip */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
          />

          {/* Content */}
          <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Left: Icon + Stat */}
              <div className="flex-shrink-0 flex md:flex-col items-center gap-4">
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${feature.accent}12, ${feature.accent}06)`,
                    border: `1px solid ${feature.accent}20`,
                    boxShadow: isHovered
                      ? `0 8px 24px -4px ${feature.accent}30, 0 0 20px ${feature.accent}15`
                      : `0 2px 8px ${feature.accent}10`,
                  }}
                >
                  <span style={{ color: feature.accent }}>{feature.icon}</span>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      border: `2px solid ${feature.accent}30`,
                      animation: isHovered ? 'smartPulseRing 2s ease-out infinite' : 'none',
                    }}
                  />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold tracking-tight" style={{ color: feature.accent }}>{feature.stat}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-0.5">{feature.statLabel}</div>
                </div>
              </div>

              {/* Right: Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: feature.accent }}>{feature.iconExtra}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{feature.title}</h3>
                </div>
                <p className="text-sm font-medium text-slate-500 mb-5">{feature.subtitle}</p>

                <div className="space-y-3">
                  {feature.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover/item:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${feature.accent}10, ${feature.accent}05)`,
                          border: `1px solid ${feature.accent}15`,
                        }}
                      >
                        <ChevronRight className="w-3.5 h-3.5" style={{ color: feature.accent }} />
                      </div>
                      <span className="text-sm text-slate-600 leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
export default function SmartCity() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden" style={pageBackground}>
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient mesh */}
        <div className="absolute inset-0" style={baseGradientMesh} />

        {/* Animated gradient orbs — compositor-thread CSS */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-orb-1"
          style={orb1Style}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full animate-orb-2"
          style={orb2Style}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full animate-orb-3"
          style={orb3Style}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full animate-orb-4"
          style={orb4Style}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full animate-orb-5"
          style={orb5Style}
        />

        {/* Animated gradient waves — compositor-thread CSS */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[200%] h-[1px] left-[-50%] animate-wave-1"
            style={wave1Style}
          />
          <div
            className="absolute w-[200%] h-[1px] left-[-50%] animate-wave-2"
            style={wave2Style}
          />
          <div
            className="absolute w-[200%] h-[1px] left-[-50%] animate-wave-3"
            style={wave3Style}
          />
        </div>

        {/* Dot grid — premium texture */}
        <div className="absolute inset-0 opacity-[0.45]" style={dotGridStyle} />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={noiseStyle} />
      </div>

      {/* ── Top Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-sm font-semibold text-slate-500 hover:text-[#059669] transition-colors duration-300 group">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors duration-300">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Home
          </Link>
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="18" cy="18" r="4" fill="url(#scLogoGrad)" />
              <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#scLogoGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#scLogoGrad)" strokeWidth="1.5" fill="none" opacity="0.6" transform="rotate(60 18 18)" />
              <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#scLogoGrad)" strokeWidth="1.5" fill="none" opacity="0.6" transform="rotate(120 18 18)" />
              <circle cx="18" cy="18" r="1.5" fill="#059669" />
              <defs>
                <linearGradient id="scLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#059669" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-bold text-slate-900 tracking-tight">Quantionic</span>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative pt-28 pb-20 md:pt-36 md:pb-32 px-6 overflow-hidden">
        {/* GIF Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://miro.medium.com/1*2gIp3sQew_-a6_sfeXQxxg.gif"
            alt=""
            width="1920" height="1080" loading="lazy" decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) saturate(1.2)' }}
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          >
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 mb-10 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-[0.15em]">AI-Driven Smart Cities</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, type: 'spring', stiffness: 60 }}
            className="text-4xl md:text-6xl lg:text-[4.5rem] font-extrabold text-white tracking-tight leading-[1.08] mb-7"
          >
            Making Cities{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#059669] via-emerald-500 to-teal-400 bg-clip-text text-transparent">Smarter</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
            <br />
            with Artificial Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
          >
            From intelligent traffic management to AI-powered public safety — we build the neural backbone
            that transforms urban infrastructure into self-optimizing ecosystems.
          </motion.p>

          {/* Capability pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { icon: <Shield className="w-3.5 h-3.5" />, label: 'Safe Cities', color: '#059669' },
              { icon: <Lightbulb className="w-3.5 h-3.5" />, label: 'Energy Efficient', color: '#f59e0b' },
              { icon: <Activity className="w-3.5 h-3.5" />, label: 'Real-Time AI', color: '#3b82f6' },
              { icon: <AlertTriangle className="w-3.5 h-3.5" />, label: 'Predictive Alerts', color: '#ef4444' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs font-semibold text-white/90 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: `0 2px 12px ${item.color}08` }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="py-10 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(240,249,244,0.6) 50%, rgba(255,255,255,0.9) 100%)' }}>
        <div className="absolute inset-0 opacity-[0.2]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(5,150,105,0.3) 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent" />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '150+', label: 'Cities Deployed', icon: <Globe className="w-4 h-4" /> },
            { value: '2.4M', label: 'Lives Impacted', icon: <Users className="w-4 h-4" /> },
            { value: '99.9%', label: 'Uptime SLA', icon: <BarChart3 className="w-4 h-4" /> },
            { value: '<200ms', label: 'Response Time', icon: <Zap className="w-4 h-4" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="inline-flex items-center gap-1.5 text-[#059669] mb-2 group-hover:scale-110 transition-transform">
                {stat.icon}
                <span className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.value}</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 md:py-28 px-6 relative z-10 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://imgproxy.divecdn.com/-HOolDjEzq6izKeQa-6j-ujTCC4o75VT2UmVZxlwoCM/g:nowe:0:210/c:4494:2539/rs:fill:1200:900:1/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9BZG9iZVN0b2NrXzg3NDk3NTcyLmpwZWc=.webp"
            alt=""
            width="1200" height="900" loading="lazy" decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays for readability */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(170deg, rgba(248,250,251,0.92) 0%, rgba(240,249,244,0.88) 25%, rgba(245,243,255,0.90) 50%, rgba(240,249,244,0.88) 75%, rgba(248,250,251,0.92) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.35]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(5,150,105,0.4) 0.7px, transparent 0.7px)',
            backgroundSize: '28px 28px',
          }} />
        </div>
        {/* Floating ambient blobs */}
        <div className="absolute top-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-200/20 blur-[80px]" />
        <div className="absolute bottom-0 right-[-5%] w-[350px] h-[350px] rounded-full bg-violet-200/15 blur-[80px]" />
        {/* Top/bottom divider lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-emerald-100/60 rounded-full px-5 py-2 mb-6 shadow-sm">
                <Layers className="w-3.5 h-3.5 text-[#059669]" />
                <span className="text-xs font-bold text-emerald-700/70 uppercase tracking-[0.15em]">Key Capabilities</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                How AI Powers{' '}
                <span className="bg-gradient-to-r from-[#059669] to-emerald-400 bg-clip-text text-transparent">Smart Cities</span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
                Four pillars of intelligent urban infrastructure — each powered by real-time data and machine learning.
              </p>
            </motion.div>
          </div>

          <div className="space-y-16 lg:space-y-20">
            {features.map((feature, index) => (
              <FeatureRow key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Premium dark background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #060f1a 0%, #0a1628 50%, #060f1a 100%)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
        {/* Ambient orbs */}
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-sky-500/[0.06] blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[20%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Card */}
            <div className="relative rounded-[24px] overflow-hidden" style={{
              background: 'linear-gradient(160deg, rgba(56,189,248,0.06) 0%, rgba(10,22,40,0.95) 30%, rgba(6,15,26,0.98) 100%)',
              border: '1px solid rgba(56,189,248,0.1)',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.05)',
            }}>
              {/* Top glow line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
              {/* Inner accent glow */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-sky-500/[0.04] to-transparent rounded-bl-[100px]" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/[0.03] to-transparent rounded-tr-[80px]" />

              <div className="relative z-10 text-center px-8 py-16 md:px-16 md:py-20">
                {/* Icon */}
                <div className="relative w-16 h-16 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-2xl bg-sky-400/10 blur-xl" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-[0_8px_32px_rgba(56,189,248,0.3)]">
                    <Cpu className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-[2.75rem] font-extrabold tracking-tight mb-5 leading-[1.15]" style={{ color: '#f0f9ff' }}>
                  Ready to Build Your<br className="hidden md:block" /> Smart City?
                </h2>
                <p className="text-sm md:text-base mb-12 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(148,163,184,0.8)' }}>
                  Let's discuss how AI can transform your city's infrastructure — from traffic to energy to public safety.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(56,189,248,0.35)] hover:-translate-y-0.5"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Contact Us
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>

                  <Link
                    to="/"
                    className="group relative inline-flex items-center gap-2 border border-white/10 text-white/60 font-semibold text-sm px-8 py-3.5 rounded-xl hover:border-white/20 hover:text-white/90 hover:bg-white/[0.03] transition-all duration-500"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    Go Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


