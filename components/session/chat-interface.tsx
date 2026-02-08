"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, LogOut, Loader2, User, Mic } from "lucide-react"; // Mic icon for future voice feature maybe?
import { getToken } from "@/lib/auth";
import { ChatMessage, ChatResponse } from "@/types/session";
import { PatientHeader } from "./patient-header";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
    sessionId: string;
}

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEnding, setIsEnding] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [patientInfo, setPatientInfo] = useState<{
        sessionNumber: number;
        age: number;
        genderLabel: string;
    } | null>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading || !sessionId) return;

        console.log("Sending message with sessionId:", sessionId); // Debug

        const userMessage = inputValue.trim();
        setInputValue("");
        setIsLoading(true);

        // Optimistic update
        const newMessages = [
            ...messages,
            { role: "user", content: userMessage, timestamp: new Date() } as ChatMessage
        ];
        setMessages(newMessages);

        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const url = `${baseUrl}/student/sessions/${sessionId}/chat`;

            console.log("Chat Request Debug:", {
                url,
                sessionId,
                tokenPresent: !!token,
                payload: { message: userMessage }
            });

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!res.ok) throw new Error("Erreur d'envoi");

            const data: ChatResponse = await res.json();

            setMessages(prev => [
                ...prev,
                { role: "patient", content: data.patient_message, timestamp: new Date() }
            ]);

            // Update patient info if provided (it usually is)
            setPatientInfo({
                sessionNumber: data.session_number,
                age: data.patient_age,
                genderLabel: data.patient_gender_label
            });

        } catch (error) {
            console.error("Chat error:", error);
            // Revert or show error toast
        } finally {
            setIsLoading(false);
        }
    };

    const handleEndSession = async () => {
        if (!confirm("Voulez-vous vraiment terminer l'anamnèse ?")) return;

        setIsEnding(true);
        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            const res = await fetch(`${baseUrl}/student/sessions/${sessionId}/end`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                // Redirect to feedback or questionnaire. For now back to dashboard or specific feedback page
                router.push(`/student/session/${sessionId}/feedback`); // or questionnaire
            }
        } catch (error) {
            console.error("End session error:", error);
        } finally {
            setIsEnding(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
            {/* Header with Patient Details */}
            {patientInfo && (
                <PatientHeader
                    sessionNumber={patientInfo.sessionNumber}
                    patientAge={patientInfo.age}
                    patientGenderLabel={patientInfo.genderLabel}
                />
            )}

            {!patientInfo && messages.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                    Initialisation de la session... Dites "Bonjour" pour commencer.
                </div>
            )}

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border mb-4">
                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={cn(
                            "flex w-full",
                            msg.role === "user" ? "justify-end" : "justify-start"
                        )}>
                            <div className={cn(
                                "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                    : "bg-white dark:bg-gray-800 border rounded-bl-none"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-white dark:bg-gray-800 border p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Le patient écrit...</span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="flex items-center gap-2">
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleEndSession}
                    disabled={isEnding || isLoading}
                    title="Terminer l'anamnèse"
                >
                    <LogOut className="w-4 h-4" />
                </Button>

                <Input
                    placeholder="Posez votre question..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isLoading || isEnding}
                    className="flex-1"
                />

                <Button onClick={handleSendMessage} disabled={isLoading || isEnding || !inputValue.trim()}>
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
