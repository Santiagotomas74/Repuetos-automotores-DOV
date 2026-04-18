
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Models from "./components/Models";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Categories/>
      <FeaturedProducts/>
      <Models/>
    
      {/* BOTÓN WHATSAPP FIJO */}
      <a
        href="https://wa.me/5491127561595"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-3 right-3 bg-[#25D366] text-white p-4 rounded-full shadow-lg transition-all z-50 flex items-center justify-center group hover:scale-110"
      >
        <FaWhatsapp size={32} className="md:w-10 md:h-10" />
        <span className="absolute right-20 bg-white text-black text-xs font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap hidden md:block">
          ¡Chatea con nosotros!
        </span>
      </a>
    </div>
  );
}
