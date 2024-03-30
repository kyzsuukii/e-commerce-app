import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[700px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[500px]" />
        </div>
      </div>
    </div>
  );
}
