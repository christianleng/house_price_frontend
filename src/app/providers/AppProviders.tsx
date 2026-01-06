import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <QueryProvider>{children}</QueryProvider>
    </BrowserRouter>
  );
}
