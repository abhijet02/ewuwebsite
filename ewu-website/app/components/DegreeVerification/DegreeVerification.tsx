"use client";

import "./DegreeVerification.scss";
import React, { useState } from "react";
import { StudentInfo } from "@lib/services/student/student.service.type";
import {
  Search,
  GraduationCap,
  Calendar,
  User,
  Award,
  Check,
} from "lucide-react";

const DegreeVerification: React.FC = () => {
  const [studentId, setStudentId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStudentInfo(null);

    try {
      const response = await fetch(
        `/api/verification?studentId=${studentId}&dateOfBirth=${dateOfBirth}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch student info");
      }

      const data = await response.json();
      setStudentInfo(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-container">
      {/* Background Pattern */}
      <div className="bg-pattern">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
        <div className="bg-circle bg-circle-4"></div>
      </div>

      <div className="main-wrapper">
        {/* Main Card */}
        <div className="main-card">
          {/* Header Section */}
          <div className="header">
            <div className="header-content">
              <div className="logo-container">
                <GraduationCap className="logo-icon" />
              </div>
              <div className="header-text">
                <h1 className="university-name">EAST WEST UNIVERSITY</h1>
                <p className="portal-subtitle">Degree Verification Portal</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="form-section">
            <div className="instructions">
              <div className="instruction-content">
                <div className="instruction-icon">
                  <Search className="search-icon" />
                </div>
                <div>
                  <h3 className="instruction-title">
                    Verification Instructions
                  </h3>
                  <p className="instruction-text">
                    Enter your Student ID and Date of Birth to verify your
                    degree information
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="form-container">
              <div className="form-fields">
                <div className="field-group">
                  <label htmlFor="studentId" className="field-label">
                    <User className="field-icon" />
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g., 2014-1-60-001"
                    className="field-input"
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="dateOfBirth" className="field-label">
                    <Calendar className="field-icon" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="field-input"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className={`verify-button ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Search className="button-icon" />
                    <span>Verify Degree</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-container">
                <div className="error-content">
                  <div className="error-icon">
                    <div className="error-dot"></div>
                  </div>
                  <div>
                    <h4 className="error-title">Verification Failed</h4>
                    <p className="error-text">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Student Information */}
            {studentInfo && (
              <div className="success-container">
                <div className="success-header">
                  <div className="success-icon">
                    <Check className="check-icon" />
                  </div>
                  <h2 className="success-title">Verification Successful</h2>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <h3 className="info-card-title">
                      <User className="info-icon" />
                      Personal Information
                    </h3>
                    <div className="info-list">
                      <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">
                          {studentInfo.studentName}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Student ID:</span>
                        <span className="info-value">
                          {studentInfo.studentId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <h3 className="info-card-title">
                      <GraduationCap className="info-icon" />
                      Academic Information
                    </h3>
                    <div className="info-list">
                      <div className="info-item">
                        <span className="info-label">Degree:</span>
                        <span className="info-value">
                          {studentInfo.programName}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Major:</span>
                        <span className="info-value">
                          {studentInfo.major || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Minor:</span>
                        <span className="info-value">
                          {studentInfo.minor || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">CGPA:</span>
                        <span className="info-value cgpa">
                          {studentInfo.cgpa}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <h3 className="info-card-title">
                      <Award className="info-icon" />
                      Graduation Details
                    </h3>
                    <div className="info-list">
                      <div className="info-item">
                        <span className="info-label">Completion:</span>
                        <span className="info-value">
                          {studentInfo.completionSemester}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Convocation:</span>
                        <span className="info-value">
                          {studentInfo.convocationName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-content">
            <p className="footer-title">
              Office of the Controller of Examinations
            </p>
            <p>East West University</p>
            <p>A/2, Jahurul Islam Avenue, Jahurul Islam City</p>
            <p>Aftabnagar, Dhaka-1212, Bangladesh</p>
            <p className="footer-phone">
              Phone: +88 09666775577, Extn: 389/418
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DegreeVerification;
