"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
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
    part_type: "",
    brand: "",
    compatible_models: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  // 🔥 imágenes locales (preview)
  const [localImages, setLocalImages] = useState<{
    [key in ImageField]?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 manejar imagen subida
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ImageField
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setLocalImages((prev) => ({
      ...prev,
      [field]: previewUrl,
    }));
  };

  const renderImageInput = (field: ImageField, label: string) => {
    const imageSrc = localImages[field] || form[field];

    return (
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
        <div className="flex items-center gap-2 mb-3 text-gray-700">
          <ImageIcon size={18} />
          <label className="font-semibold text-sm uppercase tracking-wider">
            {label}
          </label>
        </div>

        {imageSrc ? (
          <div className="relative group w-full h-40 rounded-lg overflow-hidden border bg-white">
            <img
              src={imageSrc}
              alt="preview"
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={() => {
                setForm({ ...form, [field]: "" });

                setLocalImages((prev) => {
                  const copy = { ...prev };
                  delete copy[field];
                  return copy;
                });
              }}
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
              onChange={(e) => handleFileChange(e, field)}
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = {
        ...form,
        oem_number: form.oem_number.toUpperCase(),

        oem_equivalents: form.oem_equivalents
          ? form.oem_equivalents
              .toUpperCase()
              .split(",")
              .map((e) => e.trim())
              .filter((e) => e.length > 0)
          : [],

        compatible_models: form.compatible_models
          ? form.compatible_models
              .split(",")
              .map((m) => m.trim())
              .filter((m) => m.length > 0)
          : [],

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
      });

      router.push("/admin");
      router.refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft size={20} className="mr-1" /> Volver
          </button>

          <h1 className="text-3xl font-bold">Crear Producto</h1>
          <p className="text-gray-500">Agrega un nuevo producto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* INFO */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">

            <input name="oem_number" placeholder="Número OEM" value={form.oem_number} onChange={handleChange} className="w-full border p-2 rounded-lg" required />

            <input name="oem_equivalents" placeholder="Equivalencias OEM (coma)" value={form.oem_equivalents} onChange={handleChange} className="w-full border p-2 rounded-lg" />

            <input name="name" placeholder="Nombre del producto" value={form.name} onChange={handleChange} className="w-full border p-2 rounded-lg" required />

            <select name="part_type" value={form.part_type} onChange={handleChange} className="w-full border p-2 rounded-lg" required>
              <option value="">Tipo de repuesto</option>
              <option value="Motor">Motor</option>
              <option value="Frenos">Frenos</option>
              <option value="Suspensión">Suspensión</option>
              <option value="Electricidad">Electricidad</option>
              <option value="Filtros">Filtros</option>
              <option value="Accesorios">Accesorios</option>
            </select>

            <input name="brand" placeholder="Marca" value={form.brand} onChange={handleChange} className="w-full border p-2 rounded-lg" required />

            <input name="compatible_models" placeholder="Modelos compatibles" value={form.compatible_models} onChange={handleChange} className="w-full border p-2 rounded-lg" />

            <div className="grid grid-cols-2 gap-4">
              <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2 rounded-lg" required />
              <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} className="border p-2 rounded-lg" required />
            </div>

            <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="w-full border p-2 rounded-lg" />
          </div>

          {/* IMAGES */}
          <div className="bg-white rounded-2xl border p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderImageInput("image1", "Principal")}
            {renderImageInput("image2", "Detalle")}
            {renderImageInput("image3", "Detalle")}
            {renderImageInput("image4", "Detalle")}
          </div>

          {/* BUTTON */}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl">
            {loading ? "Creando..." : "Crear Producto"}
          </button>
        </form>
      </div>
    </div>
  );
}