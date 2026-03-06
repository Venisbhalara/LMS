import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — wraps the entire app and enables buttery-smooth native-feel scrolling.
 *
 * Configuration choices:
 *  • duration 1.2  — feels premium without being sluggish
 *  • easing         — custom cubic-bezier for a natural deceleration curve
 *  • smoothTouch    — disabled (touch already has native momentum on mobile)
 *  • gestureOrientation "vertical" — standard page scroll axis
 *
 * Lenis is kept in sync with Framer Motion's `useAnimationFrame` via a manual
 * requestAnimationFrame loop so both systems share the same clock.
 */
export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1, // linear interpolation factor — lower = smoother
    });

    lenisRef.current = lenis;

    // Expose lenis instance globally so other parts of the app
    // (e.g. ScrollToTop, anchor links) can call lenis.scrollTo() if needed.
    window.__lenis = lenis;

    let rafId;

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
