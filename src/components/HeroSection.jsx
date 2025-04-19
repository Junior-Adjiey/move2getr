export default function HeroSection() {
    return (
      <section className="bg-gradient-to-r from-[#FAE6B1] via-[#FFF3E0] to-[#FAE6B1] py-16 px-6 rounded-xl shadow-inner mb-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#3B2F2F] leading-tight">
            Bienvenue sur <span className="text-[#D9735B]">MOVE2GETR</span>
          </h1>
          <p className="text-lg text-[#5C4A3F] max-w-3xl mx-auto">
            La plateforme pensée par et pour les <span className="font-semibold">étudiants africains</span> en Europe. Partage, entraide, opportunités.
          </p>
          <button className="bg-[#D9735B] text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-[#c9614b] transition">
            Rejoindre la communauté
          </button>
        </div>
      </section>
    );
  }
  