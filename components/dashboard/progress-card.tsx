import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress as ProgressType } from "@/types/dashboard";
import { BarChart3 } from "lucide-react";

interface ProgressCardProps {
    progress: ProgressType;
}

export function ProgressCard({ progress }: ProgressCardProps) {
    const percentage = (progress.completedSessions / progress.totalSessions) * 100;

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base font-semibold">Progression Globale</CardTitle>
                    </div>
                    <div className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">
                            En Cours
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Progress Bar with Percentage */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Progress value={percentage} className="h-2 flex-1" />
                            <span className="ml-3 text-sm font-semibold text-foreground">
                                {Math.round(percentage)}%
                            </span>
                        </div>
                    </div>

                    {/* Motivational Text */}
                    <p className="text-sm text-muted-foreground">
                        Continuez ainsi pour atteindre vos objectifs pédagogiques.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
