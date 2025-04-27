// src/components/Sidebar.jsx
export default function Sidebar() {
    return (
      <aside className="w-64 bg-gray-100 p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Communautés</h2>
        <ul className="space-y-2">
          <li className="hover:text-orange-600 cursor-pointer">Logement</li>
          <li className="hover:text-orange-600 cursor-pointer">Campus</li>
          <li className="hover:text-orange-600 cursor-pointer">Visa</li>
          <li className="hover:text-orange-600 cursor-pointer">Santé</li>
          <li className="hover:text-orange-600 cursor-pointer">Astuces</li>
        </ul>
      </aside>
    );
  }
  