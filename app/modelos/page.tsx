"use client";
import FeaturedProducts from "../components/FeaturedProducts";
import { useRouter } from "next/navigation";

const models = [
  {
    name: "Golf",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cbEyS2wFhQpTyUPfoVCioZwDklvHGmu6Bg&s",
  },
  {
    name: "Amarok",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_911955-MLA80334559322_112024-F.jpg",
  },
  {
    name: "Polo",
    image:
      "https://i0.wp.com/automundo.com.ar/wp-content/uploads/2023/08/VW-Polo-3.jpg?fit=1200%2C800&ssl=1",
  },
  {
    name: "Vento",
    image:
      "https://acnews.blob.core.windows.net/imgnews/medium/NAZ_ac1c5b538b7c48eda87f73d3d66f481d.webp",
  },
  {
    name: "Passat",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREDW3abvk13xsOgoWGDIvt3C9ZoYE456hGoA&s",
  },
  {
    name: "Tiguan",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2026-volkswagen-tiguan-sel-r-line-turbo-avocado-pr-107-67fe9bc628452.jpg?crop=0.641xw:0.546xh;0.216xw,0.324xh&resize=2048:*",
  },

  {
    name: "Bora",
    image:
      "https://media.diariouno.com.ar/p/89b55f3795e0d0b3965800f99e990deb/adjuntos/298/imagenes/009/676/0009676600/1200x0/smart/volkswagen-sedan-auto.jpg",
  },
  {
    name: "Fox",
    image:
      "https://elecodesunchales.com.ar/download/multimedia.normal.8b7c123a56f1f846.6e6f726d616c2e6a7067.jpg",
  },
  {
    name: "Suran",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijKuAAVoPz7gzYYWRvKrZPMT-VKepfJRGJZG_lEP5FqifgFj8A6d5673YLoPwdsPJjKE6RjFkuEvAXE-Agd6MAsl_b_zZhfV5T7klkj2N4H1XSqngpY_6qsuIzK3LiYG-pOlwoQf2Bltw/s1600-rw/Volkswagen-Suran-Track.jpg",
  },
  {
    name: "Gol Trend",
    image:
      "https://motormagazine.com.ar/wp-content/uploads/2016/03/vw-gol-trend-1.jpg",
  },
  {
    name: "Voyage",
    image:
      "https://www.autodato.com/wp-content/uploads/2012/10/Volkswagen-Voyage-2013-Argentina-01.jpg",
  },
  {
    name: "Saveiro",
    image:
      "https://cbredes.s3.us-east-2.amazonaws.com/webred/_red/_vw/images/saveiro/nsav17.webp",
  },
  {
    name: "Clio",
    image:
      "https://www.carsmagazine.com.ar/wp-content/uploads/2012/12/prueba-renault-clio-mio-11.jpg",
  },
  {
    name: "Kangoo",
    image:
      "https://miuramag.com/wp-content/uploads/2018/05/nuevo-renault-kangoo-furgon-5-asientos-3.jpg",
  },
  {
    name: "Scenic",
    image:
      "https://autotest.com.ar/wp-content/uploads/2022/05/RENAULT-SCENIC-3.jpg",
  },
  {
    name: "Logan",
    image:
      "https://acnews.blob.core.windows.net/imgnews/large/NAZ_e4768e9aa2c34f8a810934b68ab159a2.jpg",
  },
  {
    name: "Megane",
    image:
      "https://espirituracer.com/archivos/2025/01/renault-megane-ii-2-1.webp",
  },
  {
    name: "Sandero",
    image:
      "https://www.autoweb.com.ar/wp-content/uploads/2023/12/Renault-Sandero-CVT-accion.jpg",
  },
  {
    name: "Duster",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9l01uzwBBzF_WeZvTjEquHOHh8CQ6glDiXw&s",
  },
  {
    name: "Fluence",
    image: "https://i.ytimg.com/vi/JMFcuDoHZF4/maxresdefault.jpg",
  },
  {
    name: "Fluence",
    image:
      "https://renault-mediaroom-prensa.s3.amazonaws.com/4271/conversions/renault-captur-bose-32-sd.jpg",
  },
  {
    name: "Symbol",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3r7DDfCp1afPgRFpj-jkIn5glh7rms3SPOw&s",
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
          <h1 className="text-4xl md:text-[42px] lg:text-5xl font-black leading-[1.02] tracking-tight text-blue-900">
            Nuestros modelos disponibles
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900"></h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Encuentra los repuestos perfectos para tu modelo de auto
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {" "}
            {models.map((model, index) => (
              <div
                key={index}
                onClick={() => handleClick(model.name)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full max-w-[320px] hover:-translate-y-1"
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-36 object-cover"
                />

                <div className="p-4 bg-gradient-to-r from-[#0b2a5b] to-[#0a2a55]">
                  <h3 className="font-semibold text-white text-sm md:text-base">
                    {model.name}
                  </h3>

                  <span className="text-xs text-gray-200">Ver repuestos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
