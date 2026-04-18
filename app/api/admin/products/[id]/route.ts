import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";

// 🔹 GET producto por ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
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

// 🔥 PATCH precio / stock / disabled
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const { price, stock, disabled } = await req.json();

    if (
      price === undefined &&
      stock === undefined &&
      disabled === undefined
    ) {
      return NextResponse.json(
        { error: "Nada para actualizar" },
        { status: 400 }
      );
    }

    if (price !== undefined) {
      await query(
        `UPDATE products SET price = $1 WHERE id = $2`,
        [price, id]
      );
    }

    if (stock !== undefined) {
      await query(
        `UPDATE products SET stock = $1 WHERE id = $2`,
        [stock, id]
      );
    }

    if (disabled !== undefined) {
      await query(
        `UPDATE products SET disabled = $1 WHERE id = $2`,
        [disabled, id]
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error en PATCH product:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// 🔹 PUT editar producto completo
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
    brand,
    compatible_models,
    part_type
  } = await req.json();

  const formattedModel =
    compatible_models && compatible_models.length > 0
      ? Array.isArray(compatible_models)
        ? compatible_models
        : compatible_models
            .split(",")
            .map((m: string) => m.trim())
            .filter((m: string) => m.length > 0)
      : null;

  const formattedOEM =
    oem_equivalents && oem_equivalents.length > 0
      ? Array.isArray(oem_equivalents)
        ? oem_equivalents
        : oem_equivalents
            .split(",")
            .map((e: string) => e.trim().toUpperCase())
            .filter((e: string) => e.length > 0)
      : null;

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
         image4 = $10,
         brand = $11,
         compatible_models = $12,
         part_type = $13
       WHERE id = $14
       RETURNING *`,
      [
        oem_number,
        formattedOEM,
        name,
        stock,
        description,
        price,
        image1,
        image2,
        image3,
        image4,
        brand,
        formattedModel,
        part_type,
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

// 🔹 DELETE producto
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await query(`DELETE FROM products WHERE id = $1`, [id]);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en DELETE product:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}