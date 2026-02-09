import { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Student, StudentSession, SessionFeedback } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, ChevronRight, Loader2, MessageSquare } from "lucide-react";
import { getToken } from "@/lib/auth";
import { SessionFeedbackView } from "./session-feedback-view";

interface StudentDetailSheetProps {
    student: Student | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExportPdf: (userId: string) => void;
}

export function StudentDetailSheet({ student, open, onOpenChange, onExportPdf }: StudentDetailSheetProps) {
    const [sessions, setSessions] = useState<StudentSession[]>([]);
    const [loadingSessions, setLoadingSessions] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<SessionFeedback | null>(null);
    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    useEffect(() => {
        if (open && student) {
            fetchSessions();
        } else {
            setSessions([]);
            setSelectedFeedback(null);
            setSelectedSessionId(null);
        }
    }, [open, student]);

    const fetchSessions = async () => {
        if (!student) return;
        setLoadingSessions(true);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            // Using query param as it's a common pattern for listing resources by owner
            const response = await fetch(`${baseUrl}/admin/sessions?user_id=${student.user_id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                // Handle different possible response structures
                const sessionsList = Array.isArray(data) ? data : (data.sessions || []);
                setSessions(sessionsList.sort((a: any, b: any) => b.session_number - a.session_number));
            }
        } catch (error) {
            console.error("Error fetching student sessions:", error);
        } finally {
            setLoadingSessions(false);
        }
    };

    const handleViewFeedback = async (sessionId: string) => {
        setSelectedSessionId(sessionId);
        setLoadingFeedback(true);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            const response = await fetch(`${baseUrl}/admin/sessions/${sessionId}/feedback`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedFeedback(data);
            } else {
                alert("Impossible de récupérer le feedback de cette session");
            }
        } catch (error) {
            console.error("Error fetching session feedback:", error);
            alert("Erreur saat mengambil feedback");
        } finally {
            setLoadingFeedback(false);
        }
    };

    if (!student) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] p-4 sm:w-[640px] overflow-y-auto">
                <SheetHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <SheetTitle>{student.email}</SheetTitle>
                            <SheetDescription>
                                Détails de l'étudiant et historique des sessions.
                            </SheetDescription>
                        </div>
                        <Button
                            onClick={() => onExportPdf(student.user_id)}
                            size="sm"
                            variant="outline"
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Student Info */}
                    <div className="grid grid-cols-2 gap-4 p-4 text-sm">
                        <div>
                            <span className="text-muted-foreground block text-xs">Niveau</span>
                            <span className="font-medium capitalize">{student.level}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-xs">Langue préférée</span>
                            <span className="font-medium uppercase">{student.preferred_language}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-xs">Inscrit le</span>
                            <span className="font-medium">{new Date(student.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Session History */}
                    <div>
                        <div className="flex items-center justify-between mb-3 p-4">
                            <h3 className="text-sm font-semibold">Historique des Sessions</h3>
                            {loadingSessions && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                        </div>

                        {sessions.length > 0 ? (
                            <ScrollArea className="h-[250px] border rounded-lg p-1">
                                <div className="space-y-1">
                                    {sessions.map((session) => (
                                        <button
                                            key={session.id}
                                            onClick={() => handleViewFeedback(session.id)}
                                            className={`w-full flex items-center justify-between p-3 rounded-md transition-colors text-left ${selectedSessionId === session.id
                                                ? "bg-primary/10 border-primary/20"
                                                : "hover:bg-secondary/50"
                                                }`}
                                        >
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">Session #{session.session_number}</span>
                                                    {session.topic && <span className="text-xs text-muted-foreground">• {session.topic}</span>}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(session.created_at).toLocaleDateString()} • Score: {session.score_avg}%
                                                </div>
                                            </div>
                                            <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${selectedSessionId === session.id ? "rotate-90" : ""}`} />
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : !loadingSessions && (
                            <div className="p-8 border rounded-lg text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                                <MessageSquare className="h-8 w-8 opacity-20" />
                                <span>Aucun historique de session disponible</span>
                            </div>
                        )}
                    </div>

                    {/* Feedback Details */}
                    {selectedSessionId && (
                        <div className="space-y-4 pt-4 border-t">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Détails du Feedback</h3>
                                {loadingFeedback && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                            </div>

                            {selectedFeedback ? (
                                <SessionFeedbackView feedback={selectedFeedback} />
                            ) : loadingFeedback ? (
                                <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                                    Chargement du feedback...
                                </div>
                            ) : (
                                <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm border rounded-lg border-dashed">
                                    Feedback non disponible pour cette session
                                </div>
                            )}
                        </div>
                    )}

                    {/* Progress Graph Placeholder - Still shown but minimized */}
                    {!selectedSessionId && (
                        <Card className="opacity-50 grayscale scale-[0.98]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold">Graphique de Progression</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[100px] w-full rounded flex items-center justify-center text-muted-foreground text-xs italic">
                                    Indicateur de progression non disponible
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
