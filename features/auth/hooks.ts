"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authApi,
  type LoginPayload,
  type RegisterPayload,
  type ForgetPasswordPayload,
  type ResetPasswordPayload,
  type UpdateProfilePayload,
} from "./api";
import { tokenStorage } from "@/lib/api-client";
import { useCallback } from "react";

// work when only when there is a token
export function useProfile(enabled: boolean) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getProfile().then((res) => res.data),
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (res) => {
      tokenStorage.set(res.data.token);
      // update the profile data in the cache after a successful update
      queryClient.setQueryData(["profile"], res.data.user);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      tokenStorage.remove();
      queryClient.clear();
    },
  });
}

export function useForgetPassword() {
  return useMutation({
    mutationFn: (payload: ForgetPasswordPayload) =>
      authApi.forgetPassword(payload),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authApi.resetPassword(payload),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      authApi.updateProfile(payload),
    onSuccess: (res) => {
      // update the profile data in the cache after a successful update
      queryClient.setQueryData(["profile"], res.data);
    },
  });
}

export const useResetSession = () => {
  const saveEmail = useCallback((email: string) => {
    sessionStorage.setItem("reset_email", email);
  }, []);

  const saveOtp = useCallback((otp: string) => {
    sessionStorage.setItem("reset_otp", otp);
  }, []);

  const getSession = useCallback(() => {
    return {
      email: sessionStorage.getItem("reset_email"),
      otp: sessionStorage.getItem("reset_otp"),
    };
  }, []);

  const clear = useCallback(() => {
    sessionStorage.removeItem("reset_email");
    sessionStorage.removeItem("reset_otp");
  }, []);

  return {
    saveEmail,
    saveOtp,
    getSession,
    clear,
  };
};
