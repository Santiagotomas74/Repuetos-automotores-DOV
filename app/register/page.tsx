"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================
  // Sanitizadores
  // ======================
  const cleanText = (value: string) =>
    value
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart()
      .slice(0, 40);

  const cleanEmail = (value: string) =>
    value
      .replace(/[^\w@.+-]/g, "")
      .toLowerCase()
      .slice(0, 120);

  const cleanPhone = (value: string) =>
    value.replace(/[^\d+]/g, "").slice(0, 20);

  const validateForm = () => {
    if (name.trim().length < 2) {
      return "El nombre debe tener al menos 2 caracteres";
    }

    if (lastName.trim().length < 2) {
      return "El apellido debe tener al menos 2 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Correo electrónico inválido";
    }

    if (
      !passwordRules.length ||
      !passwordRules.uppercase ||
      !passwordRules.number
    ) {
      return "La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número";
    }

    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    return null;
  };

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar usuario");
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Cuenta creada",
        text: "Registro exitoso. Ahora iniciá sesión.",
        confirmButtonText: "Ir al login",
      });

      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError("Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* IZQUIERDA */}
      <div className="relative w-full md:w-1/2 h-[40vh] md:h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/frente.png')",
          }}
        />
      </div>

      {/* DERECHA */}
      <div className="w-full md:w-1/2 min-h-[60vh] md:h-screen flex items-center justify-center bg-gray-50 p-5">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase italic text-center">
            Crear Cuenta
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 shadow space-y-4"
          >
            {/* Nombre / Apellido */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  maxLength={40}
                  onChange={(e) => setName(cleanText(e.target.value))}
                  className="w-full pl-10 pr-3 py-3 border rounded-xl text-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  maxLength={40}
                  onChange={(e) => setLastName(cleanText(e.target.value))}
                  className="w-full pl-10 pr-3 py-3 border rounded-xl text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="correo@email.com"
                value={email}
                maxLength={120}
                autoComplete="email"
                spellCheck={false}
                onChange={(e) => setEmail(cleanEmail(e.target.value))}
                className="w-full pl-10 pr-3 py-3 border rounded-xl text-gray-900"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                placeholder="+5491112345678"
                value={phone}
                maxLength={20}
                inputMode="numeric"
                onChange={(e) => setPhone(cleanPhone(e.target.value))}
                className="w-full pl-10 pr-3 py-3 border rounded-xl text-gray-900"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                maxLength={72}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border rounded-xl text-gray-900"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                maxLength={72}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border rounded-xl text-gray-900"
                required
              />
            </div>

            {/* Rules */}
            <div className="text-xs space-y-1">
              <p
                className={
                  passwordRules.length ? "text-green-600" : "text-gray-400"
                }
              >
                • Mínimo 8 caracteres
              </p>
              <p
                className={
                  passwordRules.uppercase ? "text-green-600" : "text-gray-400"
                }
              >
                • Una mayúscula
              </p>
              <p
                className={
                  passwordRules.number ? "text-green-600" : "text-gray-400"
                }
              >
                • Un número
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Crear Cuenta
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
