import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress as ProgressType } from "@/types/dashboard";
import { CheckCircle2, Clock } from "lucide-react";

interface ProgressCardProps {
    progress: ProgressType;
}

export function ProgressCard({ progress }: ProgressCardProps) {
    const percentage = (progress.completedSessions / progress.totalSessions) * 100;

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Votre Progression</CardTitle>
                <CardDescription>
                    Suivi de vos sessions de simulation
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">
                                {progress.completedSessions} / {progress.totalSessions} Sessions
                            </span>
                            <span className="text-muted-foreground">
                                {Math.round(percentage)}%
                            </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                    </div>

                    <div className="rounded-lg bg-muted p-3">
                        <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">Limite Hebdomadaire</span>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                            Vous avez réalisé <span className="font-medium text-foreground">{progress.weeklySessionsUsed}</span> sur <span className="font-medium text-foreground">{progress.weeklySessionsLimit}</span> sessions disponibles cette semaine.
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
