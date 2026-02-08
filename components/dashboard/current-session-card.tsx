import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/dashboard";
import { PlayCircle, AlertCircle, CheckCircle2, Lock } from "lucide-react";

interface CurrentSessionCardProps {
    currentSession: Session;
    onStart: () => void;
    isStarting?: boolean;
}

export function CurrentSessionCard({ currentSession, onStart, isStarting = false }: CurrentSessionCardProps) {
    // Scenario 1: Weekly Limit Reached
    if (!currentSession.available && currentSession.reason === "weekly_limit") {
        return (
            <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-yellow-600">
                        <AlertCircle className="h-5 w-5" />
                        <span>Limite Hebdomadaire Atteinte</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Vous avez atteint votre limite de 2 sessions pour cette semaine. Excellent travail !
                        Revenez la semaine prochaine pour continuer votre entraînement.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button disabled variant="outline" className="w-full">
                        Session Verrouillée
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    // Scenario 2: All Sessions Completed
    if (!currentSession.available && currentSession.reason === "all_completed") {
        return (
            <Card className="border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-900/10">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Félicitations !</span>
                    </CardTitle>
                    <CardDescription>
                        Vous avez terminé les 16 sessions de simulation d&apos;anamnèse.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Vous avez démontré d&apos;excellents progrès.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Télécharger l&apos;Attestation
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    // Scenario 3: Session Locked (Generic)
    if (!currentSession.available) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-muted-foreground">
                        <Lock className="h-5 w-5" />
                        <span>Aucune Session Disponible</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Il n&apos;y a actuellement aucune session disponible. Veuillez vérifier plus tard.
                    </p>
                </CardContent>
            </Card>
        );
    }

    // Scenario 4: Session Available
    return (
        <Card className="border-l-4 border-l-primary shadow-md">
            <CardHeader>
                <CardTitle>Session Actuelle</CardTitle>
                <CardDescription>
                    Prêt à démarrer votre prochaine simulation ?
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between py-4">
                    <div className="space-y-1">
                        <p className="text-2xl font-bold">Session {currentSession.sessionNumber}</p>
                        <p className="text-sm text-muted-foreground">Consultation Patient</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <PlayCircle className="h-6 w-6 text-primary" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full text-md"
                    size="lg"
                    onClick={onStart}
                    disabled={isStarting}
                >
                    {isStarting ? "Démarrage..." : `Démarrer la Session ${currentSession.sessionNumber}`}
                </Button>
            </CardFooter>
        </Card>
    );
}
