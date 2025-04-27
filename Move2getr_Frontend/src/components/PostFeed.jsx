import TopStoriesRow from "./TopStoriesRow.jsx";
import NewPostForm from "./NewPostForm.jsx";
import { motion } from "framer-motion";

export default function PostFeed({ user }) {
  const posts = [
    {
      author: "CSAudit",
      time: "il y a 9h",
      title: "What do we think? I can only see this bombing",
      source: "7AFREI",
      subtitle: "‘Saturday Night Live’ Sets U.K. Edition, Launching on Sky in 2026",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Weekend_Update_-_Michael_Che_and_Colin_Jost.jpg/640px-Weekend_Update_-_Michael_Che_and_Colin_Jost.jpg",
      journalist: "Ramaa Radachiakan",
    },
    {
      author: "EFReak",
      time: "il y a 12h",
      title: "Comment j'ai trouvé mon logement étudiant à Cachan 🏠",
      source: "STUDENT VIBES",
      subtitle: "Découvrez les bons plans pour économiser sur le loyer tout en vivant bien placé.",
      image:
        "https://images.unsplash.com/photo-1588854337116-3fb4bbf6f59d?auto=format&fit=crop&w=800&q=60",
      journalist: "Fatou Koné",
    },
    {
      author: "ScholarFlow",
      time: "il y a 1j",
      title: "Obtenir une bourse Campus France : mon parcours 💸",
      source: "AFRICA EDU NEWS",
      subtitle: "Toutes les étapes expliquées, du dépôt de dossier à la notification d’attribution.",
      image:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=60",
      journalist: "Mohamed Traoré",
    },
    {
      author: "K. Blessing",
      time: "il y a 2j",
      title: "Choc culturel à mon arrivée en France 🇫🇷",
      source: "DIASPORA DAILY",
      subtitle: "Du jollof à la baguette : comment j’ai vécu mes premières semaines à Paris.",
      image:
        "https://images.unsplash.com/photo-1588932582040-dc89b3d5ad7d?auto=format&fit=crop&w=800&q=60",
      journalist: "Awa Sagna",
    },
    {
      author: "Jobline",
      time: "il y a 3j",
      title: "Top 5 sites pour trouver un job étudiant rapidement 💼",
      source: "MOVE2WORK",
      subtitle: "Indeed, Pôle Emploi, bouche-à-oreille… tout ce qui a marché pour moi.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
      journalist: "Koffi Yao",
    },
    {
      author: "Cynthia",
      time: "il y a 4j",
      title: "Gérer la solitude quand on débarque seul 💔",
      source: "AFROLIFE MAG",
      subtitle: "Des assos, des potes, et beaucoup de courage. Mon chemin à Bordeaux.",
      image:
        "https://images.unsplash.com/photo-1524492449090-1e45a6e8b5c4?auto=format&fit=crop&w=800&q=60",
      journalist: "Cynthia Bamba",
    },
  ];

  return (
    <div className="flex-1 px-6 py-8 space-y-6 bg-[#FDF7EC] text-[#3B2F2F]">
      {/* Carrousel Top Stories */}
      <TopStoriesRow />

      {/* Formulaire de post si connecté */}
      {user ? (
        <NewPostForm onPost={(newPost) => console.log("Posté :", newPost)} />
      ) : (
        <div className="bg-[#FFF7E8] border border-[#D6B56D] p-6 rounded-lg text-center shadow">
          <p className="text-gray-600 font-medium">
            Connecte-toi pour publier et interagir avec les autres !
          </p>
        </div>
      )}

      {/* GROS POSTS AVEC ANIMATION */}
      {posts.map((post, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-[#FFF7E8] border border-[#D6B56D] rounded-lg shadow-md overflow-hidden"
        >
          <div className="px-6 py-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span className="font-medium text-[#3B2F2F]">
                {post.author} • {post.time || "il y a un instant"}
              </span>
              <span className="text-green-600 font-semibold">Registered</span>
            </div>

            <h2 className="text-lg font-bold text-[#3B2F2F] mb-3">{post.title}</h2>

            <div className="bg-white rounded p-4 border border-[#e4c97f]">
              {post.source && (
                <div className="text-center text-sm text-gray-500 font-serif mb-1">
                  {post.source}
                </div>
              )}
              {post.journalist && (
                <p className="text-sm text-gray-700 mb-2">By {post.journalist}</p>
              )}
              <p className="text-base font-semibold text-[#3B2F2F] mb-3">
                {post.subtitle || post.content}
              </p>

              {/* 🎥 Affichage média */}
              {post.media && (
                <>
                  {post.media.includes("video") ? (
                    <video
                      src={post.media}
                      controls
                      className="w-full max-h-72 object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={post.media}
                      alt="Post media"
                      className="w-full max-h-72 object-cover rounded-lg"
                    />
                  )}
                </>
              )}

              {post.image && !post.media && (
                <img
                  src={post.image}
                  alt="Post illustration"
                  className="rounded-lg max-h-60 w-full object-cover"
                />
              )}

              {/* RÉACTIONS */}
              <div className="flex gap-6 mt-4 px-1 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-orange-600 transition">
                  🔥 <span>12</span>
                </button>
                <button className="flex items-center gap-1 hover:text-red-500 transition">
                  ❤️ <span>34</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition">
                  💬 <span>3</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
