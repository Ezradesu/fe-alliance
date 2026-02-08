import { AdminLoginForm } from "@/components/auth/admin-login-form";

export default function AdminLoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">ALLIANCE OSTEO</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Portail d'Administration</p>
                </div>
                <AdminLoginForm />
            </div>
        </div>
    );
}
