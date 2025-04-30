import { useState, useEffect } from "react";
import { getAllPosts, createPost } from "../auth_utils";
import TopStoriesRow from "./TopStoriesRow.jsx";
import { toast } from "react-hot-toast";
import { Camera, Video } from "lucide-react";

export default function PostFeed({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    }
    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const postData = {
      title: "Quick Post",
      content,
      media_url: mediaFile ? URL.createObjectURL(mediaFile) : null,
    };

    const newPost = await createPost(postData);
    if (newPost) {
      setPosts([newPost, ...posts]);
      toast.success("Post published!");
      setContent("");
      setMediaFile(null);
    } else {
      toast.error("Error while publishing.");
    }
  };

  return (
    <div className="bg-[#FDF7EC] text-[#3B2F2F] px-6 py-6 space-y-6">
      {/* Top Stories */}
      <TopStoriesRow />

      {/* Post Creation Area */}
      {user ? (
        <div className="bg-white rounded-lg shadow p-4 border border-[#D6B56D]">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={user.avatar_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.username}`}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <input
              type="text"
              placeholder={`What's on your mind, ${user.name}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 bg-[#f0f2f5] px-4 py-2 rounded-full outline-none text-sm"
            />
          </div>

          <hr className="my-3" />

          <div className="flex justify-between items-center px-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-red-600">
              <Video className="w-5 h-5 text-red-500" />
              Live Video
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => setMediaFile(e.target.files[0])}
              />
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-green-600">
              <Camera className="w-5 h-5 text-green-500" />
              Photo/Video
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setMediaFile(e.target.files[0])}
              />
            </label>

            <button
              onClick={handleSubmit}
              className="text-white text-sm bg-[#D9735B] hover:bg-[#c9614b] px-4 py-2 rounded-md"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 italic">
          Log in to share something 🧡
        </div>
      )}

      {/* Posts Display */}
      {posts.map((post, index) => (
        <div
          key={post.id || index}
          className="bg-white border border-[#D6B56D] rounded-lg shadow p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={user?.avatar_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author}`}
              className="w-8 h-8 rounded-full"
              alt="profile"
            />
            <div className="text-sm">
              <p className="font-semibold text-[#3B2F2F]">{post.author}</p>
              <p className="text-gray-500 text-xs">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-[#3B2F2F] mb-3">{post.content}</p>

          {post.media_url && (
            post.media_url.includes("video") ? (
              <video src={post.media_url} controls className="w-full rounded-lg" />
            ) : (
              <img src={post.media_url} className="w-full rounded-lg" alt="Post Media" />
            )
          )}
        </div>
      ))}
    </div>
  );
}
