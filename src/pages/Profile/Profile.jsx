import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleSwitch = (role) => {
    setShowSwitchModal(false);

    if (role === "student") {
      navigate("/dashboard");
    }

    if (role === "instructor") {
      navigate("/instructor/dashboard");
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h2>My Profile</h2>
          <button
            className="profile-switch-btn"
            onClick={() => setShowSwitchModal(true)}
          >
            Switch Profile
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar-large">{user.avatar}</div>
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-role">
              Role: <span className="role-badge">{user.role}</span>
            </p>
            <p className="profile-join-date">Member since {user.joinDate}</p>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <div className="stat-value">
                {user.enrolledCourses?.length || 0}
              </div>
              <div className="stat-label">Enrolled Courses</div>
            </div>
            <div className="profile-stat">
              <div className="stat-value">
                {user.completedCourses?.length || 0}
              </div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="profile-stat">
              <div className="stat-value">{user.certificates?.length || 0}</div>
              <div className="stat-label">Certificates</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔁 SWITCH MODAL */}
      {showSwitchModal && (
        <div
          className="profile-switch-overlay"
          onClick={() => setShowSwitchModal(false)}
        >
          <div
            className="profile-switch-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Switch Profile</h3>
            <p>Select how you want to continue</p>

            <div className="profile-switch-options">
              <button
                className="switch-card"
                onClick={() => handleSwitch("student")}
              >
                <span className="icon">🎓</span>
                <h4>Student</h4>
                <p>Learn courses & attempt quizzes</p>
              </button>

              <button
                className="switch-card"
                onClick={() => handleSwitch("instructor")}
              >
                <span className="icon">👨‍🏫</span>
                <h4>Instructor</h4>
                <p>Create courses & manage students</p>
              </button>
            </div>

            <button
              className="switch-close-btn"
              onClick={() => setShowSwitchModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
