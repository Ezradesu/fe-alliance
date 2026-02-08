import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge as BadgeType } from "@/types/dashboard";
import { Ear, Repeat, Heart, Trophy, LucideIcon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgesCardProps {
    badges: BadgeType[];
}

const ICON_MAP: Record<string, LucideIcon> = {
    Ear: Ear,
    Repeat: Repeat,
    Heart: Heart,
    Trophy: Trophy,
};

export function BadgesCard({ badges }: BadgesCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Compétences & Badges</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <TooltipProvider>
                    <div className="grid grid-cols-3 gap-4">
                        {badges.map((badge) => {
                            const IconComponent = ICON_MAP[badge.icon] || Trophy;

                            return (
                                <Tooltip key={badge.id}>
                                    <TooltipTrigger asChild>
                                        <div
                                            className={cn(
                                                "flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 text-center transition-colors",
                                                badge.earned
                                                    ? "border-yellow-200 bg-yellow-50/50 dark:border-yellow-900/50 dark:bg-yellow-900/10"
                                                    : "border-muted bg-muted/50 grayscale opacity-70"
                                            )}
                                        >
                                            <div className={cn(
                                                "rounded-full p-2 ring-1",
                                                badge.earned ? "bg-yellow-100 ring-yellow-300 dark:bg-yellow-900 dark:ring-yellow-700" : "bg-gray-200 ring-gray-300 dark:bg-gray-800 dark:ring-gray-700"
                                            )}>
                                                {badge.earned ? (
                                                    <IconComponent className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                                                ) : (
                                                    <Lock className="h-6 w-6 text-gray-500" />
                                                )}
                                            </div>
                                            <span className="text-xs font-medium leading-tight">
                                                {badge.name}
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-semibold">{badge.name}</p>
                                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                                        {badge.earned && badge.earnedDate && (
                                            <p className="mt-1 text-xs text-green-600">Obtenu le {badge.earnedDate}</p>
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}
