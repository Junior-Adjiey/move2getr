import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

export default function PostCard({ title, content, author = "Anonyme", user }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (user) setLikes(likes + 1);
  };

  const handleDislike = () => {
    if (user) setDislikes(dislikes + 1);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (user && newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md border border-[#eee] p-5 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-bold text-[#D9735B] mb-2">{title}</h3>
      <p className="text-gray-800 mb-3">{content}</p>
      <span className="text-sm text-gray-500 block mb-4">
        Posté par <strong>{author}</strong>
      </span>

      {/* Réactions */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 1.2 }}
          disabled={!user}
          className={`flex items-center gap-1 transition ${
            user
              ? "text-green-600 hover:text-green-800"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <ThumbsUp size={18} /> {likes}
        </motion.button>

        <motion.button
          onClick={handleDislike}
          whileTap={{ scale: 1.2 }}
          disabled={!user}
          className={`flex items-center gap-1 transition ${
            user
              ? "text-red-600 hover:text-red-800"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <ThumbsDown size={18} /> {dislikes}
        </motion.button>

        <span className="text-gray-500 flex items-center gap-1">
          <MessageCircle size={18} /> {comments.length} commentaire(s)
        </span>
      </div>

      {/* Zone de commentaire */}
      {user ? (
        <form onSubmit={handleComment} className="flex flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="💬 Ajoute un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#D9735B] outline-none"
          />
          <button
            type="submit"
            className="self-end bg-[#D9735B] text-white text-sm px-4 py-1.5 rounded hover:bg-[#c9614b] transition"
          >
            Commenter
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-400 italic">
          Connecte-toi pour commenter 💬
        </p>
      )}

      {/* Affichage des commentaires */}
      {comments.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Commentaires :</h4>
          <ul className="space-y-2">
            {comments.map((c, i) => (
              <li key={i} className="bg-gray-50 p-2 rounded text-sm text-gray-700">
                <span className="text-[#D9735B] font-medium mr-2">@Moi</span> {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
