import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// User roles
export const ROLES = {
  STUDENT: "student",
  INSTRUCTOR: "instructor",
  ADMIN: "admin",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Perform session check on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("lms_user");

      if (token && savedUser) {
        try {
          // Verify with backend that user actually exists
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (data.success) {
            // User exists and token is valid
            try {
              setUser(JSON.parse(savedUser));
            } catch (e) {
              console.error("Error parsing saved user", e);
              localStorage.removeItem("lms_user");
              localStorage.removeItem("token");
            }
          } else {
            // Token invalid or User deleted
            console.warn("Session invalid:", data.message);
            localStorage.removeItem("lms_user");
            localStorage.removeItem("token");
            setUser(null);

            // Specific check for deleted user
            if (
              response.status === 401 &&
              data.message === "User account not found"
            ) {
              alert(
                "Admin has deleted your account please sign up with the another account",
              );
            } else if (
              response.status === 404 &&
              data.message === "User not found"
            ) {
              // Fallback for the /me endpoint 404
              alert(
                "Admin has deleted your account please sign up with the another account",
              );
            }
          }
        } catch (error) {
          console.error("Session verification error:", error);
          // On network error, we might want to keep the local session or not.
          // For safety/strictness, we can assume valid unless proven otherwise,
          // but if we are verifying "deleted" status, we depend on the server.
          // Let's fallback to local data if server is unreachable (offline mode support)
          // but if the server IS reachable and says "nope", we logout.
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {}
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          token: data.data.token,
          avatar: "👤",
          joinDate: new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          enrolledCourses: [],
          completedCourses: [],
          certificates: [],
        };

        setUser(userData);
        localStorage.setItem("lms_user", JSON.stringify(userData));
        localStorage.setItem("token", data.data.token);
        return { success: true, user: userData };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Error connecting to server" };
    }
  };

  const signup = async (name, email, password, role = ROLES.STUDENT) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          token: data.data.token,
          avatar: "👤",
          joinDate: new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          enrolledCourses: [],
          completedCourses: [],
          certificates: [],
        };

        setUser(userData);
        localStorage.setItem("lms_user", JSON.stringify(userData));
        localStorage.setItem("token", data.data.token);
        return { success: true, user: userData };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "Error connecting to server" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
    localStorage.removeItem("token");
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("lms_user", JSON.stringify(updatedUser));
  };

  const restoreSession = (userData) => {
    setUser(userData);
    localStorage.setItem("lms_user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const enrollInCourse = async (courseId) => {
    if (!user) return { success: false, message: "User not logged in" };

    // Optimistic update (optional) or wait for server
    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Assuming user object has token
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state if successful
        if (!user.enrolledCourses.includes(courseId)) {
          const updatedUser = {
            ...user,
            enrolledCourses: [...(user.enrolledCourses || []), courseId],
          };
          setUser(updatedUser);
          localStorage.setItem("lms_user", JSON.stringify(updatedUser));
        }
        return { success: true };
      } else {
        console.error("Enrollment failed:", data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      return { success: false, message: "Network error" };
    }
  };

  const unenrollFromCourse = async (courseId) => {
    if (!user || !user.enrolledCourses)
      return { success: false, message: "User not logged in" };

    try {
      const response = await fetch(`/api/enrollments/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const updatedUser = {
          ...user,
          enrolledCourses: user.enrolledCourses.filter((id) => id !== courseId),
        };
        setUser(updatedUser);
        localStorage.setItem("lms_user", JSON.stringify(updatedUser));
        return { success: true };
      } else {
        console.error("Unenrollment failed:", data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Unenrollment error:", error);
      return { success: false, message: "Network error" };
    }
  };

  const isEnrolled = (courseId) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    restoreSession,
    enrollInCourse,
    unenrollFromCourse,
    isEnrolled,
    hasRole,
    isAuthenticated: !!user,
    isStudent: user?.role === ROLES.STUDENT,
    isInstructor: user?.role === ROLES.INSTRUCTOR,
    isAdmin: user?.role === ROLES.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
