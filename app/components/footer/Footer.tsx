export default function Footer() {
    return (
      <footer className="bg-[#00173D] text-white pt-16 pb-8 px-6 font-sans border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto">
          
          {/* 🔝 SECCIÓN SUPERIOR: Info, Links, Contacto, Redes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Columna 1: Marca */}
            <div>
              <h3 className="text-xl font-bold mb-4">Volkswagen Parts</h3>
              <p className="text-gray-300 text-sm leading-relaxed pr-4">
                Distribuidor autorizado de repuestos originales Volkswagen con más de 10 años de experiencia en el mercado.
              </p>
            </div>
  
            {/* Columna 2: Enlaces */}
            <div>
              <h3 className="text-xl font-bold mb-4">Información</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Devoluciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>
  
            {/* Columna 3: Contacto */}
            <div>
              <h3 className="text-xl font-bold mb-4">Servicio al Cliente</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>Lunes a Viernes: 9AM - 6PM</li>
                <li>Sábados: 9AM - 2PM</li>
                <li>Teléfono: (555) 123-4567</li>
                <li>Email: info@vwparts.com</li>
              </ul>
            </div>
  
            {/* Columna 4: Redes y Pago */}
            <div>
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex gap-4 mb-8">
                {/* Facebook */}
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              </div>
  
              <h3 className="text-lg font-bold mb-3">Métodos de Pago</h3>
              <div className="flex gap-2 text-white">
                {/* Tarjetas genéricas SVG */}
                <svg className="w-10 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                <svg className="w-10 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                <svg className="w-10 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
            </div>
          </div>
  
          {/* 🛠 SECCIÓN MEDIA: Beneficios (Bordes superior e inferior) */}
          <div className="border-t border-b border-[#1A365D] py-8 my-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              
              {/* Beneficio 1 */}
              <div className="flex flex-col items-center justify-center">
                <svg className="w-10 h-10 text-[#00AEEF] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-10v10m0 0a2 2 0 100-4 2 2 0 000 4zm9-12H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 3h5a2 2 0 012 2v4l-3 4" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18" />
                </svg>
                <span className="font-semibold text-sm">Envíos a todo el país</span>
              </div>
  
              {/* Beneficio 2 */}
              <div className="flex flex-col items-center justify-center">
                <svg className="w-10 h-10 text-[#00AEEF] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a4 4 0 100-8 4 4 0 000 8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                </svg>
                <span className="font-semibold text-sm">Repuestos VW originales</span>
              </div>
  
              {/* Beneficio 3 */}
              <div className="flex flex-col items-center justify-center">
                <svg className="w-10 h-10 text-[#00AEEF] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="font-semibold text-sm">Garantía oficial</span>
              </div>
  
              {/* Beneficio 4 */}
              <div className="flex flex-col items-center justify-center">
                <svg className="w-10 h-10 text-[#00AEEF] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
                </svg>
                <span className="font-semibold text-sm">Pago seguro</span>
              </div>
  
            </div>
          </div>
  
          {/* ⬇️ SECCIÓN INFERIOR: Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>© 2026 VW Parts. Distribuidor autorizado de repuestos Volkswagen. Todos los derechos reservados.</p>
          </div>
  
        </div>
      </footer>
    );
  }