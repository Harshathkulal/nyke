"use client";

import React from "react";
import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/types/products";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
