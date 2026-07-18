import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Landmark, ShoppingBag, ChevronRight } from 'lucide-react';

export default function Services() {
  const offerings = [
    {
      icon: <HeartPulse className="w-7 h-7 text-white" />,
      title: 'Healthcare AI',
      desc: 'AI-powered clinical diagnostics and HIPAA-compliant patient workflow automations.',
      points: ['Diagnostics support systems', 'Multi-modal EHR processing'],
      link: '/healthcare-ai',
      gradient: 'linear-gradient(160deg, #042f2e 0%, #0d9488 50%, #34d399 100%)',
    },
    {
      icon: <Landmark className="w-7 h-7 text-white" />,
      title: 'Smart City Solutions',
      desc: 'AI frameworks to optimize urban infrastructure, traffic, energy, and public safety.',
      points: ['Intelligent traffic routing', 'Smart grid energy optimization'],
      link: '/smart-city',
      gradient: 'linear-gradient(160deg, #0c1a33 0%, #0369a1 50%, #38bdf8 100%)',
    },
    {
      icon: <ShoppingBag className="w-7 h-7 text-white" />,
      title: 'Go-To-Market',
      desc: 'Launch and scale your technology through localization, enablement, and outreach.',
      points: ['Market localization strategies', 'Channel partner enablement'],
      link: '/salesforce-checklist',
      gradient: 'linear-gradient(160deg, #130f26 0%, #6d28d9 50%, #a78bfa 100%)',
    }
  ];

  const renderPhone = (service, index) => {
    const isCenter = index === 1;
    const sizeClass = isCenter ? 'phone-mockup-center' : 'phone-mockup-side';

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className={`${sizeClass} group cursor-pointer`}
      >
        <Link to={service.link} className="block">
          <div className="phone-frame">
            <div className="phone-power-btn" />
            <div className="phone-notch" />
            <div className="phone-screen" style={{ background: service.gradient }}>
              <div className="phone-status-bar">
                <span className="text-[10px] font-semibold text-white/70">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-2 border border-white/50 rounded-sm relative">
                    <div className="absolute inset-[1px] bg-white/70 rounded-[1px]" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>

              <div className="phone-content">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-[13px] text-white/75 leading-relaxed mb-5">{service.desc}</p>

                <ul className="space-y-2.5 mb-6">
                  {service.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[12px] font-medium text-white/85">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="w-full flex items-center justify-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl py-2.5 px-4 text-white text-sm font-semibold group-hover:bg-white/25 transition-colors duration-300">
                    <span>Know More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
            <div className="phone-home-bar" />
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #f8fffe 0%, #f0faf7 40%, #f8fffe 100%)',
    }}>
      {/* Subtle soft pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.25) 50%, transparent 100%)',
      }} />

      {/* Ambient soft orbs */}
      <div className="absolute top-1/3 left-1/6 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none" style={{
        background: 'radial-gradient(circle, #99f6e4 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
      <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none" style={{
        background: 'radial-gradient(circle, #bae6fd 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full" style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(16,185,129,0.04) 100%)',
            color: '#0d9488',
            border: '1px solid rgba(20,184,166,0.12)',
          }}>
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.15] text-slate-900">
            Start Your Digital<br />Transformation Journey
          </h2>
          <p className="text-base md:text-lg font-normal max-w-lg mx-auto leading-relaxed text-slate-500">
            Bespoke engineering solutions engineered for maximum performance, compliance, and enterprise scalability.
          </p>
          {/* Decorative line */}
          <div className="mx-auto w-16 h-0.5 mt-6 rounded-full" style={{
            background: 'linear-gradient(90deg, #14b8a6, #0ea5e9)',
          }} />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-8 md:gap-6 lg:gap-10 pt-4">
          {renderPhone(offerings[0], 0)}
          {renderPhone(offerings[1], 1)}
          {renderPhone(offerings[2], 2)}
        </div>
      </div>
    </section>
  );
}
