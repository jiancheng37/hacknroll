import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Upload.css"; // Ensure custom CSS for animations is included

// Import local assets
import jailImage from "../assets/images/jail.png";
import slayImage from "../assets/images/slay.png";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classification, sound_url, score = 75 } = location.state || {}; // Default score is 75
  const audioRef = useRef(null);
  const ringRef = useRef(null);

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

  useEffect(() => {
    if (ringRef.current) {
      // Animate the score ring with a transition
      ringRef.current.style.transition = "stroke-dasharray 1.5s ease-in-out";
      ringRef.current.style.strokeDasharray = `${score * 5.03}, 503`; // Adjust to reflect the score
    }
  }, [score]);

  const renderContent = () => {
    const imageSrc = classification === "bad" ? jailImage : slayImage;
    const message = classification === "bad" ? "Better luck next time!" : "You nailed it!";
    const ringColor = classification === "bad" ? "#ef4444" : "#ec4899"; // Red for bad, pink for slay

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div
          className="score-ring"
          style={{
            position: "relative",
            marginBottom: "20px", // Give space between the ring and the image
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r="80"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              ref={ringRef}
              cx="90"
              cy="90"
              r="80"
              stroke={ringColor}
              strokeWidth="12"
              fill="none"
              strokeDasharray="0, 503" // Start with no progress
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fontSize="24px"
              fontWeight="bold"
              fill={ringColor}
            >
              {`${score}%`}
            </text>
          </svg>
        </div>
        <p>{message}</p>
        <img
          src={imageSrc}
          alt={classification === "bad" ? "Jail" : "Slay"}
          style={{
            maxWidth: "60%",  // Adjusted image width to make space for the ring
            height: "auto",
            marginTop: "20px",  // Adds margin between the ring and the image
          }}
        />
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default Results;