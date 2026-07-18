import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function Hero() {
  const iframeWrapRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const el = iframeWrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setIframeSrc('https://my.spline.design/r4xbot-ul91Se2jXuN6d0TaFATE2D9x/');
        obs.disconnect();
      }
    }, { rootMargin: '400px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden" style={{
      backgroundImage: 'url(/hero-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Premium semi-transparent overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.25) 45%, rgba(240,253,250,0.45) 100%)'
      }} />
      {/* Soft ambient gradient across left content area */}
      <div className="absolute inset-y-0 left-0 w-3/5 pointer-events-none opacity-60" style={{
        background: 'radial-gradient(ellipse 100% 80% at -5% 45%, rgba(20,184,166,0.04) 0%, transparent 65%), radial-gradient(ellipse 70% 60% at 35% 70%, rgba(103,232,249,0.025) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 20% 25%, rgba(167,243,208,0.02) 0%, transparent 45%)'
      }} />
      {/* Ambient floating blobs */}
      <div className="hero-blob hero-blob-1 pointer-events-none" />
      <div className="hero-blob hero-blob-2 pointer-events-none" />
      <div className="hero-blob hero-blob-3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full text-teal-700 text-sm font-semibold w-fit"
          >
            <Sparkles className="w-4 h-4 text-teal-500 animate-pulse" />
            <span>Next-Generation Intelligent Systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0A1E4D] font-sans leading-[1.15]"
          >
            Building <br />
            <span className="text-[#009966]">Intelligent Solutions</span> <br />
            for a Smarter Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#4B5563] max-w-xl font-normal leading-[1.7] tracking-[0.01em]"
          >
            We help businesses and organizations accelerate digital transformation through AI, cloud technologies, intelligent automation, and enterprise software solutions designed for scalability, security, and long-term growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
          >
            <Link
              to="/contact"
              className="flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-0.5 text-base text-center"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Core Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-slate-100"
          >
            <div className="flex items-center space-x-2 text-slate-500 text-sm">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Ultra-Fast Execution</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500 text-sm">
              <Shield className="w-4 h-4 text-teal-500" />
              <span>Secure Architecture</span>
            </div>
          </motion.div>
        </div>

        {/* Right – Hero Visual (Spline 3D) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="lg:col-span-5 w-full h-[300px] sm:h-[400px] lg:h-[700px] relative"
        >
          <div ref={iframeWrapRef} className="spline-hero-wrapper w-full h-full rounded-[2rem] overflow-hidden bg-transparent border border-teal-100 shadow-2xl shadow-teal-500/10">
            {iframeSrc && (
              <iframe
                src={iframeSrc}
                width="100%"
                height="100%"
                allow="autoplay"
                title="R4X Bot 3D"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  border: 'none',
                  background: 'transparent',
                  contain: 'layout style paint',
                }}
              />
            )}
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute -top-4 right-2 sm:-right-4 glass p-3 rounded-xl shadow-lg flex items-center space-x-2 z-20"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-bold">AI</div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Consultant</p>
              <p className="text-xs font-bold text-slate-800">Online & Ready</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-2 left-2 sm:-left-8 glass p-3 rounded-xl shadow-lg flex items-center space-x-2 z-20"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">99%</div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Performance</p>
              <p className="text-xs font-bold text-slate-800">Optimized Ops</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
