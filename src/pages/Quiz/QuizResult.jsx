import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";

const QuizResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    // If accessed directly without state
    navigate("/dashboard");
    return null;
  }

  const { score, total, passPercentage, answers, questions } = state;

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= passPercentage;

  return (
    <div className="lms-quiz-result">
      <h2>Quiz Result</h2>

      <div className="result-summary">
        <p>
          Score: <strong>{score}</strong> / {total} ({percentage}%)
        </p>
        <h3 className={passed ? "pass" : "fail"}>
          {passed ? "🎉 Passed!" : "❌ Failed"}
        </h3>
        <p>Passing Criteria: {passPercentage}%</p>
      </div>

      <div className="question-summary">
        <h3>Question-wise Summary</h3>
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const correctAnswer = q.correctAnswer;
          const isCorrect = userAnswer === correctAnswer;

          return (
            <div
              key={idx}
              className={`question-card ${isCorrect ? "correct" : "incorrect"}`}
            >
              <p className="question-text">
                {idx + 1}. {q.question}
              </p>
              <p className="answer-text">
                Your Answer:{" "}
                {userAnswer !== undefined ? q.options[userAnswer] : "Not Answered"}
              </p>
              {!isCorrect && (
                <p className="correct-answer-text">
                  Correct Answer: {q.options[correctAnswer]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="lms-quiz-result-actions">
        {!passed && (
          <button onClick={() => navigate(-1)} className="btn btn-outline">
            Retry Quiz
          </button>
        )}
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
