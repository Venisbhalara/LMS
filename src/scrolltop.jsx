import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./scrolltop.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const buttonRef = useRef(null);
  const circleRef = useRef(null);
  const lastScrollY = useRef(0);
  const rafPending = useRef(false);

  // Reset scroll position instantly on every route change.
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    const radius = 22;
    const circumference = 2 * Math.PI * radius;

    // Initialize stroke dash
    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;
    }

    const handleScroll = () => {
      if (rafPending.current) return;
      rafPending.current = true;

      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        // 1. Update Progress Ring (Direct DOM)
        if (circleRef.current) {
          const offset = circumference - (scrolled / 100) * circumference;
          circleRef.current.style.strokeDashoffset = offset;
        }

        // 2. Handle Visibility
        // We show the button if we have scrolled more than 300px
        const shouldShow = scrollTop > 300;

        if (buttonRef.current) {
          if (shouldShow) {
            buttonRef.current.classList.add("show");
          } else {
            buttonRef.current.classList.remove("show");
          }
        }

        lastScrollY.current = scrollTop;
        rafPending.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { lerp: 0.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      ref={buttonRef}
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="progress-ring" width="50" height="50">
        <circle
          ref={circleRef}
          className="progress-ring__circle"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="4"
          fill="transparent"
          r="22"
          cx="25"
          cy="25"
        />
      </svg>
      <span className="arrow">↑</span>
    </button>
  );
};

export default ScrollToTop;

