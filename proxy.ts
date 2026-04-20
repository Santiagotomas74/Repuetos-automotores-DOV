import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("tokenTDOV")?.value;
  const refreshToken = req.cookies.get("refreshTokenDOV")?.value;
  const { pathname } = req.nextUrl;

  // =====================================
  // Evitar login/register si ya logueado
  // =====================================
  if (
    accessToken &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // =====================================
  // Proteger rutas privadas
  // =====================================
  if (pathname.startsWith("/user") || pathname.startsWith("/admin")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as any;

      // ==========================
      // Validación de admins
      // ==========================
      const allowedAdmins = [
        "santiago_lucas1@hotmail.com",
        "augustoda0202@gmail.com",
      ];

      if (
        pathname.startsWith("/admin") &&
        !(decoded.role === "admin" && allowedAdmins.includes(decoded.email))
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    } catch (error: any) {
      // ==================================
      // Si venció token -> usar refresh
      // ==================================
      if (error.name === "TokenExpiredError") {
        if (!refreshToken) {
          return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
          const decodedRefresh = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!,
          ) as any;

          const newAccessToken = jwt.sign(
            {
              id: decodedRefresh.id,
              role: decodedRefresh.role,
              email: decodedRefresh.email, // importante
            },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" },
          );

          const response = NextResponse.next();

          // ⚠️ TENÍAS tokenTtech -> error
          response.cookies.set("tokenTDOV", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 15,
          });

          return response;
        } catch {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }

      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
};
