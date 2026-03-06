import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./scrolltop.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { pathname } = useLocation();
  const rafPending = useRef(false); // rAF throttle gate

  // Reset scroll position instantly on every route change.
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  // rAF-throttled scroll handler — fires at most once per animation frame
  // instead of potentially 100s of times per second, eliminating scroll jank.
  useEffect(() => {
    const onScroll = () => {
      if (rafPending.current) return; // skip if frame already queued
      rafPending.current = true;

      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        setScrollPercent(scrolled);
        setVisible(scrollTop > 300);
        rafPending.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Button click — let Lenis animate back to top
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      className={`scroll-to-top ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="progress-ring" width="50" height="50">
        <circle
          className="progress-ring__circle"
          stroke="#c7f3ff"
          strokeWidth="4"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: "stroke-dashoffset 0.25s ease",
          }}
        />
      </svg>

      {/* Premium arrow icon */}
      <span className="arrow">↑</span>
    </button>
  );
};

export default ScrollToTop;
