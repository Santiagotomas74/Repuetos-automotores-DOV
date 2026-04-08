"use client";

export default function ContactPage() {
  const phone = "5491123456789"; // 🔥 tu número real

  const handleWhatsApp = () => {
    const message = `Hola! Me gustaría hacer una consulta sobre repuestos.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className=" bg-slate-900 py-12 px-4 mt-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* 📍 INFO */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-6">

          <div>
            <h1 className="text-2xl font-bold text-[#00173D] mb-2">
              Nuestro Local
            </h1>
            <p className="text-gray-600">
              Acercate o escribinos directamente por WhatsApp.
            </p>
          </div>

          <div className="space-y-3 text-gray-700">
            <p>📍 Dirección: Buenos Aires, Argentina</p>
            <p>📞 Teléfono: +54 11 1234-5678</p>
            <p>🕒 Horario: Lun a Vie de 9:00 a 18:00</p>
          </div>

          {/* 📲 WHATSAPP */}
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
          >
            Contactar por WhatsApp
          </button>

        </div>

        {/* 🗺️ GOOGLE MAPS */}
<div className="bg-white p-4 rounded-2xl shadow-sm border">
  <iframe
    src="https://www.google.com/maps?q=REPUESTOS+DOV&output=embed"
    className="w-full h-[350px] rounded-xl border-0"
    loading="lazy"
  ></iframe>
</div>

      </div>
    </div>
  );
}