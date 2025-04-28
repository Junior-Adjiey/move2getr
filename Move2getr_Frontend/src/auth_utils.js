import axios from "axios";

export async function getCurrentUser() {
  const token = localStorage.getItem('move2getr_token');
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur connecté :", error);
    return null;
  }
}
