export default function Footer() {
    return (
      <footer className="bg-[#FAF3E0] text-[#3B2F2F] border-t border-[#D6B56D] mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-[#D9735B]">À propos</h3>
            <p className="text-sm">
              MOVE2GETR est une plateforme communautaire pensée pour accompagner les étudiants africains dans leur aventure en Europe.
            </p>
          </div>
  
          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-[#D9735B]">Liens</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Accueil</a></li>
              <li><a href="#" className="hover:underline">S’inscrire</a></li>
              <li><a href="#" className="hover:underline">Connexion</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
  
          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-[#D9735B]">Nous suivre</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
            </ul>
          </div>
        </div>
  
        <div className="text-center text-xs text-[#5C4A3F] pb-6">
          © {new Date().getFullYear()} MOVE2GETR — Tous droits réservés.
        </div>
      </footer>
    );
  }
  