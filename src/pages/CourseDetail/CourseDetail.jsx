import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { StarIcon, PlayIcon, BookIcon, ClockIcon, UsersIcon, CertificateIcon } from '../../components/Icons/Icons'
import { getCourseImage, getInstructorAvatar } from '../../utils/images'
import './CourseDetail.css'

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, enrollInCourse, isEnrolled } = useAuth()
  const courseId = parseInt(id)
  const enrolled = isEnrolled(courseId)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})

  // Mock course data - in real app, fetch from API
  const course = {
    id: 1,
    title: 'Complete React Mastery',
    instructor: {
      name: 'John Doe',
      title: 'Senior Frontend Engineer',
      bio: 'John is a seasoned frontend developer with over 10 years of experience building scalable web applications. He has worked at top tech companies including Google and Facebook, and has taught over 50,000 students worldwide.',
      avatar: getInstructorAvatar('John Doe'),
      credentials: ['Ex-Google Engineer', 'React Core Contributor', 'Author of "Modern React Patterns"'],
      rating: 4.9,
      students: 125000,
      courses: 12
    },
    category: 'Web Development',
    rating: 4.8,
    totalRatings: 3420,
    students: 12500,
    price: 2599,
    image: getCourseImage(1, 'web', 'Complete React Mastery'),
    duration: '40 hours',
    level: 'Intermediate',
    description: 'Master React from fundamentals to advanced patterns. Build real-world applications and learn best practices from industry experts. This comprehensive course covers everything you need to become a React expert, from basic concepts to production-ready applications.',
    whatYouWillLearn: [
      'React fundamentals and core concepts',
      'State management with hooks and Context API',
      'Routing with React Router',
      'Performance optimization techniques',
      'Testing React applications',
      'Deploying React apps to production',
      'Advanced patterns and best practices',
      'Working with APIs and data fetching'
    ],
    curriculum: [
      {
        id: 1,
        title: 'Getting Started with React',
        lessons: [
          { id: 1, title: 'Introduction to React', duration: '15:30', type: 'video', preview: true },
          { id: 2, title: 'Setting Up Your Development Environment', duration: '12:45', type: 'video', preview: true },
          { id: 3, title: 'Your First React Component', duration: '18:20', type: 'video', preview: false },
          { id: 4, title: 'JSX Fundamentals', duration: '22:10', type: 'video', preview: false }
        ]
      },
      {
        id: 2,
        title: 'Components and Props',
        lessons: [
          { id: 5, title: 'Understanding Components', duration: '14:25', type: 'video', preview: false },
          { id: 6, title: 'Working with Props', duration: '16:40', type: 'video', preview: false },
          { id: 7, title: 'Component Composition', duration: '19:15', type: 'video', preview: false },
          { id: 8, title: 'Practice Exercise: Building a Card Component', duration: '25:00', type: 'exercise', preview: false }
        ]
      },
      {
        id: 3,
        title: 'State and Lifecycle',
        lessons: [
          { id: 9, title: 'Introduction to State', duration: '20:30', type: 'video', preview: false },
          { id: 10, title: 'useState Hook Deep Dive', duration: '24:45', type: 'video', preview: false },
          { id: 11, title: 'useEffect Hook', duration: '28:20', type: 'video', preview: false },
          { id: 12, title: 'Component Lifecycle', duration: '16:10', type: 'video', preview: false }
        ]
      },
      {
        id: 4,
        title: 'Advanced React Patterns',
        lessons: [
          { id: 13, title: 'Custom Hooks', duration: '22:30', type: 'video', preview: false },
          { id: 14, title: 'Context API', duration: '26:15', type: 'video', preview: false },
          { id: 15, title: 'Higher-Order Components', duration: '18:45', type: 'video', preview: false },
          { id: 16, title: 'Render Props Pattern', duration: '21:20', type: 'video', preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: { name: 'Sarah Johnson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=200&background=0c88ff&color=fff&bold=true' },
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent course! John explains everything clearly and the projects are very practical. I learned so much and was able to apply it immediately at work.'
      },
      {
        id: 2,
        user: { name: 'Michael Chen', avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&size=200&background=0c88ff&color=fff&bold=true' },
        rating: 5,
        date: '2024-01-10',
        comment: 'Best React course I\'ve taken. The instructor is knowledgeable and the curriculum is well-structured. Highly recommend!'
      },
      {
        id: 3,
        user: { name: 'Emily Rodriguez', avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&size=200&background=0c88ff&color=fff&bold=true' },
        rating: 4,
        date: '2024-01-08',
        comment: 'Great content and explanations. Some sections could use more examples, but overall a solid course.'
      },
      {
        id: 4,
        user: { name: 'David Kim', avatar: 'https://ui-avatars.com/api/?name=David+Kim&size=200&background=0c88ff&color=fff&bold=true' },
        rating: 5,
        date: '2024-01-05',
        comment: 'Perfect for intermediate developers. The advanced patterns section was particularly helpful. Worth every penny!'
      },
      {
        id: 5,
        user: { name: 'Lisa Anderson', avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&size=200&background=0c88ff&color=fff&bold=true' },
        rating: 4,
        date: '2024-01-03',
        comment: 'Good course with comprehensive coverage. The instructor is engaging and the material is up-to-date.'
      }
    ]
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const totalLessons = course.curriculum.reduce((sum, section) => sum + section.lessons.length, 0)
  const previewLessons = course.curriculum.flatMap(section => 
    section.lessons.filter(lesson => lesson.preview)
  )

  return (  
    <div className="course-detail">
      <div className="container">
        {/* Course Hero Section */}
        <motion.div
          className="course-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="course-hero-content">
            {/* <div className="course-badge">{course.category}</div> */}
            <h1>{course.title}</h1>
            <p className="course-instructor">by {course.instructor.name}</p>
            <p className="course-description">{course.description}</p>
            
            <div className="course-meta">
              <div className="course-meta-item">
                <span className="meta-label">Rating</span>
                <span className="meta-value">
                  <StarIcon size={18} style={{ display: 'inline', marginRight: '4px', fill: '#fbbf24' }} />
                  {course.rating} ({course.totalRatings.toLocaleString()})
                </span>
              </div>
              <div className="course-meta-item">
                <span className="meta-label">Students</span>
                <span className="meta-value">👥 {course.students.toLocaleString()}</span>
              </div>
              <div className="course-meta-item">
                <span className="meta-label">Duration</span>
                <span className="meta-value">⏱️ {course.duration}</span>
              </div>
              <div className="course-meta-item">
                <span className="meta-label">Level</span>
                <span className="meta-value">{course.level}</span>
              </div>
            </div>

            <div className="course-actions">
              {isAuthenticated && enrolled ? (
                <>
                  <Link to={`/courses/${id}/lessons/1`} className="btn btn-primary btn-large">
                    <PlayIcon size={20} style={{ marginRight: '8px' }} />
                    Continue Learning
                  </Link>
                  <button 
                    className={`btn btn-outline btn-large ${isWishlisted ? 'wishlisted' : ''}`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    {isWishlisted ? '❤️' : '🤍'} Wishlist
                  </button>
                </>
              ) : isAuthenticated ? (
                <>
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={() => {
                      enrollInCourse(courseId)
                      navigate(`/courses/${id}/lessons/1`)
                    }}
                  >
                    Enroll Now - ₹{course.price}
                  </button>
                  <button 
                    className={`btn btn-outline btn-large ${isWishlisted ? 'wishlisted' : ''}`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    {isWishlisted ? '❤️' : '🤍'} Wishlist
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-primary btn-large">
                    Login to Enroll - ₹{course.price}
                  </Link>
                  <button className="btn btn-outline btn-large">Add to Wishlist</button>
                </>
              )}
            </div>
          </div>

          <div className="course-hero-visual">
            <div className="course-image-large">
              <img 
                src={course.image} 
                alt={course.title}
                className="course-hero-image"
              />
            </div>
          </div>
        </motion.div>

        <div className="course-content">
          <div className="course-main">
            {/* Learning Outcomes */}
            <section className="course-section">
              <h2>What You'll Learn</h2>
              <ul className="learning-list">
                {course.whatYouWillLearn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Instructor Section */}
            <section className="course-section">
              <h2>Your Instructor</h2>
              <div className="instructor-card">
                {/* <div className="instructor-avatar">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    className="instructor-avatar-img"
                  />
                </div> */}
                <div className="instructor-info">
                  <h3>{course.instructor.name}</h3>
                  <p className="instructor-title">{course.instructor.title}</p>
                  <div className="instructor-stats">
                    <div className="instructor-stat-item">
                      <StarIcon size={16} style={{ fill: '#fbbf24' }} />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <div className="instructor-stat-item">
                      <UsersIcon size={16} />
                      <span>{course.instructor.students.toLocaleString()} Students</span>
                    </div>
                    <div className="instructor-stat-item">
                      <BookIcon size={16} />
                      <span>{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                  <p className="instructor-bio">{course.instructor.bio}</p>
                  <div className="instructor-credentials">
                    <h4>Credentials</h4>
                    <ul>
                      {course.instructor.credentials.map((cred, index) => (
                        <li key={index}>{cred}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Curriculum Preview */}
            <section className="course-section">
              <div className="section-header-flex">
                <h2>Course Curriculum</h2>
                <span className="curriculum-stats">{course.curriculum.length} sections • {totalLessons} lessons</span>
              </div>
              <div className="curriculum-list">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={section.id} className="curriculum-section">
                    <button 
                      className="curriculum-section-header"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="section-header-left">
                        <span className="section-toggle">{expandedSections[section.id] ? '▼' : '▶'}</span>
                        <div>
                          <h3 className="section-title">{section.title}</h3>
                          <span className="section-lesson-count">{section.lessons.length} lessons</span>
                        </div>
                      </div>
                      <span className="section-duration">
                        {section.lessons.reduce((sum, lesson) => {
                          const mins = parseInt(lesson.duration.split(':')[0]) * 60 + parseInt(lesson.duration.split(':')[1])
                          return sum + mins
                        }, 0)} min
                      </span>
                    </button>
                    {expandedSections[section.id] && (
                      <div className="curriculum-lessons">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <Link
                            key={lesson.id}
                            to={lesson.preview || enrolled ? `/courses/${id}/lessons/${lesson.id}` : '#'}
                            className={`lesson-item ${lesson.preview ? 'preview-lesson' : ''} ${!enrolled && !lesson.preview ? 'locked' : ''}`}
                          >
                            <div className="lesson-number">{lessonIndex + 1}</div>
                            <div className="lesson-info">
                              <div className="lesson-title-row">
                                <span className="lesson-title">{lesson.title}</span>
                                {lesson.preview && <span className="preview-badge">Preview</span>}
                              </div>
                              <div className="lesson-meta">
                                <span className="lesson-type">{lesson.type}</span>
                                <span className="lesson-duration">{lesson.duration}</span>
                              </div>
                            </div>
                            {enrolled || lesson.preview ? (
                              <div className="lesson-play">▶</div>
                            ) : (
                              <div className="lesson-lock">🔒</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews & Ratings */}
            <section className="course-section">
              <div className="reviews-header">
                <div>
                  <h2>Student Reviews</h2>
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <span className="rating-value">{course.rating}</span>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            size={24} 
                            style={{ fill: i < Math.floor(course.rating) ? '#fbbf24' : '#e5e7eb' }} 
                          />
                        ))}
                      </div>
                      <span className="rating-count">({course.totalRatings.toLocaleString()} ratings)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reviews-list">
                {course.reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-user">
                        <img 
                          src={review.user.avatar} 
                          alt={review.user.name}
                          className="review-avatar"
                        />
                        <div>
                          <div className="review-name">{review.user.name}</div>
                          <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            size={16} 
                            style={{ fill: i < review.rating ? '#fbbf24' : '#e5e7eb' }} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="course-sidebar">
            <div className="sidebar-card">
              {!enrolled && <div className="course-price-large">₹{course.price}</div>}
              {isAuthenticated && enrolled ? (
                <Link to={`/courses/${id}/lessons/1`} className="btn btn-primary btn-large btn-full">
                  <PlayIcon size={20} style={{ marginRight: '8px' }} />
                  Continue Learning
                </Link>
              ) : isAuthenticated ? (
                <button 
                  className="btn btn-primary btn-large btn-full"
                  onClick={() => {
                    enrollInCourse(courseId)
                    navigate(`/courses/${id}/lessons/1`)
                  }}
                >
                  Enroll in Course
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary btn-large btn-full">
                  Login to Enroll
                </Link>
              )}
              <div className="sidebar-features">
                <div className="sidebar-feature">
                  <CertificateIcon size={20} />
                  <span>Certificate of completion</span>
                </div>
                <div className="sidebar-feature">
                  <ClockIcon size={20} />
                  <span>Lifetime access</span>
                </div>
                <div className="sidebar-feature">
                  <BookIcon size={20} />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="sidebar-feature">
                  <span>✅ 30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
