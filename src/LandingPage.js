import React from "react";
import Hyperspeed from "./components/Hyperspeed";
import BlobCursor from "./components/BlobCursor";
import "./LandingPage.css";

function LandingPage({ onEnter }) {
  return (
    <div className="landing-container">
      {/* 🔹 Background Animation */}
      <Hyperspeed />

      {/* 🔹 Glowing Cursor */}
      <BlobCursor />

      {/* 🔹 Landing Content */}
      <div className="landing-content">
        <h1 className="landing-title">Welcome to Ritesh’s Portfolio</h1>
        <p className="landing-subtitle">Data Analyst | Power BI | Python | SQL</p>
        <button className="enter-btn" onClick={onEnter}>
          Enter Portfolio
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
