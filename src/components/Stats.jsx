import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

export default function Stats() {
  const stats = [
    { value: '99%+', label: 'Satisfaction Rate', desc: 'Across enterprise solutions' },
    { value: '180+', label: 'Projects Completed', desc: 'Delivered with precision' },
    { value: '24/7', label: 'AI Monitoring', desc: 'Secure agent operations' },
  ];

  return (
    <section className="py-12 md:py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Stats Numbers */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col text-left space-y-2 cursor-default overflow-hidden transition-all duration-500 hover:border-[#009966]/30 hover:shadow-[0_8px_40px_rgba(0,153,102,0.15),0_0_20px_rgba(0,153,102,0.08)] hover:-translate-y-1"
            >
              {/* Glow orb on hover */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-[#009966]/20 to-teal-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#009966]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              <span className="relative text-4xl font-extrabold text-teal-600 font-sans tracking-tight group-hover:text-[#009966] transition-colors duration-300">
                {stat.value}
              </span>
              <span className="relative text-base font-bold text-slate-800 group-hover:text-[#0A1E4D] transition-colors duration-300">{stat.label}</span>
              <span className="relative text-xs text-slate-400 font-medium leading-relaxed group-hover:text-slate-500 transition-colors duration-300">{stat.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Customer Testimonial Card */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="perspective-[1000px] group w-full max-w-lg h-[420px] sm:h-[340px]">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
              
              {/* FRONT SIDE (Current Content) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 backface-hidden bg-white p-8 rounded-3xl border border-slate-100 shadow-md text-left overflow-hidden"
              >
                {/* Decorative Quote Icon */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center -z-0 opacity-40">
                  <MessageSquare className="w-10 h-10 text-teal-600/20" />
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-slate-700 font-medium italic leading-relaxed">
                    "Quantionic has completely transformed our workflow. Their bespoke AI integrations solved our operations bottleneck and automated our analysis in less than three weeks. Visualizing patient records via their dashboard is seamless."
                  </blockquote>

                  <hr className="border-slate-100" />

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">
                      DR
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Dr. Alan Ross</h4>
                      <p className="text-xs text-slate-400 font-semibold">Chief of Digital Operations, INO Tech</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* BACK SIDE (New AI Photo Side) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center p-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#009966] mb-4 shadow-sm" 
                  alt="Dr. Alan Ross AI" 
                />
                <h4 className="text-xl font-bold mb-1 text-[#0A1E4D]">Dr. Alan Ross</h4>
                <p className="text-sm font-semibold text-[#4B5563]">Chief of Digital Operations, INO Tech</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
