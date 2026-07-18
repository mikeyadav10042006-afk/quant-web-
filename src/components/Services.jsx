import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Landmark, ShoppingBag, ChevronRight } from 'lucide-react';

export default function Services() {
  const offerings = [
    {
      icon: <ShoppingBag className="w-7 h-7" style={{ color: '#3b82f6' }} />,
      title: 'Go-To-Market',
      desc: 'Launch and scale your technology through localization, enablement, and outreach.',
      points: ['Market localization strategies', 'Channel partner enablement'],
      link: '/salesforce-checklist',
      screenBg: 'linear-gradient(180deg, #eef4ff 0%, #e0ecff 100%)',
      iconBg: 'rgba(59,130,246,0.12)',
      buttonBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      bgImage: '/phone-bg/gtm.jpg',
      glowColor: 'rgba(59,130,246,0.12)',
    },
    {
      icon: <HeartPulse className="w-7 h-7" style={{ color: '#06b6d4' }} />,
      title: 'Healthcare AI',
      desc: 'AI-powered clinical diagnostics and HIPAA-compliant patient workflow automations.',
      points: ['Diagnostics support systems', 'Multi-modal EHR processing'],
      link: '/healthcare-ai',
      screenBg: 'linear-gradient(180deg, #ecfeff 0%, #e0f7fa 100%)',
      iconBg: 'rgba(6,182,212,0.12)',
      buttonBg: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      bgImage: '/phone-bg/healthcare.jpg',
      glowColor: 'rgba(6,182,212,0.12)',
    },
    {
      icon: <Landmark className="w-7 h-7" style={{ color: '#6366f1' }} />,
      title: 'Smart City Solutions',
      desc: 'AI frameworks to optimize urban infrastructure, traffic, energy, and public safety.',
      points: ['Intelligent traffic routing', 'Smart grid energy optimization'],
      link: '/smart-city',
      screenBg: 'linear-gradient(180deg, #eef2ff 0%, #e0e7ff 100%)',
      iconBg: 'rgba(99,102,241,0.12)',
      buttonBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      bgImage: '/phone-bg/smartcity.jpg',
      glowColor: 'rgba(99,102,241,0.12)',
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
            <div className="phone-screen" style={{ background: service.screenBg }}>
              {/* Background image — subtle, reveals on hover */}
              <div
                className="phone-bg-image"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              {/* Color glow overlay on hover */}
              <div
                className="phone-glow-overlay"
                style={{ background: `radial-gradient(ellipse at 50% 30%, ${service.glowColor} 0%, transparent 60%)` }}
              />
              <div className="phone-status-bar">
                <span className="text-[10px] font-semibold" style={{ color: 'rgba(30,40,60,0.5)' }}>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-2 rounded-sm relative" style={{ border: '1px solid rgba(30,40,60,0.25)' }}>
                    <div className="absolute inset-[1px] rounded-[1px]" style={{ width: '70%', background: 'rgba(30,40,60,0.35)' }} />
                  </div>
                </div>
              </div>

              <div className="phone-content">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: service.iconBg }}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1e293b' }}>{service.title}</h3>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(30,40,60,0.55)' }}>{service.desc}</p>

                <ul className="space-y-2.5 mb-6">
                  {service.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[12px] font-medium" style={{ color: 'rgba(30,40,60,0.6)' }}>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(30,40,60,0.25)' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-4 text-sm font-semibold text-white group-hover:opacity-90 transition-opacity duration-300" style={{
                    background: service.buttonBg,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  }}>
                    <span>Know More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
            <div className="phone-home-bar" />
          </div>
        </Link>
        {/* Glowing Pedestal */}
        <div className="phone-pedestal">
          <div className="phone-pedestal-ring" />
          <div className="phone-pedestal-glow" />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 40%, #f0f4ff 70%, #ffffff 100%)',
    }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 0.5px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      {/* Ambient blue orbs */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none" style={{
        background: 'radial-gradient(circle, #93c5fd 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
      <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{
        background: 'radial-gradient(circle, #67e8f9 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Top light beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 70% at 50% 0%, rgba(255,255,255,0.8) 0%, rgba(240,244,255,0.3) 40%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full" style={{
            color: '#3b82f6',
            background: 'rgba(59,130,246,0.06)',
            border: '1px solid rgba(59,130,246,0.1)',
          }}>
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.15]" style={{ color: '#0f172a' }}>
            Start Your Digital<br />Transformation Journey
          </h2>
          <p className="text-base md:text-lg font-normal max-w-lg mx-auto leading-relaxed" style={{ color: '#64748b' }}>
            Bespoke engineering solutions engineered for maximum performance, compliance, and enterprise scalability.
          </p>
          <div className="mx-auto w-16 h-0.5 mt-6 rounded-full" style={{
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
          }} />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-12 md:gap-8 lg:gap-14 pt-8 pb-4">
          {renderPhone(offerings[0], 0)}
          {renderPhone(offerings[1], 1)}
          {renderPhone(offerings[2], 2)}
        </div>
      </div>
    </section>
  );
}
