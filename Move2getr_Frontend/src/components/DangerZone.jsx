// DangerZone.jsx
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DangerZone() {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer mon compte'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("http://127.0.0.1:8000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem("token");
        Swal.fire('Supprimé!', 'Votre compte a été supprimé.', 'success');
        navigate("/");
      } catch (error) {
        console.error(error);
        Swal.fire('Erreur', "Impossible de supprimer votre compte.", 'error');
      }
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-red-600 text-xl font-bold mb-2">Danger Zone</h2>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Supprimer mon compte
      </button>
    </div>
  );
}
