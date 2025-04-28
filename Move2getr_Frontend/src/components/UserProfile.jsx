import { useState } from "react";
import { Settings, MessageCircle, Image, FileText } from "lucide-react";
import EditProfileModal from "./EditProfileModal.jsx";
import UserMessages from "./UserMessages.jsx";
import UserMediaGallery from "./UserMediaGallery.jsx";
import NewPostForm from "./NewPostForm.jsx";
import UserSettings from "./UserSettings.jsx";

export default function UserProfile({ user }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  const [avatar, setAvatar] = useState(`https://api.dicebear.com/7.x/lorelei/svg?seed=${user.username}`);
  const [banner, setBanner] = useState("/images/banner-africa.jpg");

  const userInfo = {
    name: `${user.name} ${user.surname}`,   // 🔥 Dynamique
    username: user.username,
    age: user.age,
    country: user.nationality,
    bio: "Étudiant Move2getr 🌍",            // Tu pourras rendre ça éditable plus tard
    avatar,
    banner,
  };

  return (
    <div className="bg-[#FDF7EC] min-h-screen text-[#3B2F2F]">
      {/* BANNIÈRE */}
      <div className="relative w-full h-56 bg-gray-300">
        <img src={userInfo.banner} alt="Bannière" className="w-full h-full object-cover" />

        {/* Modifier bannière */}
        <label className="absolute top-2 right-2 bg-white bg-opacity-80 text-xs px-2 py-1 rounded cursor-pointer hover:bg-opacity-100 transition transform hover:scale-105 hover:shadow">
          Modifier la bannière
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setBanner(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
        </label>

        {/* AVATAR */}
        <div className="absolute -bottom-16 left-6">
          <div className="relative">
            <img
              src={userInfo.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white bg-opacity-80 rounded-full p-1 cursor-pointer hover:bg-opacity-100 transition transform hover:scale-105 hover:shadow text-xs">
              📷
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setAvatar(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* INFOS UTILISATEUR */}
      <div className="mt-20 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">{userInfo.name}</h1>
            <p className="text-sm text-gray-600">
              @{userInfo.username} · {userInfo.age} ans · {userInfo.country}
            </p>
            <p className="mt-2">{userInfo.bio}</p>
          </div>
          <button
            onClick={() => setShowEdit(true)}
            className="bg-[#D9735B] text-white px-4 py-2 rounded-full font-medium transition transform hover:scale-105 hover:shadow-md hover:bg-[#c9614b]"
          >
            Modifier le profil
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="mt-6 border-b border-[#D6B56D] flex gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-2 transition hover:scale-105 ${activeTab === "posts" ? "text-[#D9735B] border-b-2 border-[#D9735B]" : "text-gray-500"}`}
          >
            <FileText size={16} className="inline mr-1" /> Publications
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`pb-2 transition hover:scale-105 ${activeTab === "media" ? "text-[#D9735B] border-b-2 border-[#D9735B]" : "text-gray-500"}`}
          >
            <Image size={16} className="inline mr-1" /> Photos/Vidéos
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`pb-2 transition hover:scale-105 ${activeTab === "messages" ? "text-[#D9735B] border-b-2 border-[#D9735B]" : "text-gray-500"}`}
          >
            <MessageCircle size={16} className="inline mr-1" /> Messages
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-2 transition hover:scale-105 ${activeTab === "settings" ? "text-[#D9735B] border-b-2 border-[#D9735B]" : "text-gray-500"}`}
          >
            <Settings size={16} className="inline mr-1" /> Paramètres
          </button>
        </div>

        {/* ZONE DE CONTENU */}
        <div className="mt-6">
          {activeTab === "posts" && (
            <>
              <NewPostForm onPost={(newPost) => setMyPosts([newPost, ...myPosts])} />
              <div className="mt-6 space-y-6">
                {myPosts.length === 0 ? (
                  <p className="text-gray-500">Aucune publication pour le moment.</p>
                ) : (
                  myPosts.map((post, index) => (
                    <div key={index} className="bg-[#FFF7E8] border border-[#D6B56D] rounded-lg shadow p-4">
                      <div className="text-sm text-gray-600 mb-1">
                        Posté par <span className="font-semibold text-[#3B2F2F]">{post.author}</span>
                      </div>
                      <h3 className="font-bold text-lg text-[#3B2F2F] mb-2">{post.title}</h3>
                      <p className="text-sm text-[#3B2F2F] mb-2">{post.content}</p>
                      {post.media && (
                        <>
                          {post.media.includes("video") ? (
                            <video src={post.media} controls className="w-full max-h-72 rounded-lg" />
                          ) : (
                            <img src={post.media} alt="media" className="w-full max-h-72 object-cover rounded-lg" />
                          )}
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
          {activeTab === "media" && <UserMediaGallery />}
          {activeTab === "messages" && <UserMessages />}
          {activeTab === "settings" && <UserSettings />}
        </div>
      </div>

      {/* MODAL ÉDITION */}
      {showEdit && <EditProfileModal user={userInfo} onClose={() => setShowEdit(false)} />}
    </div>
  );
}
