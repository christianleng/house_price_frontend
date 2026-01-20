import { apiClient } from "@/core/api/api-client";
import { tokenStorage } from "@/core/auth/token.storage";
import type {
  LoginCredentials,
  User,
  AuthTokenResponse,
} from "../types/auth.types";
import { API_ENDPOINTS } from "@/core/api/endpoints";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokenResponse> {
    const response = await apiClient.postForm<AuthTokenResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        username: credentials.email,
        password: credentials.password,
      },
    );

    if (response.access_token) {
      tokenStorage.setToken(response.access_token);
    }

    return response;
  },

  async getMe(): Promise<User | null> {
    try {
      return await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    } catch {
      return null;
    }
  },

  async logout(): Promise<void | null> {
    tokenStorage.clearToken();
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      return null;
    }
  },
};
