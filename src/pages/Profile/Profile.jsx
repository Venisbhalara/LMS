import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BadgesList from "../../components/BadgesList";
import "./Profile.css";

const Profile = () => {
  const { user, login, logout, updateUser, restoreSession } = useAuth();
  const navigate = useNavigate();
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

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
    if (role === "admin") {
      setShowAdminLogin(true);
      return;
    }

    // Switching FROM Admin TO Student/Instructor
    // Check if we have a saved previous session
    const prevSession = localStorage.getItem("prev_session");

    if (prevSession) {
      try {
        const previousUser = JSON.parse(prevSession);
        // Verify the role matches requested (optional, but good safety)
        if (
          previousUser.role === role ||
          (role === "student" && previousUser.role !== "admin")
        ) {
          restoreSession(previousUser);
          localStorage.removeItem("prev_session");
          setShowSwitchModal(false);

          if (role === "student") navigate("/dashboard");
          if (role === "instructor") navigate("/instructor/dashboard");
          return;
        }
      } catch (e) {
        console.error("Error restoring session:", e);
      }
    }

    // Fallback if no session found (or just testing without session)
    // If currently Admin and no prev session, Logout for security
    if (user.role === "admin") {
      logout();
      navigate("/login");
      return;
    }

    // Normal switch (Student <-> Instructor) just update role
    updateUser({ role: role });
    setShowSwitchModal(false);

    if (role === "student") {
      navigate("/dashboard");
    } else if (role === "instructor") {
      navigate("/instructor/dashboard");
    }
  };

  const handleAdminVerify = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsVerifying(true);

    try {
      // Save current session before switching to Admin
      if (user.role !== "admin") {
        localStorage.setItem("prev_session", JSON.stringify(user));
      }

      const result = await login(
        adminCredentials.email,
        adminCredentials.password,
      );
      if (result.success) {
        if (result.user.role === "admin") {
          setShowSwitchModal(false);
          setShowAdminLogin(false);
          navigate("/admin/users");
        } else {
          setLoginError(
            "Access denied. These credentials do not belong to an Admin.",
          );
        }
      } else {
        setLoginError(
          result.message || "Invalid credentials. Please try again.",
        );
      }
    } catch (err) {
      setLoginError("An error occurred. Please try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCredentialChange = (e) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });
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
              <div className="stat-label" >Certificates</div>
              <button
                style={{
                  marginTop: "6px",
                  fontSize: "0.85rem",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #4F6EF7, #6A85F8)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  cursor: "pointer",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 12px rgba(79, 110, 247, 0.25)",
                  transition: "all 0.25s ease-in-out",
                }}
                onClick={() => navigate("/my-certificates")}
              >
                View All
              </button>
            </div>
          </div>

          {/* Badges Section */}
          <BadgesList />
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
            <h3>{showAdminLogin ? "Admin Verification" : "Switch Profile"}</h3>
            <p>
              {showAdminLogin
                ? "Enter admin credentials to continue"
                : "Select how you want to continue"}
            </p>

            {!showAdminLogin ? (
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

                <button
                  className="switch-card admin-switch"
                  onClick={() => handleSwitch("admin")}
                >
                  <span className="icon">🔐</span>
                  <h4>Admin</h4>
                  <p>Manage users & system settings</p>
                </button>
              </div>
            ) : (
              <form className="admin-verify-form" onSubmit={handleAdminVerify}>
                {loginError && (
                  <div className="admin-login-error">{loginError}</div>
                )}
                <div className="admin-form-group">
                  <label htmlFor="admin-email">Admin Email</label>
                  <input
                    type="email"
                    id="admin-email"
                    name="email"
                    value={adminCredentials.email}
                    onChange={handleCredentialChange}
                    required
                    placeholder="Enter admin email"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="admin-password">Password</label>
                  <input
                    type="password"
                    id="admin-password"
                    name="password"
                    value={adminCredentials.password}
                    onChange={handleCredentialChange}
                    required
                    placeholder="Enter admin password"
                  />
                </div>
                <div className="admin-verify-actions">
                  <button
                    type="button"
                    className="admin-back-btn"
                    onClick={() => setShowAdminLogin(false)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="admin-confirm-btn"
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Verify & Access"}
                  </button>
                </div>
              </form>
            )}

            {!showAdminLogin && (
              <button
                className="switch-close-btn"
                onClick={() => setShowSwitchModal(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
