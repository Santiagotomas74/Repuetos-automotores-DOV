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
      `SELECT * FROM catalogo WHERE id = $1`,
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
    console.error("Error en GET product del catalogo:", error);
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
    description,
    image1,
    image2,
    image3,
    image4,
    brand,
    compatible_models,
    part_type
  } = await req.json();

  // 🔧 FORMAT MODELS
  const formattedModel =
    compatible_models && compatible_models.length > 0
      ? Array.isArray(compatible_models)
        ? compatible_models
        : compatible_models
            .split(",")
            .map((m: string) => m.trim())
            .filter((m: string) => m.length > 0)
      : null;

  // 🔧 FORMAT OEM
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
      `UPDATE catalogo
       SET 
         oem_number = $1,
         oem_equivalents = $2,
         name = $3,
         description = $4,
         image1 = $5,
         image2 = $6,
         image3 = $7,
         image4 = $8,
         brand = $9,
         compatible_models = $10,
         part_type = $11
       WHERE id = $12
       RETURNING *`,
      [
        oem_number,
        formattedOEM,       // 🔥 FIX
        name,
        description,
        image1,
        image2,
        image3,
        image4,
        brand,
        formattedModel,     // 🔥 FIX
        part_type,
        id,
      ]
    );

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error("Error en PUT product en el catalogo:", error);

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
      await query(`DELETE FROM catalogo WHERE id=$1`, [id]);
    return NextResponse.json({ success: true }, { status: 200 }   );
  } catch (error) {
    console.error("Error en DELETE product del catalogo:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
