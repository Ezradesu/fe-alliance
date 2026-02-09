import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsSummaryResponse } from "@/types/admin";
import { TrendingUp, Users, Activity, Brain } from "lucide-react";

interface OverallAnalyticsProps {
    stats: { students: number; sessions_completed: number } | null;
    analytics: AnalyticsSummaryResponse | null;
}

export function OverallAnalytics({ stats, analytics }: OverallAnalyticsProps) {
    if (!analytics) return null;

    return (
        <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Étudiants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.students ?? "--"}</div>
                        <p className="text-xs text-muted-foreground">Inscrits sur la plateforme</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sessions Complétées</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.sessions_completed ?? "--"}</div>
                        <p className="text-xs text-muted-foreground">Total toutes promos confondues</p>
                    </CardContent>
                </Card>
                {/* Placeholder for more metrics if needed */}
            </div>

            {/* Overall Averages */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Moyenne Empathie</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {analytics.overall_avg.empathy.toFixed(2)}
                        </div>
                        <div className="mt-1 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${(analytics.overall_avg.empathy / 100) * 100}%` }} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Moyenne Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {analytics.overall_avg.structure.toFixed(2)}
                        </div>
                        <div className="mt-1 h-1 w-full bg-green-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: `${(analytics.overall_avg.structure / 100) * 100}%` }} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Moyenne Alliance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {analytics.overall_avg.alliance.toFixed(2)}
                        </div>
                        <div className="mt-1 h-1 w-full bg-purple-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600" style={{ width: `${(analytics.overall_avg.alliance / 100) * 100}%` }} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Statistical Insights Section */}
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Insights Statistiques
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Insights statistiques non disponibles
                    </p>
                </CardContent>
            </Card>

            {/* Detailed Analytics Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* By Level */}
                <Card>
                    <CardHeader>
                        <CardTitle>Moyennes par Niveau</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(analytics.by_level_avg).map(([level, scores]) => (
                            <div key={level} className="flex flex-col space-y-2 p-3 bg-secondary/20 rounded-lg">
                                <div className="font-semibold capitalize">Niveau {level}</div>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div className="flex flex-col">
                                        <span className="text-muted-foreground">Emphatie</span>
                                        <span className="font-medium">{scores.empathy.toFixed(1)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-muted-foreground">Structure</span>
                                        <span className="font-medium">{scores.structure.toFixed(1)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-muted-foreground">Alliance</span>
                                        <span className="font-medium">{scores.alliance.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {Object.keys(analytics.by_level_avg).length === 0 && (
                            <div className="text-sm text-muted-foreground">Aucune donnée par niveau</div>
                        )}
                    </CardContent>
                </Card>

                {/* By Session */}
                <Card>
                    <CardHeader>
                        <CardTitle>Moyennes par Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {Object.entries(analytics.by_session_number_avg)
                                .sort((a, b) => Number(a[0]) - Number(b[0]))
                                .map(([sessionNum, scores]) => (
                                    <div key={sessionNum} className="flex flex-col space-y-2 p-3 border rounded-lg">
                                        <div className="font-medium text-sm">Session {sessionNum}</div>
                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Emp:</span>
                                                <span className="font-medium">{scores.empathy.toFixed(1)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Str:</span>
                                                <span className="font-medium">{scores.structure.toFixed(1)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">All:</span>
                                                <span className="font-medium">{scores.alliance.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
