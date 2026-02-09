"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { AdminStatsResponse, AnalyticsSummaryResponse } from "@/types/admin";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<AdminStatsResponse | null>(null);
    const [analytics, setAnalytics] = useState<AnalyticsSummaryResponse | null>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/admin/login");
            return;
        }

        const fetchData = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                const headers = { "Authorization": `Bearer ${token}` };

                const [statsRes, analyticsRes] = await Promise.all([
                    fetch(`${baseUrl}/admin/stats`, { headers }),
                    fetch(`${baseUrl}/admin/analytics/summary`, { headers })
                ]);

                if (statsRes.ok) {
                    setStats(await statsRes.json());
                }
                if (analyticsRes.ok) {
                    setAnalytics(await analyticsRes.json());
                }
            } catch (error) {
                console.error("Failed to fetch admin dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Chargement...</div>;
    }

    const handleLogout = () => {
        removeToken();
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-background pb-10">
            <header className="border-b bg-card">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
                </div>
            </header>
            <main className="container mx-auto p-6 space-y-8">
                {/* Key Stats */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="p-6 bg-card rounded-lg border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Étudiants</h3>
                        <div className="mt-2 text-2xl font-bold">{stats?.students ?? "--"}</div>
                    </div>
                    <div className="p-6 bg-card rounded-lg border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Sessions Complétées</h3>
                        <div className="mt-2 text-2xl font-bold">{stats?.sessions_completed ?? "--"}</div>
                    </div>
                </div>

                {/* Overall Averages */}
                {analytics && (
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="p-6 bg-card rounded-lg border shadow-sm">
                            <h3 className="text-sm font-medium text-muted-foreground">Moyenne Empathie</h3>
                            <div className="mt-2 text-2xl font-bold text-blue-600">
                                {analytics.overall_avg.empathy.toFixed(2)}
                            </div>
                        </div>
                        <div className="p-6 bg-card rounded-lg border shadow-sm">
                            <h3 className="text-sm font-medium text-muted-foreground">Moyenne Structure</h3>
                            <div className="mt-2 text-2xl font-bold text-green-600">
                                {analytics.overall_avg.structure.toFixed(2)}
                            </div>
                        </div>
                        <div className="p-6 bg-card rounded-lg border shadow-sm">
                            <h3 className="text-sm font-medium text-muted-foreground">Moyenne Alliance</h3>
                            <div className="mt-2 text-2xl font-bold text-purple-600">
                                {analytics.overall_avg.alliance.toFixed(2)}
                            </div>
                        </div>
                    </div>
                )}

                {/* Detailed Analytics */}
                {analytics && (
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* By Level */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Moyennes par Niveau</h2>
                            <div className="grid gap-4">
                                {Object.entries(analytics.by_level_avg).map(([level, scores]) => (
                                    <div key={level} className="p-4 bg-card rounded-lg border shadow-sm">
                                        <div className="font-medium mb-2 capitalize">Niveau {level}</div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Empathie:</span>{" "}
                                                <span className="font-semibold">{scores.empathy.toFixed(1)}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Structure:</span>{" "}
                                                <span className="font-semibold">{scores.structure.toFixed(1)}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Alliance:</span>{" "}
                                                <span className="font-semibold">{scores.alliance.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {Object.keys(analytics.by_level_avg).length === 0 && (
                                    <div className="text-muted-foreground italic">Aucune donnée par niveau</div>
                                )}
                            </div>
                        </div>

                        {/* By Session */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Moyennes par Session</h2>
                            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2">
                                {Object.entries(analytics.by_session_number_avg)
                                    .sort((a, b) => Number(a[0]) - Number(b[0]))
                                    .map(([sessionNum, scores]) => (
                                        <div key={sessionNum} className="p-4 bg-card rounded-lg border shadow-sm">
                                            <div className="font-medium mb-2">Session {sessionNum}</div>
                                            <div className="grid grid-cols-3 gap-2 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground">Empathie:</span>{" "}
                                                    <span className="font-semibold">{scores.empathy.toFixed(1)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Structure:</span>{" "}
                                                    <span className="font-semibold">{scores.structure.toFixed(1)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Alliance:</span>{" "}
                                                    <span className="font-semibold">{scores.alliance.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
