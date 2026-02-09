"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { getToken } from "@/lib/auth";

interface QuestionnaireFormProps {
    sessionId: string;
}

export function QuestionnaireForm({ sessionId }: QuestionnaireFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [q1, setQ1] = useState<"yes" | "no" | null>(null);
    const [q2, setQ2] = useState<"yes" | "no" | null>(null);
    const [openAnswer, setOpenAnswer] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!q1 || !q2) {
            setError("Veuillez répondre à toutes les questions obligatoires.");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

            const res = await fetch(`${baseUrl}/student/sessions/${sessionId}/questionnaire`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    q1: q1 === "yes", // Convert to boolean
                    q2: q2 === "yes", // Convert to boolean
                    open_answer: openAnswer
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                console.error("Questionnaire submission failed:", res.status, errorData);
                throw new Error(errorData?.detail?.[0]?.msg || "Erreur lors de l'envoi du questionnaire.");
            }

            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Impossible d'envoyer vos réponses. Veuillez réessayer.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                <CardContent className="pt-6 flex flex-col items-center text-center p-8">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Merci !</h3>
                    <p className="text-green-700 dark:text-green-400">Vos réponses ont été enregistrées avec succès.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Questionnaire de fin de session</CardTitle>
                <CardDescription>Aidez-nous à améliorer l&apos;expérience d&apos;apprentissage.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">1. Avez-vous trouvé cette session utile ?</Label>
                        <RadioGroup onValueChange={(v) => setQ1(v as "yes" | "no")} className="flex gap-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="q1-yes" />
                                <Label htmlFor="q1-yes" className="font-normal cursor-pointer">Oui</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="q1-no" />
                                <Label htmlFor="q1-no" className="font-normal cursor-pointer">Non</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-semibold">2. Avez-vous rencontré des problèmes techniques ?</Label>
                        <RadioGroup onValueChange={(v) => setQ2(v as "yes" | "no")} className="flex gap-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="q2-yes" />
                                <Label htmlFor="q2-yes" className="font-normal cursor-pointer">Oui</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="q2-no" />
                                <Label htmlFor="q2-no" className="font-normal cursor-pointer">Non</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="open-answer" className="text-base font-semibold">Remarques supplémentaires (optionnel)</Label>
                        <Textarea
                            id="open-answer"
                            placeholder="Partagez vos impressions ou suggestions..."
                            value={openAnswer}
                            onChange={(e) => setOpenAnswer(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex justify-end">
                        <Button type="submit" disabled={submitting}>
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Envoyer mes réponses
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
