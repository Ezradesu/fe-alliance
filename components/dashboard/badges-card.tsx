import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge as BadgeType } from "@/types/dashboard";
import { Trophy, Award, Star, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgesCardProps {
    badges: BadgeType[];
}

const TROPHY_ICONS = [Trophy, Award, Star, Medal];

export function BadgesCard({ badges }: BadgesCardProps) {
    // Show only earned badges, or all with earned ones highlighted
    const displayBadges = badges;

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Vos Trophées
                </CardTitle>
            </CardHeader>
            <CardContent>
                {displayBadges.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        Aucun trophée disponible
                    </p>
                ) : (
                    <div className="space-y-3">
                        {displayBadges.map((badge, idx) => {
                            const IconComponent = TROPHY_ICONS[idx % TROPHY_ICONS.length];

                            return (
                                <div
                                    key={badge.id}
                                    className={cn(
                                        "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                                        badge.earned
                                            ? "bg-card border-border"
                                            : "bg-muted/30 border-border opacity-50"
                                    )}
                                >
                                    {/* Trophy Icon */}
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                        badge.earned
                                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                                            : "bg-muted"
                                    )}>
                                        <IconComponent
                                            className={cn(
                                                "h-5 w-5",
                                                badge.earned
                                                    ? "text-yellow-600 dark:text-yellow-500"
                                                    : "text-muted-foreground"
                                            )}
                                        />
                                    </div>

                                    {/* Trophy Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className={cn(
                                            "text-sm font-medium leading-tight",
                                            !badge.earned && "text-muted-foreground"
                                        )}>
                                            {badge.name}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {badge.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
