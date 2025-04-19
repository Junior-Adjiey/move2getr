
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#d9735b] via-white to-[#dff6dd] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl text-center space-y-6 border-4 border-[#d9735b]">
        <h1 className="text-4xl font-bold text-[#d9735b] drop-shadow-sm">
          Bienvenue sur <span className="text-green-600">Move2getr</span>
        </h1>
        <p className="text-gray-700 text-lg">
          Une communauté pensée pour les <strong>étudiants africains</strong> en Europe 🌍
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition">
            Explorer les Posts
          </button>
          <button className="px-6 py-2 bg-[#d9735b] text-white font-semibold rounded-xl hover:bg-[#c85e44] transition">
            Créer un Compte
          </button>
        </div>
        <p className="text-sm text-gray-500 italic mt-4">
          “Là où les racines africaines rencontrent les rêves européens.”
        </p>
      </div>
    </div>
  );
}


export default App