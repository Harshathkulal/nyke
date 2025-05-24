import {
  pgTable,
  serial,
  varchar,
  text,
  doublePrecision,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  feature: text("feature").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  gender: varchar("gender", { length: 100 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  sizes: json("sizes").notNull().$type<string[]>(),
  color: varchar("color", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Product = typeof products.$inferSelect;
