import { useState } from "react";

// Liste simplifiée des pays africains (on peut en rajouter si besoin)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!validatePassword(formData.password)) {
        alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un symbole.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
    }

    const usernameToSave = isRegister ? formData.username : formData.email;
    localStorage.setItem("move2getr_user", usernameToSave);
    onLogin(usernameToSave);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">
          {isRegister ? "Créer un compte" : "Connexion"}
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full px-4 py-2 border rounded focus:outline-none"
                required
              />
              <input
                type="text"
                name="prenoms"
                placeholder="Prénoms"
                value={formData.prenoms}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none"
                required
              />
            </div>

            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmez le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none"
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
            className="w-full px-4 py-2 border rounded focus:outline-none"
            required
          />
        )}

        <button
          type="submit"
          className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700 transition"
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
  );
}
