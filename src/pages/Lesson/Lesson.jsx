import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import './Lesson.css'

const Lesson = () => {
  const { id, lessonId } = useParams()
  const [isComplete, setIsComplete] = useState(false)

  // Mock lesson data - in real app, fetch from API
  const lesson = {
    id: 1,
    title: 'Introduction to React',
    duration: '15:30',
    description: 'Learn the fundamentals of React and understand why it has become one of the most popular JavaScript libraries for building user interfaces.',
    videoUrl: 'https://example.com/video.mp4', // In real app, use actual video URL
    content: `
      <h3>What is React?</h3>
      <p>React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Facebook and the community.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Component-based architecture</li>
        <li>Virtual DOM for performance</li>
        <li>One-way data binding</li>
        <li>Declarative programming</li>
      </ul>
    `,
    resources: [
      { name: 'React Official Documentation', url: 'https://react.dev' },
      { name: 'Code Examples', url: '#' }
    ]
  }

  const handleComplete = () => {
    setIsComplete(!isComplete)
    // In real app, mark lesson as complete via API
  }

  return (
    <div className="lesson-page">
      <div className="container">
        <div className="lesson-header">
          <Link to={`/courses/${id}`} className="back-link">
            ← Back to Course
          </Link>
          <h1>{lesson.title}</h1>
        </div>

        <div className="lesson-content">
          <div className="lesson-main">
            <div className="video-container">
              <div className="video-placeholder">
                <div className="play-icon">▶</div>
                <p>Video Player</p>
                <p className="video-note">In production, this would be an actual video player component</p>
              </div>
            </div>

            <div className="lesson-description">
              <h2>About this lesson</h2>
              <p>{lesson.description}</p>
            </div>

            <div 
              className="lesson-text-content"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />

            <div className="lesson-resources">
              <h3>Resources</h3>
              <ul>
                {lesson.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      {resource.name} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lesson-actions">
              <button
                className={`btn ${isComplete ? 'btn-success' : 'btn-primary'} btn-large`}
                onClick={handleComplete}
              >
                {isComplete ? '✓ Lesson Completed' : 'Mark as Complete'}
              </button>
            </div>
          </div>

          <aside className="lesson-sidebar">
            <div className="lesson-navigation">
              <h3>Course Content</h3>
              <div className="nav-lessons">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Link
                    key={num}
                    to={`/courses/${id}/lessons/${num}`}
                    className={`nav-lesson ${num === parseInt(lessonId) ? 'active' : ''}`}
                  >
                    <span className="nav-lesson-number">{num}</span>
                    <span className="nav-lesson-title">Lesson {num}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Lesson

