"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "/frente.png",
    "/carru1.jpeg",
    "/carru2.jpeg",
    "/carru3.jpeg",
    "/frente2.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-gradient-to-br from-[#081a38] via-[#0b2a5b] to-[#0a2a55] text-white overflow-hidden">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8 py-18 md:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT */}
        <div className="space-y-5 md:space-y-8 ml-5 lg:space-y-6">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2  border border-cyan-400/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>

            <span className="text-xs text-cyan-100">
              Repuestos originales y alternativos
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-[42px] lg:text-6xl font-black leading-[1.02] tracking-tight">
            Repuestos
            <br />
            Automotrices
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-sm md:text-[15px] lg:text-base leading-relaxed max-w-md lg:max-w-lg">
            Somos una casa de repuestos especializada en línea Volkswagen,
            Chevrolet y Renault. Trabajamos piezas originales y alternativas de
            excelente calidad.
          </p>

          {/* BUTTON */}
          <Link href="/catalogo">
            <button className="mt-2 bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 px-5 lg:px-6 py-3 rounded-xl font-semibold shadow-2xl hover:scale-[1.02] text-sm md:text-base">
              Buscar repuestos
            </button>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm md:max-w-sm lg:max-w-lg rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10">
            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent z-10 pointer-events-none" />

            {/* IMAGES */}
            <div className="relative w-full h-[400px] md:h-[420px] lg:h-[520px]">
              {images.map((img, index) => (
                <Image
                  key={img}
                  src={img}
                  alt="Repuestos Automotrices"
                  fill
                  priority
                  className={`object-cover absolute inset-0 transition-all duration-1000 ease-in-out ${
                    currentImage === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                />
              ))}
            </div>

            {/* DOTS */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentImage === index
                      ? "w-6 bg-cyan-400"
                      : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
