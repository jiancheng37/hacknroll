import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { analyzeImage } from "../services/api"; // API call to Flask backend

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
      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);

      const imageUrl = await getDownloadURL(storageRef);
      const { result } = await analyzeImage(imageUrl);

      navigate("/results", { state: { result, imageUrl } });
    } catch (error) {
      console.error("Error during upload and analysis:", error);
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
            maxWidth: "300px", // Adjust maximum width
            maxHeight: "400px", // Adjust maximum height
            marginBottom: "20px",
            borderRadius: "10px",
            border: "2px solid #ddd", // Optional: Border for the image
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
