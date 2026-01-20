import React, { useState, useEffect } from "react";
import "./BadgesList.css";

const BadgesList = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/badges/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setBadges(data.data);
        }
      } catch (error) {
        console.error("Error fetching badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  if (loading) return <div>Loading badges...</div>;

  if (badges.length === 0) {
    return (
      <div className="badges-section empty">
        <h3>Achievements</h3>
        <p>Complete courses and quizzes to earn badges!</p>
      </div>
    );
  }

  return (
    <div className="badges-section">
      <h3>Achievements</h3>
      <div className="badges-grid">
        {badges.map((badge) => (
          <div key={badge.id} className="badge-card" title={badge.description}>
            <div className="badge-icon">
              {badge.icon_url ? (
                <img
                  src={`/assets/badges/${badge.icon_url}`}
                  alt={badge.name}
                  className="badge-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add(
                      "badge-fallback",
                    );
                  }}
                />
              ) : (
                <span className="badge-emoji">🏆</span>
              )}
            </div>

            <div className="badge-info">
              <h4>{badge.name}</h4>
              <span className="badge-date">
                {new Date(badge.awarded_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesList;
