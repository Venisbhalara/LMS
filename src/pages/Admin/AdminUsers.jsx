import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import DeleteConfirmModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import "./AdminUsers.css";

/* ─── Inline SVG Icons ─────────────────────────────────────────── */
const Icons = {
  Users: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  UserPlus: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  Refresh: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
    </svg>
  ),
  Excel: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Search: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  Close: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  AddUser: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Warning: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Empty: () => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
};

/* ─── Role helpers ─────────────────────────────────────────────── */
const ROLE_CONFIG = {
  admin: { cls: "role-admin", label: "Admin" },
  instructor: { cls: "role-instructor", label: "Instructor" },
  student: { cls: "role-student", label: "Student" },
};

const getRoleBadge = (role) => ROLE_CONFIG[role] ?? ROLE_CONFIG.student;

/* ─── Date formatter ───────────────────────────────────────────── */
const formatDate = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/* ─── Main Component ───────────────────────────────────────────── */
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [modalError, setModalError] = useState("");
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [user, isAdmin, navigate]);

  /* API calls */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.data);
      else setError(data.message || "Failed to fetch users");
    } catch {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSyncExcel = async () => {
    try {
      setIsSyncing(true);
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users/sync-excel", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(
        data.success
          ? "Excel file synced successfully!"
          : data.message || "Failed to sync.",
      );
    } catch {
      alert("Error syncing Excel file.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setModalError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUserData),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewUserData({ name: "", email: "", password: "", role: "student" });
        await fetchUsers();
      } else {
        setModalError(data.message || "Failed to add user");
      }
    } catch {
      setModalError("Network error. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    setDeleteTarget({ id: userId, name: userName });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    setDeleteTarget(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers((prev) => prev.filter((u) => u.id !== id));
      else alert(data.message || "Failed to delete user");
    } catch {
      alert("Error connecting to server");
    }
  };

  const handleFieldChange = (e) =>
    setNewUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /* Derived stats */
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const adminCount = users.filter((u) => u.role === "admin").length;
  const instructorCount = users.filter((u) => u.role === "instructor").length;
  const studentCount = users.filter((u) => u.role === "student").length;

  /* ─── Loading screen ─── */
  if (loading) {
    return (
      <div className="adm-layout">
        <AdminSidebar />
        <div className="admin-users-page">
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading users…</p>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main render ─── */
  return (
    <div className="adm-layout">
      <AdminSidebar />
      <div className="admin-users-page">
        <div className="admin-users-container">
          {/* ── Header ── */}
          <div className="admin-header">
            <div className="header-content">
              <div className="header-title-group">
                <div className="header-icon">
                  <Icons.Users />
                </div>
                <div>
                  <h1>User Management</h1>
                  <p className="header-subtitle">
                    Manage all registered users and their roles
                  </p>
                </div>
              </div>

              <div className="header-actions">
                <button
                  className="adm-btn adm-btn-success"
                  onClick={handleSyncExcel}
                  disabled={isSyncing}
                >
                  <Icons.Excel />
                  {isSyncing ? "Syncing…" : "Sync Excel"}
                </button>

                <button className="adm-btn adm-btn-ghost" onClick={fetchUsers}>
                  <Icons.Refresh />
                  Refresh
                </button>

                <button
                  className="adm-btn adm-btn-primary"
                  onClick={() => {
                    setModalError("");
                    setShowAddModal(true);
                  }}
                >
                  <Icons.UserPlus />
                  Add User
                </button>
              </div>
            </div>
            <div className="admin-divider" />
          </div>

          {/* ── Stats strip ── */}
          <div className="admin-stats-strip">
            <div className="stat-pill">
              <div className="stat-pill-icon indigo">👥</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{users.length}</span>
                <span className="stat-pill-label">Total Users</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon purple">🎓</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{studentCount}</span>
                <span className="stat-pill-label">Students</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon amber">📚</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{instructorCount}</span>
                <span className="stat-pill-label">Instructors</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon green">🛡️</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{adminCount}</span>
                <span className="stat-pill-label">Admins</span>
              </div>
            </div>
          </div>

          {/* ── Toolbar ── */}
          <div className="admin-toolbar">
            <div className="search-box">
              <Icons.Search />
              <input
                type="text"
                placeholder="Search by name, email, or role…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <span className="filter-count-badge">
                {filteredUsers.length} of {users.length} shown
              </span>
            </div>
          </div>

          {/* ── Error Banner ── */}
          {error && (
            <div className="error-banner">
              <Icons.Warning />
              {error}
            </div>
          )}

          {/* ── Table ── */}
          <div className="users-table-container">
            <div className="table-scroll">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data-cell">
                        <div className="no-data-inner">
                          <div className="no-data-icon">
                            <Icons.Empty />
                          </div>
                          <p className="no-data-title">No users found</p>
                          <p className="no-data-desc">
                            {searchTerm
                              ? "Try adjusting your search query."
                              : "No users have been registered yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const badge = getRoleBadge(u.role);
                      return (
                        <tr key={u.id}>
                          <td className="user-id">#{u.id}</td>
                          <td className="user-name">
                            <div className="name-cell">
                              <div className="avatar">
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="user-name-text">{u.name}</span>
                            </div>
                          </td>
                          <td className="user-email">{u.email}</td>
                          <td>
                            <span className={`role-badge ${badge.cls}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="user-date">
                            {formatDate(u.created_at)}
                          </td>
                          <td>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(u.id, u.name)}
                              title="Delete user"
                              disabled={user?.id === u.id}
                            >
                              <Icons.Trash />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add User Modal (Portal) ── */}
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
              {/* Modal header */}
              <div className="modal-header">
                <div className="modal-header-left">
                  <div className="modal-header-icon">
                    <Icons.AddUser />
                  </div>
                  <div>
                    <h2>Add New User</h2>
                    <p className="modal-subtitle">
                      Create a new account and assign a role
                    </p>
                  </div>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  <Icons.Close />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAddUser} className="admin-add-form">
                {modalError && (
                  <div className="error-banner">
                    <Icons.Warning />
                    {modalError}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="au-name">Full Name</label>
                  <input
                    id="au-name"
                    type="text"
                    name="name"
                    value={newUserData.name}
                    onChange={handleFieldChange}
                    placeholder="e.g. Jane Smith"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="au-email">Email Address</label>
                  <input
                    id="au-email"
                    type="email"
                    name="email"
                    value={newUserData.email}
                    onChange={handleFieldChange}
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="au-password">Password</label>
                  <input
                    id="au-password"
                    type="password"
                    name="password"
                    value={newUserData.password}
                    onChange={handleFieldChange}
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="au-role">Assign Role</label>
                  <select
                    id="au-role"
                    name="role"
                    value={newUserData.role}
                    onChange={handleFieldChange}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="adm-btn-cancel"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="adm-btn-submit"
                    disabled={isAdding}
                  >
                    {isAdding ? "Creating…" : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        itemType="user"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminUsers;
