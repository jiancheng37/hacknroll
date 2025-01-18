import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      // Create FormData to send the file as part of the HTTP request
      const formData = new FormData();
      formData.append("image", file);

      // Send the image file to the backend
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const { result, imageUrl } = await response.json(); // Assuming your backend returns JSON with these keys

      // Navigate to the Result Page with the result and image URL
      navigate("/results", { state: { result, imageUrl } });
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
      <h2>Please upload a full body picture</h2>
      {/* Preview Image Section */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{
            maxWidth: "300px",
            maxHeight: "400px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "2px solid #ddd",
          }}
        />
      )}
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6200ea",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Uploading..." : "Upload and Analyze"}
      </button>
    </div>
  );
};

export default Upload;
