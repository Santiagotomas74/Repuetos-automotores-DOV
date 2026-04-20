import { NextResponse } from "next/server";
import { query } from "@/db";
import { sendOrderConfirmationEmail } from "@/lib/mailer";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "orderId requerido" }, { status: 400 });
    }

    // 1️⃣ Obtener datos de la orden antes de aprobar
    const { rows: orderRows } = await query(
      `
      SELECT 
        id,
        total_amount,
        currency,
        payment_method,
        payment_status
      FROM orders
      WHERE id = $1
      `,
      [orderId],
    );

    if (orderRows.length === 0) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 },
      );
    }

    const order = orderRows[0];

    // Evitar doble validación
    if (order.payment_status === "approved") {
      return NextResponse.json({ success: true });
    }

    // 2️⃣ Aprobar orden
    await query(
      `
      UPDATE orders
      SET payment_status = 'approved',
          order_status = 'dispatch',
          paid_at = NOW() AT TIME ZONE 'America/Argentina/Buenos_Aires',
          updated_at = NOW() AT TIME ZONE 'America/Argentina/Buenos_Aires'
      WHERE id = $1
      `,
      [orderId],
    );

    // 3️⃣ Registrar ingreso en payments
    await query(
      `
  INSERT INTO payments (
    id,
    order_id,
    provider,
    provider_payment_id,
    amount,
    currency,
    status,
    raw_response
  )
  VALUES ($1,$2,$3,$4,$5,$6,'approved',$7)
  `,
      [
        randomUUID(),
        orderId,
        order.payment_method,
        `manual-${Date.now()}`,
        Number(order.total_amount),
        order.currency || "ARS",
        JSON.stringify({
          validated_by_admin: true,
          validated_at: new Date().toISOString(),
          method: order.payment_method,
        }),
      ],
    );

    // 4️⃣ Obtener email usuario
    const { rows: userRows } = await query(
      `
      SELECT users.email
      FROM orders
      JOIN users ON users.id = orders.user_id
      WHERE orders.id = $1
      `,
      [orderId],
    );

    const email = userRows[0]?.email;

    // 5️⃣ Obtener productos
    const { rows: productsRows } = await query(
      `
      SELECT 
        products.name,
        order_items.quantity,
        order_items.unit_price,
        products.image1 AS image
      FROM order_items
      JOIN products ON products.id = order_items.product_id
      WHERE order_items.order_id = $1
      `,
      [orderId],
    );

    // 6️⃣ Total
    const total = productsRows.reduce(
      (sum: number, p: any) => sum + Number(p.unit_price) * Number(p.quantity),
      0,
    );

    // 7️⃣ Email confirmación
    if (email) {
      await sendOrderConfirmationEmail(email, orderId, productsRows, total);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error validando orden" },
      { status: 500 },
    );
  }
}
