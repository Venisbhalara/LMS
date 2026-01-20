import { useState } from "react";
import "./HelpWidget.css";

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // controls button visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");

  // toggle popup form
  const toggleForm = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      // Reset form status when opening
      if (status === "success") {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }
    }
  };

  // hide the button temporarily
  const hideButton = (e) => {
    e.stopPropagation(); // prevent opening the popup
    setIsVisible(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="help-widget-container">
      {/* Floating Button */}
      {isVisible && (
        <div className="help-button-wrapper">
          <button
            className="help-button"
            onClick={toggleForm}
            aria-label="Open Help"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a0e9fd" />
                  <stop offset="100%" stopColor="#0c88ff" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="10" fill="url(#grad1)" />
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#fff"
              >
                ?
              </text>
            </svg>
          </button>

          {/* Mini Hide Button */}
          <button
            className="hide-button"
            onClick={hideButton}
            aria-label="Hide Help Button"
          >
            ×
          </button>
        </div>
      )}

      {/* Popup Form */}
      {isOpen && (
        <div className="help-popup">
          <div className="help-popup-header">
            <h4>Need Help?</h4>
            <button
              className="close-button"
              onClick={toggleForm}
              aria-label="Close Help"
            >
              ×
            </button>
          </div>
          <p className="help-popup-text">
            Send us a message and we'll get back to you!
          </p>

          {status === "success" ? (
            <div className="help-success-message">
              <p>✓ Message sent successfully!</p>
            </div>
          ) : (
            <form className="help-popup-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
              ></textarea>
              {status === "error" && (
                <p className="help-error-message">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="btn-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default HelpWidget;
