import {
  Flame,
  Users,
  Lightbulb,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function RightSidebar() {
  const featuredTips = [
    "⚡️ Don’t miss the Campus France scholarships!",
    "🛏️ CROUS has opened housing applications.",
    "📚 Student fairs are coming to Paris.",
  ];

  const suggestedGroups = [
    { name: "Ivorian Students in France", members: "4.2k" },
    { name: "Student Jobs & Internships", members: "5.7k" },
  ];

  const suggestedProfiles = [
    "Fatou Koné",
    "Mohamed Traoré",
    "Koffi Yao",
  ];

  return (
    <aside className="fixed top-28 right-4 w-72 h-[85vh] bg-white shadow-lg rounded-xl p-5 overflow-y-auto hidden xl:block text-[#3B2F2F]">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#D9735B]">
        <Flame size={18} />
        Trending
      </h2>

      <ul className="space-y-2 text-sm mb-6">
        {featuredTips.map((tip, i) => (
          <li key={i} className="bg-[#FAF3E0] p-2 rounded hover:bg-[#f3dfbb] transition">
            {tip}
          </li>
        ))}
      </ul>

      <div className="mb-6">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <Users size={16} />
          Groups to Explore
        </h3>
        <ul className="space-y-2 text-sm">
          {suggestedGroups.map((group, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded hover:bg-gray-100">
              <span>{group.name}</span>
              <span className="text-xs text-gray-500">{group.members}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <Sparkles size={16} />
          Suggestions
        </h3>
        <ul className="space-y-1 text-sm">
          {suggestedProfiles.map((name, i) => (
            <li key={i} className="hover:underline cursor-pointer">
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#FFF7E8] p-4 rounded shadow-sm border border-[#D6B56D] text-sm">
        <div className="flex items-center gap-2 font-medium mb-1">
          <Lightbulb size={16} className="text-yellow-500" />
          Tip of the Day
        </div>
        <p className="text-gray-600 italic">
          "Always prepare two CVs: one classic and one creative to stand out 🎯"
        </p>
      </div>

      <div className="text-center pt-4">
        <button className="text-sm flex items-center gap-1 text-[#D9735B] hover:text-[#A94438] transition font-medium">
          See more news <ArrowRight size={14} />
        </button>
      </div>
    </aside>
  );
}
