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
