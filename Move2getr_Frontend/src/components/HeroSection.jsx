export default function HeroSection() {
  return (
    <section className="relative py-16 px-6 rounded-2xl shadow-inner mb-10 overflow-hidden border border-[#D6B56D] bg-[#FAF3E0]">
      {/* Blurred Africa map background */}
      <img
        src="/images/afrique.png"
        alt="Map of Africa"
        className="absolute inset-0 w-full h-full object-contain opacity-200 blur-[0px] pointer-events-none"
      />

      {/* Foreground content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#3B2F2F] leading-tight">
          Welcome to <span className="text-[#006400]">MOVE2GETR</span>
        </h1>
        <p className="text-lg text-[#5C4A3F] max-w-3xl mx-auto">
          The platform designed by and for <span className="font-semibold">African students</span> in Europe. Share, support, and grow.
        </p>
        <button className="bg-[#D9735B] text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-[#c9614b] transition">
          Join the community
        </button>
      </div>
    </section>
  );
}
