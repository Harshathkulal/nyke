import { Skeleton } from "@/components/ui/skeleton";

export function DetailLoading() {
  return (
    <div className="mt-10 lg:p-5 flex justify-between lg:justify-around m-4 flex-wrap lg:px-24">
      <div className="flex gap-2 mt-4">
        <div className="lg:flex flex-col gap-2 hidden">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-lg" />
          ))}
        </div>
        <Skeleton className="w-[350px] h-[350px] rounded-lg" />
      </div>

      <div className="flex flex-col">
        <div className="hidden lg:block">
          <Skeleton className="h-6 mb-2" />
          <Skeleton className="w-1/3 h-4 mb-4" />
          <Skeleton className="w-28 h-5 mb-2" />
          <Skeleton className="w-1/3 h-3 mb-2" />
          <Skeleton className="w-52 h-3 mb-2" />
        </div>

        <div className="lg:mt-20 mt-8">
          <div className="flex justify-between">
            <Skeleton className="w-24 h-6 mb-2" />
            <Skeleton className="w-24 h-6 mb-2" />
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-24 rounded-md" />
            ))}
          </div>
        </div>

        <div className="my-10 flex flex-col gap-3">
          <Skeleton className="w-full h-12 rounded-full" />
          <Skeleton className="w-full h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
