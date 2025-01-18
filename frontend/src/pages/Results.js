import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure state passed from the Upload component
  const { state } = location;
  const { result, imageUrl, soundUrl } = state || {}; // Assuming backend also returns `soundUrl`

  // Play sound based on result
  useEffect(() => {
    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio.play().catch((err) => console.error("Error playing sound:", err));
    }
  }, [soundUrl]); // Trigger effect when `soundUrl` is set

  // Handle navigation back to the upload page
  const handleRetry = () => {
    navigate("/upload");
  };

  // Handle navigation back to the home page
  const handleGoHome = () => {
    navigate("/");
  };

  // Render different messages based on the result
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
      <h2>Your Fashion Results</h2>

      {/* Display the uploaded image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded Fit"
          style={{
            maxWidth: "300px",
            maxHeight: "400px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "2px solid #ddd",
          }}
        />
      )}

      {/* Display the analysis result */}
      {result === "slay" ? (
        <div
          style={{
            color: "green",
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          ✨ SLAY! ✨ You served a look! 👗🔥
        </div>
      ) : result === "jail" ? (
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          🚨 JAIL! 🚨 Fashion police are on their way! ⛓️👮‍♂️
        </div>
      ) : (
        <div
          style={{
            color: "gray",
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          🤔 Hmm... We're not sure about this one.
        </div>
      )}

      {/* Buttons for further navigation */}
      <div>
        <button
          onClick={handleRetry}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#6200ea",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Try Again
        </button>

        <button
          onClick={handleGoHome}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#03dac6",
            color: "black",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Results;
