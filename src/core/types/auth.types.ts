export const USER_ROLE = {
  USER: "user",
  AGENT: "agent",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  agencyName: string;
  email: string;
  phone: string;
  rsacNumber: string;
  city: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  role: UserRole;
  user?: User;
  agent?: Agent;
}
