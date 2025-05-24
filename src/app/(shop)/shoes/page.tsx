import { Suspense } from "react";
import { SkeletonCard } from "@/components/products/loading";
import ShoePageClient from "./ShoePageClient";

export default function ShoePage() {
  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<SkeletonCard />}>
        <ShoePageClient />
      </Suspense>
    </main>
  );
}
