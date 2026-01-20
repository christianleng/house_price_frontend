import { type ReactNode, memo } from "react";

interface SmartLoaderProps<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | undefined | null;
  skeleton?: ReactNode;
  emptyState?: ReactNode;
  errorFallback?: (error: Error, retry: () => void) => ReactNode;
  retryFn?: () => void;
  children: (data: T) => ReactNode;
}

export const SmartLoader = memo(
  <T,>({
    isLoading,
    error,
    data,
    skeleton,
    emptyState,
    errorFallback,
    retryFn,
    children,
  }: SmartLoaderProps<T>) => {
    if (isLoading && !data) {
      return (
        <>{skeleton || <div className="text-center py-10">Loading...</div>}</>
      );
    }

    if (error) {
      return errorFallback ? (
        errorFallback(error, retryFn || (() => {}))
      ) : (
        <div className="text-center py-10 text-red-600">
          <p>Oops! Une erreur est survenue : {error.message}</p>
          {retryFn && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={retryFn}
            >
              Réessayer
            </button>
          )}
        </div>
      );
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return (
        <>
          {emptyState || (
            <p className="text-center py-10">Aucune donnée disponible</p>
          )}
        </>
      );
    }

    return <>{children(data)}</>;
  }
) as <T>(props: SmartLoaderProps<T>) => ReactNode;
