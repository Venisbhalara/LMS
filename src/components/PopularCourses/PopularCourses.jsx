import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StarIcon, UsersIcon, ClockIcon, ArrowRightIcon } from "../Icons/Icons";
import "./PopularCourses.css";

/* =========================
   CATEGORY MAP
========================= */
const CATEGORY_MAP = {
  web: "Web Development",
  data: "Data Science",
  design: "Design",
  marketing: "Marketing",
  business: "Business",
  general: "General",
};

/* =========================
   COMPONENT
========================= */
const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch top 4 courses
        const response = await fetch(
          "http://localhost:5000/api/courses?limit=4",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();

        if (data.success) {
          // Map API data to component format
          const formattedCourses = data.data.map((course) => ({
            id: course.id,
            title: course.title,
            instructor: course.instructor || "Unknown Instructor",
            category: course.category || "general",
            rating: 4.8, // Default rating as not in DB
            students: 1200 + Math.floor(Math.random() * 5000), // Randomize students count
            price: course.price || "Free",
            duration: course.duration || "Unknown",
            thumbnail: course.image_url || "/images/courses/default.png", // Fallback image
            badge: getBadge(course.created_at),
          }));
          setCourses(formattedCourses);
        } else {
          setError("Failed to load courses");
        }
      } catch (err) {
        console.error("Error fetching popular courses:", err);
        setError("Could not load popular courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Helper to determine badge based on date or other logic
  const getBadge = (dateString) => {
    if (!dateString) return "Popular";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return "New";
    return "Bestseller";
  };

  if (loading) {
    return (
      <section className="popular-courses">
        <div
          className="container"
          style={{ textAlign: "center", padding: "4rem 0" }}
        >
          <p>Loading popular courses...</p>
        </div>
      </section>
    );
  }

  if (error) {
    // Silently fail or show minimal error so main page isn't broken
    return null;
  }

  // If no courses found, hide section or show message
  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="popular-courses">
      <div className="container">
        {/* Header */}
        <motion.div
          className="courses-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="courses-title">Popular Courses</h2>
          <p className="courses-subtitle">
            Learn from top instructors and trending courses
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Link to={`/courses/${course.id}`} className="course-card">
                {/* Image */}
                <div className="course-card-image">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/600x400?text=Course+Image";
                    }}
                  />

                  {course.badge && (
                    <span
                      className={`courses-badge ${course.badge.toLowerCase()}`}
                    >
                      {course.badge}
                    </span>
                  )}

                  <span className="course-category-badge">
                    {CATEGORY_MAP[course.category] || course.category}
                  </span>
                </div>

                {/* Content */}
                <div className="course-card-content">
                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-instructor">
                    by {course.instructor}
                  </p>

                  <div className="course-card-meta">
                    <div>
                      <StarIcon size={16} /> {course.rating}
                    </div>
                    <div>
                      <UsersIcon size={16} /> {course.students.toLocaleString()}
                    </div>
                    <div>
                      <ClockIcon size={16} /> {course.duration}
                    </div>
                  </div>

                  <div className="course-card-footer">
                    <div className="course-price">
                      <span className="price-current">{course.price}</span>
                    </div>

                    <span className="course-link">
                      View Course <ArrowRightIcon size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="courses-cta">
          <Link to="/courses" className="btn btn-outline btn-large">
            View All Courses
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
