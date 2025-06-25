import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/db/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query param is required" }, { status: 400 });
  }

  try {
    const results = await searchProducts(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
