"use client";

import { useEffect, useState } from "react";
import { Student, StudentSession, SessionFeedback } from "@/types/admin";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SessionFeedbackView } from "./session-feedback-view";
import { Eye, Loader2, Calendar, User, MessageSquare, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SessionsListProps {
    sessionNumber: number;
    students: Student[];
}

export function SessionsList({ sessionNumber, students }: SessionsListProps) {
    const [allSessions, setAllSessions] = useState<(StudentSession & { studentEmail: string; userId: string })[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedFeedback, setSelectedFeedback] = useState<SessionFeedback | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (students.length > 0) {
            fetchAllStudentsSessions();
        }
    }, [sessionNumber, students]);

    const fetchAllStudentsSessions = async () => {
        setLoading(true);
        setProgress(0);
        setError(null);
        setAllSessions([]);

        const token = getToken();
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const aggregatedSessions: (StudentSession & { studentEmail: string; userId: string })[] = [];

        try {
            // We'll fetch in smaller batches or sequentially to avoid hitting rate limits 
            // and to show progress. For simplicity and responsiveness, let's do it in chunks.
            const total = students.length;

            for (let i = 0; i < total; i++) {
                const student = students[i];
                try {
                    // Fetch feedbacks for this student as /admin/sessions is 404
                    const response = await fetch(`${baseUrl}/admin/students/${student.user_id}/feedback`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });

                    if (response.ok) {
                        const feedbackList = await response.json();
                        const list: any[] = Array.isArray(feedbackList) ? feedbackList : [];

                        // Map and filter for the specific session number
                        const matches = list
                            .filter(f => f.session_number === sessionNumber)
                            .map(f => ({
                                id: f.session_id || f.id,
                                session_number: f.session_number,
                                status: "completed",
                                score_avg: f.internal_scores?.overall || 0,
                                created_at: f.created_at || new Date().toISOString(),
                                topic: f.topic || "Session",
                                studentEmail: student.email,
                                userId: student.user_id
                            }));

                        aggregatedSessions.push(...matches);
                    }
                } catch (err) {
                    console.error(`Failed to fetch sessions for student ${student.email}:`, err);
                }

                // Update progress percentage
                setProgress(Math.round(((i + 1) / total) * 100));
            }

            setAllSessions(aggregatedSessions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        } catch (err) {
            console.error("General error during session aggregation:", err);
            setError("Une erreur est survenue lors de la récupération des données.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewFeedback = async (sessionId: string, userId: string) => {
        setIsDialogOpen(true);
        setLoadingFeedback(true);
        setSelectedFeedback(null);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            // New endpoint: fetch student feedbacks (plural as documented)
            const response = await fetch(`${baseUrl}/admin/students/${userId}/feedback`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                const feedbackList = Array.isArray(data) ? data : [];
                // Find matching feedback by session ID
                const match = feedbackList.find((f: any) => f.session_id === sessionId);
                setSelectedFeedback(match || null);
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoadingFeedback(false);
        }
    };

    return (
        <div className="space-y-4">
            {loading && (
                <div className="space-y-3 p-6 bg-muted/30 rounded-xl border border-dashed animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between text-xs font-medium">
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Synchronisation des données ({progress}%)
                        </span>
                        <span className="text-muted-foreground">{allSessions.length} sessions trouvées</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground text-center italic">
                        Récupération des instances de la Session #{sessionNumber} à travers tous les étudiants...
                    </p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-3 text-rose-600 text-sm">
                    <AlertCircle className="h-5 w-5" />
                    <p>{error}</p>
                    <Button variant="ghost" size="sm" onClick={fetchAllStudentsSessions} className="ml-auto text-rose-600 hover:bg-rose-100">
                        Réessayer
                    </Button>
                </div>
            )}

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[200px]">Étudiant</TableHead>
                            <TableHead>Sujet</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!loading && allSessions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <MessageSquare className="h-8 w-8 opacity-10" />
                                        <span>Aucune instance de la Session #{sessionNumber} trouvée.</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allSessions.map((session) => (
                                <TableRow key={session.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell className="text-xs font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary">
                                                <User className="h-3 w-3" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="truncate max-w-[140px]">{session.studentEmail}</span>
                                                <span className="text-[9px] text-muted-foreground uppercase">{session.id.slice(0, 8)}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {session.topic || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${session.score_avg >= 80 ? "bg-emerald-100 text-emerald-700" :
                                            session.score_avg >= 60 ? "bg-amber-100 text-amber-700" :
                                                "bg-rose-100 text-rose-700"
                                            }`}>
                                            {session.score_avg}%
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(session.created_at).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleViewFeedback(session.id, session.userId)}
                                            className="hover:text-primary hover:bg-primary/5 h-8 px-3"
                                        >
                                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                                            Feedback
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {loading && allSessions.length > 0 && (
                            <TableRow className="bg-muted/5 opacity-50">
                                <TableCell colSpan={5} className="text-center py-2 text-[10px] italic text-muted-foreground">
                                    Chargement de plus de résultats...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Analyse IA - Session #{sessionNumber}</DialogTitle>
                        <DialogDescription>
                            Détails de l'évaluation générée automatiquement pour cette instance.
                        </DialogDescription>
                    </DialogHeader>
                    {loadingFeedback ? (
                        <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-muted-foreground">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p>Analyse des données en cours...</p>
                        </div>
                    ) : selectedFeedback ? (
                        <SessionFeedbackView feedback={selectedFeedback} />
                    ) : (
                        <div className="h-[400px] flex items-center justify-center text-muted-foreground italic border rounded-lg border-dashed">
                            Impossible de charger le feedback.
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
