"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



export default function ProductsPage() {
  const router = useRouter();
const searchParams = useSearchParams();
const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedModel, setSelectedModel] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todas");
  const [selectedPrice, setSelectedPrice] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todos");

  // 🔥 FETCH REAL
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔎 FILTRO REAL
  const filteredProducts = products.filter((p) => {
      const name = p.name.toLowerCase();
  const oem = p.oem_number?.toLowerCase();
  const models = p.compatible_models?.join(" ").toLowerCase() || "";
  const oemEquivalents = Array.isArray(p.oem_equivalents)
    ? p.oem_equivalents.join(" ").toLowerCase()
    : p.oem_equivalents?.toLowerCase() || "";

  const matchSearch =
    !searchQuery ||
    name.includes(searchQuery) ||
    oemEquivalents.includes(searchQuery) ||
    oem.includes(searchQuery) ||
    models.includes(searchQuery);
    // 🔵 MODELO (array en DB)

const matchBrand =
  selectedBrand === "Todos" ||
  p.brand?.toLowerCase() === selectedBrand.toLowerCase();

    const matchModel =
      selectedModel === "Todos" ||
      (Array.isArray(p.compatible_models) &&
        p.compatible_models.includes(selectedModel));

    // 🟣 TIPO (directo desde DB)
    const matchType =
      selectedType === "Todas" ||
      p.part_type?.toLowerCase() === selectedType.toLowerCase();

    // 🟢 PRECIO
    const price = Number(p.price);

    const matchPrice =
      selectedPrice === "Todos" ||
      (selectedPrice === "Hasta 30000" && price <= 30000) ||
      (selectedPrice === "30000-60000" && price > 30000 && price <= 60000) ||
      (selectedPrice === "60000-100000" && price > 60000 && price <= 100000) ||
      (selectedPrice === "100000+" && price > 100000);

    return matchSearch && matchModel && matchType && matchPrice && matchBrand;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando productos...</p>
      </div>
    );
  }

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
              <h3 className="font-semibold mb-3 text-black">Nuestras Marcas</h3>
              {["Todos", "Volkswagen", "Chevrolet", "Renault"].map((p) => (
                <label key={p} className="flex gap-2 text-sm text-black">
                  <input
                    type="radio"
                    checked={selectedBrand === p}
                    onChange={() => setSelectedBrand(p)}
                  />
                  {p}
                </label>
              ))}
            </div>
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
                onClick={() => router.push(`/product/${product.id}`)} // 🔥 REDIRECCIÓN
                className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition flex flex-col cursor-pointer"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.image1 || product.image}
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

                  {product.oem_equivalents && (
                    <p className="text-xs text-gray-500 mt-1">
                      OEM Equivalentes:{" "}
                      {Array.isArray(product.oem_equivalents)
                        ? product.oem_equivalents.join(", ")
                        : product.oem_equivalents}
                    </p>
                  )}

                  <p className="text-xl font-bold mt-auto mb-4 text-blue-900">
                    ${Number(product.price).toLocaleString("es-AR")}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 evita que navegue al hacer click
                      console.log("Agregar al carrito");
                    }}
                    className="w-full bg-[#00173D] text-white py-2 rounded-lg"
                  >
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