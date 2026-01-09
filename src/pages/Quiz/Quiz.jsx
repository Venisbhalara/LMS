import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const quizData = {
  title: "React Basics Quiz",
  duration: 300, // 5 minutes
  passPercentage: 60,
  questions: [
    {
      question: "What is React?",
      options: ["A backend framework", "A JavaScript library", "A database", "A CSS framework"],
      correctAnswer: 1,
    },
    {
      question: "Which hook is used for state management?", 
      options: ["useRef", "useEffect", "useState", "useMemo"],
      correctAnswer: 2,
    },
    {
      question: "JSX stands for?",
      options: ["JavaScript XML", "JavaScript Extra", "Java Simple X", "JavaScript Xtreme"],
      correctAnswer: 0,
    },
    // Add more questions up to 15 as needed
    {
      question: "How do you pass data from parent to child?",
      options: ["Props", "State", "Context", "Ref"],
      correctAnswer: 0,
    },
    {
      question: "What is a key used for in React?",
      options: ["Tracking elements in DOM", "Styling components", "Managing state", "Routing"],
      correctAnswer: 0,
    },
    {
      question: "Which method renders JSX to the DOM?",
      options: ["ReactDOM.render()", "React.createElement()", "useState()", "useEffect()"],
      correctAnswer: 0,
    },
    {
      question: "What is the default behavior of forms in React?",
      options: ["Submit reloads page", "Submit prevents reload", "Form cannot submit", "Form auto-validates"],
      correctAnswer: 0,
    },
    {
      question: "How do you conditionally render components?",
      options: ["If-Else in JSX", "Ternary operator", "Logical && operator", "All of the above"],
      correctAnswer: 3,
    },
    {
      question: "Which hook runs after every render?",
      options: ["useState", "useEffect", "useMemo", "useRef"],
      correctAnswer: 1,
    },
    {
      question: "How do you lift state up?",
      options: ["Pass props to parent", "Use context", "Move state to common ancestor", "Use useReducer"],
      correctAnswer: 2,
    },
    {
      question: "Which is used for side effects in React?",
      options: ["useState", "useEffect", "useReducer", "useMemo"],
      correctAnswer: 1,
    },
    {
      question: "How do you create a controlled component?",
      options: ["Component manages its own state", "State is controlled by parent", "No state", "Using useRef only"],
      correctAnswer: 1,
    },
    {
      question: "What is Context used for?",
      options: ["State management across components", "Styling components", "Routing", "Event handling"],
      correctAnswer: 0,
    },
    {
      question: "Which is a class component lifecycle method?",
      options: ["componentDidMount", "useEffect", "useState", "renderHook"],
      correctAnswer: 0,
    },
    {
      question: "Which of these is correct for fragment?",
      options: ["<React.Fragment></React.Fragment>", "<></>", "Both A and B", "<Fragment></Fragment>"],
      correctAnswer: 2,
    },
    {
      question: "What is React Router used for?",
      options: ["State management", "Routing", "Styling components", "Testing"],
      correctAnswer: 1,
    },
    {
      question: "What is the default behavior of forms in React?",
      options: ["Submit reloads page", "Submit prevents reload", "Form cannot submit", "Form auto-validates"],
      correctAnswer: 0,
    },
    {
      question: "How do you conditionally render components?",
      options: ["If-Else in JSX", "Ternary operator", "Logical && operator", "All of the above"],
      correctAnswer: 3,
    },
    {
      question: "Which hook runs after every render?",
      options: ["useState", "useEffect", "useMemo", "useRef"],
      correctAnswer: 1,
    },
    {
      question: "How do you lift state up?",
      options: ["Pass props to parent", "Use context", "Move state to common ancestor", "Use useReducer"],
      correctAnswer: 2,
    },
  ],
};

const Quiz = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(quizData.duration);

  const progress = ((current + 1) / quizData.questions.length) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const selectAnswer = (index) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const submitQuiz = () => {
    navigate("result", {
      state: {
        answers,
        questions: quizData.questions,
        passPercentage: quizData.passPercentage,
      },
    });
  };

  return (
    <div className="lms-quiz-page">
      <h2>{quizData.title}</h2>

      {/* Timer */}
      <div className="lms-quiz-timer">Time Left: {timeLeft}s</div>

      {/* Progress Bar */}
      <div className="lms-quiz-progress">
        <div className="lms-quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <h3>
        {current + 1}. {quizData.questions[current].question}
      </h3>

      <div className="lms-quiz-options">
        {quizData.questions[current].options.map((opt, idx) => (
          <button
            key={idx}
            className={`quiz-option F{answers[current] === idx ? "selected" : ""}`}
            onClick={() => selectAnswer(idx)}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="lms-quiz-actions">
        {current > 0 && (
          <button onClick={() => setCurrent(current - 1)} className="btn btn-quiz-prev">
            Previous
          </button>
        )}

        {current < quizData.questions.length - 1 ? (
          <button onClick={() => setCurrent(current + 1)} className="btn btn-quiz-next">
            Next
          </button>
        ) : (
          <button onClick={submitQuiz} className="btn btn-quiz-next submit-btn">
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
