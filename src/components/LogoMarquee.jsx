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
        className="h-8 w-auto max-w-[100px] object-contain transition-all duration-500 group-hover:scale-125 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        loading="lazy"
      />
      {/* Hover glow ring - green brand color */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 0 3px rgba(0,153,102,0.4), 0 0 24px rgba(0,153,102,0.25), 0 0 48px rgba(168,85,247,0.15)'
        }}
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

/* ── Premium Track Spotlight (Focus 35W Style) - Angled to Center ── */
function TrackSpotlight({ side }) {
  const isLeft = side === 'left';
  return (
    <div className="absolute top-0 pointer-events-none z-10 overflow-hidden"
      style={{ [isLeft ? 'left' : 'right']: '5%', width: '100%', height: '100%' }}
    >
      {/* Track rail */}
      <div className="absolute -top-1" style={{
          [isLeft ? 'left' : 'right']: '-2px', width: '6px', height: '10px',
          background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
          borderRadius: '3px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 6px rgba(0,0,0,0.3)'
        }}
      />
      {/* Track connector */}
      <div className="absolute top-8" style={{
          [isLeft ? 'left' : 'right']: '0', width: '12px', height: '5px',
          background: 'linear-gradient(180deg, #333 0%, #444 50%, #333 100%)',
          borderRadius: '2.5px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.25)'
        }}
      />

      {/* Fixture - premium cylindrical */}
      <div className="absolute top-12" style={{ [isLeft ? 'left' : 'right']: '-4px' }}>
        <div className="relative w-[28px] h-[50px]" style={{
          background: 'linear-gradient(90deg, #0a0a0a 0%, #151515 20%, #222 40%, #2a2a2a 55%, #222 70%, #151515 85%, #0a0a0a 100%)',
          borderRadius: '4px',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.4),
            inset 2px 0 0 rgba(255,255,255,0.06),
            inset -2px 0 0 rgba(0,0,0,0.3),
            0 4px 16px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.03)
          `.replace(/\s+/g, ' '),
        }}>
          {/* Cooling vents - refined */}
          <div className="absolute top-2" style={{
              [isLeft ? 'left' : 'right']: '4px', width: '18px', height: '2px',
              background: 'repeating-linear-gradient(90deg, transparent 0, transparent 1.5px, #050505 1.5px, #050505 3px)', borderRadius: '1px', opacity: 0.6
            }} />
          <div className="absolute top-1/2" style={{
              [isLeft ? 'left' : 'right']: '4px', width: '18px', height: '2px', transform: 'translateY(-50%)',
              background: 'repeating-linear-gradient(90deg, transparent 0, transparent 1.5px, #050505 1.5px, #050505 3px)', borderRadius: '1px', opacity: 0.6
            }} />
          <div className="absolute bottom-2" style={{
              [isLeft ? 'left' : 'right']: '4px', width: '18px', height: '2px',
              background: 'repeating-linear-gradient(90deg, transparent 0, transparent 1.5px, #050505 1.5px, #050505 3px)', borderRadius: '1px', opacity: 0.6
            }} />
          
          {/* Zoom ring - premium knurled */}
          <div className="absolute top-[22px]" style={{
              [isLeft ? 'left' : 'right']: '-1px', width: '30px', height: '10px',
              background: 'linear-gradient(180deg, #151515 0%, #222 30%, #333 50%, #222 70%, #151515 100%)',
              borderRadius: '3px',
              border: '1px solid #2a2a2a',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02)'
            }}
          >
            <div className="absolute inset-1 flex items-center justify-center gap-0.5 pointer-events-none">
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: '1.5px', height: '6px', background: 'linear-gradient(180deg, transparent, #444, transparent)', borderRadius: '0.75px', opacity: 0.6 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lens Assembly - premium */}
      <div className="absolute top-[14px]" style={{ [isLeft ? 'left' : 'right']: '0', width: '36px', height: '36px', zIndex: 10 }}>
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(ellipse at center, #060606 0%, #0d0d0d 35%, #121212 60%, #050505 100%)',
          border: '1.5px solid #1e1e1e',
          boxShadow: `
            inset 0 1.5px 3px rgba(255,255,255,0.08),
            inset 0 -1.5px 3px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 20px rgba(251,191,36,0.18)
          `.replace(/\s+/g, ' '),
        }}>
          <div className="absolute inset-3 rounded-full" style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.22) 0%, rgba(255,245,220,0.08) 30%, rgba(18,18,18,0.9) 60%, #050505 100%)',
            border: '1px solid rgba(255,255,255,0.04)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 0 14px rgba(251,191,36,0.2)',
          }}>
            {/* LED COB source */}
            <div className="absolute inset-6 rounded-full" style={{
              background: 'radial-gradient(circle at center, rgba(255,252,245,0.95) 0%, rgba(255,240,210,0.6) 20%, rgba(251,191,36,0.35) 45%, rgba(251,191,36,0.1) 70%, transparent 85%)',
              filter: 'blur(1.5px)',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }} />
          </div>
        </div>
        {/* Lens front coating reflection */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.12) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Beam - TILTED TOWARD CENTER ── */}
      <div className="absolute top-[48px]" style={{ [isLeft ? 'left' : 'right']: '5%', transform: isLeft ? 'skewY(8deg)' : 'skewY(-8deg)', transformOrigin: 'top center' }}>
        {/* Primary focused beam - toward center */}
        <div className="w-[260px] md:w-[320px] h-[360px]" style={{
          clipPath: isLeft ? 'polygon(35% 0%, 65% 0%, 85% 100%, 55% 100%)' : 'polygon(35% 0%, 65% 0%, 45% 100%, 15% 100%)',
        }}>
          <div className="w-full h-full" style={{
            background: 'linear-gradient(180deg, rgba(255,248,235,0.10) 0%, rgba(255,240,215,0.05) 25%, rgba(255,230,185,0.02) 55%, transparent 100%)',
            filter: 'blur(0.5px)',
          }} />
        </div>
        {/* Secondary purple-pink ambient beam */}
        <div className="absolute top-0 w-[220px] md:w-[280px] h-[380px]" style={{
          clipPath: isLeft ? 'polygon(30% 0%, 70% 0%, 88% 100%, 48% 100%)' : 'polygon(30% 0%, 70% 0%, 52% 100%, 12% 100%)',
        }}>
          <div className="w-full h-full" style={{
            background: 'linear-gradient(180deg, rgba(168,85,247,0.03) 0%, rgba(244,114,182,0.018) 35%, transparent 75%)',
            filter: 'blur(3px)',
          }} />
        </div>
        {/* Center convergence glow */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[180px] h-[180px] rounded-full" style={{
          background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.05) 0%, rgba(244,114,182,0.025) 40%, transparent 70%)',
          filter: 'blur(10px)',
        }} />
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  const duplicated = [...brands, ...brands];

  return (
    <section className="relative overflow-hidden py-10 md:py-14 bg-white">

      {/* ══════════ BACKGROUND IMAGE — edges visible, center for island ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
        <div className="absolute left-1/2 -translate-x-1/2 w-[140%] h-[140%] -top-[20%]" style={{
          backgroundImage: `url(https://png.pngtree.com/background/20220730/original/pngtree-abstract-triangular-background-vector-line-picture-image_1887776.jpg)`,
          backgroundSize: '100% auto',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }} />
      </div>
      {/* White fade over center so image edges peek but center is clean */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0) 100%)',
        zIndex: 1,
      }} />
      {/* Top center subtle purple glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-[150px] bg-gradient-to-b from-purple-200/[0.08] via-purple-100/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      {/* Very subtle side accent glows */}
      <div className="absolute top-[20%] left-0 w-[200px] h-[250px] bg-gradient-to-r from-purple-200/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[200px] h-[250px] bg-gradient-to-l from-purple-200/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ── Left Spotlight ── */}
      <TrackSpotlight side="left" />

      {/* ── Right Spotlight ── */}
      <TrackSpotlight side="right" />

      {/* ── HALO GLOW behind title ── */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[320px] md:w-[440px] h-[100px] bg-emerald-300/[0.15] rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[200px] md:w-[280px] h-[70px] bg-emerald-400/[0.12] rounded-full blur-2xl pointer-events-none z-[1]" />

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
        <div className="relative" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,153,102,0.15))', zIndex: 10 }}>
          
          {/* Main Pill Container — Emerald Green Dynamic Island */}
          <div className="relative rounded-[9999px] overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(0,153,102,0.92) 0%, rgba(0,130,85,0.95) 40%, rgba(0,100,65,0.92) 60%, rgba(0,153,102,0.9) 100%)',
              backdropFilter: 'blur(12px) saturate(150%)',
              WebkitBackdropFilter: 'blur(12px) saturate(150%)',
              border: '1px solid rgba(52,211,153,0.4)',
              boxShadow: `
                0 8px 32px rgba(0,153,102,0.25),
                0 2px 8px rgba(0,153,102,0.15),
                inset 0 1px 0 rgba(52,211,153,0.4),
                inset 0 -1px 0 rgba(0,80,50,0.3),
                0 0 0 1px rgba(52,211,153,0.2),
                0 0 60px rgba(0,153,102,0.1)
              `.replace(/\s+/g, ' '),
              minHeight: '72px',
            }}
          >
            {/* Inner ambient edge glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/[0.15] via-transparent to-teal-400/[0.15] pointer-events-none" />
            {/* Top highlight */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent pointer-events-none" />
            
            {/* ── Marquee ── */}
            <div className="relative group/marquee px-4 md:px-6 py-2">
              {/* Left fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-14 md:w-20 bg-gradient-to-r from-[#009966] via-[#009966]/60 to-transparent z-10" />
              {/* Right fade */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-14 md:w-20 bg-gradient-to-l from-[#009966] via-[#009966]/60 to-transparent z-10" />

              <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
                {duplicated.map((brand, i) => (
                  <LogoCard key={`${brand.name}-${i}`} brand={brand} />
                ))}
              </div>
            </div>
          </div>

          {/* Subtle floor reflection */}
          <div
            className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-8 rounded-[9999px] pointer-events-none opacity-15"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,153,102,0.4), transparent)',
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
      <div className="relative mt-6 h-12 md:h-16 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 overflow-hidden">
        <div className="absolute inset-0 flex items-start pt-2 opacity-[0.04] scale-y-[-1]">
          <div className="flex w-max animate-marquee-slow">
            {duplicated.map((brand, i) => (
              <div key={`ref-${i}`} className="flex-shrink-0 h-10 px-4 mx-2 rounded-full bg-slate-200/30" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-slate-100/40 pointer-events-none" />
        <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-purple-200/30 to-transparent" />
      </div>
    </section>
  );
}