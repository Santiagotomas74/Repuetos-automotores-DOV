"use client";

import { useRouter } from "next/navigation";

const models = [
  {
    name: "Golf",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cbEyS2wFhQpTyUPfoVCioZwDklvHGmu6Bg&s",
  },
  {
    name: "Amarok",
    image: "https://http2.mlstatic.com/D_NQ_NP_911955-MLA80334559322_112024-F.jpg",
  },
  {
    name: "Polo",
    image: "https://i0.wp.com/automundo.com.ar/wp-content/uploads/2023/08/VW-Polo-3.jpg?fit=1200%2C800&ssl=1",
  },
  {
    name: "Vento",
    image: "https://acnews.blob.core.windows.net/imgnews/medium/NAZ_ac1c5b538b7c48eda87f73d3d66f481d.webp",
  },
  {
    name: "Passat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREDW3abvk13xsOgoWGDIvt3C9ZoYE456hGoA&s",
  },
  {
    name: "Tiguan",
    image: "https://hips.hearstapps.com/hmg-prod/images/2026-volkswagen-tiguan-sel-r-line-turbo-avocado-pr-107-67fe9bc628452.jpg?crop=0.641xw:0.546xh;0.216xw,0.324xh&resize=2048:*",
  },
];

export default function Models() {
  const router = useRouter();

  const handleClick = (model: string) => {
    router.push(`/catalogo?model=${encodeURIComponent(model)}`);
  };

  return (
    <section className="bg-[#f5f6f8] py-14">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Repuestos por modelo Volkswagen
        </h2>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Encuentra los repuestos perfectos para tu modelo Volkswagen
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
          {models.map((model, index) => (
            <div
              key={index}
              onClick={() => handleClick(model.name)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-full max-w-[220px]"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-36 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  {model.name}
                </h3>

                <span className="text-xs text-gray-500">
                  Ver repuestos
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}