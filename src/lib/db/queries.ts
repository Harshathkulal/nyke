import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq, and, gte, lte, ilike, or } from "drizzle-orm";

export async function getProductById(id: number) {
  const [product] = await db
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
    .where(eq(products.id, id))
    .limit(1);

  return product || null;
}

export async function getFilteredProducts(filters: {
  type?: string;
  name?: string;
  gender?: string;
  color?: string;
  priceMin?: number;
  priceMax?: number;
}) {
  const { type, name, gender, color, priceMin, priceMax } = filters;

  const whereClauses = [];

  if (type) whereClauses.push(ilike(products.type, `%${type}%`));
  if (name) whereClauses.push(ilike(products.name, `%${name}%`));
  if (gender) whereClauses.push(ilike(products.gender, `%${gender}%`));
  if (color) whereClauses.push(ilike(products.color, `%${color}%`));
  if (priceMin !== undefined) whereClauses.push(gte(products.price, priceMin));
  if (priceMax !== undefined) whereClauses.push(lte(products.price, priceMax));

  return await db
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
}

export async function searchProducts(query: string) {
  if (!query) return [];

  return await db
    .select({
      id: products.id,
      name: products.name,
      imageUrl: products.imageUrl,
    })
    .from(products)
    .where(
      or(
        ilike(products.name, `%${query}%`),
        ilike(products.type, `%${query}%`),
        ilike(products.feature, `%${query}%`),
        ilike(products.gender, `%${query}%`),
        ilike(products.color, `%${query}%`)
      )
    );
}
