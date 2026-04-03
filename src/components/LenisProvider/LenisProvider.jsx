import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — wraps the entire app and enables buttery-smooth native-feel scrolling.
 *
 * Key configuration:
 *  • lerp: 0.12        — linear interpolation (0 = instant, 1 = never arrives).
 *                        Do NOT combine with `duration` — they conflict in Lenis v1+.
 *  • wheelMultiplier   — how far each wheel tick scrolls (1.0 = native speed)
 *  • smoothTouch       — disabled (mobile already has native momentum)
 *  • gestureOrientation "vertical" — standard page scroll axis
 */
export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      // ✅ Use ONLY lerp OR duration — not both.
      // `duration` overrides lerp and causes sluggish fixed-time easing.
      lerp: 0.12, // smooth interpolation factor
      wheelMultiplier: 1.0, // scroll distance per wheel tick (native feel)
      touchMultiplier: 2, // touch sensitivity (mobile)
      gestureOrientation: "vertical",
      smoothTouch: false, // native momentum on mobile is better
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
    });

    lenisRef.current = lenis;

    // Expose globally so ScrollToTop / anchor links can call lenis.scrollTo()
    window.__lenis = lenis;

    let rafId;

    // Drive Lenis with the browser's native rAF loop for zero-lag rendering
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return children;
}
