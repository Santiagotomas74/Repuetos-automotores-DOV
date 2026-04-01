"use client";

import { useState } from "react";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Pastillas de Freno Delanteras",
    oem_number: "23456",
    compatible: "Golf",
    price: 45000,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=500&auto=format&fit=crop",
    oem_equivalents: "23452352435, 2352345",
  },
  {
    id: 2,
    name: "Filtro de Aceite Premium",
    oem_number: "2345434346",
    compatible: "Polo",
    price: 12000,
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=500&auto=format&fit=crop",
    oem_equivalents: "52435, 52345",
  },
  {
    id: 3,
    name: "Bujías de Ignición x4",
    oem_number: "233543456",
    compatible: "Vento",
    price: 28000,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=500&auto=format&fit=crop",
    oem_equivalents: "2342435, 2355",
  },
  {
    id: 4,
    name: "Amortiguadores Traseros",
    oem_number: "23453453456",
    compatible: "Amarok",
    price: 85000,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop",
    oem_equivalents: "86786, 567345",
  },
];

export default function ProductsPage() {
  const [selectedModel, setSelectedModel] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todas");
  const [selectedPrice, setSelectedPrice] = useState("Todos");

  // 🔥 KEYWORDS PARA TIPO
  const typeKeywords: Record<string, string[]> = {
    Motor: ["motor", "aceite", "distribucion"],
    Frenos: ["freno", "pastilla", "disco"],
    Suspensión: ["amortiguador", "suspension"],
    Electricidad: ["bateria", "bujia", "sensor"],
    Filtros: ["filtro"],
  };

  // 🔎 FILTRO COMPLETO
  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const name = p.name.toLowerCase();

    const matchModel =
      selectedModel === "Todos" || p.compatible === selectedModel;

    const matchType =
      selectedType === "Todas" ||
      typeKeywords[selectedType]?.some((keyword) =>
        name.includes(keyword)
      );

    const matchPrice =
      selectedPrice === "Todos" ||
      (selectedPrice === "Hasta 30000" && p.price <= 30000) ||
      (selectedPrice === "30000-60000" &&
        p.price > 30000 &&
        p.price <= 60000) ||
      (selectedPrice === "60000-100000" &&
        p.price > 60000 &&
        p.price <= 100000) ||
      (selectedPrice === "100000+" && p.price > 100000);

    return matchModel && matchType && matchPrice;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-[40px]">

      {/* HEADER */}
      <header className="bg-[#00173D] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">
            Repuestos Originales Volkswagen
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Encontramos {filteredProducts.length} productos
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">

        {/* FILTROS */}
        <aside className="w-full lg:w-64">
          <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">

            <h2 className="text-lg font-bold text-[#00173D]">
              Filtros
            </h2>

            {/* MODELO */}
            <div>
              <h3 className="font-semibold mb-3 text-black">Modelo Volkswagen</h3>
              {["Todos", "Golf", "Amarok", "Polo", "Vento", "Passat", "Tiguan"].map((m) => (
                <label key={m} className="flex gap-2 text-sm text-black">
                  <input
                    type="radio"
                    checked={selectedModel === m}
                    onChange={() => setSelectedModel(m)}
                  />
                  {m}
                </label>
              ))}
            </div>

            {/* TIPO */}
            <div>
              <h3 className="font-semibold mb-3 text-black">Tipo de repuesto</h3>
              {["Todas", "Motor", "Frenos", "Suspensión", "Electricidad", "Filtros"].map((t) => (
                <label key={t} className="flex gap-2 text-sm text-black">
                  <input
                    type="radio"
                    checked={selectedType === t}
                    onChange={() => setSelectedType(t)}
                  />
                  {t}
                </label>
              ))}
            </div>

            {/* PRECIO */}
            <div>
              <h3 className="font-semibold mb-3 text-black">Precio</h3>
              {[
                "Todos",
                "Hasta 30000",
                "30000-60000",
                "60000-100000",
                "100000+",
              ].map((p) => (
                <label key={p} className="flex gap-2 text-sm text-black">
                  <input
                    type="radio"
                    checked={selectedPrice === p}
                    onChange={() => setSelectedPrice(p)}
                  />
                  {p}
                </label>
              ))}
            </div>

          </div>
        </aside>

        {/* PRODUCTOS */}
        <section className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition flex flex-col"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-[#00173D]">
                    {product.name}
                  </h3>

                  <p className="text-sm mt-2 text-black">
                    OEM: {product.oem_number}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                  OEM Equivalentes: {product.oem_equivalents}
                  </p>

                  <p className="text-xl font-bold mt-auto mb-4 text-blue-900">
                    ${product.price.toLocaleString("es-AR")}
                  </p>

                  <button className="w-full bg-[#00173D] text-white py-2 rounded-lg">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}