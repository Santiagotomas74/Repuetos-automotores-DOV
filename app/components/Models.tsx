"use client";

const models = [
  {
    name: "Golf",
    image: "",
  },
  {
    name: "Amarok",
    image: "",
  },
  {
    name: "Polo",
    image: "",
  },
  {
    name: "Vento",
    image: "",
  },
  {
    name: "Passat",
    image: "",
  },
  {
    name: "Tiguan",
    image: "",
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
