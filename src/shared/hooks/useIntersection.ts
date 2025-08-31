import { useEffect, useRef } from 'react';

export interface UseIntersectionOptions extends IntersectionObserverInit {
  enabled?: boolean;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

export function useIntersection<T extends Element>({ enabled = true, onIntersect, ...opts }: UseIntersectionOptions) {
  const ref = useRef<T | null>(null);
  const obs = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    obs.current?.disconnect();
    obs.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first?.isIntersecting) onIntersect?.(first);
    }, opts);
    obs.current.observe(ref.current);
    return () => obs.current?.disconnect();
  }, [enabled, opts.root, opts.rootMargin, opts.threshold, onIntersect]);

  return { ref };
}
