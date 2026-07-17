"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/api-client";
import { useProfile, useLogout } from "@/features/auth/hooks";
import type { User } from "@/features/auth/api";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // using lazy initialization to work only one time on the first render, and avoid calling tokenStorage.get() on every render.
  const [hasToken, setHasToken] = useState(() =>
    typeof document !== "undefined" ? !!tokenStorage.get() : false,
  );

  // call after a successful login to update the context
  const refreshAuth = () => {
    setHasToken(!!tokenStorage.get());
  };

  const {
    data: user,
    isLoading: profileLoading,
    isError: profileError,
  } = useProfile(hasToken);

  // to remove the token if it's invalid (expired, revoked, etc.) and the profile request failed
  useEffect(() => {
    if (hasToken && profileError) {
      tokenStorage.remove();
    }
  }, [hasToken, profileError]);

  const logoutMutation = useLogout();

  const logout = async () => {
    await logoutMutation.mutateAsync();
    setHasToken(false);
    router.push("/login");
  };

  const isLoading = hasToken && profileLoading;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
