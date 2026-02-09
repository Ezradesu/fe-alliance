import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ExternalLink, Calendar } from "lucide-react";
import { SessionHistory } from "@/types/dashboard";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SessionHistoryListProps {
    sessions: SessionHistory[];
}

export function SessionHistoryList({ sessions }: SessionHistoryListProps) {
    const getGenderLabel = (gender?: string) => {
        if (!gender) return "?";
        return gender === "male" ? "Homme" : "Femme";
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
            case "terminé":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">Terminé</Badge>;
            case "in_progress":
            case "en cours":
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">En cours</Badge>;
            case "locked":
                return <Badge variant="outline" className="text-muted-foreground">Verrouillé</Badge>;
            case "available":
                return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Disponible</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Historique des Sessions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sessions.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                            Aucune session pour le moment.
                        </p>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session.id}
                                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Session {session.session_number}</span>
                                        {getStatusBadge(session.status)}
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        {session.patient_age && (
                                            <span>Patient: {session.patient_age} ans ({getGenderLabel(session.patient_gender)})</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {session.status === "completed" && (
                                        <Link href={`/student/session/${session.id}/feedback`}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                Feedback
                                                <ExternalLink className="h-3 w-3" />
                                            </Button>
                                        </Link>
                                    )}
                                    {/* If we want to allow resuming in-progress sessions, we could add a link here too */}
                                    {(session.status === "in_progress" || session.status === "available") && (
                                        <Link href={`/student/session/${session.id}`}>
                                            <Button variant="ghost" size="sm">
                                                {session.status === "available" ? "Commencer" : "Reprendre"} <ChevronRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
