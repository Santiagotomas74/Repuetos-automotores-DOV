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
  const marca = searchParams.get("marca");
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
      : String(p.compatible_models || "")
          .replace(/[{}"]/g, "") // elimina { } y "
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean);
    const normalizedModels = modelsArray.map((m: string) =>
      m.toLowerCase().trim(),
    );
    const models = normalizedModels.join(" ");

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

    //marca
    const matchMarca = marca ? brandArray.includes(marca.toLowerCase()) : true;

    // 🔵 MODELO

    const matchModel =
      selectedModel === "Todos" ||
      normalizedModels.some((model: string) =>
        model.includes(selectedModel.toLowerCase().trim()),
      );

    // 🟣 TIPO
    const matchType =
      (selectedType === "Todas" || type === selectedType.toLowerCase()) &&
      (!typeQuery || type === typeQuery.toLowerCase());

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
      (selectedPrice === "30000-60000" &&
        price !== null &&
        price > 30000 &&
        price <= 60000) ||
      (selectedPrice === "60000-100000" &&
        price !== null &&
        price > 60000 &&
        price <= 100000) ||
      (selectedPrice === "100000+" && price !== null && price > 100000);

    return (
      matchSearch &&
      matchModel &&
      matchType &&
      matchPrice &&
      matchBrand &&
      matchMarca
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
          quantity: 1, // 🔥 FIX REAL
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
        <div className="max-w-7xl mx-auto mt-15 sm:mt-0 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold">Nuestros Repuestos</h1>
          <p className="text-sm text-gray-300 mt-1">
            Encontramos {filteredProducts.length} productos
          </p>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-5 lg:px-8 mt-8 flex flex-col lg:flex-row gap-10">
        {/* FILTROS */}
        <aside className="w-full lg:w-[320px] xl:w-[340px]">
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-200/70 space-y-6 sticky top-50">
            <h2 className="text-xl font-bold text-[#00173D]">Filtros</h2>

            {/* BOTON */}
            <button
              onClick={clearFilters}
              className="w-full bg-[#00173D] text-white py-3 rounded-xl font-semibold hover:bg-[#00245e] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Limpiar filtros
            </button>

            {/* MARCAS */}
            <div>
              <h3 className="font-semibold mb-3 text-black">Nuestras Marcas</h3>

              <div className="relative">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="
        w-full
        appearance-none
        bg-white
        border border-gray-300
        rounded-2xl
        px-4
        py-3
        pr-12
        text-sm
        font-medium
        text-[#00173D]
        shadow-sm
        transition-all
        duration-300
        hover:border-[#00173D]
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-[#00173D]/20
        focus:border-[#00173D]
        cursor-pointer
      "
                >
                  {["Todos", "Volkswagen", "Chevrolet", "Renault"].map(
                    (brand) => (
                      <option
                        key={brand}
                        value={brand}
                        className="text-black bg-white"
                      >
                        {brand}
                      </option>
                    ),
                  )}
                </select>

                {/* ICONO */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* MODELO */}
            <div>
              <h3 className="font-semibold mb-3 text-black">
                Modelo del Vehículo
              </h3>

              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="
        w-full
        appearance-none
        bg-white
        border border-gray-300
        rounded-2xl
        px-4
        py-3
        pr-12
        text-sm
        font-medium
        text-[#00173D]
        shadow-sm
        transition-all
        duration-300
        hover:border-[#00173D]
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-[#00173D]/20
        focus:border-[#00173D]
        cursor-pointer
      "
                >
                  {[
                    "Todos",

                    // Volkswagen
                    "Fox",
                    "Suran",
                    "Golf",
                    "Gol",
                    "Voyage",
                    "Amarok",
                    "Passat",
                    "Polo",
                    "Vento",
                    "Saveiro",
                    "Tiguan",
                    "Bora",

                    // Renault
                    "Clio",
                    "Kangoo",
                    "Scenic",
                    "Logan",
                    "Megane",
                    "Sandero",
                    "Duster",
                    "Fluence",
                    "Captur",
                    "Symbol",
                  ].map((model) => (
                    <option
                      key={model}
                      value={model}
                      className="text-black bg-white"
                    >
                      {model}
                    </option>
                  ))}
                </select>

                {/* ICONO */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* TIPO */}
            <div>
              <h3 className="font-semibold mb-3 text-black">
                Tipo de Repuesto
              </h3>

              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="
        w-full
        appearance-none
        bg-white
        border border-gray-300
        rounded-2xl
        px-4
        py-3
        pr-12
        text-sm
        font-medium
        text-[#00173D]
        shadow-sm
        transition-all
        duration-300
        hover:border-[#00173D]
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-[#00173D]/20
        focus:border-[#00173D]
        cursor-pointer
      "
                >
                  {[
                    "Todas",
                    "Motor",
                    "Frenos",
                    "Suspensión",
                    "Electricidad",
                    "Filtros",
                    "Accesorios",
                  ].map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="text-black bg-white"
                    >
                      {type}
                    </option>
                  ))}
                </select>

                {/* ICONO */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* PRECIO */}
            <div>
              <h3 className="font-semibold mb-3 text-black">Rango de Precio</h3>

              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="
        w-full
        appearance-none
        bg-white
        border border-gray-300
        rounded-2xl
        px-4
        py-3
        pr-12
        text-sm
        font-medium
        text-[#00173D]
        shadow-sm
        transition-all
        duration-300
        hover:border-[#00173D]
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-[#00173D]/20
        focus:border-[#00173D]
        cursor-pointer
      "
                >
                  {[
                    "Todos",
                    "Hasta 30000",
                    "30000-60000",
                    "60000-100000",
                    "100000+",
                  ].map((price) => (
                    <option
                      key={price}
                      value={price}
                      className="text-black bg-white"
                    >
                      {price}
                    </option>
                  ))}
                </select>

                {/* ICONO */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTOS */}
        <section className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center p-10">
              {/* LOGO */}
              <img
                src="/DOVVV.png"
                alt="Logo"
                className="w-32 md:w-40 object-contain opacity-90 mb-6"
              />

              <h2 className="text-2xl font-bold text-[#00173D]">
                No se encontraron productos
              </h2>

              <p className="text-gray-500 mt-3 max-w-md">
                No hay resultados con los filtros seleccionados. Probá cambiando
                la marca, modelo o rango de precio.
              </p>

              <button
                onClick={clearFilters}
                className="
          mt-8
          bg-[#00173D]
          hover:bg-[#00245e]
          text-white
          px-8
          py-3
          rounded-2xl
          font-semibold
          transition-all
          duration-300
          shadow-lg
          hover:shadow-xl
        "
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={`${product.source}-${product.id}`}
                  onClick={() =>
                    router.push(
                      product.isCatalog
                        ? `/catalogo/${product.id}`
                        : `/product/${product.id}`,
                    )
                  }
                  className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            overflow-hidden
            hover:shadow-2xl
            hover:-translate-y-1
            transition-all
            duration-300
            flex
            flex-col
            cursor-pointer
          "
                >
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image1 || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-[#00173D] text-lg leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-sm mt-3 text-gray-700">
                      OEM: {product.oem_number}
                    </p>

                    {product.oem_equivalents && (
                      <p className="text-xs text-gray-500 mt-2">
                        OEM Equivalentes:{" "}
                        {Array.isArray(product.oem_equivalents)
                          ? product.oem_equivalents.join(", ")
                          : product.oem_equivalents}
                      </p>
                    )}

                    {product.isCatalog ? (
                      <>
                        <p className="text-xl font-bold mt-auto mb-5 text-green-700 pt-6">
                          Consultar precio
                        </p>

                        <button
                          onClick={() => {
                            const phone = "5491127561595";

                            const message = `Hola! Estoy interesado en el producto:
    
🧩 ${product.name}
🔧 OEM: ${product.oem_number}

¿Podrían darme más información?`;

                            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

                            window.open(url, "_blank");
                          }}
                          className="
                    w-full
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    py-3
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                    shadow-md
                  "
                        >
                          Consultar por WhatsApp
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold mt-auto mb-5 text-[#00173D] pt-6">
                          ${Number(product.price).toLocaleString("es-AR")}
                        </p>

                        <button
                          onClick={(e) => addToCart(e, product)}
                          disabled={loading2}
                          className="
                    w-full
                    bg-[#00173D]
                    hover:bg-blue-900
                    text-white
                    py-3
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                    shadow-md
                    cursor-pointer
                  "
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
          )}
        </section>
      </main>
    </div>
  );
}
