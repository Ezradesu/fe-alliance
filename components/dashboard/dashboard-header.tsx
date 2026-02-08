import { Student } from "@/types/dashboard";

interface DashboardHeaderProps {
    student: Student;
}

export function DashboardHeader({ student }: DashboardHeaderProps) {
    return (
        <header className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    ALLIANCE OSTEO 2026
                </h1>
                <p className="text-muted-foreground">
                    Bienvenue, <span className="font-medium text-foreground">{student.name}</span> • {student.academicYear} Année
                </p>
            </div>
        </header>
    );
}
