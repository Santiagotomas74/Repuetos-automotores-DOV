"use client";

import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const phone = "5491127561595";

  const handleWhatsApp = () => {
    const message = `Hola! Me gustaría hacer una consulta sobre repuestos.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-blue-600 py-16 px-4 mt-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12 mt-10 sm:mt-0 md:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Contactanos
          </h2>
          <p className="text-white mt-3">
            Estamos para ayudarte con cualquier consulta sobre repuestos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* INFO */}
          <div className="bg-white p-8 rounded-2xl shadow-md border space-y-6">

            <h3 className="text-xl font-bold text-[#00173D]">
              Información de contacto
            </h3>

            <div className="space-y-4 text-gray-700">

              <div className="flex items-center gap-3">
                <MapPin className="text-[#00AEEF]" />
                <span>Buenos Aires, Argentina</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#00AEEF]" />
                <span>(+54) 9 11 2756-1595</span>
                <span>/ (+54) 9 11 2742-4592</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-[#00AEEF]" />
                <span>Lunes a Viernes: 8AM - 7PM</span>
                <span>Sábados: 9AM - 5PM</span>
              </div>

            </div>

            {/* CTA */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition cursor-pointer"
            >
              <FaWhatsapp size={20} />
              Escribir por WhatsApp
            </button>
            <img
  src="/frente.png"
  alt="imagen de la tienda"
  className="w-150 h-64 object-cover"
/>

          </div>

          {/* MAPA */}
          <div className="bg-white p-4 rounded-2xl shadow-md border">
            <iframe
              src="https://www.google.com/maps?q=REPUESTOS+DOV&output=embed"
              className="w-full h-[520px] rounded-xl border-0"
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}