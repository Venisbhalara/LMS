import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCompletionModal.css";

const CourseCompletionModal = ({ courseId, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="completion-modal-overlay">
      <div className="completion-modal">
        <div className="modal-icon">🎉</div>
        <h2>Course Completed!</h2>
        <p>Congratulations! You have successfully completed all lessons.</p>

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
