"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#0b2a5b] to-[#0a2a55] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Repuestos <br />
            Originales <br />
            Volkswagen
          </h1>

          <p className="text-gray-200 text-sm md:text-base max-w-md">
            Encuentra repuestos oficiales para tu Volkswagen con garantía y calidad original
          </p>

          <Link href="/catalogo">
            <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-lg font-medium shadow-md">
              Buscar repuestos
            </button>
          </Link>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md md:max-w-lg rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop" // 👈 cambiá por tu imagen
              alt="Motor Volkswagen"
              width={600}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

      </div>

    </section>
  );
}