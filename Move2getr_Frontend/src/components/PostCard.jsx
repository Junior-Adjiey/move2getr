import React, { useState } from "react";

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
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-lg font-bold text-orange-600 mb-1">{title}</h3>
      <p className="text-gray-700 mb-2">{content}</p>
      <span className="text-sm text-gray-500">Posté par {author}</span>

      {/* Like / Dislike */}
      <div className="flex items-center space-x-4 mt-3 mb-3">
        <button
          onClick={handleLike}
          className={`flex items-center ${
            user
              ? "text-green-600 hover:text-green-800"
              : "text-gray-400 cursor-not-allowed"
          } transition`}
        >
          👍 <span className="ml-1">{likes}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center ${
            user
              ? "text-red-600 hover:text-red-800"
              : "text-gray-400 cursor-not-allowed"
          } transition`}
        >
          👎 <span className="ml-1">{dislikes}</span>
        </button>
      </div>

      {/* Commentaire */}
      {user ? (
        <form onSubmit={handleComment} className="mt-4">
          <input
            type="text"
            placeholder="Ajoute un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
          >
            Commenter
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">Connecte-toi pour commenter 💬</p>
      )}

      {/* Affichage des commentaires */}
      {comments.length > 0 && (
        <div className="mt-4 border-t pt-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            Commentaires :
          </h4>
          <ul className="space-y-1">
            {comments.map((c, i) => (
              <li
                key={i}
                className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
