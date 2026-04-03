"use client";

import { useRouter } from "next/navigation";
import { Settings, Disc, Gauge, Zap, Wrench, Funnel } from "lucide-react";

const categories = [
  { name: "Motor", icon: Settings },
  { name: "Frenos", icon: Disc },
  { name: "Suspensión", icon: Gauge },
  { name: "Electricidad", icon: Zap },
  { name: "Filtros", icon: Funnel },
  { name: "Accesorios", icon: Wrench },
];

export default function Categories() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/catalogo?type=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-16 bg-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#0a1f44] text-center mb-12">
          Categorías
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat.name)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-full aspect-square text-center transition hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
              >
                <Icon className="h-12 w-12 text-[#0a1f44] mb-5 group-hover:scale-110 transition-transform" />

                <p className="text-lg font-medium text-[#0a1f44]">
                  {cat.name}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}