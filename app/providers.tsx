"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "@/lib/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/context/AuthContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* only in development */}
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        {children}
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
