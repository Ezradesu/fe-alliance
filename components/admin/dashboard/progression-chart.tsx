"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface ProgressionChartProps {
    // In a real scenario, you'd pass the full progression data here.
    // For now we'll mock it inside the component to match the visual requirement.
    className?: string;
}

export function ProgressionChart({ className }: ProgressionChartProps) {
    // Mock data matching the "OsteoSim" image trend
    // S1 to S16
    const data = [
        { name: "S1", "4e": 3.0, "5e": 3.4, "Autre": null },
        { name: "S2", "4e": 3.1, "5e": 3.6, "Autre": null },
        { name: "S3", "4e": 3.0, "5e": 3.6, "Autre": null },
        { name: "S4", "4e": 3.1, "5e": 3.8, "Autre": null },
        { name: "S5", "4e": 3.3, "5e": 3.7, "Autre": null },
        { name: "S6", "4e": 3.4, "5e": 3.9, "Autre": null },
        { name: "S7", "4e": 3.5, "5e": 3.8, "Autre": null },
        { name: "S8", "4e": 3.5, "5e": 4.1, "Autre": null },
        { name: "S9", "4e": 3.7, "5e": 4.1, "Autre": null },
        { name: "S10", "4e": 3.8, "5e": 4.4, "Autre": null },
        { name: "S11", "4e": 3.7, "5e": 4.2, "Autre": null },
        { name: "S12", "4e": 3.9, "5e": 4.5, "Autre": null },
        { name: "S13", "4e": 4.0, "5e": 4.5, "Autre": null },
        { name: "S14", "4e": 4.2, "5e": 4.6, "Autre": 4.7 }, // outlier/other
        { name: "S15", "4e": 4.3, "5e": 4.6, "Autre": 4.8 },
        { name: "S16", "4e": 4.3, "5e": 4.5, "Autre": 4.8 },
    ];

    return (
        <Card className={className}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Progression Moyenne par Session</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                stroke="#9CA3AF"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                interval={0} // Show all ticks (or adjust as needed)
                            />
                            <YAxis
                                domain={[1, 5]}
                                stroke="#9CA3AF"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                ticks={[1, 2, 3, 4, 5]}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />

                            <Line
                                type="monotone"
                                dataKey="4e"
                                name="4ème Année"
                                stroke="#F59E0B" // Orange
                                strokeWidth={2}
                                dot={{ r: 4, fill: "white", stroke: "#F59E0B", strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="5e"
                                name="5ème Année"
                                stroke="#14B8A6" // Teal
                                strokeWidth={2}
                                dot={{ r: 4, fill: "white", stroke: "#14B8A6", strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Autre"
                                name="Autre"
                                stroke="#8B5CF6" // Purple
                                strokeWidth={2}
                                dot={{ r: 4, fill: "white", stroke: "#8B5CF6", strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                                connectNulls
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
