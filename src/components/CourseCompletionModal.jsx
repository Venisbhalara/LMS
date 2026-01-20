import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCompletionModal.css";

const CourseCompletionModal = ({ courseId, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [certificateCode, setCertificateCode] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (isOpen && !certificateCode) {
      generateCertificate();
    }
  }, [isOpen]);

  const generateCertificate = async () => {
    setGenerating(true);
    setStatusMessage("Generating your certificate...");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/certificates/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId }),
        },
      );

      const data = await response.json();
      if (data.success) {
        setCertificateCode(data.certificateCode);
        setStatusMessage(
          "Certificate generated successfully! You've also earned a badge.",
        );
      } else {
        setStatusMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Certificate generation error:", error);
      setStatusMessage("An error occurred while generating the certificate.");
    } finally {
      setGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="completion-modal-overlay">
      <div className="completion-modal">
        <div className="modal-icon">🎉</div>
        <h2>Course Completed!</h2>
        <p>Congratulations! You have successfully completed all lessons.</p>

        <div className="certificate-status">
          {generating ? (
            <div className="loading-spinner"></div>
          ) : certificateCode ? (
            <div className="success-message">
              <p>Your certificate is ready!</p>
              <button
                onClick={() => navigate(`/verify/${certificateCode}`)}
                className="view-cert-btn"
              >
                View Certificate
              </button>
            </div>
          ) : (
            <p className="error-message">{statusMessage}</p>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="close-btn">
            Close
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="dashboard-btn"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCompletionModal;
