"use client";

const SurveyForm: React.FC = () => {
  return (
    <div className="container mt-5 mb-5">
      <iframe
        src="https://new1.ewubd.edu/backend/uploads/survey_v6/index.html"
        title="Static HTML Project"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default SurveyForm;
