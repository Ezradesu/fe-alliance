import { Student } from "@/types/dashboard";
import { User } from "lucide-react";

interface DashboardHeaderProps {
    student: Student;
    completedSessions?: number;
    totalSessions?: number;
}

export function DashboardHeader({ student, completedSessions = 0, totalSessions = 16 }: DashboardHeaderProps) {
    const displayYear = student.academicYear === "4th" ? "4ème" : "5ème";

    return (
        <header className="flex items-center justify-between">
            {/* Left side - Avatar and Info */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>

                {/* User Info */}
                <div>
                    <h1 className="text-xl font-semibold text-foreground">
                        Bonjour, {student.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {displayYear} Année • Session {completedSessions + (completedSessions < totalSessions ? 1 : 0)} / {totalSessions}
                    </p>
                </div>
            </div>

            {/* Right side - Sessions Badge */}
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <p className="text-xs font-medium text-primary uppercase tracking-wide">
                    {completedSessions} Session{completedSessions !== 1 ? 's' : ''} Terminé{completedSessions !== 1 ? 's' : ''}
                </p>
            </div>
        </header>
    );
}
