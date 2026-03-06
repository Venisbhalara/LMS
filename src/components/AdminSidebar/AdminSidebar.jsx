import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminSidebar.css";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: "🏠", end: true },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/courses", label: "Courses", icon: "📚" },
  { to: "/admin/enrollments", label: "Enrollments", icon: "🎓" },
  { to: "/admin/messages", label: "Messages", icon: "✉️" },
  { to: "/admin/help", label: "Help Requests", icon: "🆘" },
  { to: "/admin/careers", label: "Job Applications", icon: "💼" },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="adm-sidebar">
      {/* Brand */}
      <div className="adm-sidebar-brand">
        <div className="adm-sidebar-brand-icon" onClick={() => navigate("/")}>
          ⚡
        </div>
        <div className="pointer" onClick={() => navigate("/")}>
          <p className="adm-sidebar-brand-title">Admin Panel</p>
          <p className="adm-sidebar-brand-sub">LMS Control Center</p>
        </div>
      </div>

      <div className="adm-sidebar-divider" />

      {/* Navigation */}
      <nav className="adm-sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `adm-sidebar-link${isActive ? " active" : ""}`
            }
          >
            <span className="adm-sidebar-link-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="adm-sidebar-spacer" />

      {/* Visit Website */}
      {/* <button className="adm-sidebar-home" onClick={() => navigate("/")}>
          <span className="adm-sidebar-home-icon">🌐</span>
          <div className="adm-sidebar-home-text">
            <span className="adm-sidebar-home-label">Visit Website</span>
            <span className="adm-sidebar-home-sub">Go to home page</span>
          </div>
          <span className="adm-sidebar-home-arrow">↗</span>
        </button> */}

      {/* Logout */}
      <button className="adm-sidebar-logout" onClick={handleLogout}>
        <span>🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default AdminSidebar;
