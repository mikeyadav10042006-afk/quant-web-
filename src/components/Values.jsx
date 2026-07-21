import { motion } from 'framer-motion';
import { Shield, Cpu, Users, BarChart } from 'lucide-react';

const values = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Absolute Trust & Security',
    desc: 'We build everything with top-tier security standards, making sure your business data remains 100% safe and private.'
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: 'Future-Ready Technology',
    desc: 'We constantly update and use the latest AI advancements so your platform always stays one step ahead of competitors.'
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'True Team Partnership',
    desc: 'We work closely with your internal team as extensions of your business to match your exact speed and launch timelines.'
  },
  {
    icon: <BarChart className="w-5 h-5" />,
    title: 'Result-Driven Solutions',
    desc: 'We focus strictly on building software features that bring real commercial growth, eliminating unnecessary technical fluff.'
  }
];

export default function Values() {
  return (
    <section id="values" className="relative py-14 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Text & Live Rotating 2D canvas Model */}
          <div className="lg:col-span-5 text-left space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#007050] bg-[#009966]/10 px-3 py-1 rounded-full w-fit">
                Core Principles
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
                Implementing Values into Code
              </h2>
              <p className="text-slate-500 font-normal leading-relaxed">
                We do not just compile scripts; we implement solutions that match the high ethical and execution standards of modern enterprises.
              </p>
            </div>

            {/* Code Typing Animation — blended into background */}
            <div className="w-full flex justify-center lg:justify-start pt-4">
              <div className="w-full max-w-[420px] aspect-square relative" style={{ maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%)' }}>
                <video
                  src="/code-typing.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Values Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-50/60 p-6 rounded-2xl border border-slate-100 flex flex-col text-left space-y-4 hover:bg-white hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15),0_0_15px_rgba(6,182,212,0.1)] cursor-default group"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0 group-hover:bg-cyan-100 transition-colors duration-300">
                  {v.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-base">{v.title}</h4>
                  <p className="text-xs text-[#334155] font-medium leading-relaxed mt-2">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
