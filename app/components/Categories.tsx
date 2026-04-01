"use client";

import { Settings, Disc, Gauge, Zap, Wrench, Funnel } from "lucide-react";

const categories = [
  { name: "Motor", icon: Settings },
  { name: "Frenos", icon: Disc },
  { name: "Suspensión", icon: Gauge },
  { name: "Eléctrico", icon: Zap },
  { name: "Filtros", icon: Funnel },
  { name: "Accesorios", icon: Wrench },
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-200 ">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-[#0a1f44] text-center mb-12">Categorías</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
      
      <a href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-full aspect-square text-center transition hover:shadow-xl hover:-translate-y-1 group">
        <svg className="h-12 w-12 text-[#0a1f44] mb-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.22 2C10.74 2 9.53 3.1 9.38 4.56L9.37 4.58C9.36 4.67 9.35 4.76 9.35 4.86C9.35 5.25 9.5 5.61 9.75 5.88L10.3 6.43C10.51 6.64 10.51 6.99 10.3 7.21L10.01 7.5L9.62 7.89C9.41 8.1 9.06 8.1 8.85 7.89L8.18 7.22C7.91 6.95 7.54 6.81 7.15 6.81C6.76 6.81 6.39 6.95 6.12 7.22L4.57 8.77C4.3 9.04 4.16 9.41 4.16 9.8C4.16 10.19 4.3 10.56 4.57 10.83L5.24 11.5C5.45 11.71 5.45 12.06 5.24 12.27L4.5 13.01L4.11 13.4C3.9 13.61 3.9 13.96 4.11 14.17L4.66 14.72C4.93 14.99 5.29 15.13 5.68 15.13H6.71L7.26 15.68C7.53 15.95 7.67 16.32 7.67 16.71C7.67 17.1 7.53 17.47 7.26 17.74L6.11 18.89C5.84 19.16 5.7 19.53 5.7 19.92V21.14C5.7 21.61 6.09 22 6.57 22H7.79C8.18 22 8.55 21.86 8.82 21.59L9.97 20.44C10.24 20.17 10.61 20.03 11 20.03H12.22C12.61 20.03 12.98 20.17 13.25 20.44L14.4 21.59C14.67 21.86 15.04 22 15.43 22H16.65C17.13 22 17.52 21.61 17.52 21.14V19.92C17.52 19.53 17.38 19.16 17.11 18.89L15.96 17.74C15.69 17.47 15.55 17.1 15.55 16.71V15.68L16.1 15.13H17.13C17.52 15.13 17.89 14.99 18.16 14.72L18.71 14.17C18.92 13.96 18.92 13.61 18.71 13.4L18.32 13.01L17.58 12.27C17.37 12.06 17.37 11.71 17.58 11.5L18.25 10.83C18.52 10.56 18.66 10.19 18.66 9.8C18.66 9.41 18.52 9.04 18.25 8.77L16.7 7.22C16.43 6.95 16.06 6.81 15.67 6.81C15.28 6.81 14.91 6.95 14.64 7.22L13.97 7.89C13.76 8.1 13.41 8.1 13.2 7.89L12.81 7.5L12.52 7.21C12.31 7 12.31 6.65 12.52 6.44L13.07 5.89C13.32 5.62 13.47 5.26 13.47 4.87C13.47 4.77 13.46 4.68 13.45 4.59C13.31 3.12 12.08 2 12.22 2Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
          <path d="M12.22 15.68C14.0747 15.68 15.57 14.1847 15.57 12.33C15.57 10.4753 14.0747 8.98 12.22 8.98C10.3653 8.98 8.87 10.4753 8.87 12.33C8.87 14.1847 10.3653 15.68 12.22 15.68Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
        </svg>
        <p className="text-lg font-medium text-[#0a1f44]">Motor</p>
      </a>
      
      <a href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-full aspect-square text-center transition hover:shadow-xl hover:-translate-y-1 group">
        <svg className="h-12 w-12 text-[#0a1f44] mb-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
          <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
          <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="currentColor"/>
          <path d="M2.75 12V2.75C1.65 2.75 0.75 3.65 0.75 4.75V11.25C0.75 12.35 1.65 13.25 2.75 13.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
          <path d="M21.25 12V2.75C22.35 2.75 23.25 3.65 23.25 4.75V11.25C23.25 12.35 22.35 13.25 21.25 13.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
        </svg>
        <p className="text-lg font-medium text-[#0a1f44]">Frenos</p>
      </a>
      
      <a href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-full aspect-square text-center transition hover:shadow-xl hover:-translate-y-1 group">
        <svg className="h-12 w-12 text-[#0a1f44] mb-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 4V12M12 12V20M12 12H20M12 12H4M12 12V8M12 12V16M12 12H8M12 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-lg font-medium text-[#0a1f44]">Suspensión</p>
      </a>
      
      <a href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-full aspect-square text-center transition hover:shadow-xl hover:-translate-y-1 group">
        <svg className="h-12 w-12 text-[#0a1f44] mb-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2L2 13.5H9L8.5 22L17.5 10.5H10.5L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-lg font-medium text-[#0a1f44]">Electricidad</p>
      </a>
      
      <a href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-full aspect-square text-center transition hover:shadow-xl hover:-translate-y-1 group">
        <svg className="h-12 w-12 text-[#0a1f44] mb-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 3.5V6C22 7.1 21.1 8 20 8H4C2.9 8 2 7.1 2 6V3.5C2 2.4 2.9 1.5 4 1.5H20C21.1 1.5 22 2.4 22 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 11H20" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 14.5H18" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 18H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 21.5H14" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-lg font-medium text-[#0a1f44]">Filtros</p>
      </a>
      
      <a href="#" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center w-full aspect-square text-center transition hover:shadow-xl hover:-translate-y-1 group">
        <svg className="h-12 w-12 text-[#0a1f44] mb-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 12.3L22 19.6V22H19.6L12.3 14.7L14.7 12.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.3 14.7L2 22V19.6L9.3 12.3L11.7 14.7L9.3 14.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.7 11.7L22 4.4V2H19.6L12.3 9.3L14.7 11.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.3 9.3L2 2V4.4L9.3 11.7L11.7 9.3L9.3 9.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
        </svg>
        <p className="text-lg font-medium text-[#0a1f44]">Accesorios</p>
      </a>
    </div>
  </div>
</section>
  );
}