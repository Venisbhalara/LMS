import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  StarIcon,
  UsersIcon,
  ClockIcon,
  ArrowRightIcon
} from '../Icons/Icons'
import './PopularCourses.css'

/* =========================
   CATEGORY MAP
========================= */
const CATEGORY_MAP = {
  web: 'Web Development',
  data: 'Data Science',
  design: 'Design'
}

/* =========================
   POPULAR COURSES DATA
========================= */
const POPULAR_COURSES = [
  {
    id: 1,
    title: 'Complete React Mastery',
    instructor: 'John Doe',
    category: 'web',
    rating: 4.9,
    students: 12500,
    price: '₹2599',
    duration: '40 hours',
    thumbnail: '/images/courses/react.png',
    badge: 'Bestseller'
  },
  {
    id: 2,
    title: 'Python for Data Science',
    instructor: 'Jane Smith',
    category: 'data',
    rating: 4.8,
    students: 8900,
    price: '₹1899',
    duration: '50 hours',
    thumbnail: '/images/courses/python.png',
    badge: 'Trending'
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Sarah Johnson',
    category: 'design',
    rating: 4.9,
    students: 15200,
    price: '₹1299',
    duration: '30 hours',
    thumbnail: '/images/courses/uiux.png',
    badge: 'New'
  },
  {
    id: 4,
    title: 'Advanced JavaScript',
    instructor: 'Emily Davis',
    category: 'web',
    rating: 4.8,
    students: 11200,
    price: '₹999',
    duration: '35 hours',
    thumbnail: '/images/courses/javascript.png'
  }

]

/* =========================
   COMPONENT
========================= */
const PopularCourses = () => {
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
          {POPULAR_COURSES.map((course, index) => (
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
                  />

                  {course.badge && (
                    <span
                      className={`courses-badge ${course.badge.toLowerCase()}`}
                    >
                      {course.badge}
                    </span>
                  )}

                  <span className="course-category-badge">
                    {CATEGORY_MAP[course.category]}
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
                      <UsersIcon size={16} />{' '}
                      {course.students.toLocaleString()}
                    </div>
                    <div>
                      <ClockIcon size={16} /> {course.duration}
                    </div>
                  </div>

                  <div className="course-card-footer">
                    <div className="course-price">
                      <span className="price-current">
                        {course.price}
                      </span>
                      <span className="price-original">
                        {course.originalPrice}
                      </span>
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
  )
}

export default PopularCourses
