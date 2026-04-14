export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-[#0b2a5b] to-[#0a2a55] text-white pt-16 pb-8 px-6 font-sans border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto">
          
          {/* 🔝 SECCIÓN SUPERIOR: Info, Links, Contacto, Redes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Columna 1: Marca */}
            <div>
              <h3 className="text-xl font-bold mb-4">DOV Respuestos</h3>
              <p className="text-gray-300 text-sm leading-relaxed pr-4">
                Somos una casa de repuestos especializada en Linea Volkswagen, Chevrolet y Renault. Trabajamos tanto piezas originales como alternativas de excelente calidad. 
              </p>
            </div>
  
            {/* Columna 2: Enlaces */}
            <div>
              <h3 className="text-xl font-bold mb-4">Información</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Devoluciones</a></li>
                
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
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/repuestos.dov/" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                  </svg>
                </a>
             
              </div>
  
             <h3 className="text-lg font-bold mb-3">Métodos de Pago</h3>

<div className="flex gap-3 text-white">

  {/* Tarjeta */}
  <svg className="w-10 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M2 10h20" />
  </svg>

  {/* Efectivo */}
  <svg className="w-10 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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
          <div className="border-t border-b border-[#1A365D] py-8 my-8">
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
            <p>© 2026 DOV Repuestos. Distribuidor autorizado de repuestos Volkswagen, Chevrolet y Renault. Todos los derechos reservados.</p>
          </div>
  
        </div>
      </footer>
    );
  }