import { queryOptions } from "@tanstack/react-query";
import { authService } from "./auth.service";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const authQueries = {
  user: () =>
    queryOptions({
      queryKey: authKeys.user(),
      queryFn: authService.getMe,
      staleTime: 1000 * 60 * 30, // 30 minutes
      retry: false, // Pas de retry si 401
    }),
};
