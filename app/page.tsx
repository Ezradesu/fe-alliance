import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">ALLIANCE OSTEO 2026</h1>
        <p className="text-xl text-muted-foreground">Plateforme de Simulation d'Anamnèse</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/student/login">
          <Button size="lg" className="w-40">Espace Étudiant</Button>
        </Link>
        <Link href="/admin/login">
          <Button size="lg" variant="outline" className="w-40">Espace Admin</Button>
        </Link>
      </div>
    </div>
  );
}
