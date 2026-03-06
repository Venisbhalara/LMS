import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./scrolltop.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { pathname } = useLocation();

  // Reset scroll position instantly on every route change.
  // We tell Lenis to jump to 0 without animation so there's
  // no "residual" momentum bleed from the previous page.
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  // Track scroll progress for the circular indicator
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollPercent(scrolled);
    setVisible(scrollTop > 300);
  };

  // Button click — let Lenis animate back to the top with its easing curve
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
