import { Flame } from "lucide-react";

const featuredPosts = [
  {
    title: "Obtenir un logement étudiant en Île-de-France 🏠",
    excerpt: "Découvrez comment j’ai trouvé un studio à Cachan en 2 semaines...",
  },
  {
    title: "Visa Campus France depuis le Cameroun",
    excerpt: "Tous les documents à ne surtout pas oublier pour passer l’entretien...",
  },
  {
    title: "Travailler 20h/semaine légalement en tant qu’étudiant",
    excerpt: "Voici les 4 sites que j’utilise pour décrocher des petits jobs.",
  },
];

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-[#FAF3E0] text-[#3B2F2F] p-4 border-l border-[#D6B56D]">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Flame size={18} className="text-[#D9735B]" />
        À la une
      </h2>

      <ul className="space-y-4 text-sm">
        {featuredPosts.map((post, index) => (
          <li key={index} className="bg-white p-3 rounded shadow-sm hover:shadow-md transition cursor-pointer">
            <h3 className="font-semibold text-[#3B2F2F]">{post.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{post.excerpt}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <button className="text-sm text-[#D9735B] underline hover:text-[#A94438]">
          Voir plus d’articles
        </button>
      </div>
    </aside>
  );
}
