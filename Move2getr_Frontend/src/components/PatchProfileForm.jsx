// PatchProfileForm.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PatchProfileForm({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    surname: user.surname || "",
    nationality: user.nationality || "",
    gender: user.gender || "",
    age: user.age || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch("http://127.0.0.1:8000/auth/me", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("✅ Profil mis à jour !");
      onUpdate();
    } catch (error) {
      console.error(error);
      toast.error("❌ Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Nom" />
      <input name="surname" value={formData.surname} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Prénom" />
      <input name="nationality" value={formData.nationality} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Nationalité" />
      <input name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Genre" />
      <input name="age" value={formData.age} onChange={handleChange} type="number" className="border p-2 rounded w-full" placeholder="Âge" />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
      >
        Enregistrer les modifications
      </button>
    </div>
  );
}
