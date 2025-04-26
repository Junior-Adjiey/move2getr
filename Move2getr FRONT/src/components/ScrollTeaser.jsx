import { ChevronDown } from "lucide-react";

export default function ScrollTeaser() {
  return (
    <div className="text-center py-6 relative z-10">
      <p className="text-[#3B2F2F] text-sm font-medium animate-bounce">
        👇 Découvrez les récits inspirants de nos Movers 👇
      </p>
      <ChevronDown className="mx-auto mt-2 text-[#D9735B] animate-bounce" size={24} />
    </div>
  );
}
