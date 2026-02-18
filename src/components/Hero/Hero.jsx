import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UsersIcon,
  BookIcon,
  BuildingIcon,
  AwardIcon,
  GraduationIcon,
  BriefcaseIcon,
} from "../Icons/Icons";
import "./Hero.css";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const formatValue = (value) => {
  if (value >= 1000) return `${Math.floor(value / 1000)}K`;
  return value.toString();
};

const SmoothCount = ({ end, duration = 2000, delay = 0, suffix = "+" }) => {
  const countRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = Math.floor(ease * end);

      if (countRef.current) {
        countRef.current.textContent = formatValue(current) + suffix;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        if (countRef.current) {
          countRef.current.textContent = formatValue(end) + suffix;
        }
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, delay, inView, suffix]);

  return <span ref={countRef}>0{suffix}</span>;
};

const Hero = () => {
  const { user } = useAuth();

  return (
    <section id="hero-section" className="hero">
      <div className="container">
        <div className="hero-content-wrapper">
          {/* Main Content */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Value Proposition */}
            <div className="hero-badge premium-badge">
              <span className="badge-text">
                Premium Online Learning Platform
              </span>
            </div>

            <h1 className="hero-title">
              Master New Skills & Transform Your
              <span className="hero-title-highlight"> Career Today</span>
            </h1>

            {/* Supporting Description */}
            <p className="hero-description">
              Join over <strong>50,000+</strong> professionals learning from
              industry experts. Access premium courses, earn recognized
              certificates, and advance your career with skills that matter in
              today's job market.
            </p>

            {/* CTAs */}
            <div className="hero-actions">
              <Link
                to="/courses"
                className="btn btn-primary btn-large hero-cta-primary"
              >
                Explore Courses
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="btn btn-outline btn-large hero-cta-secondary"
              >
                {user ? "Dashboard" : "Start Learning Free"}
              </Link>
            </div>

            {/* Trust & Credibility Stats */}
            <div className="hero-trust-stats">
              {[
                {
                  icon: UsersIcon,
                  value: 50000,
                  label: "Active Learners",
                  delay: 200,
                  colorClass: "stat-primary",
                },
                {
                  icon: BookIcon,
                  value: 1000,
                  label: "Premium Courses",
                  delay: 400,
                  colorClass: "stat-secondary",
                },
                {
                  icon: GraduationIcon,
                  value: 500,
                  label: "Expert Instructors",
                  delay: 600,
                  colorClass: "stat-tertiary",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    className={`trust-stat premium-card ${item.colorClass}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: item.delay / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 20px 40px rgba(79, 110, 247, 0.15)",
                    }}
                  >
                    <div className="stat-icon">
                      <Icon size={22} />
                    </div>

                    <div className="stat-content">
                      <div className="stat-number">
                        <SmoothCount
                          end={item.value}
                          duration={2000}
                          delay={item.delay + 300}
                        />
                        {/* <span className="stat-plus">+</span> */}
                      </div>
                      <div className="stat-label">{item.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Partner Logos Preview */}
            <div className="hero-partners">
              <p className="hero-partners-label">
                Trusted by leading companies
              </p>
              <div className="hero-partners-logos">
                <div className="partner-logo">
                  <img src="/images/companies/google.png" alt="Google" />
                </div>
                <div className="partner-logo">
                  <img src="/images/companies/microsoft.png" alt="Microsoft" />
                </div>
                <div className="partner-logo">
                  <img src="/images/companies/amazon.png" alt="Amazon" />
                </div>
                <div className="partner-logo">
                  <img src="/images/companies/meta.png" alt="Meta" />
                </div>
                <div className="partner-logo">
                  <img src="/images/companies/apple.png" alt="Apple" />
                </div>
                <div className="partner-logo">
                  <img src="/images/companies/netflix.png" alt="Netflix" />
                </div>
                <div className="partner-logo">
                  <img src="/images/companies/tesla.png" alt="Tesla" />
                </div>
                <div className="partner-logo">
                  <img src="/images/companies/adobe.png" alt="Adobe" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="hero-visual-container">
              <div className="hero-feature-card hero-card-1">
                <div className="feature-card-icon">
                  <BookIcon size={32} />
                </div>
                <h3 className="feature-card-title">Learn</h3>
                <p className="feature-card-desc">Premium courses</p>
              </div>
              <div className="hero-feature-card hero-card-2">
                <div className="feature-card-icon">
                  <AwardIcon size={32} />
                </div>
                <h3 className="feature-card-title">Certify</h3>
                <p className="feature-card-desc">Earn credentials</p>
              </div>
              <div className="hero-feature-card hero-card-3">
                <div className="feature-card-icon">
                  <BriefcaseIcon size={32} />
                </div>
                <h3 className="feature-card-title">Succeed</h3>
                <p className="feature-card-desc">Career growth</p>
              </div>
              <div className="hero-feature-card hero-card-4">
                <div className="feature-card-icon">
                  <GraduationIcon size={32} />
                </div>
                <h3 className="feature-card-title">Instructors</h3>
                <p className="feature-card-desc">Learn from experts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
