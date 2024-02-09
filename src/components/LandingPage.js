import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="row">
        <Link className="landing-page-link" to="/login">
          <h1
            style={{
              fontSize: "20px",
              marginTop: "350px",
              border: "2px solid #4493D6",
              background: "#4493D6",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            Get Started
          </h1>
        </Link>
      </div>
    </div>
  );
}
export default LandingPage;
