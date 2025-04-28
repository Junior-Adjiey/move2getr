import { useState } from "react";
import axios from "axios";

const africanCountries = [
  "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Togo",
  "Bénin", "Cameroun", "Gabon", "Congo", "RD Congo", "Nigéria",
  "Ghana", "Afrique du Sud", "Maroc", "Algérie", "Tunisie",
  "Kenya", "Égypte", "Éthiopie", "Tanzanie"
];

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    nom: "",
    prenoms: "",
    username: "",
    password: "",
    confirmPassword: "",
    nationalite: "",
    age: "",
    genre: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (!validatePassword(formData.password)) {
          alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un symbole.");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }

        // Inscription - Correction : on envoie aussi confirm_password
        await axios.post("http://localhost:8000/auth/register", {
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          username: formData.username,
          name: formData.nom,
          surname: formData.prenoms,
          nationality: formData.nationalite,
          age: parseInt(formData.age),
          gender: formData.genre
        });

        alert("Compte créé avec succès 🎉 Connecte-toi maintenant !");
        setIsRegister(false);
      } else {
        // Connexion
        const response = await axios.post("http://localhost:8000/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const { access_token } = response.data;
        localStorage.setItem("move2getr_token", access_token);
        alert("Connexion réussie 🔥");
        onLogin(formData.email);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur : " + (error.response?.data?.detail || "Une erreur s'est produite"));
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/90 shadow-2xl rounded-xl flex max-w-5xl w-full mx-6">
        {/* Partie gauche */}
        <div className="w-1/2 hidden md:flex flex-col justify-center p-10">
          <h1 className="text-4xl font-bold text-green-700 mb-4">MOVE2GETR</h1>
          <p className="text-lg text-gray-700">
            Crée des liens. Reste connecté. Explore l’Europe en communauté.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center text-red-600">
            {isRegister ? "Créer un compte" : "Connexion"}
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {isRegister && (
            <>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="prenoms"
                  placeholder="Prénoms"
                  value={formData.prenoms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <input
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmez le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <div className="flex gap-4">
                <select
                  name="nationalite"
                  value={formData.nationalite}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="">-- Nationalité --</option>
                  {africanCountries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="age"
                  placeholder="Âge"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="">-- Genre --</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
              </select>
            </>
          )}

          {!isRegister && (
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          )}

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition"
          >
            {isRegister ? "S'inscrire" : "Se connecter"}
          </button>

          <p
            className="text-sm text-center text-gray-600 cursor-pointer hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Tu as déjà un compte ? Connecte-toi"
              : "Pas encore inscrit ? Crée un compte"}
          </p>
        </form>
      </div>
    </div>
  );
}
