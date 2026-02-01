import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  Refresh01Icon,
  Home01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

export function PropertiesErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4">
          <div className="bg-gray-100 p-6 rounded-full">
            <HugeiconsIcon
              icon={Search01Icon}
              className="w-12 h-12 text-gray-500"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Liste introuvable
            </h1>
            <p className="text-gray-500 mt-2 max-w-md">
              Nous n'avons pas pu charger les propriétés. La catégorie ou les
              filtres demandés n'existent pas.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            <HugeiconsIcon icon={Home01Icon} className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>
      );
    }
  }

  let errorMessage = "Une erreur technique est survenue.";
  if (error instanceof Error) errorMessage = error.message;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-6 text-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/30">
      <div className="bg-red-50 p-4 rounded-full">
        <HugeiconsIcon icon={Alert02Icon} className="w-10 h-10 text-red-500" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Impossible de charger les biens
        </h1>
        <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
          Nos serveurs rencontrent une difficulté temporaire.
        </p>
      </div>

      <div className="bg-white p-3 rounded border border-gray-200 font-mono text-[10px] text-gray-400 max-w-md overflow-hidden text-ellipsis">
        ID: {errorMessage}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition"
        >
          Retour
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition shadow-sm"
        >
          <HugeiconsIcon icon={Refresh01Icon} className="w-4 h-4" />
          Réessayer
        </button>
      </div>
    </div>
  );
}

export default PropertiesErrorBoundary;
