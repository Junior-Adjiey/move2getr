// src/components/Dashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.get("http://127.0.0.1:8000/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur de récupération du profil. Veuillez vous reconnecter.");
      navigate("/");
    });
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-green-100 to-blue-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-blue-200">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Bienvenue {user.username} 👋</h1>
      <p className="text-lg text-gray-700 mb-2">Email: {user.email}</p>
      <p className="text-lg text-gray-700 mb-2">Nationalité: {user.nationality}</p>
      <p className="text-lg text-gray-700 mb-2">Genre: {user.gender}</p>
      <p className="text-lg text-gray-700 mb-2">Âge: {user.age} ans</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
  );
}

