// src/components/UserProfile.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("❌ Veuillez vous connecter !");
        navigate("/");
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la récupération du profil.");
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Chargement du profil...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-blue-200">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Mon Profil 👤
        </h2>

        <div className="space-y-4 text-gray-700">
          <p><strong>Nom d'utilisateur:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nom:</strong> {user.name} {user.surname}</p>
          <p><strong>Nationalité:</strong> {user.nationality}</p>
          <p><strong>Genre:</strong> {user.gender}</p>
          <p><strong>Âge:</strong> {user.age} ans</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Déconnexion réussie !");
            navigate("/");
          }}
          className="mt-8 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Se Déconnecter
        </button>
      </div>
    </div>
  );
}


