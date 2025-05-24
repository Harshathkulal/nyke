import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Initialize NeonDB client
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle ORM
export const db = drizzle(sql);
