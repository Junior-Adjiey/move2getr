export default function HeroSection() {
  return (
    <section className="relative py-16 px-6 rounded-2xl shadow-inner mb-10 overflow-hidden border border-[#D6B56D] bg-[#FAF3E0]">
      {/* Carte de l'Afrique floutée en fond */}
      <img
        src="/images/afrique.png"
        alt="Carte de l'Afrique"
        className="absolute inset-0 w-full h-full object-contain opacity-200 blur-[0px] pointer-events-none"
      />


      {/* Contenu par-dessus */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#3B2F2F] leading-tight">
          Bienvenue sur <span className="text-[#006400]">MOVE2GETR</span>
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
