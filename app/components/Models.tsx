"use client";

const models = [
  {
    name: "Golf",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
  },
  {
    name: "Amarok",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
  },
  {
    name: "Polo",
    image: "https://images.unsplash.com/photo-1549921296-3a6b4f44b8a4",
  },
  {
    name: "Vento",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
  },
  {
    name: "Passat",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
  {
    name: "Tiguan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  },
];

export default function Models() {
  return (
    <section className="bg-[#f5f6f8] py-14">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Repuestos por modelo Volkswagen
        </h2>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Encuentra los repuestos perfectos para tu modelo Volkswagen
        </p>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
          {models.map((model, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-full max-w-[220px]"
            >
              {/* IMAGE */}
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-36 object-cover"
              />

              {/* CONTENT */}
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
