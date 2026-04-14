"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Order = {
  address: {
    street: string;
    number: string;
    city: string;
    phone: string;
    province: string;
    postal_code: string;
    additional_info: string;
    full_name: string;
  } | null;
  id: string;
  order_number: string;
  user_email: string;
  user_phone: string;
  total_amount: number;
  order_status: string;
  delivery_type: string;
  payment_method: string;
  created_at: string;
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>;
};

export default function AdminShipping() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "pending" | "transit" | "delivered"
  >("pending");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/shipping");
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);

    try {
      const res = await fetch("/api/admin/shipping/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Error actualizando");

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error actualizando estado");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🔥 ordenar por fecha
  const sortByDate = (arr: Order[]) =>
    [...arr].sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

  const pendingOrders = sortByDate(
    orders.filter((o) => o.order_status === "dispatch")
  );
  const inTransitOrders = sortByDate(
    orders.filter((o) => o.order_status === "in_transit")
  );
  const deliveredOrders = sortByDate(
    orders.filter((o) => o.order_status === "delivered")
  );

  const currentOrders =
    activeTab === "pending"
      ? pendingOrders
      : activeTab === "transit"
      ? inTransitOrders
      : deliveredOrders;

  // 🔍 filtro de búsqueda
  const filteredOrders = currentOrders.filter((order) => {
    const searchLower = search.toLowerCase();

    return (
      order.user_email.toLowerCase().includes(searchLower) ||
      order.order_number.toLowerCase().includes(searchLower) ||
      order.user_phone?.toLowerCase().includes(searchLower)
    );
  });

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-medium animate-pulse">
          Cargando pedidos...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-3 space-y-6 mb-15">
      <h1 className="text-3xl font-bold">Panel de Despachos</h1>

      {/* 📂 Tabs */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "pending"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          Pendientes ({pendingOrders.length})
        </button>

        <button
          onClick={() => setActiveTab("transit")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "transit"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          En camino ({inTransitOrders.length})
        </button>

        <button
          onClick={() => setActiveTab("delivered")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "delivered"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Entregados ({deliveredOrders.length})
        </button>
      </div>

      {/* 🔍 Buscador */}
      <div>
        <input
          type="text"
          placeholder="Buscar por email, número de orden o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 📦 LISTA */}
      {filteredOrders.length === 0 ? (
        <p>No hay resultados para la búsqueda.</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border p-6 rounded-xl shadow bg-white space-y-4"
          >
            <div className="flex justify-between">
              <div>
                <p><strong>Orden:</strong> {order.order_number}</p>
                <p><strong>Cliente:</strong> {order.user_email} {order.user_phone}</p>
                <p><strong>Total:</strong> ${order.total_amount}</p>

                <p>
                  <strong>Método de pago:</strong>{" "}
                  {order.payment_method === "Transfer"
                    ? "Mercado Pago"
                    : "Transferencia bancaria"}
                </p>

                <p
                  className={`px-3 py-1 rounded-lg inline-block ${
                    order.delivery_type === "pickup"
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {order.delivery_type === "pickup"
                    ? "Retiro en local"
                    : "Entrega a domicilio 🚚"}
                </p>

                <p className="mt-2">
                  <strong>Estado:</strong>{" "}
                  {order.order_status === "dispatch"
                    ? "Pendiente"
                    : order.order_status === "in_transit"
                    ? "En camino"
                    : "Entregado"}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* 📍 Dirección */}
            {order.delivery_type === "shipping" && order.address && (
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Dirección:</strong></p>
                <p>{order.address.street} {order.address.number}</p>
                <p>{order.address.city} - {order.address.province}</p>
                <p>CP: {order.address.postal_code}</p>
              </div>
            )}

            {/* ⚡ Acciones */}
            <div className="flex gap-3 flex-wrap">
              <button
                disabled={updatingId === order.id}
                onClick={() => updateStatus(order.id, "dispatch")}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Pendiente
              </button>

              <button
                disabled={updatingId === order.id}
                onClick={() => updateStatus(order.id, "in_transit")}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                En camino
              </button>

              <button
                disabled={updatingId === order.id}
                onClick={() => updateStatus(order.id, "delivered")}
                className="px-4 py-2 rounded-lg bg-green-600 text-white"
              >
                Entregado
              </button>
            </div>

            {/* 🛒 Productos */}
            <div>
              <strong>Productos:</strong>
              {order.items.map((item) => (
                <div key={item.product_id}>
                  {item.product_name} - Cantidad: {item.quantity} - ${item.price}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}