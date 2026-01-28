import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "@/features/auth/providers/authProviders";
import { env } from "@/core/config/01-env";
import { APIProvider } from "@vis.gl/react-google-maps";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <APIProvider apiKey={env.GOOGLE_MAPS_API_KEY} libraries={["marker"]}>
          {children}
        </APIProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
