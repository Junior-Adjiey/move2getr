import { useState } from "react";

const mockConversations = [
  {
    id: 1,
    user: "Fatou",
    lastMessage: "T’as reçu ta carte étudiante ?",
  },
  {
    id: 2,
    user: "Mohamed",
    lastMessage: "Merci pour les infos sur la bourse 🙏🏾",
  },
  {
    id: 3,
    user: "Awa",
    lastMessage: "Tu vis où à Paris ?",
  },
];

export default function UserMessages() {
  const [activeConv, setActiveConv] = useState(mockConversations[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FFF7E8] p-4 rounded-xl shadow">
      {/* Liste de conversations */}
      <div className="col-span-1 space-y-2">
        <h3 className="font-bold text-[#3B2F2F] mb-2">Discussions</h3>
        {mockConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setActiveConv(conv)}
            className={`cursor-pointer p-3 rounded-lg ${
              activeConv.id === conv.id
                ? "bg-[#FFE6CC] text-[#D9735B] font-semibold"
                : "hover:bg-[#FAF3E0]"
            }`}
          >
            <div className="text-sm">{conv.user}</div>
            <div className="text-xs text-gray-600 truncate">{conv.lastMessage}</div>
          </div>
        ))}
      </div>

      {/* Espace de conversation */}
      <div className="col-span-2 flex flex-col bg-white rounded-lg p-4 shadow-inner">
        <h4 className="font-semibold text-[#3B2F2F] mb-4">
          Conversation avec {activeConv.user}
        </h4>
        <div className="flex-1 border p-4 rounded-lg text-sm text-gray-700 mb-4 overflow-y-auto h-64">
          <p className="mb-2"><strong>Toi:</strong> Salut {activeConv.user} !</p>
          <p className="mb-2"><strong>{activeConv.user}:</strong> {activeConv.lastMessage}</p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2 mt-auto"
        >
          <input
            type="text"
            placeholder="Écris un message..."
            className="flex-1 px-4 py-2 border rounded-full text-sm"
          />
          <button className="px-4 py-2 rounded-full bg-[#D9735B] text-white hover:bg-[#c9614b] text-sm">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
