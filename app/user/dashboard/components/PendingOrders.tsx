import { useEffect, useState, useMemo } from "react";
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

export default function PaymentsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 🔄 Cargar dashboard (Tu lógica original)
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/user/dashboard", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("No autorizado");

        const data = await res.json();
        console.log("Dashboard data:", data);

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // 🔍 Lógica de filtrado (Mantiene tus datos originales intactos)
  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.order_number
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [orders, searchTerm]);
  // 📤 Click botón subir comprobante
  const handleUploadClick = (orderId: string) => {
    setUploadingOrderId(orderId);
  };

  // 📤 Subir archivo a backend (Tu lógica original de Cloudinary)
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    orderId: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId);

      const res = await fetch("/api/order/upload-receipt", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error subiendo archivo");

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                payment_receipt_url: data.url,
                payment_status: "receipt_uploaded",
              }
            : o,
        ),
      );

      setUploadingOrderId(null);
    } catch (err) {
      console.error("Error subiendo comprobante:", err);
      alert("Error al subir comprobante");
    } finally {
      setUploading(false);
    }
  };
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 mt-40 mb-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        <p className="text-gray-500 animate-pulse">Cargando dashboard...</p>
      </div>
    );

  return (
    <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package size={22} className="text-red-500" />
            Mis Órdenes
          </h2>
          {/* CONTADOR DE ÓRDENES FILTRADAS */}
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
            {searchTerm
              ? `Mostrando ${filteredOrders.length} de ${orders.length}`
              : `${orders.length} pedidos totales`}
          </p>
        </div>

        {/* BUSCADOR CON BOTÓN DE LIMPIAR */}
        <div className="relative w-full md:w-64 group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 group-focus-within:text-red-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Buscar orden..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-400 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 transition-all w-full font-medium text-gray-600"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 transition-colors"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>
      </div>

      {/* CONTENEDOR CON SCROLL (Altura máxima 550px) */}
      <div className="overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-gray-200">
        <div className="divide-y divide-gray-50">
          {filteredOrders.length === 0 ? (
            <div className="p-20 text-center">
              <Package size={48} className="mx-auto text-gray-100 mb-4" />
              <p className="text-gray-400 font-medium">
                No se encontraron órdenes para esta búsqueda.
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-red-500 text-xs font-bold uppercase hover:underline"
                >
                  Ver todas las órdenes
                </button>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-8 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase">
                      Orden #{order.order_number}
                    </p>
                    <p className="text-2xl font-black text-gray-900 mt-1">
                      ${order.total_amount}
                    </p>
                    <div className="mt-3 space-y-1">
                      {order.items?.map((item: any, index: number) => (
                        <p
                          key={index}
                          className="text-sm text-gray-500 font-medium"
                        >
                          {item.product_name} · $
                          {Number(item.unit_price).toLocaleString()} x{" "}
                          {item.quantity}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                        order.payment_status === "approved"
                          ? "bg-green-100 text-green-700"
                          : order.payment_status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : order.payment_status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.payment_status === "approved"
                        ? "Aprobado"
                        : order.payment_status === "pending"
                          ? "Pendiente"
                          : order.payment_status === "cancelled"
                            ? "Cancelado"
                            : "Pendiente"}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      {order.payment_method}
                    </span>
                  </div>
                </div>

                {/* SUBIDA DE COMPROBANTE (Mantiene tu lógica original) */}
                {order.payment_method === "transfer" &&
                  order.payment_status !== "approved" &&
                  order.payment_status !== "cancelled" &&
                  !order.payment_receipt_url && (
                    <div className="mt-4">
                      {uploadingOrderId !== order.id ? (
                        <button
                          onClick={() => handleUploadClick(order.id)}
                          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-red-600 transition-all shadow-md shadow-gray-200"
                        >
                          <UploadCloud size={18} />
                          Subir comprobante
                        </button>
                      ) : (
                        <div className="p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, order.id)}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                          />
                          {uploading && (
                            <div className="flex items-center gap-2 mt-4 text-red-500">
                              <Loader2 size={16} className="animate-spin" />
                              <p className="text-xs font-bold">
                                Subiendo comprobante...
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                {order.payment_receipt_url && (
                  <div className="mt-4 flex items-center gap-3 bg-green-50 p-4 rounded-2xl border border-green-100 text-green-700">
                    <CheckCircle size={20} />
                    <div>
                      <p className="text-xs font-black uppercase">
                        Enviado correctamente
                      </p>
                      <p className="text-[11px] font-medium opacity-80 text-green-600">
                        Estamos verificando tu pago.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* PIE DE LA SECCIÓN ÓRDENES */}
      {filteredOrders.length > 0 && (
        <div className="p-4 bg-gray-50/30 text-center border-t border-gray-50">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic">
            Fin del listado
          </p>
        </div>
      )}
    </section>
  );
}
