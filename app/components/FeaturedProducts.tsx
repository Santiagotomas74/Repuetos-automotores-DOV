"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  oem_number: string;
  compatible: string;
  price: number;
  image1: string;
  oem_equivalents: string;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("api/products"); // tu endpoint
        const data: Product[] = await res.json();
        

        // 🔀 mezclar productos (shuffle)
        const shuffled = data.sort(() => 0.5 - Math.random());

        // 🎯 tomar solo 4
        const selected = shuffled.slice(0, 4);
        setLoading(false);
        setProducts(selected);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);
if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">

      {/* LOGO */}
      <img
        src="/DOVV.png"
        alt="Logo"
        className="w-28 h-auto object-contain animate-pulse"
      />

      {/* SPINNER */}
      <div className="flex flex-col items-center gap-2 text-gray-600">
        <Loader2 className="w-8 h-8 animate-spin text-[#00173D]" />
        <p className="text-sm font-medium">Cargando productos...</p>
      </div>

    </div>
  );
}
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

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-md transition"
            >

              {/* IMAGE */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={product.image1}
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