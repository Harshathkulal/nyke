"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/shoes/${product.id}`}
      className="block bg-card rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm transition-transform hover:scale-[1.02]"
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden mb-4">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={product.imageSrc || product.imageUrl || ""}
          alt={product.name}
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="mt-4 flex flex-col font-semibold">
        <p className="text-[#9E3500]">{product.feature}</p>
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-gray-500">{product.gender}</p>
        <p className="text-gray-500">1 Colour</p>
        <p className="font-medium mb-6">MRP: ₹ {product.price}</p>
      </div>
    </Link>
  );
};
