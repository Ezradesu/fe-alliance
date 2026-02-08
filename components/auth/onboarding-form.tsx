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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getToken, getUser, setUser } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    level: z.enum(["4e", "5e"]),
});

export function OnboardingForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);

        try {
            const token = getToken();
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            if (!token) {
                router.push("/student/login");
                return;
            }

            const response = await fetch(`${baseUrl}/me/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    level: values.level, // "4e" or "5e"
                    preferred_language: "fr"
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Profile update error:", errorData);
                throw new Error(errorData.detail || (Array.isArray(errorData.detail) ? errorData.detail[0].msg : null) || "Erreur lors de la mise à jour du profil.");
            }

            // Update local user object
            const user = getUser();
            if (user) {
                setUser({ ...user, level: values.level as "4e" | "5e" });
            }

            // Redirect to dashboard
            router.push("/student/dashboard");
            router.refresh();

        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Finaliser votre inscription</CardTitle>
                <CardDescription>
                    Pour personnaliser votre expérience, veuillez indiquer votre année d&apos;étude.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Année académique</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez votre année" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="4e">4ème Année (M1)</SelectItem>
                                            <SelectItem value="5e">5ème Année (M2)</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                    Enregistrement...
                                </>
                            ) : (
                                "Accéder au Dashboard"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
