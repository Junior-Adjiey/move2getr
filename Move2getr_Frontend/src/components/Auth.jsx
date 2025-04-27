import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    nationality: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        if (!validatePassword(formData.password)) {
          toast.error("❌ Le mot de passe doit contenir une majuscule, un chiffre et un symbole.");
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("❌ Les mots de passe ne correspondent pas.");
          setLoading(false);
          return;
        }

        await axios.post("http://127.0.0.1:8000/auth/register", {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          confirm_password: formData.confirmPassword, // ✅ Correct field name here!
          name: formData.name,
          surname: formData.surname,
          nationality: formData.nationality,
          age: parseInt(formData.age),
          gender: formData.gender,
        });

        toast.success("🎉 Compte créé avec succès !");
        setIsRegister(false);
        setLoading(false);
        return;
      }

      // LOGIN
      const res = await axios.post("http://127.0.0.1:8000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.access_token);
      onLogin(res.data.access_token);
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      if (error.response?.data?.detail) {
        toast.error(`❌ ${error.response.data.detail}`);
      } else {
        toast.error("❌ Erreur inconnue lors de l'authentification.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center backdrop-blur-sm flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}

      <div className="bg-white/90 shadow-2xl rounded-xl flex max-w-5xl w-full mx-6">
        <div className="w-1/2 hidden md:flex flex-col justify-center p-10">
          <h1 className="text-4xl font-bold text-green-700 mb-4">MOVE2GETR</h1>
          <p className="text-lg text-gray-700">
            Crée des liens. Reste connecté. Explore l’Europe en communauté.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8 space-y-4"
        >
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
                  name="name"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Prénoms"
                  value={formData.surname}
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
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="">-- Nationalité --</option>
                  {africanCountries.map((country, idx) => (
                    <option key={idx} value={country}>
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
                name="gender"
                value={formData.gender}
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
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition flex justify-center items-center"
            disabled={loading}
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


