import { useState } from "react";

export default function EditProfileModal({ user, onClose }) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [country, setCountry] = useState(user.country);
  const [age, setAge] = useState(user.age);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSave = () => {
    // Pour l'instant, on ne fait qu'afficher dans la console
    console.log("Nouvelles infos :", { name, bio, country, age, avatar });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-[#3B2F2F] mb-4">Modifier mon profil</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nom complet</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Pays</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium">Âge</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Lien avatar (ou API)</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-[#D9735B] text-white hover:bg-[#c9614b]"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
