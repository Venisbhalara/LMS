import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyCertificates.css";

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // Assuming token is stored in localStorage as 'token'
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/certificates/my-certificates",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (data.success) {
          setCertificates(data.data);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading)
    return <div className="p-8 text-center">Loading certificates...</div>;

  return (
    <div className="my-certificates-container">
      <h1>My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="empty-state">
          <p>You haven't earned any certificates yet.</p>
          <Link to="/courses" className="browse-btn">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.certificate_code} className="certificate-card">
              <div className="cert-icon">🎓</div>
              <div className="cert-details">
                <h3>{cert.course_title}</h3>
                <p className="instructor">Instructor: {cert.instructor}</p>
                <p className="date">
                  Issued: {new Date(cert.issue_date).toLocaleDateString()}
                </p>
                <div className="cert-actions">
                  <Link
                    to={`/verify/${cert.certificate_code}`}
                    className="view-btn"
                  >
                    View
                  </Link>
                  <a
                    href={`http://localhost:5000/api/certificates/download/${cert.certificate_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-icon-btn"
                    title="Download PDF"
                  >
                    ⬇️
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCertificates;
