import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { analyzeImage } from "../services/api"; // API call to Flask backend

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For displaying the uploaded image preview
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Generate a preview URL for the uploaded file
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
      // Upload file to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);

      // Get public URL for the uploaded file
      const imageUrl = await getDownloadURL(storageRef);

      // Send image URL to Flask backend for analysis
      const { result } = await analyzeImage(imageUrl); // "Slay" or "Jail"

      // Navigate to the Result Page with the result and image URL
      navigate("/results", { state: { result, imageUrl } });
    } catch (error) {
      console.error("Error during upload and analysis:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Row 0: Instruction Text */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Please upload a full body picture</h2>
      </div>

      {/* Row 1: Display Uploaded Image */}
      {previewUrl && (
        <div style={{ marginBottom: "20px" }}>
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            style={{
              maxWidth: "80%",
              maxHeight: "300px",
              borderRadius: "10px",
              border: "2px solid #ddd",
            }}
          />
        </div>
      )}

      {/* Row 2: Choose File */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: "10px" }}
        />
      </div>

      {/* Row 3: Upload and Analyze */}
      <div>
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6200ea",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload and Analyze"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
