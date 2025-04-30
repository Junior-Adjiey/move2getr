import { useState } from "react";
import { Camera, Video } from "lucide-react";

export default function PostComposer({ onPost, user }) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onPost({
      title: "New Post",
      content,
      media_url: media ? URL.createObjectURL(media) : null,
    });

    setContent("");
    setMedia(null);
  };

  const avatarURL = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://localhost:8000/${user.avatar}`
    : `https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.username || "anon"}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200"
    >
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatarURL}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      <hr className="my-3" />

      {/* Action Buttons */}
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium">
        <label className="flex items-center gap-2 cursor-pointer hover:text-red-600">
          <Video size={16} className="text-red-500" />
          Live Video
        </label>

        <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
          <Camera size={16} className="text-green-600" />
          Photo/Video
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => setMedia(e.target.files[0])}
          />
        </label>

        <button
          type="submit"
          className="bg-[#D9735B] text-white px-4 py-1 rounded hover:bg-[#c9614b] transition"
        >
          Post
        </button>
      </div>
    </form>
  );
}
