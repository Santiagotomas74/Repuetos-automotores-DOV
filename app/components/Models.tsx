"use client";

import { useRouter } from "next/navigation";

const brands = [
  {
    id: 1,
    name: "Volkswagen",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
  },
  {
    id: 2,
    name: "Chevrolet",
    image: "/chevrolet.png",
  },
  {
    id: 3,
    name: "Renault",
    image: "/renault.png",
  },
];

export default function BrandsSection() {
  const router = useRouter();

  const handleClick = (brand: string) => {
    router.push(`/catalogo?marca=${encodeURIComponent(brand)}`);
  };

  return (
    <section className="bg-white py-12 mb-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Marcas que trabajamos
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleClick(brand.name)}
              className="bg-[#f8fafd] rounded-xl p-6 flex items-center justify-center hover:shadow-md transition cursor-pointer"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="h-12 object-contain"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}