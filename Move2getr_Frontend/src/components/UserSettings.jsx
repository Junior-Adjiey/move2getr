// src/components/UserSettings.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UploadAvatar from "./UploadAvatar";
import PatchProfileForm from "./PatchProfileForm";
import DangerZone from "./DangerZone";

export default function UserSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Erreur de chargement du profil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Erreur de profil
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-green-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-8">

        {/* Section Avatar */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Photo de Profil</h2>
          <UploadAvatar onUploadSuccess={fetchProfile} />
        </section>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Section Modifier Profil */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Modifier mes informations</h2>
          <PatchProfileForm user={user} onUpdate={fetchProfile} />
        </section>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Section Danger Zone */}
        <section>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Zone Dangereuse</h2>
          <DangerZone />
        </section>

      </div>
    </div>
  );
}



