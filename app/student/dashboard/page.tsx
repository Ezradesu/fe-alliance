"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { BadgesCard } from "@/components/dashboard/badges-card";
import { SessionGridCard } from "@/components/dashboard/session-grid-card";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { DashboardData, Badge } from "@/types/dashboard";
import { getToken, removeToken, getUser } from "@/lib/auth";

export default function DashboardPage() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);
                setError(null);

                const token = getToken();
                if (!token) {
                    router.push("/student/login");
                    return;
                }

                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                if (!baseUrl) {
                    throw new Error("API Base URL is not defined");
                }

                const res = await fetch(`${baseUrl}/student/dashboard`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        removeToken();
                        router.push("/student/login");
                        return;
                    }
                    throw new Error(`Erreur lors de la récupération des données (${res.status}): ${res.statusText}`);
                }

                const apiData = await res.json();
                console.log("Full API Response:", apiData);

                const user = getUser();

                const BADGE_METADATA: Record<string, Omit<Badge, "id" | "earned" | "earnedDate">> = {
                    "SESSION_1": { name: "Première Consultation", icon: "Ear", description: "A terminé la première session" },
                    "SESSION_5": { name: "Mi-Parcours", icon: "Repeat", description: "A terminé 5 sessions" },
                    "SESSION_10": { name: "Expert Anamnèse", icon: "Trophy", description: "A terminé 10 sessions" },
                    "SESSION_16": { name: "Maître Praticien", icon: "Heart", description: "A terminé toutes les sessions" },
                };

                const earnedBadgeIds = (apiData.badges || []) as string[];
                const allBadges: Badge[] = Object.entries(BADGE_METADATA).map(([id, meta]) => ({
                    id,
                    ...meta,
                    earned: earnedBadgeIds.includes(id),
                    earnedDate: earnedBadgeIds.includes(id) ? new Date().toLocaleDateString('fr-FR') : undefined,
                }));

                const totalSessions = 16;
                const completedSessions = apiData.completed || 0;

                const transformedData: DashboardData = {
                    student: {
                        name: user?.email?.split('@')[0] || "Étudiant",
                        academicYear: (user?.level === "4e" ? "4th" : "5th") as "4th" | "5th",
                    },
                    progress: {
                        completedSessions: completedSessions,
                        totalSessions: totalSessions,
                        weeklySessionsUsed: 0,
                        weeklySessionsLimit: 2,
                    },
                    currentSession: {
                        available: apiData.available_session_number !== null,
                        sessionNumber: apiData.available_session_number || (completedSessions < totalSessions ? completedSessions + 1 : null),
                        reason: apiData.available_session_number ? null : (completedSessions >= totalSessions ? "all_completed" : "weekly_limit"),
                    },
                    badges: allBadges,
                    history: (apiData.sessions || []).map((s: any) => ({
                        id: s.id,
                        session_number: s.session_number,
                        status: s.status,
                        patient_age: s.patient_age,
                        patient_gender: s.patient_gender,
                    })).sort((a: any, b: any) => b.session_number - a.session_number)
                };

                setData(transformedData);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue");
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const [startingSession, setStartingSession] = useState(false);

    const handleStartSession = async () => {
        if (startingSession) return;
        setStartingSession(true);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            const res = await fetch(`${baseUrl}/student/sessions/current-id`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Impossible de récupérer l'ID de session");

            const rawResponse = await res.json();
            console.log("Start Session Raw Response:", rawResponse);

            let sessionId: string | null = null;

            if (typeof rawResponse === "string") {
                sessionId = rawResponse;
            } else if (typeof rawResponse === "object" && rawResponse !== null) {
                sessionId = rawResponse.session_id || rawResponse.id || rawResponse.sessionId || null;
            }

            if (sessionId) {
                console.log("Redirecting to session:", sessionId);
                router.push(`/student/session/${sessionId}`);
            } else {
                console.error("Invalid session ID format:", rawResponse);
                throw new Error("Format d'ID de session invalide");
            }
        } catch (err) {
            console.error("Start session error:", err);
            alert("Erreur lors du démarrage de la session. Veuillez réessayer.");
            setStartingSession(false);
        }
    };

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center p-6 text-center">
                <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/10 dark:text-red-400">
                    <h3 className="mb-2 font-semibold">Erreur de chargement du tableau de bord</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-6 space-y-6">
                <DashboardHeader
                    student={data.student}
                    completedSessions={data.progress.completedSessions}
                    totalSessions={data.progress.totalSessions}
                />

                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="space-y-6 lg:col-span-4">
                        <ProgressCard progress={data.progress} />
                        <BadgesCard badges={data.badges} />
                    </div>

                    <div className="lg:col-span-8">
                        <SessionGridCard
                            completedSessions={data.progress.completedSessions}
                            currentSession={data.currentSession}
                            totalSessions={data.progress.totalSessions}
                            onStartSession={handleStartSession}
                            onViewFeedback={(sessionNum) => {
                                const session = data.history?.find(s => s.session_number === sessionNum);
                                if (session) {
                                    router.push(`/student/session/${session.id}/feedback`);
                                }
                            }}
                            isStarting={startingSession}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
