import { useState } from "react";

export default function UserSettings() {
  const [formData, setFormData] = useState({
    prenom: "Adjiey",
    nom: "Koffi Jean-Luc",
    username: "moveur1",
    email: "moveur1@example.com",
    age: 19,
    genre: "Homme",
    nationalite: "Côte d'Ivoire",
    password: "",
    confirmPassword: "",
  });

  const nationalitesAfricaines = [
    "Côte d'Ivoire", "Sénégal", "Cameroun", "Mali", "Burkina Faso", "Togo", "Bénin", "Guinée", "Congo", "Gabon",
    "RDC", "Niger", "Tchad", "Algérie", "Tunisie", "Maroc", "Afrique du Sud", "Kenya", "Nigeria", "Ghana"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log("Informations enregistrées :", formData);
    alert("Profil mis à jour avec succès !");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold text-[#3B2F2F] mb-4">Paramètres du profil</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" className="border p-2 rounded" />
        <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className="border p-2 rounded" />
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" className="border p-2 rounded" />
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="border p-2 rounded" />
        <input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" className="border p-2 rounded" />

        <select name="genre" value={formData.genre} onChange={handleChange} className="border p-2 rounded">
          <option value="">Genre</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Autre">Autre</option>
        </select>

        <select name="nationalite" value={formData.nationalite} onChange={handleChange} className="border p-2 rounded">
          {nationalitesAfricaines.map((pays, i) => (
            <option key={i} value={pays}>{pays}</option>
          ))}
        </select>

        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Nouveau mot de passe" className="border p-2 rounded" />
        <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Confirmer mot de passe" className="border p-2 rounded" />
      </div>

      <button type="submit" className="bg-[#D9735B] text-white px-4 py-2 rounded hover:bg-[#c9614b]">
        Enregistrer les modifications
      </button>
    </form>
  );
}
