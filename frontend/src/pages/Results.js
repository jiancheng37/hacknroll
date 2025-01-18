import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classification, sound_url } = location.state || {};

  useEffect(() => {
    if (!classification || !sound_url) {
      // Redirect to Home if state is missing
      navigate("/");
      return;
    }

    // Play the sound
    const audio = new Audio(sound_url);
    audio.play();

    // Cleanup: Stop the sound when the component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [classification, sound_url, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {classification === "bad" ? (
        <div>
          <h1 style={{ color: "red" }}>🚨 JAIL 🚨</h1>
          <p>Better luck next time!</p>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "green" }}>✨ SLAY ✨</h1>
          <p>You nailed it!</p>
        </div>
      )}
    </div>
  );
};

export default Results;
