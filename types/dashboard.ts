export interface DashboardData {
    student: Student;
    progress: Progress;
    currentSession: Session;
    badges: Badge[];
}

export interface Student {
    name: string;
    academicYear: "4th" | "5th";
}

export interface Progress {
    completedSessions: number;
    totalSessions: number;
    weeklySessionsUsed: number;
    weeklySessionsLimit: number;
}

export interface Session {
    available: boolean;
    sessionNumber: number | null;
    reason?: "weekly_limit" | "all_completed" | "locked" | null;
}

export interface Badge {
    id: string;
    name: string;
    icon: string; // lucide icon name
    earned: boolean;
    earnedDate?: string;
    description?: string;
}

export interface SessionHistory {
    id: string;
    session_number: number;
    status: string; // "completed", "in_progress", "locked", "available"
    patient_age?: number;
    patient_gender?: string; // "male" | "female"
}

export interface DashboardData {
    student: Student;
    progress: Progress;
    currentSession: Session;
    badges: Badge[];
    history?: SessionHistory[];
}
