import { useEffect, useState } from "react";
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
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/user/dashboard", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("No autorizado");

        const data = await res.json();

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
    <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
      <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CreditCard size={20} className="text-gray-400" />
        Historial de Pagos
      </h2>

      {payments.length === 0 ? (
        <p className="text-gray-400 text-sm italic">
          No hay pagos registrados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="p-5 bg-gray-50 rounded-3xl border border-gray-100 hover:border-red-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    Orden {payment.order_number}
                  </p>
                  <p className="font-bold text-gray-800">${payment.amount}</p>
                </div>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-lg bg-white border border-gray-100 text-gray-400 uppercase italic">
                  {payment.provider}
                </span>
              </div>
              <p
                className={`text-[10px] mt-2 font-bold uppercase ${payment.status === "approved" ? "text-green-500" : "text-amber-500"}`}
              >
                ● {payment.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
