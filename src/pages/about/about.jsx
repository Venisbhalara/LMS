import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-content">
          <span className="hero-badge">About EduMaster</span>
          <h1>Shaping the Future of Learning</h1>
          <p>
            Empowering learners worldwide with industry-ready skills through
            thoughtfully crafted, expert-led education.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section narrow">
        <h2>Who We Are</h2>
        <p className="about-text">
          EduMaster is a modern online learning platform built for learners who
          value practical knowledge and real-world relevance. We focus on
          delivering structured, high-quality courses that help individuals
          grow professionally and stay competitive in an evolving job market.
        </p>
      </section>

      {/* WHY EDUMASTER */}
      <section className="about-section">
        <h2>Why EduMaster</h2>

        <div className="value-grid">
          <div className="value-card">
            <h3>Career-Driven Curriculum</h3>
            <p>
              Every course is designed with employability in mind, focusing on
              skills that companies actively look for.
            </p>
          </div>

          <div className="value-card">
            <h3>Expert-Led Learning</h3>
            <p>
              Learn directly from professionals who have real-world experience
              in their respective industries.
            </p>
          </div>

          <div className="value-card">
            <h3>Premium Learning Experience</h3>
            <p>
              Clean design, structured lessons, and a distraction-free learning
              environment built for focus.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-section soft-bg">
        <h2>Our Mission</h2>

        <div className="mission-grid">
          <div className="mission-card">
            <span>🎯</span>
            <h3>Skill-Focused Learning</h3>
            <p>
              We prioritize depth over noise—teaching skills that truly matter
              in real-world scenarios.
            </p>
          </div>

          <div className="mission-card">
            <span>👨‍🏫</span>
            <h3>Expert Instructors</h3>
            <p>
              Our instructors bring practical insights, not just theory, into
              every lesson.
            </p>
          </div>

          <div className="mission-card">
            <span>🌍</span>
            <h3>Learn Anytime, Anywhere</h3>
            <p>
              Access high-quality education from anywhere, on your own schedule.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-section narrow">
        <h2>Our Learning Philosophy</h2>
        <p className="about-text">
          We believe learning should be intentional, practical, and accessible.
          EduMaster combines clarity, structure, and expert guidance to ensure
          every learner gains confidence—not just certificates.
        </p>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>50K+</h3>
          <p>Active Learners</p>
        </div>
        <div className="stat-card">
          <h3>120+</h3>
          <p>Premium Courses</p>
        </div>
        <div className="stat-card">
          <h3>4.9★</h3>
          <p>Average Rating</p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Start Your Learning Journey</h2>
        <p>
          Join thousands of learners building real-world skills with EduMaster.
        </p>
        <button className="cta-btn" onClick={() => navigate("/courses")}>
          Explore Courses
        </button>
      </section>
    </div>
  );
};

export default About;
