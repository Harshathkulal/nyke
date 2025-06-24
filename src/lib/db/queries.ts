import { db } from "../../db/db";
import { products } from "../../db/schema";
import { eq } from "drizzle-orm";

// function to get all products
export async function getAllProducts() {
  try {
    return await db.select().from(products);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch products");
  }
}

// function to get products by type
export async function getProductById(id: number) {
  try {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0] || null;
  } catch (error) {
    console.error(`Database error when fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}`);
  }
}
