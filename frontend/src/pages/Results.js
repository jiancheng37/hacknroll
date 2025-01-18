import React from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { result, imageUrl } = location.state || {};

  if (!result || !imageUrl) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Invalid Access</h1>
        <p>Please upload an image first.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{result === "Slay" ? "🔥 Slay! 🔥" : "⛓️ Jail! ⛓️"}</h1>
      <img
        src={imageUrl}
        alt="Uploaded"
        style={{ marginTop: "20px", maxWidth: "80%", borderRadius: "10px" }}
      />
    </div>
  );
};

export default Results;
