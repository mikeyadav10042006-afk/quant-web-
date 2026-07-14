import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle } from 'lucide-react';

export default function Features() {
  const [activeTab, setActiveTab] = useState('clinical');

  const benefits = [
    {
      id: 'clinical',
      title: 'Clinical Operations',
      tagline: 'Streamline Patient Care & Smart Automated Records',
      points: [
        '100% Secure & HIPAA-compliant data management',
        'Instant access to digital medical history and patient records',
        'AI-generated clinical summaries to save doctors\' time',
        'Smart appointment scheduling to minimize patient waiting time'
      ]
    },
    {
      id: 'financial',
      title: 'Financial Analysis',
      tagline: 'Optimize revenue cycles and billing processes',
      points: [
        'AI-driven claims denial prediction and resolution',
        'Automated medical coding audits with high accuracy',
        'Real-time cost efficiency analysis across departments',
        'Predictive budgeting models for clinical supplies'
      ]
    }
  ];

  const currentTab = benefits.find(b => b.id === activeTab);

  return (
    <section id="features" className="py-12 md:py-24 mt-6 md:mt-12 border-b border-slate-100" style={{ backgroundColor: 'rgba(0, 153, 102, 0.03)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            Core Competence
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
            Empowering Industries with AI-Driven Digital Transformation
          </h2>
          <p className="text-slate-500 font-normal">
            Quantionic bridges advanced deep learning architecture with day-to-day enterprise processes.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 md:mb-12">
          {benefits.map(b => (
            <button
              key={b.id}
              onClick={() => setActiveTab(b.id)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 text-sm ${
                activeTab === b.id
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {b.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Detail Bullet Points */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">{currentTab.title} Focus</span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">{currentTab.tagline}</h3>
            </div>

            <div className="space-y-4">
              {currentTab.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <span className="text-base text-slate-600 leading-relaxed font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 text-left overflow-hidden relative"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 mb-4 gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">quantionic-hub://dashboard</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-teal-500/10 text-teal-400 rounded-md border border-teal-500/20">
                  Live Monitoring
                </span>
              </div>

              {/* Body */}
              <div className="space-y-4">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Operational Efficiency</p>
                    <p className="text-2xl font-extrabold text-teal-400 mt-1">94.8%</p>
                    <span className="text-[9px] text-emerald-400 font-bold">+12% from last month</span>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">CARE EFFICIENCY</p>
                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">-42m</p>
                    <span className="text-[9px] text-teal-400 font-bold">Optimized queue routing</span>
                  </div>
                </div>

                {/* Graph mockup representation */}
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Intelligent Workload Distribution</span>
                    <Activity className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="h-28 flex items-end justify-between space-x-2 pt-2">
                    {[35, 55, 75, 45, 90, 60, 85, 40, 70, 95].map((val, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                        className={`w-full rounded-t-sm ${
                          index === 4 || index === 9 ? 'bg-teal-500' : 'bg-slate-700 hover:bg-teal-400 transition-colors'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-500 font-bold">
                    <span>08:00 AM</span>
                    <span>12:00 PM</span>
                    <span>04:00 PM</span>
                    <span>08:00 PM</span>
                  </div>
                </div>

                {/* Live Operations Feed */}
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    <span className="text-slate-300 font-medium">Gemini model clinical summary ready</span>
                  </div>
                  <span className="text-slate-500 font-semibold font-mono">0.08s</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
