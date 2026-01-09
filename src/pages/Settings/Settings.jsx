import { useState, useEffect } from 'react';
import './Settings.css';

const defaultFormData = {
  name: localStorage.getItem('name') || 'John Doe',
  email: localStorage.getItem('email') || 'john.doe@example.com',
  password: '',
  confirmPassword: '',
  notifications: JSON.parse(localStorage.getItem('notifications')) ?? true,
  emailUpdates: JSON.parse(localStorage.getItem('emailUpdates')) ?? true,
  theme: localStorage.getItem('theme') || 'light'
};

const Settings = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  // Live theme preview
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', formData.theme);
  }, [formData.theme]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password || formData.confirmPassword) {
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save changes to localStorage (simulate backend save)
    localStorage.setItem('name', formData.name);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('notifications', JSON.stringify(formData.notifications));
    localStorage.setItem('emailUpdates', JSON.stringify(formData.emailUpdates));
    localStorage.setItem('theme', formData.theme);

    setSavedMessage('Settings saved successfully!');
    setErrors({});
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  // Reset form to last saved data
  const handleReset = () => {
    const savedData = {
      name: localStorage.getItem('name') || 'John Doe',
      email: localStorage.getItem('email') || 'john.doe@example.com',
      password: '',
      confirmPassword: '',
      notifications: JSON.parse(localStorage.getItem('notifications')) ?? true,
      emailUpdates: JSON.parse(localStorage.getItem('emailUpdates')) ?? true,
      theme: localStorage.getItem('theme') || 'light'
    };
    setFormData(savedData);
    setErrors({});
    setSavedMessage('');
  };

  return (
    <div className="settings-page">
      <div className="container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          {/* Profile Section */}
          <section className="settings-section">
            <h2>Profile Information</h2>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </section>

          {/* Notifications Section */}
          <section className="settings-section">
            <h2>Notifications</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <span>Enable push notifications</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailUpdates"
                checked={formData.emailUpdates}
                onChange={handleChange}
              />
              <span>Receive email updates</span>
            </label>
          </section>

          {/* Theme Section */}
          <section className="settings-section">
            <h2>Preferences</h2>
            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="form-input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </section>

          {/* Actions */}
          <div className="settings-actions">
            <button type="submit" className="btn btn-primary btn-large">Save Changes</button>
            <button type="button" className="btn btn-text btn-large" onClick={handleReset}>Reset</button>
          </div>

          {savedMessage && <p className="success-text">{savedMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Settings;
