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
      gradient: 'linear-gradient(160deg, #0d3d38 0%, #0a5c4f 40%, #10b981 100%)',
    },
    {
      icon: <Landmark className="w-7 h-7 text-white" />,
      title: 'Smart City Solutions',
      desc: 'AI frameworks to optimize urban infrastructure, traffic, energy, and public safety.',
      points: ['Intelligent traffic routing', 'Smart grid energy optimization'],
      link: '/smart-city',
      gradient: 'linear-gradient(160deg, #0c2d48 0%, #134e6f 40%, #0ea5e9 100%)',
    },
    {
      icon: <ShoppingBag className="w-7 h-7 text-white" />,
      title: 'Go-To-Market',
      desc: 'Launch and scale your technology through localization, enablement, and outreach.',
      points: ['Market localization strategies', 'Channel partner enablement'],
      link: '/salesforce-checklist',
      gradient: 'linear-gradient(160deg, #1a1a2e 0%, #2d3561 40%, #7c3aed 100%)',
    }
  ];

  return (
    <section id="services" className="py-14 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
            Start Your Digital Transformation Journey
          </h2>
          <p className="text-slate-500 font-normal">
            Bespoke engineering solutions engineered for maximum performance, compliance, and enterprise scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 justify-items-center">
          {offerings.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="phone-mockup group cursor-pointer"
            >
              <Link to={service.link} className="block">
                <div className="phone-frame">
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
          ))}
        </div>
      </div>
    </section>
  );
}
