import { useState } from "react";
import { motion } from "framer-motion";

export default function NewPostForm({ onPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onPost({ title, content, media, author: localStorage.getItem("move2getr_user") });
    setTitle("");
    setContent("");
    setMedia(null);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border border-[#D6B56D] space-y-4 mb-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
        hidden: {},
      }}
    >
      <motion.input
        type="text"
        placeholder="Titre de ta publication"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded text-[#3B2F2F]"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      />

      <motion.textarea
        placeholder="Exprime-toi ici..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded min-h-[100px] text-[#3B2F2F]"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      />

      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
      >
        <label className="text-sm text-gray-600">Ajouter une image ou une vidéo :</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setMedia(URL.createObjectURL(e.target.files[0]))}
          className="text-sm"
        />
      </motion.div>

      <motion.button
        type="submit"
        className="bg-[#D9735B] text-white px-6 py-2 rounded hover:bg-[#c9614b] transition"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        Publier
      </motion.button>
    </motion.form>
  );
}
