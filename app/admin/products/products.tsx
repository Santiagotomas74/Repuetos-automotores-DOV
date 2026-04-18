"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import {
  Loader2,
  Package,
  DollarSign,
  Pencil,
  Trash2,
  Plus,
  EyeOff,
} from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingId2, setEditingId2] = useState<string | null>(null);

  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");

  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 filtro + deshabilitados primero
  const filteredProducts = products
    .filter((p) => {
      const query = search.toLowerCase();

      const name = p.name?.toLowerCase() || "";
      const oem = p.oem_number?.toLowerCase() || "";

      const oemEquivalents = Array.isArray(p.oem_equivalents)
        ? p.oem_equivalents.join(" ").toLowerCase()
        : p.oem_equivalents?.toLowerCase() || "";

      return (
        name.includes(query) ||
        oem.includes(query) ||
        oemEquivalents.includes(query)
      );
    })
    .sort((a, b) => {
      // disabled true arriba
      if (a.disabled === b.disabled) return 0;
      return a.disabled ? -1 : 1;
    });

  const handleUpdatePrice = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: Number(newPrice),
        }),
      });

      if (!res.ok) throw new Error();

      setEditingId(null);
      setNewPrice("");

      fetchProducts();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el precio",
      });
    }
  };

  const handleUpdateStock = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: Number(newStock),
        }),
      });

      if (!res.ok) throw new Error();

      setEditingId2(null);
      setNewStock("");

      fetchProducts();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar stock",
      });
    }
  };

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
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      fetchProducts();

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mb-15">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Productos para vender
          </h1>

          <p className="text-sm text-gray-500">
            Gestiona tu catálogo
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-md"
        >
          <Plus size={20} />
          Crear Producto
        </Link>
      </div>

      {/* CONTENEDOR */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
            <p className="text-sm font-medium animate-pulse">
              Cargando catálogo...
            </p>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* SEARCH */}
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Buscar por nombre o número OEM..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-80 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* MOBILE */}
            <div className="block md:hidden divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 space-y-3 ${
                    p.disabled
                      ? "bg-red-50 border-l-4 border-red-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                      <Package size={18} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-semibold text-gray-900">
                          {p.name}
                        </h2>

                        {p.disabled && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <EyeOff size={12} />
                            Deshabilitado
                          </span>
                        )}
                      </div>

                      {/* PRECIO */}
                      {editingId === p.id ? (
                        <input
                          type="number"
                          value={newPrice}
                          autoFocus
                          onChange={(e) =>
                            setNewPrice(e.target.value)
                          }
                          onBlur={() =>
                            handleUpdatePrice(p.id)
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleUpdatePrice(p.id)
                          }
                          className="border rounded px-2 py-1 mt-2 w-24"
                        />
                      ) : (
                        <span
                          onClick={() => {
                            setEditingId(p.id);
                            setNewPrice(p.price);
                          }}
                          className="text-indigo-600 font-bold flex items-center text-sm cursor-pointer mt-1"
                        >
                          <DollarSign size={14} />
                          {p.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* STOCK */}
                  <div>
                    {editingId2 === p.id ? (
                      <input
                        type="number"
                        value={newStock}
                        autoFocus
                        onChange={(e) =>
                          setNewStock(e.target.value)
                        }
                        onBlur={() =>
                          handleUpdateStock(p.id)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleUpdateStock(p.id)
                        }
                        className="border rounded px-2 py-1 w-24"
                      />
                    ) : (
                      <span
                        onClick={() => {
                          setEditingId2(p.id);
                          setNewStock(p.stock);
                        }}
                        className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                          p.stock > 5
                            ? "bg-green-100 text-green-700"
                            : p.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Stock: {p.stock}
                      </span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="flex-1 bg-gray-50 border rounded-lg py-2 text-center text-sm"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 bg-red-50 border border-red-100 text-red-600 rounded-lg py-2 text-sm"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-xs uppercase text-gray-500">
                      Producto
                    </th>

                    <th className="px-6 py-4 text-xs uppercase text-gray-500">
                      Precio
                    </th>

                    <th className="px-6 py-4 text-xs uppercase text-gray-500">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-xs uppercase text-gray-500 text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className={`hover:bg-gray-50 ${
                        p.disabled
                          ? "bg-red-50"
                          : ""
                      }`}
                    >
                      {/* PRODUCTO */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                            <Package size={16} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {p.name}
                              </span>

                              {p.disabled && (
                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <EyeOff size={12} />
                                  Deshabilitado
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* PRECIO */}
                      <td className="px-6 py-4">
                        {editingId === p.id ? (
                          <input
                            type="number"
                            value={newPrice}
                            autoFocus
                            onChange={(e) =>
                              setNewPrice(e.target.value)
                            }
                            onBlur={() =>
                              handleUpdatePrice(p.id)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleUpdatePrice(p.id)
                            }
                            className="w-24 border rounded px-2 py-1"
                          />
                        ) : (
                          <span
                            onClick={() => {
                              setEditingId(p.id);
                              setNewPrice(p.price);
                            }}
                            className="cursor-pointer hover:text-indigo-600 font-semibold"
                          >
                            ${p.price}
                          </span>
                        )}
                      </td>

                      {/* STOCK */}
                      <td className="px-6 py-4">
                        {editingId2 === p.id ? (
                          <input
                            type="number"
                            value={newStock}
                            autoFocus
                            onChange={(e) =>
                              setNewStock(e.target.value)
                            }
                            onBlur={() =>
                              handleUpdateStock(p.id)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleUpdateStock(p.id)
                            }
                            className="w-24 border rounded px-2 py-1"
                          />
                        ) : (
                          <span
                            onClick={() => {
                              setEditingId2(p.id);
                              setNewStock(p.stock);
                            }}
                            className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                              p.stock > 5
                                ? "bg-green-100 text-green-700"
                                : p.stock > 0
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {p.stock}
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/products/${p.id}`}
                            className="p-2 text-gray-400 hover:text-indigo-600"
                          >
                            <Pencil size={18} />
                          </Link>

                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-16 text-center text-gray-400">
            No hay productos.
          </div>
        )}
      </div>
    </div>
  );
}