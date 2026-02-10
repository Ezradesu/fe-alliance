"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { AdminStatsResponse, AnalyticsSummaryResponse, AdminStudentsResponse, Student } from "@/types/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverallAnalytics } from "@/components/admin/overall-analytics";
import { StudentsList } from "@/components/admin/students-list";
import { SessionsList } from "@/components/admin/sessions-list";
import { Download } from "lucide-react";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<AdminStatsResponse | null>(null);
    const [analytics, setAnalytics] = useState<AnalyticsSummaryResponse | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedSessionNum, setSelectedSessionNum] = useState<string | null>(null);
    const [exportingSession, setExportingSession] = useState(false);
    const [exportingStudent, setExportingStudent] = useState(false);

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

                const [statsRes, analyticsRes, studentsRes] = await Promise.all([
                    fetch(`${baseUrl}/admin/stats`, { headers }),
                    fetch(`${baseUrl}/admin/analytics/summary`, { headers }),
                    fetch(`${baseUrl}/admin/students`, { headers })
                ]);

                if (statsRes.ok) {
                    setStats(await statsRes.json());
                }
                if (analyticsRes.ok) {
                    setAnalytics(await analyticsRes.json());
                }
                if (studentsRes.ok) {
                    const data: AdminStudentsResponse = await studentsRes.json();
                    setStudents(data.students);
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

    const handleExportSessionPdf = async (sessionId: string) => {
        setExportingSession(true);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            const response = await fetch(`${baseUrl}/admin/sessions/${sessionId}/pdf`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `session_${sessionId}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert("Échec de l'export du PDF de session");
            }
        } catch (error) {
            console.error("Error exporting session PDF:", error);
            alert("Erreur lors de l'export du PDF");
        } finally {
            setExportingSession(false);
        }
    };

    const handleExportStudentPdf = async (userId: string) => {
        setExportingStudent(true);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            const response = await fetch(`${baseUrl}/admin/students/${userId}/summary-pdf`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `student_summary_${userId}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert("Échec de l'export du PDF étudiant");
            }
        } catch (error) {
            console.error("Error exporting student PDF:", error);
            alert("Erreur lors de l'export du PDF");
        } finally {
            setExportingStudent(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-10">
            <header className="border-b bg-card">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">OsteoSim</h1>
                    <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
                </div>
            </header>
            <main className="container mx-auto p-6">
                <Tabs defaultValue="overall" className="space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="overall">Vue d'ensemble</TabsTrigger>
                        <TabsTrigger value="students">Étudiants</TabsTrigger>
                    </TabsList>


                    <TabsContent value="overall" className="space-y-6">
                        <OverallAnalytics stats={stats} analytics={analytics} />


                        {analytics && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Moyennes par Session</h2>
                                    {selectedSessionNum && (
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleExportSessionPdf(selectedSessionNum)}
                                                disabled={exportingSession}
                                                size="sm"
                                                variant="outline"
                                                className="gap-2"
                                            >
                                                <Download className="h-4 w-4" />
                                                {exportingSession ? "Export en cours..." : "Export PDF Session"}
                                            </Button>
                                            <Button
                                                onClick={() => setSelectedSessionNum(null)}
                                                size="sm"
                                                variant="ghost"
                                            >
                                                Tout masquer
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[500px] overflow-y-auto pr-2">
                                    {Object.entries(analytics.by_session_number_avg)
                                        .sort((a, b) => Number(a[0]) - Number(b[0]))
                                        .map(([sessionNum, scores]) => (
                                            <div
                                                key={sessionNum}
                                                onClick={() => setSelectedSessionNum(sessionNum)}
                                                className={`p-4 bg-card rounded-lg border shadow-sm cursor-pointer transition-all hover:shadow-md ${selectedSessionNum === sessionNum
                                                    ? "ring-2 ring-primary bg-primary/5"
                                                    : "hover:border-primary/50"
                                                    }`}
                                            >
                                                <div className="font-medium mb-2">Session {sessionNum}</div>
                                                <div className="grid grid-cols-3 gap-2 text-sm">
                                                    <div>
                                                        <span className="text-muted-foreground">Emp:</span>{" "}
                                                        <span className="font-semibold">{scores.empathy.toFixed(1)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Str:</span>{" "}
                                                        <span className="font-semibold">{scores.structure.toFixed(1)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">All:</span>{" "}
                                                        <span className="font-semibold">{scores.alliance.toFixed(1)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>


                                {selectedSessionNum && (
                                    <div className="mt-8 pt-8 border-t animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold">Détails de la Session {selectedSessionNum}</h3>
                                            <p className="text-sm text-muted-foreground">Visualisez les feedbacks individuels pour toutes les sessions {selectedSessionNum}.</p>
                                        </div>
                                        <SessionsList
                                            sessionNumber={Number(selectedSessionNum)}
                                            students={students}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </TabsContent>


                    <TabsContent value="students" className="space-y-6">
                        <StudentsList
                            students={students}
                            onExportStudentPdf={handleExportStudentPdf}
                        />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
