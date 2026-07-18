import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Landmark, ShoppingBag, ChevronRight } from 'lucide-react';

export default function Services() {
  const offerings = [
    {
      icon: <ShoppingBag className="w-7 h-7" style={{ color: '#8b5e50' }} />,
      title: 'Go-To-Market',
      desc: 'Launch and scale your technology through localization, enablement, and outreach.',
      points: ['Market localization strategies', 'Channel partner enablement'],
      link: '/salesforce-checklist',
      screenBg: '#d4a99a',
      iconBg: '#c49988',
    },
    {
      icon: <HeartPulse className="w-7 h-7" style={{ color: '#4a6741' }} />,
      title: 'Healthcare AI',
      desc: 'AI-powered clinical diagnostics and HIPAA-compliant patient workflow automations.',
      points: ['Diagnostics support systems', 'Multi-modal EHR processing'],
      link: '/healthcare-ai',
      screenBg: '#c8d5be',
      iconBg: '#b8c5ad',
    },
    {
      icon: <Landmark className="w-7 h-7" style={{ color: '#6b5c3e' }} />,
      title: 'Smart City Solutions',
      desc: 'AI frameworks to optimize urban infrastructure, traffic, energy, and public safety.',
      points: ['Intelligent traffic routing', 'Smart grid energy optimization'],
      link: '/smart-city',
      screenBg: '#d9ccb0',
      iconBg: '#c9bb9e',
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
              <div className="phone-status-bar">
                <span className="text-[10px] font-semibold" style={{ color: 'rgba(60,50,40,0.6)' }}>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-2 rounded-sm relative" style={{ border: '1px solid rgba(60,50,40,0.3)' }}>
                    <div className="absolute inset-[1px] rounded-[1px]" style={{ width: '70%', background: 'rgba(60,50,40,0.4)' }} />
                  </div>
                </div>
              </div>

              <div className="phone-content">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: service.iconBg }}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#2c2418' }}>{service.title}</h3>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(60,50,40,0.7)' }}>{service.desc}</p>

                <ul className="space-y-2.5 mb-6">
                  {service.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[12px] font-medium" style={{ color: 'rgba(60,50,40,0.75)' }}>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(60,50,40,0.35)' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-4 text-sm font-semibold group-hover:opacity-90 transition-opacity duration-300" style={{
                    background: 'linear-gradient(135deg, #a08060, #8b6f50)',
                    color: '#fff',
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
      </motion.div>
    );
  };

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #f5f0e8 0%, #f0ebe0 40%, #f5f0e8 100%)',
    }}>
      {/* Subtle warm pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #8b7355 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(160,128,96,0.25) 50%, transparent 100%)',
      }} />

      {/* Ambient warm orbs */}
      <div className="absolute top-1/3 left-1/6 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none" style={{
        background: 'radial-gradient(circle, #d4c4a8 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
      <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none" style={{
        background: 'radial-gradient(circle, #c9b8a0 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full" style={{
            color: '#8b7355',
            background: 'rgba(139,115,85,0.08)',
            border: '1px solid rgba(139,115,85,0.12)',
          }}>
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.15]" style={{ color: '#2c2418' }}>
            Start Your Digital<br />Transformation Journey
          </h2>
          <p className="text-base md:text-lg font-normal max-w-lg mx-auto leading-relaxed" style={{ color: '#8b7355' }}>
            Bespoke engineering solutions engineered for maximum performance, compliance, and enterprise scalability.
          </p>
          {/* Decorative line */}
          <div className="mx-auto w-16 h-0.5 mt-6 rounded-full" style={{
            background: 'linear-gradient(90deg, #a08060, #c49988)',
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
