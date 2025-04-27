// UploadAvatar.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadAvatar({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Preview image
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Sélectionnez d'abord un fichier !");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/auth/upload-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("✅ Avatar mis à jour !");
      onUploadSuccess();
    } catch (error) {
      console.error(error);
      toast.error("❌ Erreur lors de l'upload.");
    }
  };

  return (
    <div className="space-y-4">
      {previewUrl && <img src={previewUrl} alt="Preview" className="w-32 h-32 rounded-full object-cover mx-auto" />}

      <input type="file" onChange={handleFileChange} className="border p-2 rounded w-full" />

      <button
        onClick={handleUpload}
        className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition"
      >
        Upload Avatar
      </button>
    </div>
  );
}