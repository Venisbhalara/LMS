import { useState } from "react";
import "./HelpWidget.css";

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // controls button visibility

  // toggle popup form
  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  // hide the button temporarily
  const hideButton = (e) => {
    e.stopPropagation(); // prevent opening the popup
    setIsVisible(false);
  };

  return (
    <div className="help-widget-container">
      {/* Floating Button */}
      {isVisible && (
        <div className="help-button-wrapper">
          <button className="help-button" onClick={toggleForm} aria-label="Open Help">
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
          <button className="hide-button" onClick={hideButton} aria-label="Hide Help Button">
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
          <form className="help-popup-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit" className="btn-submit">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HelpWidget;
