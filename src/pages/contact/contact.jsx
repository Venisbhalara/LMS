import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We’re here to help</p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          <div className="info-card">
            <h3>Email</h3>
            <p>support@edumaster.com</p>
          </div>
          <div className="info-card">
            <h3>Phone</h3>
            <p>+91 93899 49899</p>
          </div>
          <div className="info-card">
            <h3>Location</h3>
            <p>India</p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* MAP */}
      <section className="map-section">
        <h2>Our Location</h2>
        <div className="map-iframe">
          <iframe
            title="EduMaster Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31554.123456789!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce0ff12abcdef%3A0xabcdef1234567890!2sIndia!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
