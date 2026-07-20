import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
const cardFlipTransition = {
  rest: { rotateY: 0, boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)', borderColor: 'rgba(226, 232, 240, 0.6)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  hover: { rotateY: 720, boxShadow: '0 25px 60px -12px rgba(0,153,102,0.18)', borderColor: 'rgba(0,153,102,0.25)', transition: { duration: 1.4, ease: [0.22, 0.03, 0.26, 1] } }
};
const contentVariants = {
  rest: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, x: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  enter: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }
};
const environmentVariants = {
  rest: { opacity: 0, scale: 1.1, x: 20, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  enter: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }
};

function getEnvironmentClass(theme) {
  const classes = {
    'ai-command-center': 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900',
    'ml-lab': 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900',
    'cloud-infrastructure': 'bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900',
    'cyber-security': 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900',
    'innovation-lab': 'bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900'
  };
  return classes[theme] || classes['ai-command-center'];
}

function getEnvironmentContent(theme) {
  const environments = {
    'ai-command-center': (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Premium gradient background with depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950/30 to-slate-900/50" />

        {/* Sophisticated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Volumetric lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/20 blur-3xl" />

        {/* Premium glassmorphism panels */}
        <div className="absolute top-6 left-6 w-28 h-36 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-400/30 rounded-xl shadow-2xl shadow-blue-500/20">
          <div className="p-3 space-y-2">
            <div className="h-2 w-full bg-blue-400/40 rounded" />
            <div className="h-2 w-3/4 bg-blue-400/30 rounded" />
            <div className="h-2 w-1/2 bg-blue-400/20 rounded" />
            <div className="mt-4 h-16 w-full bg-blue-500/10 rounded-lg border border-blue-400/20" />
          </div>
        </div>

        <div className="absolute top-10 right-8 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20" />

        <div className="absolute bottom-16 left-10 w-32 h-28 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 backdrop-blur-xl border border-indigo-400/30 rounded-xl shadow-2xl shadow-indigo-500/20">
          <div className="p-3 space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <div className="text-[8px] text-green-400 font-mono">ACTIVE</div>
            </div>
            <div className="h-1 w-full bg-indigo-400/30 rounded" />
            <div className="h-1 w-2/3 bg-indigo-400/20 rounded" />
          </div>
        </div>

        {/* Central neural network visualization with depth */}
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 border-2 border-blue-400/50 rounded-full animate-pulse shadow-lg shadow-blue-500/30" />
          <div className="absolute inset-6 border border-blue-300/40 rounded-full" />
          <div className="absolute inset-12 border border-blue-200/30 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-2xl shadow-blue-400/60" />
          </div>
          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-300/60 rounded-full" />
          </div>
        </div>

        {/* Premium data streams */}
        <div className="absolute bottom-6 right-6 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full" />
            <div className="text-[8px] text-blue-400 font-mono">98.2%</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-500/60 to-transparent rounded-full" />
            <div className="text-[8px] text-cyan-400 font-mono">OPTIMAL</div>
          </div>
        </div>
      </div>
    ),
    'ml-lab': (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-slate-950/30 to-slate-900/50" />

        {/* Neural network visualization background */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)'
          }} />
        </div>

        {/* Volumetric lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/20 blur-3xl" />

        {/* Premium data visualization panels */}
        <div className="absolute top-6 left-6 w-24 h-32 bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-xl border border-purple-400/30 rounded-xl shadow-2xl shadow-purple-500/20">
          <div className="p-3 space-y-2">
            <div className="h-2 w-full bg-purple-400/40 rounded" />
            <div className="h-2 w-3/4 bg-purple-400/30 rounded" />
            <div className="h-2 w-1/2 bg-purple-400/20 rounded" />
            <div className="mt-4 h-12 w-full bg-purple-500/10 rounded-lg border border-purple-400/20" />
          </div>
        </div>

        <div className="absolute top-12 right-8 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-400/30 rounded-xl shadow-2xl shadow-blue-500/20" />

        {/* Central ML model visualization with depth */}
        <div className="relative w-44 h-44">
          <div className="absolute inset-0 border-2 border-purple-400/50 rounded-lg transform rotate-45 shadow-lg shadow-purple-500/30" />
          <div className="absolute inset-3 border border-purple-300/40 rounded-lg" />
          <div className="absolute inset-6 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-lg backdrop-blur-xl border border-purple-400/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-purple-300 text-[10px] font-mono font-bold">ML MODEL</div>
              <div className="text-purple-400/80 text-[8px] font-mono mt-1">v2.4.1</div>
            </div>
          </div>
        </div>

        {/* Training metrics with premium styling */}
        <div className="absolute bottom-6 left-6 space-y-2">
          <div className="flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-purple-400/20">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
            <div className="text-[9px] text-green-400 font-mono font-bold">98.7%</div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-blue-400/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
            <div className="text-[9px] text-blue-400 font-mono font-bold">TRAINING</div>
          </div>
        </div>
      </div>
    ),
    'cloud-infrastructure': (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-slate-950/30 to-slate-900/50" />

        {/* Network topology background */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Volumetric lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-cyan-500/20 blur-3xl" />

        {/* Premium server nodes */}
        <div className="absolute top-8 left-8 w-14 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20">
          <div className="p-2 space-y-1">
            <div className="h-1 w-full bg-cyan-400/40 rounded" />
            <div className="h-1 w-2/3 bg-cyan-400/30 rounded" />
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <div className="text-[6px] text-green-400 font-mono">ON</div>
            </div>
          </div>
        </div>

        <div className="absolute top-8 right-8 w-14 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20" />

        <div className="absolute bottom-8 left-12 w-14 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20" />

        <div className="absolute bottom-8 right-12 w-14 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20" />

        {/* Central cloud dashboard with depth */}
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full shadow-lg shadow-cyan-500/30" />
          <div className="absolute inset-6 border border-cyan-300/40 rounded-full" />
          <div className="absolute inset-12 bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 rounded-full backdrop-blur-xl border border-cyan-400/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-cyan-300 text-[10px] font-mono font-bold">CLOUD</div>
              <div className="text-cyan-400/80 text-[8px] font-mono mt-1">GLOBAL</div>
            </div>
          </div>
        </div>

        {/* Premium connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <line x1="20%" y1="25%" x2="50%" y2="50%" stroke="cyan" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="cyan" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="cyan" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="cyan" strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
      </div>
    ),
    'cyber-security': (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-slate-950/30 to-slate-900/50" />

        {/* Security grid background */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Volumetric lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-32 bg-emerald-500/20 blur-3xl" />

        {/* Premium security shield elements */}
        <div className="absolute top-6 left-6 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-xl border border-emerald-400/30 rounded-xl shadow-2xl shadow-emerald-500/20 flex items-center justify-center">
          <div className="text-emerald-400 text-3xl">🛡️</div>
        </div>

        <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-xl border border-emerald-400/30 rounded-xl shadow-2xl shadow-emerald-500/20 flex items-center justify-center">
          <div className="text-emerald-400 text-3xl">🔒</div>
        </div>

        {/* Central security hub with depth */}
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 border-2 border-emerald-400/50 rounded-lg shadow-lg shadow-emerald-500/30" />
          <div className="absolute inset-3 border border-emerald-300/40 rounded-lg" />
          <div className="absolute inset-6 bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 rounded-lg backdrop-blur-xl border border-emerald-400/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-emerald-300 text-[10px] font-mono font-bold">SECURE</div>
              <div className="text-emerald-400/80 text-[8px] font-mono mt-1">ENCRYPTED</div>
            </div>
          </div>
        </div>

        {/* Premium threat indicators */}
        <div className="absolute bottom-6 left-6 space-y-2">
          <div className="flex items-center space-x-2 bg-emerald-500/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-emerald-400/20">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
            <div className="text-[9px] text-green-400 font-mono font-bold">PROTECTED</div>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-emerald-400/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
            <div className="text-[9px] text-emerald-400 font-mono font-bold">256-BIT</div>
          </div>
        </div>
      </div>
    ),
    'innovation-lab': (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-slate-950/30 to-slate-900/50" />

        {/* Innovation grid background */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Volumetric lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-amber-500/20 blur-3xl" />

        {/* Premium innovation panels */}
        <div className="absolute top-6 left-6 w-24 h-32 bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-xl border border-amber-400/30 rounded-xl shadow-2xl shadow-amber-500/20">
          <div className="p-3 space-y-2">
            <div className="h-2 w-full bg-amber-400/40 rounded" />
            <div className="h-2 w-3/4 bg-amber-400/30 rounded" />
            <div className="h-2 w-1/2 bg-amber-400/20 rounded" />
            <div className="mt-4 h-12 w-full bg-amber-500/10 rounded-lg border border-amber-400/20" />
          </div>
        </div>

        <div className="absolute top-10 right-8 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-xl border border-orange-400/30 rounded-xl shadow-2xl shadow-orange-500/20" />

        {/* Central innovation hub with depth */}
        <div className="relative w-44 h-44">
          <div className="absolute inset-0 border-2 border-amber-400/50 rounded-lg shadow-lg shadow-amber-500/30" />
          <div className="absolute inset-3 border border-amber-300/40 rounded-lg" />
          <div className="absolute inset-6 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-lg backdrop-blur-xl border border-amber-400/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-amber-300 text-[10px] font-mono font-bold">INNOVATION</div>
              <div className="text-amber-400/80 text-[8px] font-mono mt-1">LAB</div>
            </div>
          </div>
        </div>

        {/* Premium innovation metrics */}
        <div className="absolute bottom-6 left-6 space-y-2">
          <div className="flex items-center space-x-2 bg-amber-500/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-amber-400/20">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
            <div className="text-[9px] text-green-400 font-mono font-bold">ACTIVE</div>
          </div>
          <div className="flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-orange-400/20">
            <div className="w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50" />
            <div className="text-[9px] text-orange-400 font-mono font-bold">R&D</div>
          </div>
        </div>
      </div>
    )
  };
  return environments[theme] || environments['ai-command-center'];
}

function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false);
  const environmentContent = useMemo(() => getEnvironmentContent(member.aiTheme), [member.aiTheme]);

  return (
    <motion.div variants={cardVariants} className="group w-full flex justify-center">
      <motion.div
        className="expert-card relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] p-5 flex flex-col items-center text-center max-w-[240px] w-full hover:shadow-[0_25px_60px_-12px_rgba(0,153,102,0.18)] hover:border-[#009966]/25 transition-shadow duration-500"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Flip Image Container */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl" style={{ perspective: '800px' }}>
          <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: hovered ? 900 : 0 }}
            transition={{ duration: 1.4, ease: [0.22, 0.03, 0.26, 1] }}
          >
            {/* Front - Portrait */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-200/50 shadow-inner" style={{ backfaceVisibility: 'hidden' }}>
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Back - Environment */}
            <div className={`absolute inset-0 rounded-2xl overflow-hidden border border-slate-200/50 shadow-inner ${getEnvironmentClass(member.aiTheme)}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              {environmentContent}
            </div>
          </motion.div>
        </div>

        {/* Card Content - stays in place */}
        <div className="space-y-2 mt-4">
          <h4 className="font-bold text-[15px] text-[#0A1E4D] leading-snug">{member.name}</h4>
          <p className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">{member.title}</p>
          <span className="inline-flex items-center px-3 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r from-[#009966]/10 to-emerald-50 text-[#009966] border border-[#009966]/15 shadow-sm">
            {member.badge}
          </span>
        </div>

        {/* Premium bottom accent line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#009966]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const splineWrapRef = useRef(null);
  const [splineSrc, setSplineSrc] = useState('');

  useEffect(() => {
    const el = splineWrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSplineSrc('https://prod.spline.design/O1k9pmjMQ1xsm2TZ/scene.splinecode');
        obs.disconnect();
      }
    }, { rootMargin: '400px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const features = [
    {
      icon: '🧠',
      title: 'AI & Machine Learning Experts',
      description: 'Designing intelligent models that power tomorrow\u2019s solutions.'
    },
    {
      icon: '☁️',
      title: 'Cloud & Infrastructure Specialists',
      description: 'Building secure, scalable architectures for enterprise workloads.'
    },
    {
      icon: '🚀',
      title: 'Innovation\u2011Driven Engineering',
      description: 'Turning bold ideas into production\u2011ready AI products.'
    }
  ];

  const members = [
    {
      name: 'Arun Kumar',
      title: 'Senior AI Architect',
      img: '/assets/team/expert1.jpg',
      badge: '🧠 AI Strategy',
      aiTheme: 'ai-command-center'
    },
    {
      name: 'Priya Singh',
      title: 'AI Research Engineer',
      img: '/assets/team/expert2.jpg',
      badge: '🤖 Machine Learning',
      aiTheme: 'cyber-security'
    },
    {
      name: 'Rahul Mehta',
      title: 'Product Strategy Lead',
      img: '/assets/team/expert3.jpg',
      badge: '☁️ Cloud Architecture',
      aiTheme: 'cloud-infrastructure'
    },
    {
      name: 'Anjali Patel',
      title: 'Cloud Integration Specialist',
      img: '/assets/team/expert4.jpg',
      badge: '🔒 AI Security',
      aiTheme: 'innovation-lab'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="team" className="relative py-14 md:py-24 overflow-hidden" style={{ backgroundColor: '#f1f5f9', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M0 20L20 0M20 40L40 20\' stroke=\'%23cbd5e1\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-teal-200/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── TOP: Text + Spline Model ──────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left – Heading, paragraph & feature rows */}
          <motion.div className="space-y-8" variants={leftVariants}>
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#009966] bg-[#009966]/10 px-3 py-1 rounded-full w-fit inline-block">
                MEET OUR EXPERTS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0A1E4D] font-sans">
                Behind Quantionic
              </h2>
            </div>

            <p className="text-[#4B5563] leading-relaxed font-normal">
              Behind every intelligent solution is a team of passionate engineers, AI researchers, architects, and innovators dedicated to building secure, scalable, and enterprise-ready AI solutions.
            </p>

            <div className="space-y-4 pt-2">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="interactive-feature-row flex items-start space-x-4 py-4 px-3 rounded-xl border border-transparent transition-all duration-300 ease-out group"
                >
                  <span className="text-xl bg-slate-50 group-hover:bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm transition-all duration-300 group-hover:scale-110" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0A1E4D] text-base transition-colors duration-300 group-hover:text-[#009966]">{f.title}</h3>
                    <p className="text-sm text-[#4B5563] font-normal mt-0.5 transition-colors duration-300 group-hover:text-slate-800">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Spline 3D Model */}
          <motion.div variants={cardVariants}>
            <div ref={splineWrapRef} className="w-full rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50" style={{ contain: 'layout style paint' }}>
              {splineSrc && (
                <spline-viewer
                  url={splineSrc}
                  loading-anim-type="spinner-big-dark"
                  style={{ width: '100%', height: 'clamp(250px, 50vw, 400px)', background: 'transparent' }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ── BOTTOM: Team Member Cards (4-col compact row) ──────── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {members.map((m, i) => (
            <TeamCard key={i} member={m} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
