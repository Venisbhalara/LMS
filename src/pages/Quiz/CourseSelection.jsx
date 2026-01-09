import { useNavigate } from "react-router-dom";
import "./CourseSelection.css";

const courses = [
  { id: "react", name: "React", color: "#61dafb", icon: "⚛️" },
  { id: "python", name: "Python", color: "#306998", icon: "🐍" },
  { id: "node", name: "Node.js", color: "#68a063", icon: "🟢" },
  { id: "javascript", name: "JavaScript", color: "#f7df1e", icon: "🟡" },
];

const CourseSelection = () => {
  const navigate = useNavigate();

  const selectCourse = (courseId) => navigate(`/quiz/${courseId}`);

  return (
    <div className="course-selection-page">
      <h1 className="title">Select a Course to Start Quiz</h1>
      <p className="subtitle">Test your skills by choosing a course</p>
      <div className="cards-container">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            style={{ borderColor: course.color }}
            onClick={() => selectCourse(course.id)}
          >
            <div className="course-icon">{course.icon}</div>
            <h3>{course.name}</h3>
            <p>Start {course.name} Quiz</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSelection;
