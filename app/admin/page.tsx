"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  DollarSign,
  Boxes,
  ClipboardList,
  Truck,
  BarChart3,
  Loader2,
} from "lucide-react";
 import { FaWhatsapp } from "react-icons/fa"; 


import Ordenes from "./orders/Orders";
import Catalogo from "./catalogo/Catalogo";
import Shipping from "./shipping/Shipping";
import AdminFinance from "./finance/Finance";
import Products from "./products/products";
import { useSearchParams } from "next/navigation";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const [section, setSection] = useState("products");

const searchParams = useSearchParams();
const sectionFromURL = searchParams.get("section");
useEffect(() => {
  if (sectionFromURL) {
    setSection(sectionFromURL);
  }
}, [sectionFromURL]);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (section === "products") {
      fetchProducts();
    }
  }, [section]);

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "¿Eliminar producto?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    await fetch(`/api/products/${id}`, { method: "DELETE" });

    await Swal.fire({
      title: "Producto eliminado",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchProducts();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar el producto",
      icon: "error",
    });
  }
};

  return (
    <div className="flex bg-white  ">

     {/* SIDEBAR DESKTOP */}
<aside className="hidden md:flex w-64 bg-white border-r border-gray-200 p-6 flex-col">
  <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

  <nav className="flex flex-col gap-2">

    <button
      onClick={() => setSection("products")}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
        section === "products"
          ? "bg-indigo-100 text-indigo-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Boxes size={18} />
      Productos
    </button>

     <button
      onClick={() => setSection("catalogo")}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
        section === "catalogo"
          ? "bg-indigo-100 text-indigo-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <FaWhatsapp size={18} />
      A consultar
    </button>

    <button
      onClick={() => setSection("orders")}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
        section === "orders"
          ? "bg-indigo-100 text-indigo-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <ClipboardList size={18} />
      Órdenes
    </button>

    <button
      onClick={() => setSection("shipping")}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
        section === "shipping"
          ? "bg-indigo-100 text-indigo-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Truck size={18} />
      Despachos
    </button>

    <button
      onClick={() => setSection("finance")}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
        section === "finance"
          ? "bg-indigo-100 text-indigo-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <BarChart3 size={18} />
      Ingresos
    </button>

  </nav>
</aside>


{/* NAV MOBILE */}
<div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 h-20">

  <div className="flex justify-around items-center h-full px-2">

    <button
      onClick={() => setSection("products")}
      className={`flex flex-col items-center justify-center text-xs ${
        section === "products"
          ? "text-indigo-600"
          : "text-gray-500"
      }`}
    >
      <Boxes size={20} />
      Productos
    </button>

        <button
      onClick={() => setSection("catalogo")}
      className={`flex flex-col items-center justify-center text-xs ${
        section === "catalogo"
          ? "text-indigo-600"
          : "text-gray-500"
      }`}
    >
      <FaWhatsapp size={20} />
      A consultar
    </button>

    <button
      onClick={() => setSection("orders")}
      className={`flex flex-col items-center justify-center text-xs ${
        section === "orders"
          ? "text-indigo-600"
          : "text-gray-500"
      }`}
    >
      <ClipboardList size={20} />
      Órdenes
    </button>

    <button
      onClick={() => setSection("shipping")}
      className={`flex flex-col items-center justify-center text-xs ${
        section === "shipping"
          ? "text-indigo-600"
          : "text-gray-500"
      }`}
    >
      <Truck size={20} />
      Despachos
    </button>

    <button
      onClick={() => setSection("finance")}
      className={`flex flex-col items-center justify-center text-xs ${
        section === "finance"
          ? "text-indigo-600"
          : "text-gray-500"
      }`}
    >
      <BarChart3 size={20} />
      Ingresos
    </button>

  </div>
</div>
      {/* CONTENIDO */}
      <main className="flex-1 p-4 md:p-8 md:pt-8">
        {/* PRODUCTOS */}
        {section === "products" && (
          <Products  />
        )}
        {/* OTRAS SECCIONES */}
        {section === "catalogo" && <Catalogo />}
        {section === "orders" && <Ordenes />}
        {section === "shipping" && <Shipping />}
        {section === "finance" && <AdminFinance />}

      </main>
    </div>
  );
}