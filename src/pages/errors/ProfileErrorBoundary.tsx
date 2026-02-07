import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Button } from "@/core/ui/button";
import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";

export function ProfileErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "Une erreur inattendue s'est produite.";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="container mx-auto max-w-4/5 px-4 py-10 space-y-12">
      <section>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-3 text-destructive">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-6 w-6" />
              <CardTitle>Erreur de chargement du profil</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Nous n'avons pas pu charger toutes vos informations.
              <br />
              <span className="font-mono text-xs text-muted-foreground">
                {errorMessage}
              </span>
            </p>

            <div className="flex gap-4">
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default ProfileErrorBoundary;
