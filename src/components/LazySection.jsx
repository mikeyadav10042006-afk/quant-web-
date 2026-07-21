import { useRef, useState, useEffect } from 'react';

export default function LazySection({ children, fallback = null, rootMargin = '200px' }) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  return <div ref={ref}>{shouldLoad ? children : fallback}</div>;
}
