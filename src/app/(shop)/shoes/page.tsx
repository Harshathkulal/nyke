"use client"; // 👈 Required for client components

import { useEffect, useState } from "react";
import ProductList from "@/components/products/product-list";
import SortForm from "@/components/products/SortForm";
import type { Product } from "@/types/products";
import { useSearchParams } from "next/navigation";
import { SkeletonCard } from "@/components/products/loading";
import ErrorPage from "@/components/products/ErrorPage"; // Assuming you have a simple error page component

export default function ShoePage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const initialSort = searchParams.get("sort") || "default";

  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(initialSort);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching new data
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products."); // Handle non-OK responses
        const allProducts: Product[] = await res.json();

        // Filter by type if provided
        const filtered = type
          ? allProducts.filter((p) => p.type.toLowerCase() === type.toLowerCase())
          : allProducts;

        setProducts(filtered);
        setSortedProducts(filtered);
      } catch (error: unknown) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type]);

  // Sort the products on the frontend based on selected sort type
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
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{heading}</h1>
        <SortForm type={type || undefined} sort={sort} setSort={setSort} />
      </div>

      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <ErrorPage message={error} /> // Show error message component if fetch fails
      ) : (
        <ProductList products={sortedProducts} />
      )}
    </main>
  );
}
