import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0b2a5b] to-[#0a2a55] text-white pt-16 pb-8 px-6 font-sans border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto">
        {/* 🔝 SECCIÓN SUPERIOR: Info, Links, Contacto, Redes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Columna 1: Marca */}
          <div>
            <h3 className="text-xl font-bold mb-4">DOV Repuestos</h3>
            <p className="text-gray-300 text-sm leading-relaxed pr-4">
              Somos una casa de repuestos especializada en Linea Volkswagen,
              Chevrolet y Renault. Trabajamos tanto piezas originales como
              alternativas de excelente calidad.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h3 className="text-xl font-bold mb-4">Información</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Devoluciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Servicio al Cliente</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Lunes a Viernes: 8AM - 7PM</li>
              <li>Sábados: 9AM - 5PM</li>
              <li>Teléfono: (+54) 9 11 2756-1595 o (+54) 9 11 2742-4592</li>
              <li>Email: info@vwparts.com</li>
            </ul>
          </div>

          {/* Columna 4: Redes y Pago */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4 mb-8">
              {/* Facebook */}
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/repuestos.dov/"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                  />
                </svg>
              </a>
            </div>

            <h3 className="text-lg font-bold mb-3">Métodos de Pago</h3>

            <div className="flex gap-3 text-white">
              {/* Tarjeta */}
              <svg
                className="w-10 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>

              {/* Efectivo */}
              <svg
                className="w-10 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M6 10h.01M18 14h.01" />
              </svg>

              {/* Transferencia */}
              <svg
                className="w-10 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                {/* Tarjeta / cuenta */}
                <rect x="2" y="6" width="20" height="16" rx="2" />

                {/* Flecha hacia la derecha */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h8m0 0l-3-3m3 3l-3 3"
                />

                {/* Flecha hacia la izquierda */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 16H8m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 🛠 SECCIÓN MEDIA: Beneficios (Bordes superior e inferior) */}
        <div className="border-t border-b border-[#1A365D] py-8 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Beneficio 1 */}
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 text-[#00AEEF] mb-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                {/* Caja del camión */}
                <rect x="1" y="6" width="14" height="10" rx="2" />

                {/* Cabina */}
                <path d="M15 10h4l3 3v3h-7z" />

                {/* Ruedas */}
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />

                {/* Línea base */}
                <path d="M1 16h21" />
              </svg>
              <span className="font-semibold text-sm">
                Envíos exclusivos a CABA y GBA
              </span>
            </div>

            {/* Beneficio 2 */}
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 text-[#00AEEF] mb-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15a4 4 0 100-8 4 4 0 000 8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"
                />
              </svg>
              <span className="font-semibold text-sm">
                Repuestos originales y alternativos
              </span>
            </div>

            {/* Beneficio 3 */}
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 text-[#00AEEF] mb-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                />
              </svg>
              <span className="font-semibold text-sm">Garantía a roturas</span>
            </div>

            {/* Beneficio 4 */}
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 text-[#00AEEF] mb-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18"
                />
              </svg>
              <span className="font-semibold text-sm">Pago seguro</span>
            </div>
          </div>

          {/* ⬇️ SECCIÓN INFERIOR: Copyright */}
          <div className="text-center text-gray-400 text-sm mt-10">
            <p>
              © 2026 DOV Repuestos. Distribuidor autorizado de repuestos
              Volkswagen, Chevrolet y Renault. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* 🔻 SEPARADOR & CRÉDITOS */}
        {/* Cambiamos justify-between por justify-center y ajustamos el gap */}
        <div className="border-t border-[#1E293B]  pt-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {/* 👨‍💻 DESARROLLADOR */}
          {/* Quitamos md:text-left para que siempre esté centrado */}
          <div className="text-center text-sm text-gray-400">
            <p>
              Desarrollado por{" "}
              <span className="text-white font-semibold tracking-wide">
                Santiago Taher
              </span>
            </p>
            <p className="mt-1 text-xs">
              Respaldado por{" "}
              <span className="text-gray-300 font-medium">
                ST Tech Solutions
              </span>
            </p>
          </div>

          {/* 🌐 REDES */}
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/santiago-taher-239008317/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-[#0A66C2] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0A66C2]/30"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/s_tech.solutions/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/541126042925"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-[#25D366] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/30"
            >
              <FaWhatsapp size={20} />
            </a>

            {/* Web */}
            <a
              href="https://santiago-taher-portafolio.vercel.app/services"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sitio Web"
              className="bg-[#162032] text-gray-400 hover:text-white hover:bg-indigo-500 p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="4" ry="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
