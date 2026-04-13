"use client";
import FeaturedProducts from "../components/FeaturedProducts";
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



    {
    name: "Bora",
    image: "https://media.diariouno.com.ar/p/89b55f3795e0d0b3965800f99e990deb/adjuntos/298/imagenes/009/676/0009676600/1200x0/smart/volkswagen-sedan-auto.jpg",
  },
  {
    name: "Fox",
    image: "https://elecodesunchales.com.ar/download/multimedia.normal.8b7c123a56f1f846.6e6f726d616c2e6a7067.jpg",
  },
  {
    name: "Suran",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijKuAAVoPz7gzYYWRvKrZPMT-VKepfJRGJZG_lEP5FqifgFj8A6d5673YLoPwdsPJjKE6RjFkuEvAXE-Agd6MAsl_b_zZhfV5T7klkj2N4H1XSqngpY_6qsuIzK3LiYG-pOlwoQf2Bltw/s1600-rw/Volkswagen-Suran-Track.jpg",
  },
  {
    name: "Gol Trend",
    image: "https://motormagazine.com.ar/wp-content/uploads/2016/03/vw-gol-trend-1.jpg",
  },
  {
    name: "Voyage",
    image: "https://www.autodato.com/wp-content/uploads/2012/10/Volkswagen-Voyage-2013-Argentina-01.jpg",
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
    <>
    <section className="bg-[#f5f6f8] py-14 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Nuestros modelos disponibles
        </h2>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Encuentra los repuestos perfectos para tu modelo de auto
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
      <FeaturedProducts />
             </>
  );
}