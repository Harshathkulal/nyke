"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductList from "@/components/products/product-list";
import SortForm from "@/components/products/SortForm";
import type { Product } from "@/types/products";
import { SkeletonCard } from "@/components/products/loading";
import ErrorPage from "@/components/products/ErrorPage";

export default function ShoePageClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const initialSort = searchParams.get("sort") || "default";

  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(initialSort);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (type) params.set("type", type);

        const res = await fetch(`/api/products?${params.toString()}`);

        if (!res.ok) throw new Error("Failed to fetch products.");

        const filtered: Product[] = await res.json();

        setProducts(filtered);
        setSortedProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type]);

  useEffect(() => {
    const sortProducts = () => {
      const sorted = [...products];
      if (sort === "priceLowToHigh") {
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sort === "priceHighToLow") {
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
      setSortedProducts(sorted);
    };

    sortProducts();
  }, [sort, products]);

  const heading = type
    ? `${type.charAt(0).toUpperCase() + type.slice(1)} Shoes`
    : "All Shoes";

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{heading}</h1>
        <SortForm type={type || undefined} sort={sort} setSort={setSort} />
      </div>

      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <ErrorPage message={error} />
      ) : (
        <ProductList products={sortedProducts} />
      )}
    </>
  );
}
