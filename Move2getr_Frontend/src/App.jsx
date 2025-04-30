import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import SidebarTopics from "./components/SidebarTopics.jsx";
import PostFeed from "./components/PostFeed.jsx";
import InboxChat from "./components/InboxChat.jsx";
import Auth from "./components/Auth.jsx";
import RightSidebar from "./components/RightSidebar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Footer from "./components/Footer.jsx";
import WaveDivider from "./components/WaveDivider.jsx";
import ScrollTeaser from "./components/ScrollTeaser.jsx";
import UserProfile from "./components/UserProfile.jsx";
import SplashOverlay from "./components/SplashOverlay.jsx";
import ParallaxBackground from "./components/ParallaxBackground.jsx";
import { getCurrentUser } from "./auth_utils.js";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("feed");
  const [showAuth, setShowAuth] = useState(false);
  const [lang, setLang] = useState("fr");
  const postFeedRef = useRef(null);

  const toggleLang = () => setLang((prev) => (prev === "fr" ? "en" : "fr"));

  const t = {
    fr: {
      welcome: "Bienvenue",
      glad: "Heureux de te retrouver sur Move2getr 🚀",
      quotes: [
        "Crois en toi et en tes rêves 🌟",
        "Aujourd'hui est le meilleur jour pour commencer 🚀",
        "Ton futur commence ici, sur Move2getr 🌍",
        "Un pas de plus vers ton succès 🎯",
        "Continue d’avancer avec confiance 💪",
        "Rien n'est impossible à qui croit ✨",
      ],
    },
    en: {
      welcome: "Welcome",
      glad: "Happy to see you back on Move2getr 🚀",
      quotes: [
        "Believe in yourself and your dreams 🌟",
        "Today is the best day to start 🚀",
        "Your future starts here, on Move2getr 🌍",
        "One more step toward success 🎯",
        "Keep going with confidence 💪",
        "Nothing is impossible for those who believe ✨",
      ],
    },
  };

  const handleLogin = async () => {
    const userData = await getCurrentUser();
    if (userData) {
      setUser(userData);
      setShowAuth(false);
      toast.success(`${t[lang].welcome} ${userData.name} 👋`);
    } else {
      toast.error("Erreur lors de la récupération du profil !");
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      if (userData) setUser(userData);
    }
    fetchUser();
  }, []);

  const scrollToFeed = () => {
    postFeedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-36 overflow-x-hidden flex flex-col relative">
      <Toaster position="top-right" reverseOrder={false} />
      <ParallaxBackground />

      {/* NAVBAR */}
      <Navbar
        onNavigate={setCurrentPage}
        isLoggedIn={!!user}
        onShowLogin={() => setShowAuth(true)}
        user={user}
        lang={lang}
        toggleLang={toggleLang}
      />

      {/* SPLASH OVERLAY au-dessus de tout */}
      <div className="z-50">
        <SplashOverlay />
      </div>

      {/* FORMULAIRE CONNEXION */}
      {showAuth && <Auth onLogin={handleLogin} />}

      {/* CONTENU PRINCIPAL */}
      {!showAuth && (
        <div className="flex flex-1 justify-center w-full max-w-[1600px] mx-auto px-4 gap-4 pb-20">
          {user && <SidebarTopics user={user} />}

          <div className="flex-1 max-w-[700px]">
            <main className="w-full overflow-hidden">
              {currentPage === "feed" && (
                <>
                  {!user && (
                    <>
                      <HeroSection onJoinClick={scrollToFeed} />
                      <WaveDivider />
                      <ScrollTeaser />
                    </>
                  )}
                  {user && (
                    <div className="flex flex-col items-center justify-center mt-8 mb-10">
                      <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-400 to-red-500 drop-shadow-lg"
                      >
                        {t[lang].welcome} {user.name} {user.surname} 🌍
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="mt-4 text-gray-700 text-lg"
                      >
                        {t[lang].glad}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="mt-2 text-center text-sm italic text-gray-500"
                      >
                        "
                        {
                          t[lang].quotes[
                            Math.floor(Math.random() * t[lang].quotes.length)
                          ]
                        }
                        "
                      </motion.p>
                    </div>
                  )}

                  <div ref={postFeedRef}>
                    <PostFeed user={user} />
                  </div>
                </>
              )}

              {currentPage === "inbox" && (
                <InboxChat currentUser={user ? user.username : "Visitor"} />
              )}

              {currentPage === "profile" && <UserProfile user={user} />}
            </main>
          </div>

          {user && <RightSidebar />}
        </div>
      )}

      
    </div>
  );
}

export default App;
