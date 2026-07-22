import { useState } from 'react';
import { motion } from 'framer-motion';

// ─── Project data ─────────────────────────────────────────────────────────────
// Each card has: front content (icon, category, title, desc, tags, metric)
//               back content  (image URL + alt + label)
const projects = [
  {
    id: 1,
    title: 'Salesforce Smart CRM Integration',
    category: 'Enterprise CRM Sync',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#00A1E0]" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.89 10.45A3.75 3.75 0 0 0 16 9a3.73 3.73 0 0 0-1.12.18A4.2 4.2 0 0 0 11.5 7a4.2 4.2 0 0 0-4.14 3.51A3.21 3.21 0 0 0 5.5 10a3.25 3.25 0 0 0-3.25 3.25A3.25 3.25 0 0 0 5.5 16.5h13a2.75 2.75 0 0 0 2.75-2.75A2.75 2.75 0 0 0 18.89 10.45z" />
      </svg>
    ),
    desc: 'Seamlessly synced customer data systems to automate support workflows, reducing client response times and boosting team efficiency.',
    tags: ['Salesforce API', 'Webhooks', 'Express Node', 'MongoDB'],
    metric: '34% faster resolution',
    backImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    backImgAlt: 'Salesforce CRM dashboard analytics',
    backLabel: 'Salesforce CRM',
    backAccent: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    title: 'ServiceNow Automated Support Operations',
    category: 'IT Service Delivery',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#009966] fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="13" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="7" x2="6.01" y2="7" />
        <line x1="6" y1="17" x2="6.01" y2="17" />
      </svg>
    ),
    desc: 'Built intelligent internal tracking tools that instantly assign tasks and monitor server health without any manual errors.',
    tags: ['ServiceNow Integration', 'Node REST API', 'Event Listener'],
    metric: '99.9% uptime analytics',
    backImg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    backImgAlt: 'Dark server infrastructure monitoring',
    backLabel: 'ServiceNow Ops',
    backAccent: 'from-slate-800 to-teal-700',
  },
  {
    id: 3,
    title: 'Secure Blockchain Data Verification',
    category: 'Web3 & Distributed Ledgers',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#009966] fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    desc: 'Implemented tamper-proof digital ledgers to guarantee absolute data security, transparency, and fraud protection for enterprise records.',
    tags: ['Solidity', 'Ethereum Nodes', 'JSON-RPC Oracles'],
    metric: 'Cryptographically verified',
    backImg: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    backImgAlt: 'Abstract cryptographic blockchain network lattice',
    backLabel: 'Blockchain Ledger',
    backAccent: 'from-purple-700 to-indigo-600',
  },
  {
    id: 4,
    title: 'AI-Powered Smart Data Summaries',
    category: 'Natural Language AI',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#009966] fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    desc: 'Developed advanced AI layers that instantly process messy business documents into clean, organized dashboard summaries for fast decision making.',
    tags: ['Gemini API', 'Semantic Search', 'Vector Embeddings'],
    metric: 'Summaries within 150ms',
    backImg: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    backImgAlt: 'High-tech AI data visualization neural network',
    backLabel: 'AI Summaries',
    backAccent: 'from-emerald-700 to-teal-500',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [flippedId, setFlippedId] = useState(null);
  return (
    <section id="projects" className="relative py-14 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
            Bringing the Change
          </h2>
          <p className="text-slate-500 font-normal">
            A look at the custom integrations and automated systems we have put in place for our clients.
          </p>
        </div>

        {/* ── Project Grid — 3D flip cards ─────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              /* ── Perspective wrapper ─────────────────────────────────────── */
              className={`perspective-[1200px] group w-full h-[350px] sm:h-[320px] cursor-pointer ${flippedId === project.id ? 'flipped' : ''}`}
              onClick={() => setFlippedId(flippedId === project.id ? null : project.id)}
            >
              {/* ── Flip inner — rotates on group hover ───────────────────── */}
              <div className="flip-card-inner relative w-full h-full">

                {/* ════════════════════════════════════════════════════════════
                    FRONT FACE — existing card content
                ════════════════════════════════════════════════════════════ */}
                <div className="absolute inset-0 backface-hidden bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col text-left overflow-hidden">
                  {/* Subtle teal glow on hover hint */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full filter blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

                  {/* Top row: icon + metric pill */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                      {project.icon}
                    </div>
                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                      {project.metric}
                    </span>
                  </div>

                  {/* Category + title */}
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider relative z-10">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-1 mb-3 relative z-10">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed font-medium mb-5 line-clamp-2 relative z-10">
                    {project.desc}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Flip hint */}
                  <p className="absolute bottom-4 right-5 text-[9px] text-slate-300 font-medium tracking-wide select-none">
                    <span className="hidden md:inline">Hover to explore →</span>
                    <span className="md:hidden">Tap to explore →</span>
                  </p>
                </div>

                {/* ════════════════════════════════════════════════════════════
                    BACK FACE — full-bleed cover image
                ════════════════════════════════════════════════════════════ */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-gray-900">
                  {/* Full-bleed cover image */}
                  <img
                    src={project.backImg}
                    alt={project.backImgAlt}
                    width="800" height="350" decoding="async"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Gradient overlay for readability */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.backAccent} opacity-60`} />

                  {/* Label badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {project.category}
                    </span>
                    <h3 className="text-white font-bold text-xl leading-snug drop-shadow-lg">
                      {project.title}
                    </h3>
                    <span className="text-white/80 text-xs font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      {project.metric}
                    </span>
                  </div>
                </div>

              </div>{/* /flip-card-inner */}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
