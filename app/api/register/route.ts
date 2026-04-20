import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ==========================
    // Sanitización
    // ==========================
    const name = String(body.name || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 40);

    const lastName = String(body.lastName || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 40);

    const email = String(body.email || "")
      .trim()
      .toLowerCase()
      .slice(0, 120);

    const password = String(body.password || "").trim();

    const phone = String(body.phone || "")
      .replace(/[^\d+]/g, "")
      .slice(0, 20);

    // ==========================
    // Validaciones
    // ==========================
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Campos incompletos" },
        { status: 400 },
      );
    }

    if (!nameRegex.test(name) || !nameRegex.test(lastName)) {
      return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { error: "La contraseña debe tener mínimo 8 caracteres" },
        { status: 400 },
      );
    }

    // ==========================
    // Verificar duplicado
    // ==========================
    const existingUser = await query(
      `SELECT id FROM users WHERE email = $1 LIMIT 1`,
      [email],
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Email ya registrado" },
        { status: 400 },
      );
    }

    // ==========================
    // Hash password
    // ==========================
    const hashedPassword = await bcrypt.hash(password, 12);

    // ==========================
    // Insert seguro
    // ==========================
    const role = "user";

    const { rows } = await query(
      `
      INSERT INTO users (
        name,
        lastname,
        email,
        password,
        phone,
        role
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id, name, lastname, email, phone, role, created_at
      `,
      [name, lastName, email, hashedPassword, phone || null, role],
    );

    return NextResponse.json(
      {
        success: true,
        message: "Usuario registrado exitosamente",
        user: rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error en registro:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
