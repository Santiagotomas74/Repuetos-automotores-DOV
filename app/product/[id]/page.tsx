"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Loader2, ShoppingCart } from "lucide-react";
import FeaturedProducts from "@/app/components/FeaturedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
  const res = await fetch(`/api/products/${id}`);

  // 🔴 si no existe
  if (!res.ok) {
    router.push("/");
    return;
  }

  const data = await res.json();

  // 🔴 si está deshabilitado
  if (data.disabled) {
    setProduct(null);
    return;
  }

  setProduct(data);
  setSelectedImage(data.image1);

} catch (error) {
  console.error(error);
  router.push("/");

} finally {
  setLoading(false);
}
    };

    if (id) fetchProduct();
  }, [id]);

  const addToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (loading) return;

    setLoading2(true);

    try {
      let sessionRes = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      });

      if (!sessionRes.ok) {
        const data = await sessionRes.json().catch(() => null);

        if (sessionRes.status === 401 && data?.error === "TokenExpired") {
          const refreshRes = await fetch("/api/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) {
            Swal.fire({
              text: "Debes iniciar sesión",
              icon: "info",
              confirmButtonText: "Ok",
            });
            return;
          }

          sessionRes = await fetch("/api/me", {
            method: "GET",
            credentials: "include",
          });
        } else {
          Swal.fire({
            text: "Debes iniciar sesión",
            icon: "info",
            confirmButtonText: "Ok",
          });
          return;
        }
      }

      const sessionData = await sessionRes.json();
      const user = sessionData.user;

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: user.email,
          productId: id,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error agregando producto");
      }

      Swal.fire({
        text: "Producto agregado al carrito...",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        router.refresh();
      });
    } catch (error) {
      Swal.fire({
        text:
          error instanceof Error
            ? error.message
            : "Error agregando al carrito",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading2(false);
    }
  };

  // 🔵 loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
        <img
          src="/DOVV.png"
          alt="Logo"
          className="w-28 h-auto object-contain animate-pulse"
        />

        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Loader2 className="w-8 h-8 animate-spin text-[#00173D]" />
          <p className="text-sm font-medium">Cargando producto...</p>
        </div>
      </div>
    );
  }

  // 🔴 producto deshabilitado o no existe
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <img
          src="/DOVV.png"
          alt="Logo"
          className="w-28 h-auto object-contain "
        />
        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Producto no disponible
        </h1>

        <p className="text-gray-600 mb-6 max-w-md">
          Este producto fue deshabilitado temporalmente o ya no se encuentra disponible.
        </p>

        <button
          onClick={() => router.push("/catalogo")}
          className="bg-[#00173D] text-white px-6 py-3 rounded-xl font-semibold"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 mt-10">
        <button
          onClick={() => router.push("/catalogo")}
          className="mb-6 text-sm text-blue-800 hover:underline mt-13 sm:mt-0 md:mt-0"
        >
          ← Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* imágenes */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden border">
              <img
                src={selectedImage}
                className="w-full h-[550px] object-cover"
                alt={product.name}
              />
            </div>

            <div className="flex gap-3 mt-4">
              {images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-20 object-cover rounded-lg cursor-pointer border ${
                    selectedImage === img ? "border-blue-600" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-[#00173D] mt-4">
              ${Number(product.price).toLocaleString("es-AR")}
            </p>

            <p className="text-gray-600 mt-4">{product.description}</p>

            <div className="bg-gray-100 rounded-xl p-4 mt-6">
              <h3 className="font-semibold mb-2 text-gray-700">
                Compatibilidad:
              </h3>

              <ul className="list-disc pl-5 text-sm text-gray-700">
                {product.compatible_models?.map(
                  (m: string, i: number) => (
                    <li key={i}>
                      {product.brand} {m}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* cantidad */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="px-3 py-2 text-gray-600"
                >
                  -
                </button>

                <span className="px-4 text-gray-600">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600"
                >
                  +
                </button>
              </div>

              <button
                onClick={addToCart}
                className="flex-1 bg-[#00173D] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
              >
                {loading2 ? (
                  <div className="flex items-center gap-2 justify-center">
                    <Loader2 className="animate-spin" />
                    Agregando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <ShoppingCart size={18} />
                    <span>Agregar al carrito</span>
                  </div>
                )}
              </button>
            </div>

            <p className="text-green-600 mt-4 font-medium">
              ✔ En stock ({product.stock} unidades disponibles)
            </p>
          </div>
        </div>
      </div>

      <FeaturedProducts />
    </>
  );
}