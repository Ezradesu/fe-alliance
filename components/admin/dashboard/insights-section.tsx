import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, GraduationCap } from "lucide-react";

export function InsightsSection({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Insights Pédagogiques IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
                {/* Insight 1 */}
                <div className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                        <Activity className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Analyse de Performance</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            La promotion <span className="font-medium text-gray-900">5ème année</span> montre une performance supérieure de <span className="font-medium text-green-600">+17.7%</span> par rapport aux 4ème année.
                        </p>
                    </div>
                </div>

                {/* Insight 2 */}
                <div className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                        <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Tendances Clés</h4>
                        <ul className="list-disc pl-4 text-sm text-gray-500 leading-relaxed space-y-1 mt-1">
                            <li>L'empathie s'améliore significativement après la <span className="font-medium text-gray-900">session 6</span> pour les deux groupes.</li>
                            <li>Les étudiants de 5ème année stabilisent leur score d'alliance thérapeutique plus rapidement (dès la session 4).</li>
                        </ul>
                    </div>
                </div>

                {/* Insight 3 */}
                <div className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Recommandation</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Renforcer les ateliers sur la structure de l'anamnèse pour le groupe 4A afin de réduire l'écart-type (0.45 vs 0.49).
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
