"use client";

import React, { useMemo, useState } from "react";

type Lang = "fr" | "en";

const copy = {
    fr: {
        navHome: "Accueil",
        navAbout: "À propos",
        brand: "ALLIANCE OSTEO",
        title: "Bienvenue sur Alliance Osteo",
        subtitle: "La plateforme de simulation d'anamnèse pour les futurs ostéopathes",
        cta: "Commencer",
        footer: "Un projet de recherche pédagogique pour l’enseignement de l’ostéopathie.",
    },
    en: {
        navHome: "Home",
        navAbout: "About",
        brand: "ALLIANCE OSTEO",
        title: "Welcome to Alliance Osteo",
        subtitle: "The anamnesis simulation platform for future osteopaths",
        cta: "Get Started",
        footer: "A pedagogical research project for osteopathy education.",
    },
} as const;

export default function LandingPage() {
    const [lang, setLang] = useState<Lang>("fr");
    const t = useMemo(() => copy[lang], [lang]);

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="h-16 bg-teal-800 text-white">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90">
                                <path d="M3 12h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold tracking-wide">{t.brand}</span>
                    </div>

                    <nav className="flex items-center gap-6 text-sm">
                        <a href="/public/landing" className="opacity-90 hover:opacity-100">{t.navHome}</a>
                        <a href="/public/about" className="opacity-90 hover:opacity-100">{t.navAbout}</a>
                        <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
                            <button
                                type="button"
                                onClick={() => setLang("fr")}
                                className={["rounded-full px-3 py-1 text-xs font-semibold transition", lang === "fr" ? "bg-white text-teal-800" : "text-white/90"].join(" ")}
                            >
                                FR
                            </button>
                            <button
                                type="button"
                                onClick={() => setLang("en")}
                                className={["rounded-full px-3 py-1 text-xs font-semibold transition", lang === "en" ? "bg-white text-teal-800" : "text-white/90"].join(" ")}
                            >
                                EN
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-slate-50 to-slate-100" />
                <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                        {t.title}
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 max-w-2xl">
                        {t.subtitle}
                    </p>
                    <div className="mt-10">
                        <a
                            href="/public/login"
                            className="px-8 py-4 bg-teal-700 text-white rounded-full font-bold text-lg hover:bg-teal-800 transition shadow-lg shadow-teal-700/20"
                        >
                            {t.cta}
                        </a>
                    </div>
                </div>
            </main>

            <footer className="py-10 border-t border-slate-200">
                <p className="text-center text-xs text-slate-400">{t.footer}</p>
            </footer>
        </div>
    );
}
