import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";

export async function GET() {
  const { rows } = await query(`
    SELECT * FROM products
    ORDER BY id ASC;
  `);

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { oem_number, oem_equivalents, name, stock, description, price, image1, image2, image3, image4 } = await req.json();

  const { rows } = await query(
    `INSERT INTO products (oem_number, oem_equivalents, name, stock, description, price, image1, image2, image3, image4)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [oem_number, oem_equivalents, name, stock, description, price, image1, image2, image3, image4]
  );

  return NextResponse.json(rows[0]);
}