import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./Apply.css";

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("General Application");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    // If navigated with state, pull the role
    if (location.state && location.state.role) {
      setRole(location.state.role);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.resume) {
      setMessage("Please fill in all fields and upload a resume.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("role", role);
    data.append("resume", formData.resume);

    try {
      const response = await fetch("http://localhost:5000/api/careers/apply", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(result.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="apply-page">
        <div className="apply-container">
          {/* Left Side Info */}
          <div className="apply-info">
            <div className="info-content">
              <h2>Join Our Mission</h2>
              <p>
                We're looking for passionate individuals to help us reshape the
                future of education.
              </p>

              <ul className="info-benefits">
                <li>
                  <span>✦</span> Remote-First Culture
                </li>
                <li>
                  <span>✦</span> Competitive Compensation
                </li>
                <li>
                  <span>✦</span> Learning & Development
                </li>
                <li>
                  <span>✦</span> Global Team
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="apply-form-section">
            {status === "success" ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3>Application Received!</h3>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                  }}
                >
                  Thanks for applying to the <strong>{role}</strong> position.
                  <br />
                  We'll review your resume and get back to you soon.
                </p>
                <button
                  className="back-btn"
                  onClick={() => navigate("/careers")}
                >
                  Back to Careers
                </button>
              </div>
            ) : (
              <div className="form-content">
                <div className="form-header">
                  <h3>Apply Now</h3>
                  <p>Complete the form below to start your journey.</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Applying For</label>
                    <select value={role} onChange={handleRoleChange}>
                      <option value="General Application">
                        General Application
                      </option>
                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="Content Creator">Content Creator</option>
                      <option value="Backend Developer">
                        Backend Developer
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Resume / CV</label>
                    <div className="file-upload-box">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                      />
                      <div className="file-label">
                        <span className="file-icon">📄</span>
                        <span className="file-text">
                          {formData.resume
                            ? formData.resume.name
                            : "Click to Upload Resume"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {message && (
                    <p
                      className="error-message"
                      style={{ marginBottom: "1rem" }}
                    >
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting"
                      ? "Sending..."
                      : "Submit Application"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Apply;
