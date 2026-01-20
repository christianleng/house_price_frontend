interface IErrorDisplayProps {
  error: Error;
  onRetry?: () => void;
}

const ErrorDisplay = ({ error, onRetry }: IErrorDisplayProps) => {
  return (
    <div className="text-center py-10 text-red-600">
      <p>Une erreur est survenue : {error.message}</p>
      {onRetry && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onRetry}
        >
          Réessayer
        </button>
      )}
    </div>
  );
};

ErrorDisplay.displayName = "ErrorDisplay";
export { ErrorDisplay };
