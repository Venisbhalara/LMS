import { useState } from "react";
import Footer from "../../components/Footer/Footer";

import { FaLaptopCode, FaPaintBrush, FaBookOpen } from "react-icons/fa";
import "./Careers.css";

const Careers = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const openModal = (role) => setSelectedRole(role);
  const closeModal = () => setSelectedRole(null);

  const benefits = [
    {
      title: "Meaningful Impact",
      description:
        "Your work directly helps learners gain skills that transform their careers.",
      icon: <FaBookOpen className="icon-3d" />,
    },
    {
      title: "Remote-First Culture",
      description: "Work from anywhere with flexibility and focus on outcomes.",
      icon: <FaLaptopCode className="icon-3d" />,
    },
    {
      title: "Continuous Learning",
      description:
        "Access courses, mentorship, and growth opportunities as part of our team.",
      icon: <FaPaintBrush className="icon-3d" />,
    },
  ];

  const jobs = [
    {
      title: "Frontend Developer",
      description:
        "Build elegant and performant interfaces using modern frontend technologies.",
      type: "Remote · Full-time",
      icon: <FaLaptopCode className="icon-3d" />,
    },
    {
      title: "UI/UX Designer",
      description:
        "Design intuitive, refined learning experiences with a strong focus.",
      type: "Remote · Full-time",
      icon: <FaPaintBrush className="icon-3d" />,
    },
    {
      title: "Content Creator",
      description:
        "Create impactful educational content and learning materials.",
      type: "Remote · Contract",
      icon: <FaBookOpen className="icon-3d" />,
    },
  ];

  return (
    <div className="careers-page">
      <div className="main-content">
        {/* HERO */}
        <section className="careers-hero">
          <div className="hero-content">
            <span className="hero-badge">Careers</span>
            <h1>Build the Future of Education</h1>
            <p>
              Join a passionate team building premium learning experiences for
              learners worldwide.
            </p>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="careers-section">
          <h2>Why Work With EduMaster</h2>
          <div className="benefits-grid">
            {benefits.map((b, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="icon-container">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JOBS */}
        <section className="careers-section soft-bg">
          <h2>Open Positions</h2>
          <div className="jobs-grid">
            {jobs.map((j, idx) => (
              <div className="job-card" key={idx}>
                <div className="icon-container">{j.icon}</div>
                <h3>{j.title}</h3>
                <p>{j.description}</p>
                <span>{j.type}</span>
                <button onClick={() => openModal(j.title)}>Apply Now</button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="careers-cta">
          <h2>Didn’t Find the Right Role?</h2>
          <p>We’re always happy to connect with talented individuals.</p>
          <button
            className="cta-btn"
            onClick={() => openModal("General Application")}
          >
            Send Your Resume
          </button>
        </section>

        {/* MODAL */}
        {selectedRole && (
          <div className="modal-overlay active" onClick={closeModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h3>Application Submitted</h3>
              <p className="modal-role">
                Role: <strong>{selectedRole}</strong>
              </p>
              <p className="modal-text">
                Thank you for your interest in joining EduMaster. Our team has
                received your application and will reach out shortly.
              </p>
              <button className="modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />

    </div>
  );
};

export default Careers;
