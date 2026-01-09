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
import { useEffect, useState } from "react";

const formatValue = (value) => {
  if (value >= 1000) return `${Math.floor(value / 1000)}K`;
  return value.toString();
};

const SmoothCount = ({ end, duration = 2600, delay = 300, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Premium easing (very smooth)
      const easeOut = 1 - Math.pow(1 - progress, 3.8);

      const currentValue = Math.floor(easeOut * end);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);

  return (
    <span>
      {formatValue(count)}
      {suffix}
    </span>
  );
};

const Hero = () => {
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
            <div className="hero-badge">
              <AwardIcon size={16} />
              <span>Premium Online Learning Platform</span>
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
                to="/signup"
                className="btn btn-outline btn-large hero-cta-secondary"
              >
                Start Learning Free
              </Link>
            </div>

            {/* Trust & Credibility Stats */}
            <div className="hero-trust-stats">
              {[
                {
                  icon: UsersIcon,
                  value: 50000,
                  label: "Active Learners",
                  delay: 400,
                },
                {
                  icon: BookIcon,
                  value: 1000,
                  label: "Premium Courses",
                  delay: 550,
                },
                {
                  icon: GraduationIcon,
                  value: 500,
                  label: "Expert Instructors",
                  delay: 700,
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    className="trust-stat premium-stat"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: item.delay / 1000,
                      ease: [0.22, 1, 0.36, 1], // premium easing
                    }}
                  >
                    <div className="trust-stat-icon">
                      <Icon size={24} />
                    </div>

                    <div className="trust-stat-content">
                      <div className="trust-stat-number premium-number">
                        <SmoothCount end={item.value} delay={item.delay} />
                      </div>
                      <div className="trust-stat-label">{item.label}</div>
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
