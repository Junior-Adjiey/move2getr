import {
  Flame,
  Heart,
  GraduationCap,
  School,
  HelpCircle,
  Clock,
  Star
} from "lucide-react";

export default function SidebarTopics() {
  return (
    <aside className="w-full lg:w-56 bg-[#FAF3E0] text-[#3B2F2F] p-4 lg:p-6 border-r border-[#D6B56D]">
      <h2 className="text-lg font-bold mb-6 tracking-wide">POPULAR</h2>
      <ul className="space-y-4 text-sm font-medium">
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#D9735B]">
          <Flame size={18} />
          Trending
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#D9735B]">
          <Heart size={18} />
          Culture & Lifestyle
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#D9735B]">
          <GraduationCap size={18} />
          Preparation Tips
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#D9735B]">
          <School size={18} />
          Campus
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#D9735B]">
          <HelpCircle size={18} />
          Ask
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#D9735B]">
          <Clock size={18} />
          Latest
        </li>
      </ul>

      <div className="mt-10 border-t pt-4 border-[#D6B56D]">
        <div className="flex items-center gap-2 text-sm font-bold text-[#D9735B] cursor-pointer hover:underline">
          <Star size={16} />
          MOVE2GETR PRO
        </div>
      </div>
    </aside>
  );
}
