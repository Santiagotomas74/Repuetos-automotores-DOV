// app/api/admin/orders/cash/route.ts

import { NextResponse } from "next/server";
import { pool } from "@/db";

export async function GET() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT
        o.id,
        o.order_number,
        o.total_amount,
        o.payment_status,
        o.order_status,
        o.expires_at,
        u.email AS user_email
      FROM orders o
      INNER JOIN users u ON u.id = o.user_id
      WHERE o.payment_method = 'cash'
        AND o.payment_status = 'pending'
        AND o.order_status = 'pending_payment'
        AND (
          o.expires_at IS NULL
          OR o.expires_at > NOW()
        )
      ORDER BY o.created_at ASC
      `,
    );

    return NextResponse.json({
      orders: result.rows,
    });
  } catch (error) {
    console.error("Error obteniendo órdenes cash:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
