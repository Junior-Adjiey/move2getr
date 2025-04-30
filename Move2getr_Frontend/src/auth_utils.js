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

// ➡️ Pour récupérer tous les posts
export async function getAllPosts() {
    try {
      const response = await axios.get("http://localhost:8000/posts/");
      return response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des posts :", error);
      return [];
    }
  }
  
  // ➡️ Pour créer un nouveau post
  export async function createPost(postData) {
    const token = localStorage.getItem('move2getr_token');
    if (!token) return null;
  
    try {
      const response = await axios.post("http://localhost:8000/posts/", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du post :", error);
      return null;
    }
  }