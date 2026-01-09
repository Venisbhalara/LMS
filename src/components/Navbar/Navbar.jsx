import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, ROLES } from "../../context/AuthContext";
import {
  SearchIcon,
  ChevronDownIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
} from "../Icons/Icons";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const categories = [
    { id: "web", name: "Web Development", path: "/courses?category=web" },
    { id: "data", name: "Data Science", path: "/courses?category=data" },
    { id: "design", name: "Design", path: "/courses?category=design" },
    { id: "business", name: "Business", path: "/courses?category=business" },
    {
      id: "mobile",
      name: "Mobile Development",
      path: "/courses?category=mobile",
    },
    { id: "all", name: "All Categories", path: "/courses" },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand" aria-label="EduMaster Home">
          <div className="navbar-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="10" fill="url(#logoGradient)" />
              <path
                d="M20 10L25 16H22V26H18V16H15L20 10Z"
                fill="white"
                fillOpacity="0.95"
              />
              <path d="M10 30H30V27H10V30Z" fill="white" fillOpacity="0.95" />
              <path d="M12 20H28V18H12V20Z" fill="white" fillOpacity="0.85" />
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6366f1" />
                  <stop offset="0.5" stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <span className="navbar-brand-name">EduMaster</span>
          </div>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search courses"
            className="navbar-search-input"
          />
          <button
            type="submit"
            className="navbar-search-button"
            aria-label="Submit search"
          >
            <SearchIcon size={20} />
          </button>
        </form>

        {/* Navigation Items */}
        <div className="navbar-nav">
          {/* Browse Categories Dropdown */}
          <div className="navbar-dropdown" ref={categoriesRef}>
            <button
              className="navbar-dropdown-trigger"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              aria-expanded={isCategoriesOpen}
              aria-haspopup="true"
            >
              Browse Categories
              <ChevronDownIcon
                size={16}
                className={`dropdown-icon ${isCategoriesOpen ? "open" : ""}`}
              />
            </button>
            {isCategoriesOpen && (
              <div className="navbar-dropdown-menu categories-menu">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={category.path}
                    className="dropdown-item"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="navbar-actions">
            <Link to="/pricing" className="btn btn-text">
              Pricing
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-text">
                  Dashboard
                </Link>
                {user?.role === ROLES.INSTRUCTOR && (
                  <Link to="/instructor/courses" className="btn btn-text">
                    My Courses
                  </Link>
                )}
                {user?.role === ROLES.ADMIN && (
                  <Link to="/admin" className="btn btn-text">
                    Admin
                  </Link>
                )}

                {/* User Menu Dropdown */}
                <div className="navbar-dropdown" ref={userMenuRef}>
                  <button
                    className="navbar-user-trigger"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="navbar-user-avatar">
                      {user?.avatar ? (
                        <span>{user.avatar}</span>
                      ) : (
                        <UserIcon size={20} />
                      )}
                    </div>
                    <span className="navbar-user-name">
                      {user?.name || "User"}
                    </span>
                    <ChevronDownIcon
                      size={16}
                      className={`dropdown-icon ${
                        isUserMenuOpen ? "open" : ""
                      }`}
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="navbar-dropdown-menu user-menu">
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserIcon size={18} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="dropdown-item"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <SettingsIcon size={18} />
                        <span>Settings</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item dropdown-item-danger"
                        onClick={handleLogout}
                      >
                        <LogOutIcon size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-text">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={isMobileMenuOpen ? "open" : ""}></span>
            <span className={isMobileMenuOpen ? "open" : ""}></span>
            <span className={isMobileMenuOpen ? "open" : ""}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="mobile-menu-item">
              Dashboard
            </Link>
            {user?.role === ROLES.INSTRUCTOR && (
              <Link to="/instructor/courses" className="mobile-menu-item">
                My Courses
              </Link>
            )}
            {user?.role === ROLES.ADMIN && (
              <Link to="/admin" className="mobile-menu-item">
                Admin
              </Link>
            )}
            <div className="mobile-menu-divider"></div>
            <div className="mobile-menu-categories">
              <div className="mobile-menu-header">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.path}
                  className="mobile-menu-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="mobile-menu-divider"></div>
            <Link to="/profile" className="mobile-menu-item">
              Profile
            </Link>
            <Link to="/settings" className="mobile-menu-item">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="mobile-menu-item mobile-menu-item-danger"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mobile-menu-item">
              Login
            </Link>
            <Link
              to="/signup"
              className="mobile-menu-item mobile-menu-item-primary"
            >
              Sign Up
            </Link>
            <div className="mobile-menu-divider"></div>
            <div className="mobile-menu-categories">
              <div className="mobile-menu-header">Browse Categories</div>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.path}
                  className="mobile-menu-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
