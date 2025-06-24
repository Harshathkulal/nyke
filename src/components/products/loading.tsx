import { Skeleton } from "@/components/ui/skeleton";

const LENGTH = 6;

export function SkeletonCard() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-3">
      {Array.from({ length: LENGTH }).map((_, index) => (
        <div
          key={index}
          className="block bg-card rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm"
        >
          <div className="relative w-full aspect-square rounded-md overflow-hidden mb-4">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>

          <div className="mt-4 flex flex-col font-semibold space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3 mb-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
