import { SessionFeedback } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, HelpCircle, Activity, BarChart3, TrendingUp } from "lucide-react";

interface SessionFeedbackViewProps {
    feedback: SessionFeedback;
}

export function SessionFeedbackView({ feedback }: SessionFeedbackViewProps) {
    const { student_facing, skill_indicators, internal_scores, language, kpis } = feedback;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header / Meta */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 uppercase">
                        {language}
                    </Badge>
                    <span className="text-xs text-muted-foreground italic">Langue de la session</span>
                </div>
            </div>

            {/* Strengths & Areas to Improve */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-none bg-linear-to-br from-green-50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/10 shadow-sm border border-green-100/50 dark:border-green-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-green-700 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Points Forts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {student_facing.strengths.map((strength, i) => (
                                <li key={i} className="text-sm flex items-start gap-2 text-green-900/80 dark:text-green-300/80">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                    {strength}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-none bg-linear-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10 shadow-sm border border-amber-100/50 dark:border-amber-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-amber-700 dark:text-amber-400">
                            <AlertCircle className="h-4 w-4" />
                            Axes de Progression
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {student_facing.areas_to_improve.map((area, i) => (
                                <li key={i} className="text-sm flex items-start gap-2 text-amber-900/80 dark:text-amber-300/80">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                                    {area}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Reflective Question */}
            <Card className="border-none bg-linear-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 shadow-sm border border-blue-100/50 dark:border-blue-900/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        <HelpCircle className="h-4 w-4" />
                        Question Réflexive
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm italic leading-relaxed text-blue-800 dark:text-blue-300">
                        "{student_facing.reflective_question}"
                    </p>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Skill Indicators */}
                <Card className="shadow-sm border-muted/40">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            Indicateurs de Compétences
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(skill_indicators).map(([key, value]) => (
                                <Badge
                                    key={key}
                                    variant={value ? "default" : "secondary"}
                                    className={`capitalize text-[10px] sm:text-xs px-2 py-0.5 transition-all duration-300 ${value
                                        ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                                        : "opacity-40 grayscale"
                                        }`}
                                >
                                    {key.replace(/_/g, ' ')}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Internal Scores */}
                <Card className="shadow-sm border-muted/40">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            Évaluation Technique
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(internal_scores).map(([key, score]) => (
                                <div key={key} className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] sm:text-xs">
                                        <span className="capitalize font-medium text-muted-foreground">{key.replace(/_/g, ' ')}</span>
                                        <span className="font-bold">{score}/100</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out-expo ${score >= 80 ? "bg-emerald-500" :
                                                score >= 60 ? "bg-amber-500" : "bg-rose-500"
                                                }`}
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* KPIs if any */}
            {kpis && Object.keys(kpis).length > 0 && (
                <Card className="shadow-sm border-muted/40 overflow-hidden">
                    <CardHeader className="pb-2 bg-muted/30">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Indicateurs de Performance (KPIs)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {Object.entries(kpis).map(([key, value]) => (
                                <div key={key} className="text-center p-2 rounded-lg bg-secondary/20">
                                    <dt className="text-[10px] text-muted-foreground uppercase">{key.replace(/_/g, ' ')}</dt>
                                    <dd className="text-lg font-bold">{typeof value === 'number' ? value.toFixed(1) : String(value)}</dd>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
