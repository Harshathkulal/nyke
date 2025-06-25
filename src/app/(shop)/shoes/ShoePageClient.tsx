"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
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
        const params: Record<string, string> = {};
        if (type) params.type = type;

        const { data } = await axios.get("/api/products", {
          params,
        });

        setProducts(data);
        setSortedProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
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
