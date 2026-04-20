"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, ShoppingCart, LogOut, Search } from "lucide-react";
import CartSidebar from "./CartSidebar";
import type { NavbarProps } from "./Navbar.types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({ items, cartCount }: NavbarProps) {
  const [isAdmin3, setIsAdmin3] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isUser = pathname.startsWith("/user/dashboard");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;

    router.push(`/catalogo?search=${encodeURIComponent(search)}`);
  };
  const cartItemsCount = cartCount;

  // 🔐 sesión
  useEffect(() => {
    const admin =
      localStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_KEY!) === "true";
    setIsAdmin3(admin);
    const checkSession = async () => {
      try {
        let res = await fetch("/api/user/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);

          if (res.status === 401 && data?.error === "TokenExpired") {
            const refreshRes = await fetch("/api/refresh", {
              method: "POST",
              credentials: "include",
            });

            if (!refreshRes.ok) throw new Error();

            res = await fetch("/api/user/me", {
              method: "GET",
              credentials: "include",
            });
          } else {
            throw new Error();
          }
        }

        const data = await res.json();

        setUserName(data.full_name || data.email);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUserName(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_ADMIN_KEY!);
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    setUserName(null);
    router.refresh();
  };

  if (loading) return null;

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
        {/* 🔵 TOP BAR */}
        <div className="bg-[#0b2a5b] text-white text-sm text-center py-2">
          Envíos gratis en Zona San Miguel - Compras seguras con Mercado Pago
        </div>

        {/* MAIN ROW */}
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between border-b border-gray-200">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-black"
            >
              <Menu size={22} />
            </button>

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <Image src="/DOVV.png" alt="Logo" width={130} height={200} />
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <ul className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-black transition">
                  {item.label}
                </Link>
              </li>
            ))}
            {isAdmin3 && (
              <li key={"/admin"}>
                <Link href={"/admin"} className="hover:text-black transition">
                  Administracion
                </Link>
              </li>
            )}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            {!isLoggedIn ? (
              <Link href="/login">
                <User className="cursor-pointer text-black" />
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/user/dashboard"
                  className="flex items-center gap-2 text-sm text-black"
                >
                  <User size={18} />
                  {userName}
                </Link>

                <button onClick={handleLogout}>
                  <LogOut size={18} className="text-red-500" />
                </button>
              </div>
            )}

            {/* CART */}
            <button onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingCart className="cursor-pointer text-black" />

              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0b2a5b] text-white text-xs px-1.5 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {!isAdmin && !isUser && (
          <div className="bg-white py-3">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-gray-100 rounded-xl p-2">
                <div className="flex items-center flex-1 bg-white rounded-lg px-3">
                  <Search className="text-gray-500 mr-2 shrink-0" size={18} />

                  <input
                    type="text"
                    placeholder="Buscar por nombre, modelo o número OEM"
                    className="w-full py-2 outline-none text-sm sm:text-base text-gray-800"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <button
                  className="bg-[#0b2a5b] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#09214a] transition w-full sm:w-auto md:h-10"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* OVERLAY MOBILE */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <span className="font-semibold text-black">DOV Repuestos</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="flex flex-col p-6 gap-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t p-6 text-gray-700 ">
          {!isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-blue-500"
            >
              <a href="/login">Iniciar sesión</a>
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-red-500"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>

      {/* CART SIDEBAR */}
      <CartSidebar
        isOpen={isCartOpen}
        count={cartItemsCount}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
