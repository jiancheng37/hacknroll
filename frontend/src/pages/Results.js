import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classification, details, message, score, sound_url } = location.state || {};
  const audioRef = useRef(null);

  useEffect(() => {
    if (!classification || !sound_url) {
      // Redirect to Home if state is missing
      navigate("/");
      return;
    }

    // Initialize and play audio
    audioRef.current = new Audio(sound_url);

    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Audio play error:", error);
      }
    };

    playAudio();

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [classification, sound_url, navigate]);

  const renderContent = () => {
    if (classification === "bad") {
      return (
        <div>
          <h1 style={{ color: "red" }}>🚨 JAIL 🚨</h1>
          <p>Better luck next time!</p>
          <img
            src="https://via.placeholder.com/300x200?text=JAIL" // Replace with your jail graphic URL
            alt="Jail"
          />
        </div>
      );
    }
    return (
      <div>
        <h1 style={{ color: "green" }}>✨ SLAY ✨</h1>
        <p>You nailed it!</p>
        <img
          src="https://via.placeholder.com/300x200?text=SLAY" // Replace with your slay graphic URL
          alt="Slay"
        />
      </div>
    );
  };

  return <div style={{ textAlign: "center", marginTop: "20px" }}>{renderContent()}</div>;
};

export default Results;
