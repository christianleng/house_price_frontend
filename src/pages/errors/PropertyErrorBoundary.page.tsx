import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useNavigate,
} from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  Search01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";

export function PropertyErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
          <div className="bg-gray-100 p-6 rounded-full">
            <HugeiconsIcon
              icon={Search01Icon}
              className="w-12 h-12 text-gray-500"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Propriété introuvable
            </h1>
            <p className="text-gray-500 mt-2 max-w-md">
              Il semble que cette propriété n'existe plus, a été vendue ou que
              le lien est incorrect.
            </p>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
            Retourner aux annonces
          </Link>
        </div>
      );
    }

    if (error.status === 400) {
      return (
        <div className="p-8 text-center text-gray-800">
          <h2 className="text-xl font-bold mb-2">Requête invalide</h2>
          <p>{error.data?.message || "L'identifiant fourni est incorrect."}</p>
        </div>
      );
    }
  }

  let errorMessage = "Une erreur inattendue est survenue.";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-6 text-center">
      <HugeiconsIcon icon={Alert02Icon} className="w-12 h-12 text-red-500" />
      <h1 className="text-xl font-bold text-gray-900">Erreur Technique</h1>
      <p className="text-sm text-gray-500 max-w-md bg-gray-50 p-3 rounded border border-gray-200 font-mono">
        {errorMessage}
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          Retour
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-lg"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
