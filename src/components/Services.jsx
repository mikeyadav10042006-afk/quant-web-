import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Landmark, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Services() {
  const offerings = [
    {
      icon: <HeartPulse className="w-8 h-8 text-teal-600" />,
      title: 'Healthcare AI',
      desc: 'Deploy custom models for clinical operations, diagnostics routing, and HIPAA-compliant patient workflow automations.',
      points: ['Diagnostics support systems', 'Multi-modal EHR processing', 'Clinical shift models'],
      link: '/healthcare-ai'
    },
    {
      icon: <Landmark className="w-8 h-8 text-emerald-600" />,
      title: 'Smart City Solutions',
      desc: 'Leverage AI-driven frameworks to optimize urban infrastructure, manage traffic congestion, reduce energy waste, and streamline public safety systems.',
      points: ['Intelligent traffic routing', 'Smart grid energy optimization', 'AI-powered public safety'],
      link: '/smart-city'
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-teal-700" />,
      title: 'Go-To-Market',
      desc: 'We help you launch and scale your technology in new markets through localization, channel enablement, and strategic outreach.',
      points: ['Market localization strategies', 'Channel partner enablement', 'Strategic outreach scaling'],
      link: '/salesforce-checklist'
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,153,102,0.15),_0_0_15px_rgba(0,153,102,0.1)] transition-all duration-500 ease-out flex flex-col text-left group hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-teal-50 transition-colors duration-200">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
                {service.desc}
              </p>

              <hr className="border-slate-50 mb-6" />

              <ul className="space-y-3 mb-8 flex-1">
                {service.points.map((pt, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                <a
                  href="#contact"
                  className="flex items-center space-x-2 text-sm font-bold text-teal-600 group-hover:text-teal-700 transition-colors"
                >
                  <span>Request Case Study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                {service.link ? (
                  <Link
                    to={service.link}
                    className="block w-full text-center rounded-xl border-2 border-[#059669] bg-transparent text-[#059669] text-sm font-bold px-6 py-3 transition-all duration-300 ease-out hover:bg-[#059669] hover:text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(5,150,105,0.6)]"
                  >
                    Know More
                  </Link>
                ) : (
                  <a
                    href="#contact"
                    className="block w-full text-center rounded-xl border-2 border-[#059669] bg-transparent text-[#059669] text-sm font-bold px-6 py-3 transition-all duration-300 ease-out hover:bg-[#059669] hover:text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(5,150,105,0.6)]"
                  >
                    Know More
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
