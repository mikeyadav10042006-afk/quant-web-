import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onComplete }) {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);
  const iconRef = useRef(null);

  const buildScene = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const text = textRef.current;
    const cursor = cursorRef.current;
    const chars = text?.querySelectorAll('.tc');

    gsap.set(iconRef.current, { opacity: 0, scale: 0.5, rotate: -180 });
    gsap.set(chars, { opacity: 0, y: 8, filter: 'blur(4px)' });
    gsap.set(cursor, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' });
    gsap.set(taglineRef.current, { opacity: 0, y: 6 });

    const blink = gsap.to(cursor, {
      opacity: 0, duration: 0.35, repeat: -1, yoyo: true,
      ease: 'steps(1)', paused: true,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        blink.kill();
        gsap.to(cursor, { opacity: 0 });
        gsap.to(root, {
          opacity: 0, duration: 0.7, ease: 'power2.inOut', onComplete,
        });
      },
    });

    tl
      .to(iconRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' })
      .call(() => blink.play())
      .to(cursor, { opacity: 1, duration: 0.1 }, '-=0.3')
      .to(chars, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        stagger: 0.1,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.4')
      .to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '<')
      .call(() => blink.pause())
      .to(cursor, { opacity: 0, duration: 0.3 })
      .to(taglineRef.current, { opacity: 0.5, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1')
      .to({}, { duration: 0.8 });

    return () => { tl.kill(); blink.kill(); };
  }, [onComplete]);

  useEffect(() => {
    const cleanup = buildScene();
    return () => { if (typeof cleanup === 'function') cleanup(); };
  }, [buildScene]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #050508 0%, #071a14 35%, #0a1f1a 60%, #050d0a 100%)',
      }}
    >
      {/* Atom Icon */}
      <div ref={iconRef} className="mb-6 sm:mb-8">
        <svg width="56" height="56" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="4" fill="url(#splashGrad)" />
          <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#splashGrad)" strokeWidth="1.2" fill="none" opacity="0.5" />
          <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#splashGrad)" strokeWidth="1.2" fill="none" opacity="0.5" transform="rotate(60 18 18)" />
          <ellipse cx="18" cy="18" rx="15" ry="6" stroke="url(#splashGrad)" strokeWidth="1.2" fill="none" opacity="0.5" transform="rotate(120 18 18)" />
          <circle cx="18" cy="18" r="2" fill="#00A878" />
          <defs>
            <linearGradient id="splashGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A878" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* QUANTIONIC typewriter */}
      <div ref={textRef} className="flex items-baseline">
        <span className="text-[38px] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider select-none" style={{
          color: '#ffffff',
        }}>
          {'QUANTIONIC'.split('').map((ch, i) => (
            <span key={i} className="tc inline-block" style={{
              opacity: 0,
              background: i >= 5
                ? 'linear-gradient(135deg, #00A878, #06b6d4)'
                : 'linear-gradient(180deg, #f0f4f8, #cbd5e1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{ch}</span>
          ))}
        </span>
        <span
          ref={cursorRef}
          className="inline-block w-[2px] h-8 sm:h-10 md:h-12 lg:h-14 ml-0.5 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #00A878, #06b6d4)',
            boxShadow: '0 0 8px rgba(0,168,120,0.4)',
          }}
        />
      </div>

      {/* Loading line */}
      <div className="mt-4 sm:mt-5 w-40 sm:w-52 md:w-60 h-[1.5px] rounded-full overflow-hidden" style={{
        background: 'rgba(0,168,120,0.1)',
      }}>
        <div ref={lineRef} className="h-full rounded-full" style={{
          background: 'linear-gradient(90deg, rgba(0,168,120,0.2), #00A878, #06b6d4, #00A878, rgba(0,168,120,0.2))',
          boxShadow: '0 0 6px rgba(0,168,120,0.4), 0 0 12px rgba(6,182,212,0.15)',
        }} />
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="mt-5 sm:mt-6 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.28em] font-medium"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        BRINGING AI TO REAL WORLD
      </p>
    </div>
  );
}
