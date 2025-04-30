import { useEffect, useState } from "react";
import NewPostForm from "./NewPostForm.jsx";
import PostCard from "./PostCard.jsx";

export default function UserProfile({ user }) {
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState(`https://api.dicebear.com/7.x/lorelei/svg?seed=${user.username}`);
  const [banner, setBanner] = useState("/images/banner-africa.jpg");
  const [bio, setBio] = useState("🎓 Move2getr student passionate about Europe and tech.");
  const [activeView, setActiveView] = useState("list");

  useEffect(() => {
    setPosts([]); // Simulated loading
  }, []);

  return (
    <div className="bg-[#FDF7EC] min-h-screen text-[#3B2F2F]">

      {/* BANNER */}
      <div className="relative h-64 w-full bg-gray-200">
        <img src={banner} alt="banner" className="w-full h-full object-cover" />
        <label className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded text-xs cursor-pointer hover:shadow">
          Change banner
          <input type="file" className="hidden" onChange={(e) => setBanner(URL.createObjectURL(e.target.files[0]))} />
        </label>

        {/* AVATAR */}
        <div className="absolute -bottom-16 left-6 md:left-1/2 md:-translate-x-1/2">
          <div className="relative">
            <img src={avatar} alt="avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
            <label className="absolute bottom-0 right-0 bg-white/80 p-1 rounded-full cursor-pointer text-xs">
              📷
              <input type="file" className="hidden" onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))} />
            </label>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-col md:flex-row gap-6 px-4 mt-24 max-w-6xl mx-auto">
        {/* LEFT SIDE */}
        <div className="md:w-1/3 space-y-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Intro</h2>
            <p className="text-sm text-gray-700">{bio}</p>
            <button className="mt-3 text-sm text-blue-600 hover:underline">✏️ Add a bio</button>
            <hr className="my-3" />
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Name:</strong> {user.name} {user.surname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age} y/o</p>
              <p><strong>Nationality:</strong> {user.nationality}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
            </div>
            <button className="mt-3 text-sm text-blue-600 hover:underline">⚙️ Edit info</button>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Photos</h2>
            <p className="text-sm text-gray-500">📷 Coming soon...</p>
          </div>
        </div>

        {/* MIDDLE / POSTS */}
        <div className="md:w-2/3 space-y-6">
          <NewPostForm onPost={(newPost) => setPosts([newPost, ...posts])} />

          {/* TOOLS */}
          <div className="bg-white px-4 py-3 rounded shadow flex items-center justify-between text-sm border border-[#e6d9a4]">
            <div className="flex items-center gap-2 text-[#3B2F2F] font-semibold">
              Posts
            </div>
            <div className="flex gap-4">
              <button onClick={() => setActiveView("list")} className={activeView === "list" ? "text-blue-600 font-bold" : "text-gray-500"}>
                🧾 List View
              </button>
              <button onClick={() => setActiveView("grid")} className={activeView === "grid" ? "text-blue-600 font-bold" : "text-gray-500"}>
                🟦 Grid View
              </button>
            </div>
          </div>

          {/* POSTS */}
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">No posts yet.</p>
          ) : activeView === "list" ? (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <PostCard key={index} title={post.title} content={post.content} media={post.media_url} author={user.username} user={user} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {posts.map((post, index) => (
                <PostCard key={index} title={post.title} content={post.content} media={post.media_url} author={user.username} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
