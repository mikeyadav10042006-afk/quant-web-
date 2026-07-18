import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onComplete }) {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);

  const buildScene = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const text = textRef.current;
    const cursor = cursorRef.current;
    const chars = text?.querySelectorAll('.tc');

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
      .call(() => blink.play())
      .to(cursor, { opacity: 1, duration: 0.1 })
      .to(chars, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        stagger: 0.12,
        duration: 0.35,
        ease: 'power2.out',
      })
      .to(lineRef.current, {
        scaleX: 1,
        duration: 1.3,
        ease: 'power2.inOut',
      }, '<')
      .call(() => blink.pause())
      .to(cursor, { opacity: 0, duration: 0.3 })
      .to(taglineRef.current, { opacity: 0.5, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1')
      .to({}, { duration: 1 });

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
        background: 'linear-gradient(160deg, #050508 0%, #0e0818 35%, #150a24 60%, #0a0510 100%)',
      }}
    >
      {/* QUANTIONIC typewriter */}
      <div ref={textRef} className="flex items-baseline">
        <span className="text-[38px] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider select-none" style={{
          color: '#ffffff',
        }}>
          {'QUANTIONIC'.split('').map((ch, i) => (
            <span key={i} className="tc inline-block" style={{
              opacity: 0,
              background: i >= 5
                ? 'linear-gradient(135deg, #06b6d4, #22d3ee, #10b981, #8b5cf6)'
                : 'linear-gradient(180deg, #f0f4f8, #cbd5e1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{ch}</span>
          ))}
        </span>
        <span
          ref={cursorRef}
          className="inline-block w-[2px] h-8 sm:h-10 md:h-12 lg:h-14 ml-0.5 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #06b6d4, #8b5cf6)',
            boxShadow: '0 0 8px rgba(6,182,212,0.4)',
          }}
        />
      </div>

      {/* Loading line */}
      <div className="mt-4 sm:mt-5 w-40 sm:w-52 md:w-60 h-[1.5px] rounded-full overflow-hidden" style={{
        background: 'rgba(139,92,246,0.1)',
      }}>
        <div ref={lineRef} className="h-full rounded-full" style={{
          background: 'linear-gradient(90deg, rgba(139,92,246,0.2), #8b5cf6, #a78bfa, #8b5cf6, rgba(139,92,246,0.2))',
          boxShadow: '0 0 6px rgba(139,92,246,0.4), 0 0 12px rgba(139,92,246,0.15)',
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
