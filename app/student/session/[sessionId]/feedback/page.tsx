"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { QuestionnaireForm } from "@/components/session/questionnaire-form";

interface FeedbackData {
    language: string;
    student_facing: {
        strengths: string[];
        areas_to_improve: string[];
        reflective_question: string;
    };
    internal_scores: {
        [key: string]: number;
    };
}

export default function FeedbackPage() {
    const router = useRouter();
    const params = useParams();
    const rawSessionId = params?.sessionId;
    const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;

    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchFeedback = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

            const res = await fetch(`${baseUrl}/student/sessions/${sessionId}/generate-feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                if (res.status === 503) {
                    throw new Error("Service indisponible (503). L'IA est peut-être surchargée. Veuillez réessayer plus tard.");
                }
                throw new Error(`Impossible de récupérer le feedback (${res.status}).`);
            }

            const data: FeedbackData = await res.json();
            setFeedback(data);
        } catch (err) {
            console.error("Feedback error:", err);
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionId) return;
        fetchFeedback();
    }, [sessionId]);

    if (!sessionId) return null;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyse de votre session et génération du feedback...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center">
                <div className="bg-red-50 text-red-600 p-6 rounded-lg max-w-md border border-red-100">
                    <Loader2 className="w-10 h-10 mx-auto mb-4 text-red-500" />
                    <h3 className="text-lg font-semibold mb-2">Erreur de génération</h3>
                    <p>{error}</p>
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => router.push("/student/dashboard")} variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
                    </Button>
                    <Button onClick={fetchFeedback}>
                        Réessayer
                    </Button>
                </div>
            </div>
        );
    }

    const getScore = () => {
        if (!feedback?.internal_scores) return 0;
        return feedback.internal_scores.overall ||
            Object.values(feedback.internal_scores).reduce((a, b) => a + b, 0) / Object.values(feedback.internal_scores).length ||
            0;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <Button variant="ghost" className="mb-4" onClick={() => router.push("/student/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au Dashboard
                </Button>

                <div className="text-center space-y-2 mb-8">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
                        <Award className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold">Bilan de la Session</h1>
                    <p className="text-muted-foreground">Voici l'analyse de votre performance lors de cette anamnèse.</p>
                </div>

                {feedback && (
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Score Global</CardTitle>
                                <CardDescription>Votre performance évaluée sur 100</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-bold text-primary">{Math.round(getScore())}</span>
                                    <span className="text-xl text-muted-foreground mb-1">/ 100</span>
                                </div>
                                <Progress value={getScore()} className="h-3" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Question de Réflexion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose dark:prose-invert">
                                    <p>{feedback.student_facing.reflective_question}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-l-4 border-l-green-500">
                                <CardHeader>
                                    <CardTitle className="text-green-700">Points Forts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1">
                                        {feedback.student_facing.strengths?.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        )) || <p className="text-muted-foreground italic">Aucun point fort spécifique détecté.</p>}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-orange-500">
                                <CardHeader>
                                    <CardTitle className="text-orange-700">Axes d'Amélioration</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1">
                                        {feedback.student_facing.areas_to_improve?.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        )) || <p className="text-muted-foreground italic">Aucun axe d'amélioration spécifique détecté.</p>}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="pt-8 border-t">
                            <QuestionnaireForm sessionId={sessionId as string} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
