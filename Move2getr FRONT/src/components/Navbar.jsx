import { Search, LogIn, User } from "lucide-react";

export default function Navbar({ onNavigate, isLoggedIn, onShowLogin }) {
  return (
    <nav className="bg-[#F9E2B6] shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#D6B56D]">
      {/* LOGO + NOM */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("feed")}>
        <img src="/images/LOGO1.png" alt="Logo" className="w-12 h-12 object-cover border-[#D9735B]" />
        <h1 className="text-2xl font-bold text-[#3B2F2F]">MOVE2GETR</h1>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="relative w-full max-w-md mx-6 hidden md:block">
        <input
          type="text"
          placeholder="Search Move2getr"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-[#3B2F2F] border border-[#D6B56D] focus:outline-none focus:ring-2 focus:ring-[#D9735B]"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      {/* BOUTONS */}
      <div className="flex items-center space-x-4 justify-end">

        {isLoggedIn ? (
          <>
            <button
              onClick={() => onNavigate("profile")}
              className="text-sm font-semibold text-[#3B2F2F] hover:text-[#D9735B] flex items-center gap-1"
            >
              <User size={16} />
              Mon Profil
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("move2getr_user");
                window.location.reload();
              }}
              className="text-sm text-red-600 font-semibold hover:underline"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <button
            onClick={onShowLogin}
            className="text-sm font-semibold text-white bg-[#D9735B] px-4 py-2 rounded-lg hover:bg-[#c2604b] transition flex items-center gap-2"
          >
            <LogIn size={16} />
            Connexion
          </button>
        )}
      </div>
    </nav>
  );
}
