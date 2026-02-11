import { Card, CardContent, CardHeader } from "@/core/ui/card";
import { Skeleton } from "@/core/ui/skeleton";

const ProfilePageSkeleton = () => {
  return (
    <div className="container mx-auto max-w-4/5 px-4 py-10 space-y-12">
      <section>
        <Card className="p-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-32 rounded-md" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-3 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <Skeleton className="h-7 w-64 px-1" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-2 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

ProfilePageSkeleton.displayName = "ProfilePageSkeleton";
export default ProfilePageSkeleton;
