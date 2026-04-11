"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Image as ImageIcon, 
  Save, 
  ArrowLeft, 
  UploadCloud, 
  Trash2, 
  Smartphone, 
  Hash, 
  Palette, 
  DollarSign 
} from "lucide-react";
import Swal from "sweetalert2";
type ImageField = "image1" | "image2" | "image3"| "image4";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    oem_number: "",
    oem_equivalents: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    brand: "",
  compatible_models: "",
  part_type: ""
  });

  
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) throw new Error("Cloudinary no configurado");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Error subiendo imagen");
    const data = await res.json();
    return data.secure_url;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: ImageField) => {
    if (!e.target.files) return;
    try {
      setLoading(true);
      const url = await uploadToCloudinary(e.target.files[0]);
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch (err) {
      console.error(err);
      alert("Error subiendo imagen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/catalogo/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        console.log("Producto cargado:", data);
        setForm({
          name: data.name || "",
            oem_number: data.oem_number || "",
            oem_equivalents: data.oem_equivalents || "", 
          description: data.description || "",
          image1: data.image1 || "",
          image2: data.image2 || "",
          image3: data.image3 || "",
          image4: data.image4 || "",
          brand: data.brand || "",
          compatible_models: data.compatible_models || "",
          part_type: data.part_type || ""
        });
        setLoading(false);
      } catch (error) {
        console.error("Error cargando producto:", error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch(`/api/catalogo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
      
      }),
    });

    if (!res.ok) throw new Error("Error actualizando producto");

    await Swal.fire({
      icon: "success",
      title: `Producto: ${form.name} actualizado`,
      text: "Los cambios se guardaron correctamente",
      confirmButtonColor: "#2563eb",
    });

    router.push("/admin?section=catalogo");
    router.refresh();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el producto",
      confirmButtonColor: "#dc2626",
    });
  } finally {
    setIsSubmitting(false);
  }
};

 
  const renderImageInput = (field: ImageField, label: string) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-2 mb-3 text-gray-700">
        <ImageIcon size={18} />
        <label className="font-semibold text-sm uppercase tracking-wider">{label}</label>
      </div>

      <div className="space-y-3">
        {form[field] ? (
          <div className="relative group w-full h-40 rounded-lg overflow-hidden border bg-white">
            <img src={form[field]} alt="preview" className="w-full h-full object-contain p-2" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={() => setForm({...form, [field]: ""})}
                className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
              <p className="text-sm text-gray-500">Click para subir</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, field)} 
            />
          </label>
        )}
        
        <input
          className="w-full text-xs border border-gray-200 p-2 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder="O pega la URL de la imagen aquí"
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => router.push("/admin")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2"
            >
              <ArrowLeft size={20} className="mr-1" /> Volver al panel
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">Editar Producto</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
         {/* Card: Información General */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
  <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
    Información Principal
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* NOMBRE */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Nombre del producto
      </label>
      <input
        name="name"
        className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 border outline-none"
        placeholder="Ej: Filtro de aceite VW"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
    </div>

    {/* OEM NUMBER */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Número OEM
      </label>
      <input
        name="oem_number"
        placeholder="Código único"
        value={form.oem_number}
        onChange={(e) =>
          setForm({
            ...form,
            oem_number: e.target.value.toUpperCase(),
          })
        }
        className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 border outline-none"
        required
      />
    </div>

    {/* OEM EQUIVALENTS */}
    <div className="md:col-span-2 space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Equivalencias OEM
      </label>
      <input
        name="oem_equivalents"
        placeholder="Ej: 123ABC, 456DEF"
        value={form.oem_equivalents}
        onChange={(e) =>
          setForm({ ...form, oem_equivalents: e.target.value })
        }
        className="w-full border-gray-300 rounded-lg p-2.5 border outline-none"
      />
    </div>

    {/* 🔵 MARCA */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Marca
      </label>
      <input
        name="brand"
        placeholder="Ej: Volkswagen"
        value={form.brand || ""}
        onChange={(e) =>
          setForm({ ...form, brand: e.target.value })
        }
        className="w-full border-gray-300 rounded-lg p-2.5 border outline-none"
        required
      />
    </div>

    {/* 🔵 MODELO */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Modelo compatible
      </label>
      <input
        name="model"
        placeholder="Ej: Golf"
        value={form.compatible_models || ""}
        onChange={(e) =>
          setForm({ ...form, compatible_models: e.target.value })
        }
        className="w-full border-gray-300 rounded-lg p-2.5 border outline-none"
        required
      />
    </div>

    {/* 🟣 TIPO DE REPUESTO */}
    <div className="md:col-span-2 space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Tipo de repuesto
      </label>

      <select
        name="part_type"
        value={form.part_type || ""}
        onChange={(e) =>
          setForm({ ...form, part_type: e.target.value })
        }
        className="w-full border-gray-300 rounded-lg p-2.5 border outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Seleccionar tipo</option>
        <option value="Motor">Motor</option>
        <option value="Frenos">Frenos</option>
        <option value="Suspensión">Suspensión</option>
        <option value="Electricidad">Electricidad</option>
        <option value="Filtros">Filtros</option>
        <option value="Accesorios">Accesorios</option>
      </select>
    </div>


    {/* DESCRIPCIÓN */}
    <div className="md:col-span-2 space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Descripción
      </label>
      <textarea
        name="description"
        className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 border outline-none min-h-[120px]"
        placeholder="Características del producto..."
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
    </div>

  </div>
</div>
        

          {/* Card: Galería de Imágenes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Multimedia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {renderImageInput("image1", "Imagen Principal")}
              {renderImageInput("image2", "Detelles")}
              {renderImageInput("image3", "Detalles")}
              {renderImageInput("image4", "Detalles")}
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : <><Save size={20} /> Guardar Cambios</>}
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}