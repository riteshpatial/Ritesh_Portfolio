import React, { useState } from "react";
import LandingPage from "./LandingPage";
import Portfolio from "./Portfolio";

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  // When user clicks the landing page button, this runs
  const handleEnterPortfolio = () => {
    setShowPortfolio(true);
  };

  return (
    <>
      {!showPortfolio ? (
        <LandingPage onEnter={handleEnterPortfolio} />
      ) : (
        <Portfolio />
      )}
    </>
  );
}

export default App;
