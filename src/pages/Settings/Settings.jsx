import { useState } from "react";
import {
  FiUser,
  FiLock,
  FiBell,
  FiCreditCard,
  FiShield,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [notification, setNotification] = useState("");

  const [settings, setSettings] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    bio: "Passionate learner and software enthusiast.",
    notifications: {
      email: true,
      push: false,
      marketing: true,
    },
    twoFactor: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setNotification("Settings saved successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleToggle = (category, type) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="settings-section-content">
            <div className="settings-header">
              <h1>Account Settings</h1>
              <p>Manage your public profile and personal details</p>
            </div>

            <div className="settings-body">
              <form onSubmit={handleSave}>
                <div className="profile-upload-section">
                  <div className="current-avatar">
                    {settings.fullName.charAt(0)}
                  </div>
                  <div className="upload-actions">
                    <button type="button" className="btn-secondary">
                      Change Avatar
                    </button>
                    <span className="input-helper">
                      JPG, GIF or PNG. 1MB max.
                    </span>
                  </div>
                </div>

                <div className="settings-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="settings-input"
                    value={settings.fullName}
                    onChange={(e) =>
                      setSettings({ ...settings, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="settings-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="settings-input"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                  />
                </div>

                <div className="settings-form-group">
                  <label>Bio</label>
                  <textarea
                    className="settings-textarea"
                    rows="4"
                    value={settings.bio}
                    onChange={(e) =>
                      setSettings({ ...settings, bio: e.target.value })
                    }
                  ></textarea>
                  <span className="input-helper">
                    Brief description for your profile.
                  </span>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="settings-section-content">
            <div className="settings-header">
              <h1>Security</h1>
              <p>Manage your password and security preferences</p>
            </div>
            <div className="settings-body">
              <div className="settings-form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  class="settings-input"
                  placeholder="••••••••"
                />
              </div>
              <div className="settings-form-group">
                <label>New Password</label>
                <input type="password" class="settings-input" />
              </div>

              <div className="toggle-group">
                <div className="toggle-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.twoFactor}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        twoFactor: !settings.twoFactor,
                      })
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSave}
                >
                  Update Security
                </button>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="settings-section-content">
            <div className="settings-header">
              <h1>Notifications</h1>
              <p>Control what emails and alerts you receive</p>
            </div>
            <div className="settings-body">
              <div className="toggle-group">
                <div className="toggle-info">
                  <h4>Email Notifications</h4>
                  <p>Receive daily summaries and important updates</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleToggle("notifications", "email")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-group">
                <div className="toggle-info">
                  <h4>Push Notifications</h4>
                  <p>Receive real-time alerts on your device</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={() => handleToggle("notifications", "push")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-group">
                <div className="toggle-info">
                  <h4>Marketing Emails</h4>
                  <p>Receive offers and new course recommendations</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.marketing}
                    onChange={() => handleToggle("notifications", "marketing")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="settings-section-content">
            <div className="settings-header">
              <h1>Billing & Plans</h1>
              <p>Manage your subscription and payment methods</p>
            </div>
            <div className="settings-body">
              <div className="billing-card">
                <div className="plan-header">
                  <span className="plan-name">Pro Plan</span>
                  <span className="badge">Active</span>
                </div>
                <div className="plan-price">
                  ₹1999{" "}
                  <span style={{ fontSize: "1rem", color: "#64748b" }}>
                    / month
                  </span>
                </div>
                <p style={{ marginTop: "0.5rem", color: "#64748b" }}>
                  Next billing date: <strong>Feb 1, 2026</strong>
                </p>
              </div>
              <button className="btn-secondary">Manage Subscription</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        {/* SIDEBAR */}
        <aside className="settings-sidebar">
          <button
            className={`settings-nav-item ${
              activeTab === "account" ? "active" : ""
            }`}
            onClick={() => setActiveTab("account")}
          >
            <FiUser /> Account
          </button>
          <button
            className={`settings-nav-item ${
              activeTab === "security" ? "active" : ""
            }`}
            onClick={() => setActiveTab("security")}
          >
            <FiShield /> Security
          </button>
          <button
            className={`settings-nav-item ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <FiBell /> Notifications
          </button>
          <button
            className={`settings-nav-item ${
              activeTab === "billing" ? "active" : ""
            }`}
            onClick={() => setActiveTab("billing")}
          >
            <FiCreditCard /> Billing
          </button>

          <div
            style={{ margin: "1rem 0", borderTop: "1px solid #e2e8f0" }}
          ></div>

          <button className="settings-nav-item" style={{ color: "#ef4444" }}>
            <FiTrash2 /> Delete Account
          </button>
        </aside>

        {/* CONTENT */}
        <main className="settings-content">
          {notification && (
            <div
              style={{
                background: "#ecfdf5",
                color: "#047857",
                padding: "1rem",
                margin: "1rem",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FiCheck /> {notification}
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;
