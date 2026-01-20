import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [modalError, setModalError] = useState("");
  const { user, isAdmin, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // wait for auth to load

    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchUsers();
  }, [user, isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncExcel = async () => {
    // ... existing sync logic ...
    try {
      setIsSyncing(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users/sync-excel", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        alert("Excel file synced successfully!");
      } else {
        alert(data.message || "Failed to sync Excel file.");
      }
    } catch (err) {
      console.error("Error syncing Excel:", err);
      alert("Error syncing Excel file.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log("Submitting new user form...", newUserData);
    setIsAdding(true);
    setModalError(""); // Clear previous errors

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUserData),
      });

      console.log("Add User Response status:", response.status);
      const data = await response.json();
      console.log("Add User Response data:", data);

      if (data.success) {
        setShowAddModal(false);
        setNewUserData({ name: "", email: "", password: "", role: "student" });
        await fetchUsers(); // Refresh the list
        // alert("User added successfully!");
      } else {
        setModalError(data.message || "Failed to add user");
        console.error("Add user failed:", data.message);
        alert(`Failed to add user: ${data.message}`);
      }
    } catch (err) {
      console.error("Error adding user:", err);
      setModalError("Network error or server unreachable. Check console.");
      alert(
        "Error connecting to server. Please check your internet connection and try again.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  // ... handleNewUserChange, handleDelete, handleRefresh, formatDate, getRoleBadgeClass ...

  const handleNewUserChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (userId, userName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete user "${userName}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Remove user from local state
        setUsers(users.filter((u) => u.id !== userId));
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error connecting to server");
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "role-badge role-admin";
      case "instructor":
        return "role-badge role-instructor";
      default:
        return "role-badge role-student";
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="admin-users-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="admin-users-container">
        <div className="admin-header">
          <div className="header-content">
            <div>
              <h1>User Management</h1>
              <p>View and manage all registered users</p>
            </div>
            <div className="header-actions">
              <button
                onClick={handleSyncExcel}
                className="btn-refresh"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  marginRight: "10px",
                }}
                disabled={isSyncing}
              >
                {isSyncing ? "Syncing..." : "📊 Sync Excel"}
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log("Add User clicked");
                  setShowAddModal(true);
                }}
                className="btn-add-user"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Add User
              </button>
              <button onClick={handleRefresh} className="btn-refresh">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="admin-controls">
          <div className="search-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">{users.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Filtered</span>
              <span className="stat-value">{filteredUsers.length}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    {searchTerm
                      ? "No users found matching your search"
                      : "No users registered yet"}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, index) => (
                  <tr key={u.id}>
                    <td className="user-id">#{u.id}</td>
                    <td className="user-name">
                      <div className="name-cell">
                        <div className="avatar">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td className="user-email">{u.email}</td>
                    <td className={getRoleBadgeClass(u.role)}>{u.role}</td>
                    <td className="user-date">{formatDate(u.created_at)}</td>
                    <td className="user-actions">
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(u.id, u.name)}
                        title="Delete User"
                        disabled={user?.id === u.id}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ➕ ADD USER MODAL (PORTAL) */}
      {showAddModal &&
        createPortal(
          <div
            className="modal-overlay-portal"
            onClick={() => setShowAddModal(false)}
          >
            <div
              className="admin-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Add New User</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleAddUser} className="admin-add-form">
                {modalError && <div className="error-banner">{modalError}</div>}

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newUserData.name}
                    onChange={handleNewUserChange}
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={newUserData.email}
                    onChange={handleNewUserChange}
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={newUserData.password}
                    onChange={handleNewUserChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Assign Role</label>
                  <select
                    name="role"
                    value={newUserData.role}
                    onChange={handleNewUserChange}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isAdding}
                  >
                    {isAdding ? "Adding..." : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default AdminUsers;
