"use client";

import React, { useMemo, useState } from "react";

type Lang = "fr" | "en";

const copy = {
    fr: {
        title: "Mot de passe oublié",
        subtitle: "Entrez votre email pour réinitialiser votre mot de passe",
        label: "Adresse Email",
        cta: "Envoyer le lien",
        back: "Retour à la connexion",
    },
    en: {
        title: "Forgot Password",
        subtitle: "Enter your email to reset your password",
        label: "Email Address",
        cta: "Send reset link",
        back: "Back to login",
    },
} as const;

export default function ForgotPasswordPage() {
    const [lang, setLang] = useState<Lang>("fr");
    const t = useMemo(() => copy[lang], [lang]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900 text-center">{t.title}</h1>
                <p className="mt-2 text-sm text-slate-500 text-center">{t.subtitle}</p>

                <form className="mt-8 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">{t.label}</label>
                        <input
                            type="email"
                            className="w-full rounded-lg border border-slate-200 p-2.5 text-sm"
                            required
                        />
                    </div>
                    <button className="w-full bg-teal-700 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-800 transition">
                        {t.cta}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/public/login" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                        {t.back}
                    </a>
                </div>
            </div>
        </div>
    );
}
