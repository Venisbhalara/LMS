import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import "./ContactSales.css";

const ContactSales = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    learners: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert(
      "Thank you for contacting our sales team! We will get back to you shortly."
    );
    console.log("Sales Form Data:", formData);
    setFormData({
      name: "",
      email: "",
      company: "",
      companySize: "",
      learners: "",
      message: "",
    });
  };

  return (
    <div className="contact-sales-page">
      <div className="contact-sales-container">
        {/* Left Side - Info */}
        <div className="contact-sales-info">
          <h1>Empower Your Team with EduMaster Enterprise</h1>
          <p>
            Get a tailored learning solution designed to help your organization
            grow. Scale your training with advanced features and dedicated
            support.
          </p>
          <ul className="sales-benefits">
            <li>
              <div className="check-icon">
                <FiCheck />
              </div>
              Unlimited Access to All Courses
            </li>
            <li>
              <div className="check-icon">
                <FiCheck />
              </div>
              Custom Learning Paths
            </li>
            <li>
              <div className="check-icon">
                <FiCheck />
              </div>
              Advanced Analytics & Reporting
            </li>
            <li>
              <div className="check-icon">
                <FiCheck />
              </div>
              Dedicated Success Manager
            </li>
            <li>
              <div className="check-icon">
                <FiCheck />
              </div>
              SSO & API Integrations
            </li>
          </ul>
        </div>

        {/* Right Side - Form */}
        <div className="contact-sales-form-wrapper">
          <h2>Talk to our Sales Team</h2>
          <form className="contact-sales-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="john@company.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Acme Inc."
              />
            </div>

            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div className="form-group">
                <label htmlFor="companySize">Company Size</label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="learners">Learners Count</label>
                <select
                  id="learners"
                  name="learners"
                  value={formData.learners}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select count</option>
                  <option value="1-50">1-50 learners</option>
                  <option value="51-200">51-200 learners</option>
                  <option value="201-1000">201-1,000 learners</option>
                  <option value="1000+">1,000+ learners</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">How can we help?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us about your team's training needs..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Contact Sales
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSales;
