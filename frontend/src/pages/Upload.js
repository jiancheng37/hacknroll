import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Define the navigate function

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const { classification, sound_url } = await response.json();

      navigate("/results", { state: { classification, sound_url } }); // Navigate to results page with state
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Simulate a test upload for now
  const handleTestUpload = () => {
    const simulatedScore = 75; // Example simulated score
    const simulatedClassification = simulatedScore >= 65 ? "slay" : "jail"; // Simulate slay or jail based on score

    // Navigate to results page with simulated data
    navigate("/results", { state: { classification: simulatedClassification, sound_url: simulatedScore } });
  };

  return (
    <div className="upload-container fadeIn">
      <h2>Please upload a full body picture</h2>
      {previewUrl && <img src={previewUrl} alt="Preview" />}
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload and Analyze"}
      </button>

      {/* Test upload button */}
      <button onClick={handleTestUpload}>Go to Results (Test)</button>
    </div>
  );
};

export default Upload;