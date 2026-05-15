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
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();

        // 🔀 mezclar productos
        const shuffled = data.sort(() => 0.5 - Math.random());

        // 🎯 tomar solo 4
        const selected = shuffled.slice(0, 4);

        setProducts(selected);
        setLoading(false);
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
          src="/DOVVV.png"
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
    <section className="bg-[#f8fafd] py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Productos Destacados
          </h2>

          <Link
            href="/catalogo"
            className="text-sm font-medium text-blue-900 hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col h-[220px]">
                <div>
                  <h3 className="font-semibold text-[#00173D] line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm mt-2 text-black">
                    OEM: {product.oem_number}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    OEM Equivalentes: {product.oem_equivalents}
                  </p>
                </div>

                {/* PRICE */}
                <div className="mt-auto">
                  <p className="text-2xl font-bold mb-4 text-blue-900">
                    ${product.price.toLocaleString("es-AR")}
                  </p>

                  <button className="w-full bg-[#00173D] hover:bg-[#00245e] transition text-white py-2.5 rounded-xl font-medium">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
