import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizzes } from "../../data/quizData";
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import "./Quiz.css";

const Quiz = () => {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams(); // Should match route definition
  
  // If we have params, we are in a specific quiz. Otherwise, show selection.
  const activeQuiz = courseId ? quizzes[courseId] : null;

  return (
    <div className="lms-quiz-page">
      {activeQuiz ? (
        <QuizPlayer quiz={activeQuiz} navigate={navigate} />
      ) : (
        <QuizSelection navigate={navigate} />
      )}
    </div>
  );
};

const QuizSelection = ({ navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quiz-selection-header">
        <h1>Select a Quiz</h1>
        <p>Choose a topic to test your knowledge and earn badges</p>
      </div>

      <div className="quiz-grid">
        {Object.values(quizzes).map((quiz, index) => (
          <motion.div
            key={quiz.id}
            className="quiz-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="quiz-card-content">
               <div className="quiz-card-icon">
                  <CheckCircleIcon className="w-8 h-8" style={{ width: '30px'}} />
               </div>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              
              <div className="quiz-meta">
                <span>⏱️ {Math.floor(quiz.duration / 60)} mins</span>
                <span>❓ {quiz.totalQuestions} Questions</span>
              </div>

              <button
                className="btn-start-quiz"
                onClick={() => navigate(`/course/${quiz.id}/quiz/1`)}
              >
                Start Quiz
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const QuizPlayer = ({ quiz, navigate }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(quiz.duration);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const progress = ((current + 1) / quiz.questions.length) * 100;

  const handleOptionSelect = (index) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const submitQuiz = () => {
    // Calculate Score
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });

    navigate("/quiz/result", {
      state: {
        score,
        total: quiz.questions.length,
        passPercentage: quiz.passPercentage,
        answers,
        questions: quiz.questions,
      },
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <motion.div
      className="quiz-player-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="quiz-header">
        <div>
          <h2 style={{ margin: 0 }}>{quiz.title}</h2>
          <span style={{ color: "#64748b" }}>Question {current + 1} of {quiz.questions.length}</span>
        </div>
        <div className="timer-box">
          <ClockIcon className="w-5 h-5" style={{width: '20px'}}/>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="question-text">
            {quiz.questions[current].question}
          </div>

          <div className="options-grid">
            {quiz.questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                className={`quiz-option ${answers[current] === idx ? "selected" : ""}`}
                onClick={() => handleOptionSelect(idx)}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="quiz-footer">
        <button
          className="btn-nav btn-prev"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{ visibility: current === 0 ? "hidden" : "visible" }}
        >
          Previous
        </button>

        {current < quiz.questions.length - 1 ? (
          <button
            className="btn-nav btn-next"
            onClick={() => setCurrent((c) => c + 1)}
          >
            Next Question
          </button>
        ) : (
          <button className="btn-nav btn-submit" onClick={submitQuiz}>
            Submit Quiz
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Quiz;
