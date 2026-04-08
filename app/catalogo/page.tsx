"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Loader2, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";



export default function ProductsPage() {
  const router = useRouter();
const searchParams = useSearchParams();
const searchQuery = searchParams.get("search")?.toLowerCase() || "";
const typeQuery = searchParams.get("type");
const modelFromURL = searchParams.get("model");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  const [selectedModel, setSelectedModel] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todas");
  const [selectedPrice, setSelectedPrice] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [user, setUser] = useState<{ email: string } | null>(null);

  // 🔥 FETCH REAL
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const [resProducts, resCatalogo] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/catalogo"),
      ]);

      const dataProducts = await resProducts.json();
      const dataCatalogo = await resCatalogo.json();

      // 🔥 Marcamos los de catálogo
      const catalogoFormatted = dataCatalogo.map((p: any) => ({
        ...p,
        isCatalog: true, // 👈 clave
        source: "catalogo",
      }));

      const productsFormatted = dataProducts.map((p: any) => ({
        ...p,
        isCatalog: false,
        source: "product",
      }));

      // 🔥 UNIFICAMOS
      setProducts([...productsFormatted, ...catalogoFormatted]);

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
  const name = String(p.name || "").toLowerCase();
  const oem = String(p.oem_number || "").toLowerCase();

  const modelsArray = Array.isArray(p.compatible_models)
    ? p.compatible_models
    : [];

  const models = modelsArray.join(" ").toLowerCase();

  const oemEquivalents = Array.isArray(p.oem_equivalents)
    ? p.oem_equivalents.join(" ").toLowerCase()
    : String(p.oem_equivalents || "").toLowerCase();

  const brandArray = Array.isArray(p.brand)
    ? p.brand.map((b: string) => b.toLowerCase())
    : [String(p.brand || "").toLowerCase()];

  const brand = brandArray.join(" ");

  const type = String(p.part_type || "").toLowerCase();

  // 🔍 SEARCH
  const matchSearch =
    !searchQuery ||
    name.includes(searchQuery) ||
    oem.includes(searchQuery) ||
    oemEquivalents.includes(searchQuery) ||
    models.includes(searchQuery) ||
    brand.includes(searchQuery) ||
    type.includes(searchQuery);

  // 🔵 MODELO
  const matchModel =
    (selectedModel === "Todos" || modelsArray.includes(selectedModel)) &&
    (!modelFromURL || modelsArray.includes(modelFromURL));

  // 🟣 TIPO
  const matchType =
    (selectedType === "Todas" ||
      type === selectedType.toLowerCase()) &&
    (!typeQuery ||
      type === typeQuery.toLowerCase());

  // 🟡 MARCA
  const matchBrand =
    selectedBrand === "Todos" ||
    brandArray.includes(selectedBrand.toLowerCase());

  // 🟢 PRECIO
 const price = p.price ? Number(p.price) : null;

const matchPrice =
  p.isCatalog || // 🔥 SI ES CATÁLOGO, NO FILTRAR POR PRECIO
  selectedPrice === "Todos" ||
  (selectedPrice === "Hasta 30000" && price !== null && price <= 30000) ||
  (selectedPrice === "30000-60000" && price !== null && price > 30000 && price <= 60000) ||
  (selectedPrice === "60000-100000" && price !== null && price > 60000 && price <= 100000) ||
  (selectedPrice === "100000+" && price !== null && price > 100000);

  return (
    matchSearch &&
    matchModel &&
    matchType &&
    matchPrice &&
    matchBrand
  );
});

const addToCart = async (e: React.MouseEvent, product: any) => {
  e.stopPropagation();

  if (loading2) return;

  setLoading2(true);

  try {
    // 🔐 AUTH
    let sessionRes = await fetch("/api/me", {
      method: "GET",
      credentials: "include",
    });

    let data = await sessionRes.json();

    if (sessionRes.status === 401 && data.error === "TokenExpired") {
      const refreshRes = await fetch("/api/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) throw new Error("Refresh failed");

      sessionRes = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      });

      data = await sessionRes.json();
    }

    if (!sessionRes.ok) {
      Swal.fire({
        text: "Debes iniciar sesión",
        icon: "info",
      });
      return;
    }

    const email = data.user.email;

    // 🛒 AGREGAR PRODUCTO CORRECTO
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        productId: product.id, // 🔥 FIX REAL
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Error agregando producto");
    }

    Swal.fire({
      text: "Producto agregado al carrito",
      icon: "success",
    });

    router.refresh();

  } catch (error) {
    Swal.fire({
      text: error instanceof Error ? error.message : "Error",
      icon: "error",
    });
  } finally {
    setLoading2(false);
  }
};

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



  
   const clearFilters = () => {
  setSelectedModel("Todos");
  setSelectedType("Todas");
  setSelectedPrice("Todos");
  setSelectedBrand("Todos");

  router.push("/catalogo"); // limpia query params
};

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-[40px]">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#0b2a5b] to-[#0a2a55] text-white py-10 px-4">
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
 <button
  onClick={clearFilters}
  className="w-full bg-blue-800 text-white-800 py-2 rounded-lg font-medium hover:bg-blue-300 transition"
>
  Limpiar filtros
</button>
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
                key={`${product.source}-${product.id}`}
                onClick={() =>
  router.push(
    product.isCatalog
      ? `/catalogo/${product.id}`
      : `/product/${product.id}`
  )
}
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

                  {product.isCatalog ? (
  <>
    <p className="text-lg font-semibold mt-auto mb-4 text-green-700">
      Consultar precio
    </p>

       <button
  onClick={() => {
    const phone = "5491123456789"; // 🔥 tu número (sin +, con 54 y 9)
    
    const message = `Hola! Estoy interesado en el producto:
    
🧩 ${product.name}
🔧 OEM: ${product.oem_number}

¿Podrían darme más información?`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }}
  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition  cursor-pointer"
>
  Consultar por WhatsApp
</button>
  </>
) : (
  <>
    <p className="text-xl font-bold mt-auto mb-4 text-blue-900">
      ${Number(product.price).toLocaleString("es-AR")}
    </p>

    <button
  onClick={(e) => addToCart(e, product)}
  disabled={loading2}
      className="w-full bg-[#00173D] hover:bg-blue-900 text-white py-2 rounded-lg  cursor-pointer"
    >
        {loading2 ? (
          <div className="flex items-center gap-2 justify-center">
        <Loader2 size={18} className="animate-spin" />
        </div>
      ) : (
        <div className="flex items-center gap-2 justify-center">
  <ShoppingCart size={18} />
  <span>Agregar al carrito</span>
</div>
        
        
      )}
      
    </button>
  </>
)}
                </div>
              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}