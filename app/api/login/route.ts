import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

// 🔐 Validación segura
const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(120),
  password: z.string().min(6).max(100),
});

export async function POST(req: NextRequest) {
  try {
    // ===============================
    // 1️⃣ Leer body
    // ===============================
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { email, password } = parsed.data;

    // ===============================
    // 2️⃣ Buscar usuario
    // ===============================
    const { rows } = await query(
      `
      SELECT id, email, password, role
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [email],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    const user = rows[0];

    // ===============================
    // 3️⃣ Validar password
    // ===============================
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    // ===============================
    // 4️⃣ Access Token
    // ===============================
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    // ===============================
    // 5️⃣ Refresh Token
    // ===============================
    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    // ===============================
    // 6️⃣ Response
    // ===============================
    const response = NextResponse.json({
      success: true,
      role: user.role,
    });

    // Email visible (opcional)
    response.cookies.set("emailDOV", user.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // 🔐 Access Token
    response.cookies.set("tokenTDOV", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hora
    });

    // 🔄 Refresh Token
    response.cookies.set("refreshTokenDOV", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
