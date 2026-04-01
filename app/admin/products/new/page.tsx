"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Save, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

 


type ImageField = "image1" | "image2" | "image3" | "image4";

export default function NewProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    oem_number: "",
    oem_equivalents: "",
    name: "",
    stock: "",
    description: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const renderImageInput = (field: ImageField, label: string) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
      <div className="flex items-center gap-2 mb-3 text-gray-700">
        <ImageIcon size={18} />
        <label className="font-semibold text-sm uppercase tracking-wider">
          {label}
        </label>
      </div>

      {form[field] ? (
        <div className="relative group w-full h-40 rounded-lg overflow-hidden border bg-white">
          <img
            src={form[field]}
            alt="preview"
            className="w-full h-full object-contain p-2"
          />

          <button
            type="button"
            onClick={() => setForm({ ...form, [field]: "" })}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition">
          <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
          <span className="text-sm text-gray-500">Click para subir</span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      )}

      <input
        name={field}
        placeholder="O pegar URL de imagen"
        value={form[field]}
        onChange={handleChange}
        className="w-full mt-3 text-sm border border-gray-200 p-2 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
      />
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formattedData = {
        ...form,
        oem_number: form.oem_number.toUpperCase(),
        oem_equivalents: form.oem_equivalents.toUpperCase()
          ? form.oem_equivalents.toUpperCase()
              .split(",")
              .map((e) => e.trim().toUpperCase())
              .filter((e) => e.length > 0) // elimina vacíos
          : null,
        price: Number(form.price),
        stock: Number(form.stock),
      };
  
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
  
      if (!res.ok) throw new Error("Error creando producto");
  
      await Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se creó correctamente",
        confirmButtonColor: "#2563eb",
      });
  
      router.push("/admin");
      router.refresh();
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
          {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => router.push("/admin")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2"
            >
              <ArrowLeft size={20} className="mr-1" /> Volver al panel
            </button>

          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Crear Producto
          </h1>
          <p className="text-gray-500 mt-1">
            Agrega un nuevo producto al catálogo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

         {/* CARD INFO */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">

<h2 className="text-lg font-semibold text-gray-800">
  Información Principal
</h2>

{/* OEM NUMBER */}
<input
  name="oem_number"
  placeholder="Número OEM (código único)"
  value={form.oem_number}
  onChange={handleChange}
  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 border outline-none"
  required
/>

{/* OEM EQUIVALENTS */}
<input
  name="oem_equivalents"
  placeholder="Equivalencias OEM (separadas por coma)"
  value={form.oem_equivalents}
  onChange={handleChange}
  className="w-full border-gray-300 rounded-lg p-2.5 border outline-none"
/>

{/* NAME */}
<input
  name="name"
  placeholder="Nombre del producto"
  value={form.name}
  onChange={handleChange}
  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 border outline-none"
  required
/>

{/* STOCK + PRICE */}
<div className="grid grid-cols-2 gap-4">
  <input
    name="stock"
    type="number"
    placeholder="Stock disponible"
    value={form.stock}
    onChange={handleChange}
    className="border p-2.5 rounded-lg"
    required
  />

  <input
    name="price"
    type="number"
    step="1"
    placeholder="Precio"
    value={form.price}
    onChange={handleChange}
    className="border p-2.5 rounded-lg font-semibold text-blue-600"
    required
  />
</div>

{/* DESCRIPTION */}
<textarea
  name="description"
  placeholder="Descripción del producto"
  value={form.description}
  onChange={handleChange}
  className="w-full border p-2.5 rounded-lg min-h-[120px]"
/>

</div>

          {/* CARD IMAGES */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">

            <h2 className="text-lg font-semibold text-gray-800">
              Imágenes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {renderImageInput("image1", "Imagen Principal")}
              {renderImageInput("image2", "Detalles")}
              {renderImageInput("image3", "Detalle")}
              {renderImageInput("image4", "Detalle")}
            </div>

          </div>

          {/* BOTÓN */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              <Save size={18} />
              {loading ? "Creando..." : "Crear Producto"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}