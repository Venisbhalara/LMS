import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, HomeIcon } from "@heroicons/react/24/solid";
import "./Quiz.css";

const QuizResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/quiz");
    return null;
  }

  const { score, total, passPercentage, answers, questions } = state;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= passPercentage;

  return (
    <div className="lms-quiz-page">
      <motion.div
        className="lms-quiz-result"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="result-card">
          <div className={`score-circle ${passed ? "pass" : "fail"}`}>
            {percentage}%
            <span className="score-label">{passed ? "Passed" : "Failed"}</span>
          </div>

          <h2>{passed ? "Congratulations! 🎉" : "Keep Learning! 📚"}</h2>
          <p style={{ color: "#64748b", margin: "10px 0 30px" }}>
            You scored <strong>{score}</strong> out of <strong>{total}</strong> questions.
            <br />
            Passing score: {passPercentage}%
          </p>

          <div className="lms-quiz-result-actions" style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button
              onClick={() => navigate("/quiz")}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: '2px solid #e2e8f0', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}
            >
              <HomeIcon className="w-5 h-5" style={{width: '20px'}}/> Dashboard
            </button>
            {!passed && (
              <button
                onClick={() => navigate(-1)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                <ArrowPathIcon className="w-5 h-5" style={{width: '20px'}}/> Retry
              </button>
            )}
          </div>
        </div>

        <div className="question-summary">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#1e293b' }}>Detailed Analysis</h3>
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            const userOption = q.options[userAnswer];
            const correctOption = q.options[q.correctAnswer];

            return (
              <motion.div
                key={idx}
                className={`question-card ${isCorrect ? "correct" : "incorrect"}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'start' }}>
                  <div style={{ marginTop: '4px' }}>
                    {isCorrect ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-500" style={{ width: '24px', color: '#10b981' }} />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-500" style={{ width: '24px', color: '#ef4444' }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', marginBottom: '10px' }}>
                      {idx + 1}. {q.question}
                    </p>
                    
                    <div style={{ display: 'grid', gap: '8px', fontSize: '0.95rem' }}>
                      <p style={{ margin: 0, color: isCorrect ? '#059669' : '#dc2626' }}>
                        <span style={{ fontWeight: 600 }}>Your Answer:</span> {userOption || "Skipped"}
                      </p>
                      {!isCorrect && (
                         <p style={{ margin: 0, color: '#059669' }}>
                          <span style={{ fontWeight: 600 }}>Correct Answer:</span> {correctOption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResult;
