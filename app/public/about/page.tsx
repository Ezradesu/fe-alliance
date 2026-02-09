"use client";

import React, { useMemo, useState } from "react";

type Lang = "fr" | "en";

const copy = {
    fr: {
        navHome: "Accueil",
        navAbout: "À propos",
        brand: "ALLIANCE OSTEO",
        title: "À Propos",
        subtitle: "En savoir plus sur la plateforme de simulation d'anamnèse",
        content: "Alliance Osteo est une plateforme innovante conçue pour aider les étudiants en ostéopathie à s'entraîner aux anamnèses cliniques grâce à des patients virtuels pilotés par l'IA.",
        footer: "Un projet de recherche pédagogique pour l’enseignement de l’ostéopathie.",
    },
    en: {
        navHome: "Home",
        navAbout: "About",
        brand: "ALLIANCE OSTEO",
        title: "About Us",
        subtitle: "Learn more about the anamnesis simulation platform",
        content: "Alliance Osteo is an innovative platform designed to help osteopathy students practice clinical anamnesis through AI-driven virtual patients.",
        footer: "A pedagogical research project for osteopathy education.",
    },
} as const;

export default function AboutPage() {
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

            <main className="relative mx-auto max-w-4xl px-4 py-20">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-slate-900">{t.title}</h1>
                    <p className="text-lg text-slate-600">{t.subtitle}</p>
                </div>

                <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-700 leading-relaxed">
                        {t.content}
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <a href="/public/login" className="text-teal-700 font-semibold hover:underline">
                        Retour à la connexion
                    </a>
                </div>
            </main>

            <footer className="mt-auto py-10 border-t border-slate-200">
                <p className="text-center text-xs text-slate-400">{t.footer}</p>
            </footer>
        </div>
    );
}
