"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const products = [
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

export default function FeaturedProducts() {
  return (
    <section className="bg-[#f8fafd] py-12">

      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Productos Destacados
          </h2>

          <Link
            href="/catalogo"
            className="text-sm text-blue-900 hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >

              {/* IMAGE */}
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

      </div>

    </section>
  );
}