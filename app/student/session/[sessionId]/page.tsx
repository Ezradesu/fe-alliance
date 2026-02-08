"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getToken } from "@/lib/auth";
import { ChatInterface } from "@/components/session/chat-interface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SessionPage() {
    const router = useRouter();
    const params = useParams();
    // Debugging: Check what params actually is
    // console.log("SessionPage params:", params); 

    // Ensure sessionId is a string. useParams can return string or string[]
    const rawSessionId = params?.sessionId;
    const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;

    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/student/login");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    // Ensure sessionId is valid before rendering
    if (!sessionId) return null;
    if (!isAuthorized) return null;

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b h-16 flex items-center px-6 bg-card sticky top-0 z-10">
                <div className="container mx-auto flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.push("/student/dashboard")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                    </Button>
                    <h1 className="text-lg font-semibold">Salle de Consultation</h1>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-6 max-w-4xl">
                <ChatInterface sessionId={sessionId} />
            </main>
        </div>
    );
}
