import { NextResponse } from "next/server";
import { query } from "@/db";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Falta orderId" },
        { status: 400 }
      );
    }

    await query(
      `
      UPDATE orders
      SET 
        payment_receipt_url = NULL,
        payment_status = 'pending'
      WHERE id = $1
      `,
      [orderId]
    );

    return NextResponse.json({
      success: true,
      message:
        "Comprobante rechazado. El cliente puede subir uno nuevo.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}