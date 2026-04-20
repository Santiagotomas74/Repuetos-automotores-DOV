"use client";

import { useEffect, useState, useMemo } from "react";
import AddressCard from "./components/AddressCard";
import UserOrders from "./components/OrdersList";
import PaymentsHistory from "./components/PaymentsHistory";
import PendingOrders from "./components/PendingOrders";
import {
  Package,
  User,
  CreditCard,
  UploadCloud,
  CheckCircle,
  Loader2,
  Search,
  XCircle,
} from "lucide-react";

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pedidos" | "ordenes" | "pagos">(
    "pedidos",
  );

  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔄 Cargar dashboard (Tu lógica original)
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/user/dashboard", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("No autorizado");

        const data = await res.json();

        setUser(data.user);
        setOrders(data.orders || []);
        setPayments(data.payments || []);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 mt-40 mb-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        <p className="text-gray-500 animate-pulse">Cargando dashboard...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-200">
            {user?.name?.[0] || "U"}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hola {user?.name || "Usuario"}
            </h1>
            <p className="text-gray-500">Bienvenido a tu panel personal</p>
          </div>
        </div>
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase">Pedidos</p>
            <p className="text-2xl font-black text-gray-900 mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase">
              Pagos registrados
            </p>
            <p className="text-2xl font-black text-gray-900 mt-2">
              {payments.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase">
              Total gastado
            </p>
            <p className="text-2xl font-black text-gray-900 mt-2">
              $
              {orders
                .reduce((acc, o) => acc + Number(o.total_amount || 0), 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <User size={16} className="text-red-500" />
                Datos Personales
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Nombre
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {user?.name} {user?.lastName}
                  </p>
                </div>

                <div className="pb-3 border-b border-gray-50">
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Email
                  </p>
                  <p className="text-gray-800 font-semibold">{user?.email}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Teléfono
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {user?.phone || "-"}
                  </p>
                </div>
              </div>
            </section>
            {/* COLUMNA DERECHA 
            {user && (
              
              <AddressCard
                address={user}
                onAddressUpdated={(newAddress) =>
                  setUser((prev: any) => ({
                    ...prev,
                    address: newAddress,
                  }))
                }
              />
            )}
*/}
          </div>

          {/* COLUMNA DERECHA */}
          <div className="lg:col-span-2 space-y-8">
            {/* TABS / CARPETAS */}
            <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              {/* Header Tabs */}
              <div className="p-4 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab("pedidos")}
                    className={`py-3 rounded-2xl text-sm font-bold transition ${
                      activeTab === "pedidos"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Mis Pedidos
                  </button>

                  <button
                    onClick={() => setActiveTab("ordenes")}
                    className={`py-3 rounded-2xl text-sm font-bold transition ${
                      activeTab === "ordenes"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Órdenes
                  </button>

                  <button
                    onClick={() => setActiveTab("pagos")}
                    className={`py-3 rounded-2xl text-sm font-bold transition ${
                      activeTab === "pagos"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Pagos
                  </button>
                </div>
              </div>

              {/* CONTENIDO */}
              <div className="p-6">
                {/* PEDIDOS */}
                {activeTab === "pedidos" && (
                  <div>
                    <UserOrders />
                  </div>
                )}

                {/* ORDENES */}
                {activeTab === "ordenes" && (
                  <div className="space-y-6">
                    <PendingOrders />
                  </div>
                )}

                {/* PAGOS */}
                {activeTab === "pagos" && (
                  <div>
                    <PaymentsHistory />
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
