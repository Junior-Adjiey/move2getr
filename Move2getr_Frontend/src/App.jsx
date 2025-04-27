import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Navbar from "./components/Navbar";
import SidebarTopics from "./components/SidebarTopics";
import PostFeed from "./components/PostFeed";
import InboxChat from "./components/InboxChat";
import Auth from "./components/Auth";
import RightSidebar from "./components/RightSidebar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import WaveDivider from "./components/WaveDivider";
import ScrollTeaser from "./components/ScrollTeaser";
import UserProfile from "./components/UserProfile";
import SplashOverlay from "./components/SplashOverlay";
import ParallaxBackground from "./components/ParallaxBackground";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState("feed");
  const postFeedRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && (currentPage === "inbox" || currentPage === "profile")) {
      setShowAuth(true);
    }
  }, [currentPage, user]);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
    setShowAuth(false);
    setCurrentPage("feed"); // after login return to feed
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCurrentPage("feed");
    setShowAuth(true);
    navigate("/");
  };

  const scrollToFeed = () => {
    postFeedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden flex flex-col relative">
      <ParallaxBackground />
      <SplashOverlay />

      {/* Navbar */}
      <Navbar
        onNavigate={setCurrentPage}
        isLoggedIn={!!user}
        onShowLogin={() => setShowAuth(true)}
        onLogout={handleLogout}
      />

      {/* Auth Form */}
      {showAuth && <Auth onLogin={handleLogin} />}

      {/* Main Website */}
      {!showAuth && (
        <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
          {/* Sidebar Left */}
          {currentPage === "feed" && <SidebarTopics />}

          {/* Main Content */}
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
              user ? <InboxChat currentUser={user} /> : <div>🔒 Veuillez vous connecter.</div>
            )}

            {currentPage === "profile" && (
              user ? <UserProfile /> : <div>🔒 Veuillez vous connecter.</div>
            )}
          </main>

          {/* Sidebar Right */}
          {currentPage === "feed" && <RightSidebar />}
        </div>
      )}

      {/* Footer */}
      {!showAuth && <Footer />}
    </div>
  );
}




