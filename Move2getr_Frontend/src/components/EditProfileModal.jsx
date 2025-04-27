// src/components/EditProfileModal.jsx

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfileModal({ user, onClose, refreshUser }) {
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    username: user.username,
    nationality: user.nationality,
    age: user.age,
    gender: user.gender,
    avatar: user.avatar || "", // if you have an avatar field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("❌ Session expirée");
      return;
    }

    try {
      const updateData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== 'avatar') updateData.append(key, value);
      });

      if (formData.avatar instanceof File) {
        updateData.append("avatar", formData.avatar);
      }

      await axios.patch("http://127.0.0.1:8000/auth/update_me", updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("✅ Profil mis à jour !");
      refreshUser(); // Refresh profile after update
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      toast.error("Erreur de mise à jour !");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700">Modifier mon profil</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="surname"
            placeholder="Prénom(s)"
            value={formData.surname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationalité"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="age"
            placeholder="Âge"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Genre --</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>

          <div>
            <label className="block text-sm font-medium mb-1">Changer votre photo (facultatif)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}



