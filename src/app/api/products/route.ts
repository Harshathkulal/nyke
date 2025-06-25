import { NextRequest, NextResponse } from "next/server";
import { getProductById, getFilteredProducts } from "@/lib/db/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const product = await getProductById(Number(id));
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }

  const filters = {
    type: searchParams.get("type") || undefined,
    name: searchParams.get("name") || undefined,
    gender: searchParams.get("gender") || undefined,
    color: searchParams.get("color") || undefined,
    priceMin: searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : undefined,
    priceMax: searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : undefined,
  };

  try {
    const filteredProducts = await getFilteredProducts(filters);
    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
