import { useState, useRef, useEffect } from "react";
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
import { getCurrentUser } from "./auth_utils.js"; // <-- J'ai ajouté cette importation

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("feed");
  const [showAuth, setShowAuth] = useState(false);

  const postFeedRef = useRef(null);

  const handleLogin = async () => {
    const userData = await getCurrentUser();
    if (userData) {
      setUser(userData);
      setShowAuth(false);
    } else {
      alert("Erreur lors de la récupération du profil !");
    }
  };

  useEffect(() => {
    // Essayer de récupérer automatiquement l'utilisateur connecté au démarrage
    async function fetchUser() {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    }
    fetchUser();
  }, []);

  const scrollToFeed = () => {
    postFeedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden flex flex-col relative">
      {/* BACKGROUND PARALLAX */}
      <ParallaxBackground />

      {/* SPLASH OVERLAY PAR-DESSUS */}
      <SplashOverlay />

      {/* NAVBAR */}
      <Navbar
        onNavigate={setCurrentPage}
        isLoggedIn={!!user}
        onShowLogin={() => setShowAuth(true)}
        user={user} // <-- je passe aussi user dans Navbar maintenant
      />

      {/* FORMULAIRE DE CONNEXION */}
      {showAuth && <Auth onLogin={handleLogin} />}

      {/* PAGE PRINCIPALE */}
      {!showAuth && (
        <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
          {/* SIDEBAR GAUCHE */}
          {currentPage === "feed" && <SidebarTopics />}

          {/* CONTENU CENTRAL */}
          <main className="flex-1 p-4 overflow-hidden">
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
                  <div className="text-2xl font-bold mb-6 text-[#3B2F2F]">
                    Salut {user.name} 👋
                  </div>
                )}
                <div ref={postFeedRef}>
                  <PostFeed user={user} />
                </div>
              </>
            )}

            {currentPage === "inbox" && (
              <InboxChat currentUser={user ? user.username : "Visiteur"} />
            )}

            {currentPage === "profile" && (
              <UserProfile user={user} />
            )}
          </main>

          {/* SIDEBAR DROITE */}
          {currentPage === "feed" && <RightSidebar />}
        </div>
      )}

      {/* FOOTER */}
      {!showAuth && <Footer />}
    </div>
  );
}

export default App;
