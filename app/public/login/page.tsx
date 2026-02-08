"use client";

import React, { useMemo, useState } from "react";

type Lang = "fr" | "en";

const copy = {
  fr: {
    navHome: "Accueil",
    navAbout: "À propos",
    brand: "ALLIANCE OSTEO",
    title: "Connexion",
    subtitle: "Plateforme de simulation d'anamnèse",
    emailLabel: "Adresse Email",
    emailPlaceholder: "student@school.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "••••••••",
    forgot: "Mot de passe oublié ?",
    cta: "Se connecter",
    signup: "Pas de compte ? S'inscrire",
    footer:
      "Un projet de recherche pédagogique pour l’enseignement de l’ostéopathie.",
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    brand: "ALLIANCE OSTEO",
    title: "Sign in",
    subtitle: "Anamnesis simulation platform",
    emailLabel: "Email address",
    emailPlaceholder: "student@school.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    forgot: "Forgot password?",
    cta: "Sign in",
    signup: "No account? Sign up",
    footer: "A pedagogical research project for osteopathy education.",
  },
} as const;

export default function LoginPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = useMemo(() => copy[lang], [lang]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call backend login
    // await api.auth.login({ email, password })
    console.log({ email, password, lang });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top navbar */}
      <header className="h-16 bg-teal-800 text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
              {/* simple pulse icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-90"
              >
                <path
                  d="M3 12h4l2-5 4 10 2-5h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wide">
              {t.brand}
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-6 text-sm">
            <a href="/landing" className="opacity-90 hover:opacity-100">
              {t.navHome}
            </a>
            <a href="/about" className="opacity-90 hover:opacity-100">
              {t.navAbout}
            </a>

            {/* Lang toggle */}
            <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
              <button
                type="button"
                onClick={() => setLang("fr")}
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold transition",
                  lang === "fr" ? "bg-white text-teal-800" : "text-white/90",
                ].join(" ")}
                aria-pressed={lang === "fr"}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold transition",
                  lang === "en" ? "bg-white text-teal-800" : "text-white/90",
                ].join(" ")}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Background + centered card */}
      <main className="relative">
        {/* soft gradient background like screenshot */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-slate-50 to-slate-100" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
            <div className="px-8 py-9">
              {/* top icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-teal-700"
                >
                  <path
                    d="M3 12h4l2-5 4 10 2-5h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h1 className="text-center text-2xl font-semibold text-slate-900">
                {t.title}
              </h1>
              <p className="mt-1 text-center text-sm text-slate-500">
                {t.subtitle}
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                      {/* mail icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 6h16v12H4V6Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="m4 7 8 6 8-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                      {/* lock icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 11V8a5 5 0 0 1 10 0v3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 11h12v10H6V11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="/forgot-password"
                      className="text-xs font-medium text-teal-700 hover:text-teal-800"
                    >
                      {t.forgot}
                    </a>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-teal-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                >
                  {t.cta}
                </button>

                {/* Signup link */}
                <div className="text-center">
                  <a
                    href="/signup"
                    className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    {t.signup}
                  </a>
                </div>
              </form>

              {/* Footer text */}
              <p className="mt-8 text-center text-xs text-slate-400">
                {t.footer}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
