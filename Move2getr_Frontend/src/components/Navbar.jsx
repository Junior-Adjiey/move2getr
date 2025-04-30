import { Search, LogIn, User, Globe } from "lucide-react";

export default function Navbar({ onNavigate, isLoggedIn, onShowLogin, user, lang, toggleLang }) {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-[#F9E2B6] shadow-lg px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-[#E8C37E] rounded-xl backdrop-blur-md">
      
      {/* LOGO + NOM */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => onNavigate("feed")}
      >
        <img
          src="/images/LOGO1.png"
          alt="Logo"
          className="w-10 h-10 object-cover"
        />
        <h1 className="text-xl md:text-2xl font-bold text-[#3B2F2F]">MOVE2GETR</h1>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="relative w-full max-w-md mx-6 hidden md:block">
        <input
          type="text"
          placeholder={lang === "fr" ? "Rechercher sur Move2getr" : "Search Move2getr"}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-[#3B2F2F] border border-[#D6B56D] focus:outline-none focus:ring-2 focus:ring-[#D9735B]"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      {/* BOUTONS UTILISATEUR */}
      <div className="flex items-center space-x-4 justify-end">
        {/* 🌐 Bouton de langue */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#D9735B] transition"
        >
          <Globe size={16} />
          {lang === "fr" ? "EN" : "FR"}
        </button>

        {isLoggedIn ? (
          <>
            <p className="text-sm font-semibold text-green-700 hidden md:block">
              {lang === "fr" ? "Bonjour" : "Hello"},{" "}
              {user?.name?.split(" ")[0]} 👋
            </p>

            <button
              onClick={() => onNavigate("profile")}
              className="text-sm font-semibold text-[#3B2F2F] hover:text-[#D9735B] flex items-center gap-1"
            >
              <User size={16} />
              {lang === "fr" ? "Mon Profil" : "My Profile"}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("move2getr_token");
                window.location.reload();
              }}
              className="text-sm text-red-600 font-semibold hover:underline"
            >
              {lang === "fr" ? "Déconnexion" : "Logout"}
            </button>
          </>
        ) : (
          <button
            onClick={onShowLogin}
            className="text-sm font-semibold text-white bg-[#D9735B] px-4 py-2 rounded-lg hover:bg-[#c2604b] transition flex items-center gap-2"
          >
            <LogIn size={16} />
            {lang === "fr" ? "Connexion" : "Login"}
          </button>
        )}
      </div>
    </nav>
  );
}
