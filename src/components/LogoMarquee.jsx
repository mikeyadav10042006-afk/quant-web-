import aai from '../assets/logos/aai.jpg';
import enco from '../assets/logos/enco.png';
import paras from '../assets/logos/paras.webp';
import beetlelabs from '../assets/logos/beetlelabs.webp';
import vnl from '../assets/logos/vnl.jpg';
import hitech from '../assets/logos/hitech.png';
import salesforce from '../assets/logos/salesforce.png';
import wijungle from '../assets/logos/wijungle.png';
import alankit from '../assets/logos/alankit.png';
import spectranet from '../assets/logos/spectranet.png';

const brands = [
  { name: 'Airports Authority of India', src: aai },
  { name: 'ENCO', src: enco },
  { name: 'Paras', src: paras },
  { name: 'BeetleLabs.AI', src: beetlelabs },
  { name: 'VNL', src: vnl },
  { name: 'THE HI-TECH GEARS LTD.', src: hitech },
  { name: 'Salesforce', src: salesforce },
  { name: 'Wi-Jungle', src: wijungle },
  { name: 'Alankit', src: alankit },
  { name: 'Spectranet', src: spectranet },
];

function LogoCard({ brand }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-14 px-4 mx-2 transition-all duration-500 cursor-default select-none group relative">
      <img
        src={brand.src}
        alt={brand.name}
        width="100" height="32" decoding="async"
        className="h-8 w-auto max-w-[100px] object-contain transition-all duration-500 group-hover:scale-125 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        loading="lazy"
      />
      {/* Subtle hover lift background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {/* Hover scale wrapper */}
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

/* ── Four-pointed Star ── */
function Star() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute bottom-6 right-8 opacity-30 pointer-events-none">
      <path d="M10 0L11.2 7.6L18 6L12.4 10L18 14L11.2 12.4L10 20L8.8 12.4L2 14L7.6 10L2 6L8.8 7.6L10 0Z" fill="url(#starGrad)" />
      <defs>
        <linearGradient id="starGrad" x1="2" y1="0" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const duplicated = [...brands, ...brands];

export default function LogoMarquee() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14" style={{ background: '#f8f5fc' }}>

      {/* Background Image — subtle lavender pattern */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: 'url(/partners-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        opacity: 0.25,
      }} />
      {/* Soft white overlay to keep it premium */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(180deg, rgba(248,245,252,0.5) 0%, rgba(255,255,255,0.3) 50%, rgba(248,245,252,0.5) 100%)',
      }} />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Title ── */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-[3rem] tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive", color: '#009966' }}
          >
            Trusted by Industry Leaders
          </h2>
          <div className="mt-3 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        </div>

        {/* ── DYNAMIC ISLAND STYLE PILL ── */}
        <div className="relative" style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.1)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))', zIndex: 10 }}>
          
          {/* Main Pill Container — Transparent Glass Dynamic Island */}
          <div className="relative rounded-[9999px] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: `
                0 8px 32px rgba(0,0,0,0.06),
                0 2px 8px rgba(0,0,0,0.03),
                inset 0 1px 0 rgba(255,255,255,0.8),
                inset 0 -1px 0 rgba(0,0,0,0.02),
                0 0 0 1px rgba(255,255,255,0.3)
              `.replace(/\s+/g, ' '),
              minHeight: '110px',
            }}
          >
            {/* Inner ambient edge glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.2] via-transparent to-white/[0.2] pointer-events-none" />
            {/* Top highlight */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
            
            {/* ── Marquee ── */}
            <div className="relative group/marquee px-6 md:px-10 py-5">
              {/* Left fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-14 md:w-20 bg-gradient-to-r from-white/60 via-white/30 to-transparent z-10" />
              {/* Right fade */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-14 md:w-20 bg-gradient-to-l from-white/60 via-white/30 to-transparent z-10" />

              <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
                {duplicated.map((brand, i) => (
                  <LogoCard key={`${brand.name}-${i}`} brand={brand} />
                ))}
              </div>
            </div>
          </div>

          {/* Subtle floor reflection */}
          <div
            className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-8 rounded-[9999px] pointer-events-none opacity-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
              filter: 'blur(12px)',
              transform: 'scaleY(-1) translateY(8px)',
              transformOrigin: 'top center',
            }}
          />
        </div>

        {/* ── Star detail ── */}
        <Star />
      </div>

      {/* ── REFLECTIVE FLOOR ── */}
      <div className="relative mt-6 h-12 md:h-16 overflow-hidden">
        <div className="absolute inset-0 flex items-start pt-2 opacity-[0.03] scale-y-[-1]">
          <div className="flex w-max animate-marquee-slow">
            {duplicated.map((brand, i) => (
              <div key={`ref-${i}`} className="flex-shrink-0 h-10 px-4 mx-2 rounded-full bg-slate-200/30" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}