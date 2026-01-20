import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CertificateVerification.css";

const CertificateVerification = () => {
  const { code } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/certificates/verify/${code}`,
        );
        const data = await response.json();

        if (data.success) {
          setCertificate(data.data);
        } else {
          setError(data.message || "Certificate not found");
        }
      } catch (err) {
        setError("Error verifying certificate. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCertificate();
    }
  }, [code]);

  if (loading) return <div className="verification-container">Loading...</div>;
  if (error) return <div className="verification-container error">{error}</div>;

  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="status-badge valid">✓ Valid Certificate</div>
        <h1>Certificate Verified</h1>

        <div className="student-info">
          <p>This certifies that</p>
          <h2>{certificate.student_name}</h2>
          <p>has successfully completed the course</p>
          <h3>{certificate.course_title}</h3>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Instructor</span>
            <span className="value">{certificate.instructor}</span>
          </div>
          <div className="detail-item">
            <span className="label">Date Issued</span>
            <span className="value">
              {new Date(certificate.issue_date).toLocaleDateString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="label">Certificate ID</span>
            <span className="value">{certificate.certificate_code}</span>
          </div>
        </div>

        <div className="actions">
          {/* If we have a download route that works publicly or we can just link to it */}
          <a
            href={`http://localhost:5000/api/certificates/download/${code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;
