import { apiRequest } from "@/lib/api-client";

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: string | null;
  image: string;
  phone?: string | null;
  address?: string | null;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: User;
  token: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  image?: File;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiRequest<LoginResponseData>("/login", {
      method: "POST",
      auth: false,
      body: payload,
    }),

  register: (payload: RegisterPayload) =>
    apiRequest<User>("/register", {
      method: "POST",
      auth: false,
      body: payload,
    }),

  logout: () => apiRequest("/logout", { method: "POST" }),

  forgetPassword: (payload: ForgetPasswordPayload) =>
    apiRequest("/forget-password", {
      method: "POST",
      auth: false,
      body: payload,
    }),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiRequest("/reset-password", {
      method: "POST",
      auth: false,
      body: payload,
    }),

  getProfile: () => apiRequest<User>("/profile", { method: "GET" }),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiRequest<User>("/profile/update", {
      method: "POST",
      body: payload,
    }),
};
