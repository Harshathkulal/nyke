"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiNike } from "react-icons/si";

export default function NoProductFound() {
  const router = useRouter();

  const handleGoBack = () => {
    // Go back to the previous page
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 pb-16 space-y-4 text-center">
        <SiNike size={84} className="ml-4" />
      <h2 className="text-3xl font-semibold">Product Not Found</h2>
      <p className="text-gray-500">Sorry, We could not find anything.</p>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
}
