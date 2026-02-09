"use client";

import { Activity, LayoutDashboard, Globe, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
    activeTab: "overall" | "website";
    onTabChange: (tab: "overall" | "website") => void;
    onLogout: () => void;
}

export function AdminLayout({ children, activeTab, onTabChange, onLogout }: AdminLayoutProps) {
    return (
        <div className="flex min-h-screen w-full bg-[#F3F4F6]">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-[#0F172A] text-white md:flex">
                <div className="flex h-16 items-center border-b border-gray-800 px-6">
                    <Activity className="mr-2 h-6 w-6 text-emerald-400" />
                    <span className="text-lg font-bold tracking-tight">OsteoSim</span>
                </div>
                <ScrollArea className="flex-1 py-6">
                    <nav className="space-y-1 px-4">
                        <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Main Menu
                        </div>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-sm font-medium transition-colors hover:bg-white/10 hover:text-white",
                                activeTab === "overall" ? "bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300" : "text-gray-400"
                            )}
                            onClick={() => onTabChange("overall")}
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Overall
                        </Button>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-sm font-medium transition-colors hover:bg-white/10 hover:text-white",
                                activeTab === "website" ? "bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300" : "text-gray-400"
                            )}
                            onClick={() => onTabChange("website")}
                        >
                            <Globe className="mr-2 h-4 w-4" />
                            Website Mgmt
                        </Button>
                    </nav>
                </ScrollArea>
                <div className="border-t border-gray-800 p-4">
                    <Button
                        variant="destructive"
                        className="w-full justify-start bg-red-600 hover:bg-red-700"
                        onClick={onLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Déconnexion
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex w-full flex-col md:pl-64">
                {children}
            </main>
        </div>
    );
}
