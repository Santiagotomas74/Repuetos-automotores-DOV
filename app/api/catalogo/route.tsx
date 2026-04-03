import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";

export async function GET() {
  const { rows } = await query(`
    SELECT * FROM catalogo
    ORDER BY id ASC;
  `);

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const {
    oem_number,
    oem_equivalents,
    name,
    description,
    image1,
    image2,
    image3,
    image4,
    part_type,        // 🔹 tipo de repuesto
    compatible_models,       // 🔹 modelo compatible
    brand        // 🔹 marca
  } = await req.json();

  try {
    const { rows } = await query(
      `INSERT INTO catalogo (
        oem_number,
        oem_equivalents,
        name,
      
        description,
        image1,
        image2,
        image3,
        image4,
        part_type,
        compatible_models,
        brand
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, 
      )
      RETURNING *`,
      [
        oem_number,
        oem_equivalents,
        name,
      
        description,
        image1,
        image2,
        image3,
        image4,
        part_type,
        compatible_models,
        brand
      ]
    );

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error("Error creando producto:", error);

    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}