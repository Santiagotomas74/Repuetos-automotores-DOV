"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 👉 acá después lo conectás a tu API
      console.log(form);

      alert("Mensaje enviado correctamente");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert("Error al enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 mt-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* 📝 FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h1 className="text-2xl font-bold text-[#00173D] mb-6">
            Contactanos
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="phone"
              placeholder="Teléfono (opcional)"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="message"
              placeholder="Escribí tu mensaje..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg min-h-[120px]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00173D] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>

          </form>
        </div>

        {/* 📍 INFO */}
        <div className="flex flex-col justify-center space-y-6">

          <div>
            <h2 className="text-xl font-bold text-[#00173D] mb-2">
              Información de contacto
            </h2>
            <p className="text-gray-600">
              Estamos para ayudarte con cualquier consulta sobre repuestos.
            </p>
          </div>

          <div className="space-y-3 text-gray-700">

            <p>📍 Dirección: Buenos Aires, Argentina</p>

            <p>📞 Teléfono: +54 11 1234-5678</p>

            <p>📧 Email: ventas@repuestosvw.com</p>

            <p>🕒 Horario: Lun a Vie de 9:00 a 18:00</p>

          </div>

          {/* 🗺️ MAP (opcional) */}
          <div className="bg-gray-200 h-52 rounded-xl flex items-center justify-center text-gray-500">
            Mapa (Google Maps)
          </div>

        </div>

      </div>
    </div>
  );
}