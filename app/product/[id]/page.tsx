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
          setLoading(false);
          setLoading2(false);
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
      // 🔐 1️⃣ verificar sesión
      let sessionRes = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      });

      if (!sessionRes.ok) {
        const data = await sessionRes.json().catch(() => null);

        if (sessionRes.status === 401 && data?.error === "TokenExpired") {
          // 🔄 refrescar token
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

          // 🔁 reintentar obtener sesión
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

      // 🛒 2️⃣ agregar al carrito
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
          error instanceof Error ? error.message : "Error agregando al carrito",
        icon: "error",
        confirmButtonText: "Ok",
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

  // 🔴 producto deshabilitado o no existe
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <img
          src="/DOVVV.png"
          alt="Logo"
          className="w-28 h-auto object-contain "
        />
        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Producto no disponible
        </h1>

        <p className="text-gray-600 mb-6 max-w-md">
          Este producto fue deshabilitado temporalmente o ya no se encuentra
          disponible.
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
      <div className=" max-w-7xl mx-auto px-4 py-10 mt-10">
        {/* 🔙 VOLVER */}
        <button
          onClick={() => router.push("/catalogo")}
          className="mb-6 text-sm text-blue-800 hover:underline mt-13 sm:mt-0 md:mt-0"
        >
          ← Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 🖼️ IMÁGENES */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden border">
              <img
                src={selectedImage}
                className="w-full h-[550px] object-cover"
                alt={product.name}
              />
            </div>

            {/* THUMBNAILS */}
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

          {/* 📦 INFO */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* PRECIO */}
            <p className="text-3xl font-bold text-[#00173D] mt-4">
              ${Number(product.price).toLocaleString("es-AR")}
            </p>

            {/* DESCRIPCIÓN */}
            <p className="text-gray-600 mt-4">{product.description}</p>

            {/* COMPATIBILIDAD */}
            <div className="bg-gray-100 rounded-xl p-4 mt-6">
              <h3 className="font-semibold mb-2 text-gray-700">
                Compatibilidad:
              </h3>

              <ul className="list-disc pl-5 text-sm text-gray-700">
                {product.compatible_models?.map((m: string, i: number) => (
                  <li key={i}>
                    {product.brand} {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* CANTIDAD */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600"
                >
                  -
                </button>

                <span className="px-4 text-gray-600">{quantity}</span>

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
                  <div className="flex items-center gap-2 justify-center cursor-pointer">
                    <Loader2 className="animate-spin" />
                    Agregando...
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 justify-center cursor-pointer">
                      <ShoppingCart size={18} />
                      <span>Agregar al carrito</span>
                    </div>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => {
                  const phone = "5491127561595"; // 🔥 tu número (sin +, con 54 y 9)

                  const message = `Hola! Estoy interesado en el producto:
    
🧩 ${product.name}
🔧 OEM: ${product.oem_number}

¿Podrían darme más información?`;

                  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

                  window.open(url, "_blank");
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Consultar por WhatsApp
              </button>
            </div>
            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
              <div className="bg-gray-100 p-3 rounded-lg text-green-600 font-medium">
                🚚 Envío gratis
              </div>
              <div className="bg-gray-100 p-3 rounded-lg text-green-600 font-medium">
                🛡️ Garantía
              </div>
              <div className="bg-gray-100 p-3 rounded-lg text-green-600 font-medium">
                🔄 Devolución
              </div>
            </div>

            <p className="text-green-600 mt-4 font-medium">
              ✔ En stock ({product.stock} unidades disponibles)
            </p>
          </div>
        </div>

        {/* 🔽 DETALLES */}
        <div className="mt-12 bg-white border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Especificaciones Técnicas
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Marca</p>
              <p className="font-medium text-gray-700">{product.brand}</p>
            </div>

            <div>
              <p className="text-gray-500">Código OEM</p>
              <p className="font-medium text-gray-700">{product.oem_number}</p>
            </div>

            <div>
              <p className="text-gray-500">Tipo</p>
              <p className="font-medium text-gray-700">{product.part_type}</p>
            </div>

            <div>
              <p className="text-gray-500">Stock</p>
              <p className="font-medium text-gray-700">{product.stock}</p>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </>
  );
}
