import React, { useState } from "react";

const fakeUsers = ["Mariam", "Junior", "Fatou", "Amine", "Chérif"];

export default function InboxChat() {
  const currentUser = "Junior";
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState({});

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedUser || !message.trim()) return;

    const key = [currentUser, selectedUser].sort().join("_");
    const newMessage = {
      from: currentUser,
      to: selectedUser,
      text: message,
      date: new Date().toLocaleString()
    };

    const updated = {
      ...conversations,
      [key]: [...(conversations[key] || []), newMessage],
    };

    setConversations(updated);
    setMessage("");
  };

  const getMessages = () => {
    const key = [currentUser, selectedUser].sort().join("_");
    return conversations[key] || [];
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Liste des contacts */}
      <div className="w-full md:w-1/3 bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-orange-600">Contacts</h2>
        <ul className="space-y-2">
          {fakeUsers
            .filter((u) => u !== currentUser)
            .map((user) => (
              <li
                key={user}
                className={`cursor-pointer p-2 rounded ${
                  selectedUser === user ? "bg-orange-100 font-bold" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                {user}
              </li>
            ))}
        </ul>
      </div>

      {/* Conversation */}
      <div className="w-full md:flex-1 bg-white p-4 shadow rounded-lg">
        {selectedUser ? (
          <>
            <h2 className="text-lg font-semibold mb-4 text-orange-600">
              Discussion avec {selectedUser}
            </h2>

            {/* Messages */}
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {getMessages().map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    msg.from === currentUser
                      ? "bg-orange-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-500">{msg.date}</p>
                </div>
              ))}
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Écris un message..."
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              >
                Envoyer
              </button>
            </form>
          </>
        ) : (
          <p className="text-gray-500">Sélectionne un contact pour discuter 💬</p>
        )}
      </div>
    </div>
  );
}
