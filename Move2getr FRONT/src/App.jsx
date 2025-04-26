import { useState, useRef } from "react";
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
import SplashOverlay from "./components/SplashOverlay.jsx"; // ✅ Splash screen
import ParallaxBackground from "./components/ParallaxBackground.jsx"; // ✅ Parallaxe

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("feed");
  const [showAuth, setShowAuth] = useState(false);

  const postFeedRef = useRef(null);

  const handleLogin = (username) => {
    localStorage.setItem("move2getr_user", username);
    setUser(username);
    setShowAuth(false);
  };

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
                <div ref={postFeedRef}>
                  <PostFeed user={user} />
                </div>
              </>
            )}

            {currentPage === "inbox" && (
              <InboxChat currentUser={user || "Visiteur"} />
            )}

            {currentPage === "profile" && <UserProfile user={user} />}
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