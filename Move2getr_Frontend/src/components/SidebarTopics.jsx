import {
  UserCircle,
  CircleDot,
  Users,
  Clock,
  Bookmark,
  Layers3,
  Video,
  Store,
  Newspaper,
  Calendar,
  BarChart3,
  ChevronDown
} from "lucide-react";

export default function SidebarTopics({ user }) {
  const items = [
    { icon: <UserCircle size={20} />, label: `${user?.name || "My Profile"} ${user?.surname || ""}` },
    { icon: <CircleDot size={20} />, label: "Meta AI" },
    { icon: <Users size={20} />, label: "Friends" },
    { icon: <Clock size={20} />, label: "Memories" },
    { icon: <Bookmark size={20} />, label: "Saved" },
    { icon: <Layers3 size={20} />, label: "Groups" },
    { icon: <Video size={20} />, label: "Videos" },
    { icon: <Store size={20} />, label: "Marketplace" },
    { icon: <Newspaper size={20} />, label: "Feeds" },
    { icon: <Calendar size={20} />, label: "Events" },
    { icon: <BarChart3 size={20} />, label: "Analytics" },
  ];

  return (
    <aside className="fixed top-28 left-4 w-60 h-[85vh] bg-white shadow-lg rounded-xl p-5 overflow-y-auto hidden lg:block text-[#3B2F2F]">
      <h2 className="text-lg font-bold mb-6">Main Menu</h2>
      <ul className="space-y-4 text-sm font-medium">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {item.icon}
            {item.label}
          </li>
        ))}
        <li className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
          <ChevronDown size={20} />
          See more
        </li>
      </ul>
    </aside>
  );
}
