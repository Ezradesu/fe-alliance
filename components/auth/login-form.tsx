"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setToken } from "@/lib/auth";
import { LoginResponse } from "@/types/auth";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide.",
    }),
    password: z.string().min(1, {
        message: "Le mot de passe est requis.",
    }),
});

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!baseUrl) throw new Error("API Base URL not configured");

            const response = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 422) {
                    throw new Error("Email ou mot de passe incorrect.");
                }
                throw new Error("Une erreur est survenue lors de la connexion.");
            }

            const data: LoginResponse = await response.json();
            setToken(data.access_token);

            // Store user info & check onboarding
            if (data.user) {
                const { setUser } = await import("@/lib/auth");
                setUser(data.user);

                if (!data.user.level) {
                    router.push("/onboarding");
                    return;
                }
            }

            // Redirect to dashboard
            router.push("/student/dashboard");
            router.refresh();

        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur de connexion");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Connexion</CardTitle>
                <CardDescription>
                    Entrez vos identifiants pour accéder à votre tableau de bord.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="nom@exemple.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <div className="text-sm text-red-500 font-medium">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Connexion...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
