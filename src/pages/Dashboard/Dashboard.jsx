import { Navigate } from "react-router-dom";
import { useAuth, ROLES } from "../../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "../InstructorDashboard/InstructorDashboard";
import AdminDashboard from "./AdminDashboard";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case ROLES.STUDENT:
      return <StudentDashboard />;
    case ROLES.INSTRUCTOR:
      return <InstructorDashboard />;
    case ROLES.ADMIN:
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default Dashboard;
