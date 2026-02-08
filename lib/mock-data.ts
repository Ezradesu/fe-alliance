import { DashboardData } from "@/types/dashboard";

export const MOCK_DASHBOARD_DATA: Record<string, DashboardData> = {
    STATE_NEW_STUDENT: {
        student: {
            name: "Alex Dupont",
            academicYear: "4th",
        },
        progress: {
            completedSessions: 0,
            totalSessions: 16,
            weeklySessionsUsed: 0,
            weeklySessionsLimit: 2,
        },
        currentSession: {
            available: true,
            sessionNumber: 1,
            reason: null,
        },
        badges: [
            {
                id: "active-listening",
                name: "Active Listening",
                icon: "Ear",
                earned: false,
                description: "Demonstrated effective active listening skills.",
            },
            {
                id: "reformulation",
                name: "Reformulation",
                icon: "Repeat",
                earned: false,
                description: "Successfully reformulated patient statements.",
            },
            {
                id: "therapeutic-alliance",
                name: "Therapeutic Alliance",
                icon: "Heart",
                earned: false,
                description: "Established a strong therapeutic bond.",
            },
        ],
    },
    STATE_MID_PROGRESS: {
        student: {
            name: "Alex Dupont",
            academicYear: "4th",
        },
        progress: {
            completedSessions: 7,
            totalSessions: 16,
            weeklySessionsUsed: 1,
            weeklySessionsLimit: 2,
        },
        currentSession: {
            available: true,
            sessionNumber: 8,
            reason: null,
        },
        badges: [
            {
                id: "active-listening",
                name: "Active Listening",
                icon: "Ear",
                earned: true,
                earnedDate: "2026-01-15",
                description: "Demonstrated effective active listening skills.",
            },
            {
                id: "reformulation",
                name: "Reformulation",
                icon: "Repeat",
                earned: false,
                description: "Successfully reformulated patient statements.",
            },
            {
                id: "therapeutic-alliance",
                name: "Therapeutic Alliance",
                icon: "Heart",
                earned: false,
                description: "Established a strong therapeutic bond.",
            },
        ],
    },
    STATE_WEEKLY_LIMIT: {
        student: {
            name: "Alex Dupont",
            academicYear: "4th",
        },
        progress: {
            completedSessions: 10,
            totalSessions: 16,
            weeklySessionsUsed: 2,
            weeklySessionsLimit: 2,
        },
        currentSession: {
            available: false,
            sessionNumber: 11,
            reason: "weekly_limit",
        },
        badges: [
            {
                id: "active-listening",
                name: "Active Listening",
                icon: "Ear",
                earned: true,
                earnedDate: "2026-01-15",
                description: "Demonstrated effective active listening skills.",
            },
            {
                id: "reformulation",
                name: "Reformulation",
                icon: "Repeat",
                earned: true,
                earnedDate: "2026-02-01",
                description: "Successfully reformulated patient statements.",
            },
            {
                id: "therapeutic-alliance",
                name: "Therapeutic Alliance",
                icon: "Heart",
                earned: false,
                description: "Established a strong therapeutic bond.",
            },
        ],
    },
    STATE_COMPLETED: {
        student: {
            name: "Alex Dupont",
            academicYear: "4th",
        },
        progress: {
            completedSessions: 16,
            totalSessions: 16,
            weeklySessionsUsed: 2,
            weeklySessionsLimit: 2,
        },
        currentSession: {
            available: false,
            sessionNumber: null,
            reason: "all_completed",
        },
        badges: [
            {
                id: "active-listening",
                name: "Active Listening",
                icon: "Ear",
                earned: true,
                earnedDate: "2026-01-15",
                description: "Demonstrated effective active listening skills.",
            },
            {
                id: "reformulation",
                name: "Reformulation",
                icon: "Repeat",
                earned: true,
                earnedDate: "2026-02-01",
                description: "Successfully reformulated patient statements.",
            },
            {
                id: "therapeutic-alliance",
                name: "Therapeutic Alliance",
                icon: "Heart",
                earned: true,
                earnedDate: "2026-02-08",
                description: "Established a strong therapeutic bond.",
            },
        ],
    },
};
