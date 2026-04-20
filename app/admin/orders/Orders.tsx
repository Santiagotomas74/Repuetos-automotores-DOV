"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [cashOrders, setCashOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [validatingId, setValidatingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const [transferRes, cashRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/orders/cash"),
      ]);

      const transferData = await transferRes.json();
      const cashData = await cashRes.json();

      setOrders(transferData.orders || []);
      setCashOrders(cashData.orders || []);
    } catch (error) {
      console.error("Error cargando órdenes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (orderId: string, isCash = false) => {
    setValidatingId(orderId);

    try {
      const res = await fetch("/api/admin/orders/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) throw new Error("Error validando");

      if (isCash) {
        setCashOrders((prev) => prev.filter((o) => o.id !== orderId));
      } else {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
      }
    } catch (error) {
      console.error(error);
      alert("Error validando orden");
    } finally {
      setValidatingId(null);
    }
  };

  const handleReject = async (orderId: string) => {
    const confirmReject = confirm(
      "¿Rechazar comprobante? El cliente podrá subir uno nuevo.",
    );

    if (!confirmReject) return;

    setRejectingId(orderId);

    try {
      const res = await fetch("/api/admin/orders/reject-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) throw new Error("Error rechazando comprobante");

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error(error);
      alert("Error rechazando comprobante");
    } finally {
      setRejectingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-medium animate-pulse">Cargando órdenes...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-3 space-y-10 mb-15">
      {/* TRANSFERENCIAS */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Comprobantes Pendientes</h1>

        {orders.length === 0 ? (
          <p>No hay comprobantes pendientes.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-xl shadow bg-white space-y-3"
            >
              <div className="flex justify-between">
                <div>
                  <p>
                    <strong>Orden:</strong> {order.order_number}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {order.user_email}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total_amount}
                  </p>
                  <p>
                    <strong>Estado:</strong> {order.payment_status}
                  </p>
                </div>

                {order.payment_receipt_url && (
                  <a
                    href={order.payment_receipt_url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Ver comprobante
                  </a>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleValidate(order.id)}
                  disabled={validatingId === order.id}
                  className="bg-black text-white px-6 py-2 rounded-lg"
                >
                  {validatingId === order.id ? "Validando..." : "Validar pago"}
                </button>

                <button
                  onClick={() => handleReject(order.id)}
                  disabled={rejectingId === order.id}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg"
                >
                  {rejectingId === order.id
                    ? "Rechazando..."
                    : "Rechazar comprobante"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CASH */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pagos en Efectivo Pendientes</h1>

        {cashOrders.length === 0 ? (
          <p>No hay órdenes cash pendientes.</p>
        ) : (
          cashOrders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-xl shadow bg-white space-y-3"
            >
              <div>
                <p>
                  <strong>Orden:</strong> {order.order_number}
                </p>
                <p>
                  <strong>Cliente:</strong> {order.user_email}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total_amount}
                </p>
                <p>
                  <strong>Método:</strong> Efectivo
                </p>
                <p>
                  <strong>Estado:</strong> {order.payment_status}
                </p>
              </div>

              <button
                onClick={() => handleValidate(order.id, true)}
                disabled={validatingId === order.id}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                {validatingId === order.id ? "Confirmando..." : "Marcar pagado"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
