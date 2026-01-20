const CrashTest = () => {
  throw new Error("Test ErrorBoundary : Crash intentionnel !");
  return null;
};

export default CrashTest;
