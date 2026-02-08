import { User, Clock, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PatientHeaderProps {
    sessionNumber: number;
    patientAge: number;
    patientGenderLabel: string;
}

export function PatientHeader({ sessionNumber, patientAge, patientGenderLabel }: PatientHeaderProps) {
    return (
        <Card className="flex items-center justify-between p-4 mb-4 bg-muted/50 border-none shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                    <Clock className="w-5 h-5" />
                    <span>Session {sessionNumber}</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-5 h-5" />
                    <span>{patientGenderLabel} • {patientAge} ans</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background px-3 py-1 rounded-full border">
                <Info className="w-4 h-4" />
                <span>Mode Anamnèse</span>
            </div>
        </Card>
    );
}
