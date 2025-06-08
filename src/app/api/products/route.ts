import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq, and, gte, lte, ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  if (id) {
    // Fetch product by ID and return immediately
    try {
      const product = await db
        .select({
          id: products.id,
          name: products.name,
          imageUrl: products.imageUrl,
          feature: products.feature,
          price: products.price,
          type: products.type,
          gender: products.gender,
          color: products.color,
        })
        .from(products)
        .where(eq(products.id, Number(id))) // Make sure id is number if your schema expects it
        .limit(1);

      if (!product.length) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(product[0]);
    } catch (error) {
      console.error("Fetch error by ID:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }

  // If no id param, continue with your filtering logic
  const type = searchParams.get("type");
  const name = searchParams.get("name");
  const gender = searchParams.get("gender");
  const color = searchParams.get("color");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  const whereClauses = [];

if (type) whereClauses.push(ilike(products.type, `%${type}%`));
if (name) whereClauses.push(ilike(products.name, `%${name}%`));
if (gender) whereClauses.push(ilike(products.gender, `%${gender}%`));
if (color) whereClauses.push(ilike(products.color, `%${color}%`));
if (priceMin) whereClauses.push(gte(products.price, Number(priceMin)));
if (priceMax) whereClauses.push(lte(products.price, Number(priceMax)));

  try {
    const filtered = await db
      .select({
        id: products.id,
        name: products.name,
        imageUrl: products.imageUrl,
        feature: products.feature,
        price: products.price,
        type: products.type,
        gender: products.gender,
        color: products.color,
      })
      .from(products)
      .where(whereClauses.length ? and(...whereClauses) : undefined);

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
