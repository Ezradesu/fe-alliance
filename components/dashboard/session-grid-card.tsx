import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Lock, Play } from "lucide-react";

interface SessionGridCardProps {
    completedSessions: number;
    currentSession: {
        available: boolean;
        sessionNumber: number | null;
    };
    totalSessions: number;
    onStartSession: () => void;
    onViewFeedback?: (sessionNumber: number) => void;
    isStarting?: boolean;
}

export function SessionGridCard({
    completedSessions,
    currentSession,
    totalSessions,
    onStartSession,
    onViewFeedback,
    isStarting = false
}: SessionGridCardProps) {
    const getSessionStatus = (sessionNum: number): 'completed' | 'current' | 'locked' => {
        if (sessionNum <= completedSessions) return 'completed';
        if (currentSession.available && sessionNum === currentSession.sessionNumber) return 'current';
        return 'locked';
    };

    const renderSessionCard = (sessionNum: number) => {
        const status = getSessionStatus(sessionNum);

        return (
            <div
                key={sessionNum}
                className={`
                    relative p-4 rounded-lg border-2 transition-all
                    ${status === 'completed'
                        ? 'bg-card border-border hover:bg-secondary/50'
                        : status === 'current'
                            ? 'bg-primary/5 border-primary shadow-sm'
                            : 'bg-secondary/30 border-border'
                    }
                `}
            >
                {/* Session Number */}
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Session {sessionNum}
                </div>

                {/* Session Status Icon/Content */}
                <div className="flex items-center justify-center min-h-[60px]">
                    {status === 'completed' && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="h-5 w-5 text-white" />
                            </div>
                            {onViewFeedback && (
                                <button
                                    onClick={() => onViewFeedback(sessionNum)}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Voir Bilan
                                </button>
                            )}
                        </div>
                    )}

                    {status === 'current' && (
                        <div className="flex flex-col items-center gap-3 w-full">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <Play className="h-5 w-5 text-primary-foreground fill-current" />
                            </div>
                            {onViewFeedback && completedSessions > 0 && (
                                <button
                                    onClick={() => onViewFeedback(sessionNum - 1)}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Voir Bilan
                                </button>
                            )}
                            <Button
                                onClick={onStartSession}
                                disabled={isStarting}
                                className="w-full h-8 text-xs"
                            >
                                {isStarting ? 'Chargement...' : 'Démarrer'}
                            </Button>
                        </div>
                    )}

                    {status === 'locked' && (
                        <div className="flex items-center justify-center opacity-40">
                            <Lock className="h-6 w-6 text-muted-foreground" />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Parcours de Formation</h2>
                    <span className="text-sm text-muted-foreground">{totalSessions} Sessions Total</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: Math.min(9, totalSessions) }, (_, i) => i + 1).map(renderSessionCard)}
                </div>

                {totalSessions > 9 && (
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {Array.from({ length: Math.min(9, totalSessions - 9) }, (_, i) => i + 10).map(renderSessionCard)}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
