import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
    return (
        <div className="container mx-auto p-6 space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Content Area */}
                <div className="space-y-6 lg:col-span-4">
                    {/* Progress Card Skeleton */}
                    <Card>
                        <CardHeader className="pb-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-2 w-full" />
                                <Skeleton className="h-20 w-full rounded-lg" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Session Card Skeleton */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-60" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between py-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-12 w-12 rounded-full" />
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </Card>
                </div>

                {/* Sidebar Area */}
                <div className="space-y-6 lg:col-span-3">
                    {/* Badges Card Skeleton */}
                    <Card className="h-full">
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
