import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Student } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface StudentDetailSheetProps {
    student: Student | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExportPdf: (userId: string) => void;
}

export function StudentDetailSheet({ student, open, onOpenChange, onExportPdf }: StudentDetailSheetProps) {
    if (!student) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <SheetTitle>{student.email}</SheetTitle>
                            <SheetDescription>
                                Détails de l'étudiant et historique des sessions.
                            </SheetDescription>
                        </div>
                        <Button
                            onClick={() => onExportPdf(student.user_id)}
                            size="sm"
                            variant="outline"
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Student Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground block">Niveau</span>
                            <span className="font-medium capitalize">{student.level}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block">Langue préférée</span>
                            <span className="font-medium uppercase">{student.preferred_language}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block">Inscrit le</span>
                            <span className="font-medium">{new Date(student.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Progress Graph - Not Available */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Progression (Score Moyen)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] w-full rounded flex items-center justify-center text-muted-foreground text-sm">
                                Graphique de progression non disponible
                            </div>
                        </CardContent>
                    </Card>

                    {/* Session History - Not Available */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Historique des Sessions</h3>
                        <div className="p-6 border rounded-lg text-center text-muted-foreground text-sm">
                            Aucun historique de session disponible
                        </div>
                    </div>

                    {/* Chat Transcripts - Not Available */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Transcriptions de Chat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Transcriptions non disponibles
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </SheetContent>
        </Sheet>
    );
}
