export interface ChatMessage {
    role: "user" | "patient";
    content: string;
    timestamp: Date;
}

export interface ChatResponse {
    patient_message: string;
    language: string;
    session_number: number;
    patient_age: number;
    patient_gender_label: string; // "Homme", "Femme", "Garçon", "Fille"
}

export interface EndSessionResponse {
    session_id: string;
    status: string;
}
