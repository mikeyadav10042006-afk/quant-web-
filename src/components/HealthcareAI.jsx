import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Shield, Lock, Users, AlertTriangle,
  ChevronRight, CheckCircle, ArrowUpRight, Activity, Database,
  Zap, Heart, Brain, Cpu, Globe, ShieldCheck,
  TrendingUp, Clock, Sparkles
} from 'lucide-react';
import Footer from './Footer';

const securityCards = [
  { num: '01', icon: Shield, title: 'HIPAA & ISO-27001 Compliance', desc: 'Full compliance alignment engineered directly into database schemas and network pipelines for zero-trust healthcare environments.' },
  { num: '02', icon: Lock, title: 'AES-256 Data Encryption', desc: 'Immutable end-to-end encryption covering transport layers and static storage arrays across all clinical data repositories.' },
  { num: '03', icon: Users, title: 'Role-Based Access Controls', desc: 'Granular token-based credential policies ensuring clinical personnel access only authorized records within scope.' },
  { num: '04', icon: AlertTriangle, title: 'Continuous Audit & Anomaly Detection', desc: 'Background auditing engine with automated alerts on irregular system query behavior and access pattern deviations.' },
];

const stats = [
  { value: '99.97%', label: 'System Uptime', icon: Clock },
  { value: '< 50ms', label: 'API Latency', icon: Zap },
  { value: '10M+', label: 'Records Secured', icon: ShieldCheck },
  { value: '200+', label: 'Hospital Integrations', icon: Globe },
];

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <defs>
          <pattern id="healthGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#009966" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#healthGrid)" />
      </svg>
      {/* Floating orbs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-[#009966]/[0.06] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-20 left-[10%] w-80 h-80 bg-teal-400/[0.05] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/[0.03] rounded-full blur-[140px]" />
    </div>
  );
}

function FloatingShape({ className, delay = 0 }) {
  return (
    <div
      className={`absolute rounded-full border border-[#009966]/10 ${className}`}
      style={{ animation: `healthcareFloat 6s ease-in-out ${delay}s infinite` }}
    />
  );
}

export default function HealthcareAI() {
  const heroRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const laptopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (ring1Ref.current) ring1Ref.current.style.transform = `translateY(calc(-50% + ${y * 0.05}px))`;
      if (ring2Ref.current) ring2Ref.current.style.transform = `translateY(calc(-50% + ${y * 0.08}px))`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current && laptopRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        laptopRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfd] text-slate-600 font-sans flex flex-col overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 glass-card border-b border-slate-200/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#009966] to-emerald-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow duration-500">
              Q
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#0a1e4d]">
              QUANT<span className="text-[#009966]">IONIC</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#009966] transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6DVsgaIGHK7F2alVyWdZeu0_Kn6i_gSZ-F7YMEkAOUWYaCnqT6KfAZbWI&s=10"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/85 to-white/95" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70" />
        </div>
        <AnimatedGrid />

        {/* Large decorative ring */}
        <div ref={ring1Ref} className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#009966]/[0.06] pointer-events-none" />
        <div ref={ring2Ref} className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-[#009966]/[0.04] pointer-events-none" />

        <FloatingShape className="w-16 h-16 top-[15%] left-[5%] bg-[#009966]/[0.04]" delay={0} />
        <FloatingShape className="w-10 h-10 top-[65%] right-[8%] bg-teal-300/[0.06] border-dashed" delay={2} />
        <FloatingShape className="w-20 h-20 bottom-[20%] left-[15%] bg-emerald-200/[0.04] border-dotted" delay={1} />

        <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-24">
          {/* Left */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2.5 bg-[#009966]/[0.07] border border-[#009966]/10 px-5 py-2 rounded-full hover:bg-[#009966]/[0.12] transition-colors duration-500 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009966] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009966]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#009966]">AI-Powered Healthcare Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold text-[#0a1e4d] tracking-tight leading-[1.06]">
              The Future of{' '}
              <span className="relative inline-block">
                <span className="shimmer-text">Intelligent</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C40 2 80 2 100 4C120 6 160 3 198 2" stroke="#009966" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                </svg>
              </span>
              {' '}Healthcare
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Optimize diagnostic workflows, unify secure electronic records, and deploy real-time clinical monitoring dashboards engineered with absolute HIPAA-compliant integrity.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#009966] to-emerald-600 hover:from-[#007a52] hover:to-emerald-700 text-white font-bold px-9 py-4.5 rounded-2xl transition-all duration-500 shadow-lg shadow-teal-600/20 hover:shadow-2xl hover:shadow-teal-600/30 hover:-translate-y-1 active:translate-y-0"
              >
                Request Custom Demo
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-6">
              {['HIPAA Compliant', '24/7 Monitoring', 'SOC 2 Certified'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-400 font-medium hover:text-[#009966] transition-colors duration-300 cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#009966] shadow-sm shadow-[#009966]/30" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Premium Laptop with parallax */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div
              ref={laptopRef}
              className="relative w-full max-w-[560px] overflow-hidden transition-transform duration-100 ease-out"
            >
              {/* Dynamic glow behind laptop */}
              <div className="absolute -inset-12 bg-gradient-to-br from-[#009966]/12 via-teal-400/5 to-emerald-400/8 rounded-[3rem] blur-3xl pointer-events-none transition-all duration-700" />

              {/* Laptop body */}
              <div className="relative bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl p-2 shadow-2xl shadow-slate-900/40 border border-slate-600/40 hover:shadow-slate-900/50 transition-shadow duration-500">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-slate-700 rounded-b-xl" />
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-950 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                    alt="Medical AI Analytics Dashboard"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  {/* Screen reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
              <div className="mx-8 h-2 bg-gradient-to-b from-slate-600 to-slate-700 rounded-b-lg" />
              <div className="mx-12 h-[2px] bg-slate-500/30 rounded-b" />

              {/* Floating security badge */}
              <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-5 py-4 shadow-xl shadow-slate-200/50 flex items-center gap-3 hero-card-hover cursor-default">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#009966] to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security</p>
                  <p className="text-sm font-bold text-[#0a1e4d]">End-to-End Encrypted</p>
                </div>
              </div>

              {/* Floating analytics badge */}
              <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl shadow-slate-200/50 flex items-center gap-2.5 hero-card-hover cursor-default">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Analytics</p>
                  <p className="text-sm font-bold text-[#0a1e4d]">+47% Efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar — blend between hero & security */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-white/80 via-white/40 to-white/10 backdrop-blur-2xl border-t border-white/50">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#009966]/10 to-emerald-500/10 flex items-center justify-center group-hover:from-[#009966]/20 group-hover:to-emerald-500/20 transition-all duration-400">
                  <stat.icon className="w-4 h-4 text-[#009966]" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-[#0a1e4d] leading-none">{stat.value}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. SECURITY & COMPLIANCE ── */}
      <section id="security-section" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://guardianit.com/wp-content/uploads/how-to-ensure-compliance-with-data-protection-regulations.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70" />
        </div>

        <div className="relative max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#009966]/[0.07] border border-[#009966]/10 px-4 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#009966]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#009966]">Enterprise Security</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a1e4d] tracking-tight leading-tight">
              Data Security &{' '}
              <span className="relative inline-block">
                Compliance
                <div className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#009966] to-emerald-400 rounded-full" />
              </span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              We engineer enterprise health systems to satisfy the most stringent privacy protocols, securing sensitive PHI at every transition point.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 — spans 2 cols */}
            <div className="lg:col-span-2 group relative bg-white rounded-3xl border border-slate-100/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/[0.08] hover:border-purple-400/20 hover:-translate-y-1 glow-border-purple overflow-hidden cursor-default">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/[0.05] to-transparent rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none transition-all duration-700 group-hover:scale-110" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-purple-400/[0.04] to-transparent rounded-full pointer-events-none" />
              {/* Top Image Strip */}
              <div className="relative w-full h-28 overflow-hidden">
                <img
                  src="https://cdn.prod.website-files.com/621f84dc15b5ed16dc85a18a/66ec801a406c6310591e94aa_download%20(5).webp"
                  alt="HIPAA Compliance"
                  className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-700"
                />
              </div>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/[0.12] to-purple-400/[0.06] flex items-center justify-center group-hover:from-purple-500/[0.2] group-hover:to-purple-400/[0.1] transition-all duration-500">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 tracking-widest">{securityCards[0].num}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0a1e4d] mb-3 group-hover:text-purple-600 transition-colors duration-400">{securityCards[0].title}</h3>
                <p className="text-slate-500 leading-relaxed">{securityCards[0].desc}</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white rounded-3xl border border-slate-100/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/[0.08] hover:border-blue-400/20 hover:-translate-y-1 glow-border-blue overflow-hidden cursor-default">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/[0.05] to-transparent rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none transition-all duration-700 group-hover:scale-110" />
              {/* Top Image Strip */}
              <div className="relative w-full h-28 overflow-hidden">
                <img
                  src="https://www.atpinc.com/upload/images/2019/06-26/634eabed3ee943089138763bf24b7f03.jpg"
                  alt="AES-256 Encryption"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/[0.12] to-blue-400/[0.06] flex items-center justify-center group-hover:from-blue-500/[0.2] group-hover:to-blue-400/[0.1] transition-all duration-500">
                      <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 tracking-widest">{securityCards[1].num}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0a1e4d] mb-3 group-hover:text-blue-600 transition-colors duration-400">{securityCards[1].title}</h3>
                <p className="text-slate-500 leading-relaxed">{securityCards[1].desc}</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white rounded-3xl border border-slate-100/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/[0.08] hover:border-purple-400/20 hover:-translate-y-1 glow-border-purple overflow-hidden cursor-default">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/[0.05] to-transparent rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none transition-all duration-700 group-hover:scale-110" />
              {/* Top Image Strip */}
              <div className="relative w-full h-28 overflow-hidden">
                <img
                  src="https://bettercloud.b-cdn.net/wp-content/uploads/2021/07/RoleBasedAccessControl_FeatureImage.jpg"
                  alt="Role-Based Access Control"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/[0.12] to-purple-400/[0.06] flex items-center justify-center group-hover:from-purple-500/[0.2] group-hover:to-purple-400/[0.1] transition-all duration-500">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 tracking-widest">{securityCards[2].num}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0a1e4d] mb-3 group-hover:text-purple-600 transition-colors duration-400">{securityCards[2].title}</h3>
                <p className="text-slate-500 leading-relaxed">{securityCards[2].desc}</p>
              </div>
            </div>

            {/* Card 4 — spans 2 cols */}
            <div className="lg:col-span-2 group relative bg-white rounded-3xl border border-slate-100/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/[0.08] hover:border-blue-400/20 hover:-translate-y-1 glow-border-blue overflow-hidden cursor-default">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/[0.05] to-transparent rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none transition-all duration-700 group-hover:scale-110" />
              {/* Top Image Strip */}
              <div className="relative w-full h-28 overflow-hidden">
                <img
                  src="https://fidelissecurity.com/wp-content/uploads/2025/01/Anomaly-Detection-Algorithms.webp"
                  alt="Continuous Audit & Anomaly Detection"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/[0.12] to-blue-400/[0.06] flex items-center justify-center group-hover:from-blue-500/[0.2] group-hover:to-blue-400/[0.1] transition-all duration-500">
                      <AlertTriangle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 tracking-widest">{securityCards[3].num}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0a1e4d] mb-3 group-hover:text-blue-600 transition-colors duration-400">{securityCards[3].title}</h3>
                <p className="text-slate-500 leading-relaxed">{securityCards[3].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HIMS ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/50 to-white pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#009966]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 relative group">
            <div className="absolute -inset-8 bg-gradient-to-tr from-[#009966]/[0.06] via-transparent to-teal-50/40 rounded-[3rem] pointer-events-none group-hover:from-[#009966]/[0.1] transition-all duration-700" />
            <div className="relative rounded-3xl overflow-hidden premium-shadow border border-slate-100/60 group-hover:shadow-2xl group-hover:shadow-[#009966]/[0.08] transition-all duration-700">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                alt="HIMS Database Software"
                className="w-full h-80 lg:h-[440px] object-cover transition-all duration-700 rotate-[-3deg] group-hover:rotate-0 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e4d]/30 via-[#0a1e4d]/5 to-transparent" />
              {/* Overlay metric */}
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Integration Rate</p>
                  <p className="text-lg font-extrabold text-[#0a1e4d]">99.8%</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#009966]/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-[#009966]" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#009966]/[0.07] border border-[#009966]/10 px-4 py-1.5 rounded-full">
                <Cpu className="w-3.5 h-3.5 text-[#009966]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#009966]">Core Platform</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#0a1e4d] tracking-tight leading-tight">
                Hospital Information Management System
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Consolidate clinical database networks under a single unified dashboard interface. Our custom HIMS middleware bridges patient scheduling, laboratory feedback, diagnostics, and inventory workflows into one seamless platform.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { text: 'Real-time bed & resource allocation', icon: Activity },
                { text: 'Patient record schema consolidation', icon: Database },
                { text: 'Integrated billing & insurance pipelines', icon: TrendingUp },
                { text: 'Auto-optimization of doctor schedules', icon: Clock },
              ].map((item, i) => (
                <div key={i} className="group/item flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-100/60 hover:border-[#009966]/20 hover:shadow-lg hover:shadow-[#009966]/[0.05] hover:-translate-y-0.5 transition-all duration-400 cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-[#009966]/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#009966]/[0.15] transition-colors duration-400">
                    <item.icon className="w-4 h-4 text-[#009966]" />
                  </div>
                  <span className="text-sm font-semibold text-[#0a1e4d] leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. EMERGENCY & CLINICAL — DARK SECTION ── */}
      <section className="relative py-32 px-6 overflow-hidden section-dark">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-[#009966]/[0.08] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-20 left-[5%] w-64 h-64 bg-teal-400/[0.06] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="darkGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#darkGrid)" />
          </svg>
          {/* Glowing lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009966]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009966]/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.1] px-4 py-1.5 rounded-full">
                <Heart className="w-3.5 h-3.5 text-[#009966]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#009966]">Clinical Intelligence</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-tight">
                AI-Powered Emergency & Clinical Decision Support
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                Shorten reaction windows during acute clinical scenarios. Our emergency modules run constant telemetry analytics over live patient monitor streams to calculate risk curves and generate proactive nursing alerts.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: Activity, text: 'Continuous patient vital-signs feature extraction model' },
                { icon: AlertTriangle, text: 'Immediate dashboard escalation triggered upon cardiac anomalies' },
                { icon: Brain, text: 'Neural network risk prediction with sub-second inference latency' },
              ].map((item, i) => (
                <div key={i} className="group/item flex items-start gap-4 p-5 rounded-2xl bg-white/[0.05] border border-white/[0.06] hover:bg-white/[0.08] hover:border-[#009966]/20 transition-all duration-400 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-[#009966]/[0.15] flex items-center justify-center shrink-0 group-hover/item:bg-[#009966]/[0.25] transition-colors duration-400">
                    <item.icon className="w-4 h-4 text-[#009966]" />
                  </div>
                  <p className="text-sm font-semibold text-white/80 leading-relaxed pt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute -inset-10 bg-gradient-to-bl from-red-500/[0.08] via-[#009966]/[0.04] to-teal-500/[0.05] rounded-[3rem] blur-3xl pointer-events-none" />

            {/* Emergency alert rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="emergency-ring absolute w-[300px] h-[560px] rounded-[44px] border border-red-500/20" style={{ animation: 'emergencyPulse 2s ease-out infinite' }} />
              <div className="emergency-ring absolute w-[300px] h-[560px] rounded-[44px] border border-red-500/15" style={{ animation: 'emergencyPulse 2s ease-out infinite 0.6s' }} />
              <div className="emergency-ring absolute w-[300px] h-[560px] rounded-[44px] border border-red-500/10" style={{ animation: 'emergencyPulse 2s ease-out infinite 1.2s' }} />
            </div>

            <div className="phone-vibrate relative w-[280px] h-[560px] rounded-[44px] p-[3px] shadow-2xl shadow-black/40" style={{ background: 'linear-gradient(180deg, #2d3748 0%, #1a202c 50%, #2d3748 100%)' }}>
              {/* Red emergency glow on border */}
              <div className="absolute -inset-[2px] rounded-[46px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0.1) 50%, rgba(239,68,68,0.3) 100%)', animation: 'emergencyBorder 1.5s ease-in-out infinite' }} />
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-700 rounded-b-2xl z-20 flex justify-center items-center">
                <div className="w-12 h-1 bg-slate-600 rounded-full" />
              </div>
              {/* Emergency LED dot */}
              <div className="absolute top-2 right-12 z-30">
                <div className="w-2 h-2 rounded-full bg-red-500" style={{ animation: 'emergencyBlink 0.8s ease-in-out infinite', boxShadow: '0 0 8px rgba(239,68,68,0.8), 0 0 16px rgba(239,68,68,0.4)' }} />
              </div>
              {/* Screen */}
              <div className="w-full h-full bg-[#0c0f1a] rounded-[42px] overflow-hidden p-5 flex flex-col justify-between border border-slate-600/30 relative">
                {/* Screen emergency flash overlay */}
                <div className="absolute inset-0 rounded-[42px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(239,68,68,0.08) 0%, transparent 60%)', animation: 'screenFlash 2s ease-in-out infinite' }} />
                <div className="space-y-4 pt-8 relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-red-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border" style={{ background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.25)', animation: 'emergencyBg 1.5s ease-in-out infinite' }}>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" style={{ animation: 'emergencyPing 1s cubic-bezier(0,0,0.2,1) infinite' }} />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                    </span>
                    Emergency Alert
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-red-400" style={{ textShadow: '0 0 20px rgba(239,68,68,0.3)' }}>Critical Shift</h3>
                  <div className="p-4 rounded-2xl space-y-2" style={{ border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.08)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" style={{ animation: 'emergencyBlink 1s ease-in-out infinite' }} />
                      <p className="text-xs text-red-400 font-bold">Patient: Ward 4, Bed B</p>
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed">SpO2 index drops below 92% thresholds. Cardiac monitor reports PVC frequency spikes.</p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[9px] font-bold text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full">SpO2: 89%</span>
                      <span className="text-[9px] font-bold text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full">HR: 142</span>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <div className="flex-1 py-2 rounded-xl bg-red-500/20 border border-red-500/25 text-center">
                      <span className="text-[10px] font-bold text-red-400 uppercase">Escalate</span>
                    </div>
                    <div className="flex-1 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-center">
                      <span className="text-[10px] font-bold text-white/40 uppercase">Acknowledge</span>
                    </div>
                  </div>
                </div>
                {/* Animated ECG Graph */}
                <div className="relative w-full h-28 bg-white/[0.03] rounded-xl border border-white/[0.06] p-3 overflow-hidden">
                  {/* ECG line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 100" preserveAspectRatio="none">
                    <polyline
                      points="0,50 20,50 30,50 40,20 50,80 60,10 70,90 80,30 90,70 100,50 120,50 140,50 150,20 160,80 170,10 180,90 190,30 200,70 210,50 230,50 250,50 260,20 270,80 280,50"
                      fill="none"
                      stroke="rgba(239,68,68,0.6)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.4))', animation: 'ecgScroll 3s linear infinite' }}
                    />
                    <polyline
                      points="0,50 20,50 30,50 40,20 50,80 60,10 70,90 80,30 90,70 100,50 120,50 140,50 150,20 160,80 170,10 180,90 190,30 200,70 210,50 230,50 250,50 260,20 270,80 280,50"
                      fill="none"
                      stroke="rgba(239,68,68,0.3)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: 'blur(3px)', animation: 'ecgScroll 3s linear infinite' }}
                    />
                  </svg>
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CLINICAL ENGINES ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Futuristic hospital corridor background — spans both Cancer & Chiropractic rows */}
        <div className="absolute inset-0 pointer-events-none parallax-bg" style={{
          backgroundImage: `url(https://thumbs.dreamstime.com/b/futuristic-hospital-corridor-advanced-medical-technology-futuristic-hospital-corridor-advanced-medical-technology-376080883.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
        {/* Light sky blue overlay — clean hospital feel, image still visible */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(224,242,254,0.92) 0%, rgba(240,249,255,0.88) 40%, rgba(224,242,254,0.92) 100%)' }} />
        {/* Soft sky blue accent glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-300/[0.12] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-200/[0.1] rounded-full blur-[100px] pointer-events-none" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(14,116,144,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,116,144,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 border border-sky-300/30 rounded-[50%_50%_0_0] rotate-45 animate-spin-slow" style={{ animationDuration: '20s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-200/40 rounded-full animate-bounce-slow" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-30 left-20 w-32 h-1 border-t-2 border-sky-300/30 animate-shimmer" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-15 right-15 w-20 h-20 border border-blue-200/30 rounded-[30%_70%_70%_30/30%_30%_70%_70%] animate-blob" style={{ animationDuration: '15s' }} />

        <div className="relative max-w-7xl mx-auto space-y-24">
          {/* Row A — Cancer Diagnosis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6 relative group">
              <div className="absolute -inset-8 bg-gradient-to-br from-sky-300/[0.15] via-transparent to-blue-200/[0.1] rounded-[3rem] pointer-events-none group-hover:from-sky-300/[0.25] group-hover:to-blue-300/[0.15] transition-all duration-700" />
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-sky-200/60 shadow-2xl shadow-sky-200/40 group-hover:shadow-[0_30px_80px_-10px_rgba(14,116,144,0.12)] transition-all duration-700">
                <img
                  src="https://www.dermengine.com/hs-fs/hubfs/Visual%20Search%20on%20DermEngine%20with%20cross-platform%20compatibility%20on%20iMac.png?width=600&name=Visual%20Search%20on%20DermEngine%20with%20cross-platform%20compatibility%20on%20iMac.png"
                  alt="DermEngine AI Visual Search analyzing skin lesions for cancer diagnosis"
                  className="w-full h-80 lg:h-96 object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent" />
                {/* Floating badges on image */}
                <div className="absolute top-6 left-6 glass-card rounded-2xl px-4 py-3 shadow-xl shadow-sky-200/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Engine</p>
                    <p className="text-sm font-bold text-[#0a1e4d]">DermEngine Visual Search</p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 glass-card rounded-2xl px-4 py-3 shadow-xl shadow-sky-200/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lesions</p>
                    <p className="text-sm font-bold text-[#0a1e4d]">10,000+ Compared</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl px-5 py-4 shadow-xl shadow-sky-200/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform</p>
                      <p className="text-sm font-bold text-[#0a1e4d]">Cross-Platform (Web + Mobile)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Accuracy</p>
                    <p className="text-sm font-bold text-[#0a1e4d]">95.1%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200/60 px-5 py-2.5 rounded-full">
                  <Brain className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-700">Dermatology AI</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0a1e4d] tracking-tight leading-tight">
                  Skin Cancer Detection Engine
                </h3>
              </div>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                AI-powered dermatology software that compares dermoscopic images against thousands of pathologically identified skin lesions, supporting dermatologists with intelligent visual search and full-body imaging for early cancer detection.
              </p>
              
              {/* Feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Cpu, title: 'Visual Search AI', desc: 'Content-based image retrieval across 10,000+ classified lesions', metric: '95.1% AUC' },
                  { icon: Database, title: 'Full-Body Imaging', desc: '3D body mapping with automated mole tracking', metric: '3D FBI' },
                  { icon: Zap, title: 'Real-time Comparison', desc: 'Instant dermoscopic image matching on any device', metric: '<2s Match' },
                  { icon: ShieldCheck, title: 'Clinical Integration', desc: 'Cross-platform EMR compatible workflows', metric: 'FDA Aligned' },
                ].map((item, i) => (
                  <div key={i} className="group/feature relative p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-sky-200/50 hover:border-sky-400/40 hover:shadow-xl hover:shadow-sky-300/20 transition-all duration-500 cursor-default">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent opacity-0 group-hover/feature:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    <div className="relative flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center group-hover/feature:from-sky-200 group-hover/feature:to-blue-200 transition-all duration-500">
                        <item.icon className="w-5 h-5 text-sky-600" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-bold text-[#0a1e4d] group-hover/feature:text-sky-700 transition-colors duration-300">{item.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                        <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-100 px-2.5 py-1 rounded-full">{item.metric}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row B — Chiropractic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Content Column */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/60 px-5 py-2.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Recovery Platform</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0a1e4d] tracking-tight leading-tight">
                  Chiropractic Recovery & Wellness Platform
                </h3>
              </div>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                Transform posture analysis and motion capture into automated chiropractic treatment plans. Our platform maps physical adjustments and muscle stress loads to recommend personalized therapy cycles with measurable outcomes.
              </p>
              
              {/* Feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Zap, title: 'Biomechanical Modeling', desc: 'Real-time skeletal load calculations', metric: '6DOF tracking' },
                  { icon: Globe, title: 'Sensor Fusion', desc: 'Wireless IMU + pressure mat integration', metric: '12+ sensors' },
                  { icon: TrendingUp, title: 'Progress Analytics', desc: 'ROM, symmetry, pain score tracking', metric: 'Weekly reports' },
                  { icon: Heart, title: 'Patient Engagement', desc: 'Gamified home exercise compliance', metric: '89% adherence' },
                ].map((item, i) => (
                  <div key={i} className="group/feature relative p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-200/50 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-300/20 transition-all duration-500 cursor-default">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover/feature:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    <div className="relative flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover/feature:from-blue-200 group-hover/feature:to-indigo-200 transition-all duration-500">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="relative flex-1 pt-1">
                        <h4 className="font-bold text-[#0a1e4d] group-hover/feature:text-blue-700 transition-colors duration-300">{item.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                        <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">{item.metric}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6 relative order-1 lg:order-2 group">
              <div className="absolute -inset-8 bg-gradient-to-bl from-blue-300/[0.12] via-transparent to-indigo-200/[0.08] rounded-[3rem] pointer-events-none group-hover:from-blue-300/[0.2] transition-all duration-700" />
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-blue-200/60 shadow-2xl shadow-blue-200/40 group-hover:shadow-[0_30px_80px_-10px_rgba(59,130,246,0.12)] transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80"
                  alt="Chiropractic Recovery AI Platform Dashboard"
                  className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent" />
                {/* Floating badges on image */}
                <div className="absolute top-6 left-6 glass-card rounded-2xl px-4 py-3 shadow-xl shadow-blue-200/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Motion AI</p>
                    <p className="text-sm font-bold text-[#0a1e4d]">Real-time 6DOF</p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 glass-card rounded-2xl px-4 py-3 shadow-xl shadow-blue-200/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Adherence</p>
                    <p className="text-sm font-bold text-[#0a1e4d]">89%</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl px-5 py-4 shadow-xl shadow-blue-200/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compliance</p>
                      <p className="text-sm font-bold text-[#0a1e4d]">HIPAA / CE Marked</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Latency</p>
                    <p className="text-sm font-bold text-[#0a1e4d]">{"<"}30ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SALESFORCE BANNER ── */}
      <section id="contact-cta" className="py-20 px-6">
        <div className="max-w-6xl mx-auto relative group">
          {/* Outer glow */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#009966]/20 via-emerald-400/10 to-[#009966]/20 rounded-[2.8rem] blur-2xl opacity-60 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 pointer-events-none" />
          {/* Main card */}
          <div className="relative rounded-[2rem] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1e4d 0%, #0d2847 30%, #0f2d52 60%, #0a1e4d 100%)' }}>
            {/* Inner decorative layers */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#009966]/[0.08] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/[0.05] rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#009966]/[0.04] rounded-full blur-[120px] pointer-events-none" />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009966]/30 to-transparent" />
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#009966]/15 to-transparent" />

            {/* Content */}
            <div className="relative z-10 px-8 py-14 md:px-14 md:py-16 text-center space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#009966]/10 border border-[#009966]/15 px-4 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#009966]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#009966]">Salesforce Healthcare</span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-white/90 leading-relaxed max-w-2xl mx-auto">
                When rightly implemented, Salesforce can boost your clinical operations revenue by more than{' '}
                <span className="relative inline-block">
                  <span className="text-[#009966] font-extrabold text-3xl md:text-4xl">20%</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#009966] to-emerald-400 rounded-full" />
                </span>.
              </p>
              <p className="text-sm text-white/35 leading-relaxed max-w-lg mx-auto">
                Trusted by 200+ hospitals worldwide. HIPAA-compliant CRM solutions tailored for healthcare.
              </p>
              {/* CTA */}
              <div className="pt-2">
                <a
                  href="/contact"
                  className="group/btn2 relative inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[#009966]/20 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-500 whitespace-nowrap"
                >
                  <span>Talk to Expert</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn2:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenChat={() => {}} />
    </div>
  );
}
