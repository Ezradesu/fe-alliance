"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/admin/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Chargement...</div>;
    }

    const handleLogout = () => {
        removeToken();
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
                </div>
            </header>
            <main className="container mx-auto p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Placeholder for Stats */}
                    <div className="p-6 bg-card rounded-lg border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Étudiants</h3>
                        <div className="mt-2 text-2xl font-bold">--</div>
                    </div>
                    <div className="p-6 bg-card rounded-lg border shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground">Sessions Complétées</h3>
                        <div className="mt-2 text-2xl font-bold">--</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
