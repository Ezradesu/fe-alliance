export interface AdminStatsResponse {
    students: number;
    sessions_completed: number;
}

export interface AnalyticsSummaryResponse {
    overall_avg: {
        empathy: number;
        structure: number;
        alliance: number;
    };
    by_level_avg: Record<string, {
        empathy: number;
        structure: number;
        alliance: number;
    }>;
    by_session_number_avg: Record<string, {
        empathy: number;
        structure: number;
        alliance: number;
    }>;
}

export interface Student {
    user_id: string;
    email: string;
    level: string;
    preferred_language: string;
    created_at: string;
}

export interface AdminStudentsResponse {
    students: Student[];
}

export interface StudentSession {
    id: string;
    session_number: number;
    status: string;
    score_avg: number;
    created_at: string;
    topic?: string;
}

export interface SessionFeedback {
    session_id?: string;
    language: string;
    student_facing: {
        strengths: string[];
        areas_to_improve: string[];
        reflective_question: string;
    };
    internal_scores: Record<string, number>;
    skill_indicators: {
        active_listening: boolean;
        reformulation: boolean;
        emotional_validation: boolean;
        open_questions: boolean;
        structure_clarity: boolean;
    };
    kpis: Record<string, any>;
}
