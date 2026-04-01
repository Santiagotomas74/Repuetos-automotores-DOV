import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";

// 🔹 GET producto por ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    console.log("ID recibido en GET:", id);

    const { rows } = await query(
      `SELECT * FROM products WHERE id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error("Error en GET product:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const { price } = await req.json();

    if (price === undefined) {
      return NextResponse.json(
        { error: "Precio requerido" },
        { status: 400 }
      );
    }

    await query(
      `UPDATE products SET price = $1 WHERE id = $2`,
      [price, id]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error en PATCH price:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const {
    oem_number,
    oem_equivalents,
    name,
    stock,
    description,
    price,
    image1,
    image2,
    image3,
    image4,
  } = await req.json();

  try {
    const { rows } = await query(
      `UPDATE products
       SET 
         oem_number = $1,
         oem_equivalents = $2,
         name = $3,
         stock = $4,
         description = $5,
         price = $6,
         image1 = $7,
         image2 = $8,
         image3 = $9,
         image4 = $10
       WHERE id = $11
       RETURNING *`,
      [
        oem_number,
        oem_equivalents,
        name,
        stock,
        description,
        price,
        image1,
        image2,
        image3,
        image4,
        id,
      ]
    );

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error("Error en PUT product:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try { 
      await query(`DELETE FROM products WHERE id=$1`, [id]);
    return NextResponse.json({ success: true }, { status: 200 }   );
  } catch (error) {
    console.error("Error en DELETE product:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
