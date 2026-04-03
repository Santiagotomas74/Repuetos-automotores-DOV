"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/catalogo/${id}`);
        const data = await res.json();

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando producto...
      </div>
    );
  }

  if (!product) return <div>Producto no encontrado</div>;

  const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10 mb-2">

      {/* 🔙 VOLVER */}
      <button
        onClick={() => router.push("/catalogo")}
        className="mb-6 text-sm text-blue-800 hover:underline"
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

      
        

          {/* DESCRIPCIÓN */}
          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          {/* COMPATIBILIDAD */}
          <div className="bg-gray-100 rounded-xl p-4 mt-6">
            <h3 className="font-semibold mb-2 text-gray-700">Compatibilidad:</h3>

            <ul className="list-disc pl-5 text-sm text-gray-700">
              {product.compatible_models?.map((m: string, i: number) => (
                <li key={i}>{product.brand} {m}</li>
              ))}
            </ul>
          </div>

       

      <div className="mt-12 bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Especificaciones Técnicas</h2>

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

         
        </div>
      </div>



         {/* CANTIDAD */}
          <div className="flex items-center gap-4 mt-6">

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
  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
>
  Consultar por WhatsApp
</button>

          </div>
        </div>
      </div>

      {/* 🔽 DETALLES */}
      

    </div>
  );
}