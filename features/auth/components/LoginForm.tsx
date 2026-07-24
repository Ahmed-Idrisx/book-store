"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useLogin } from "@/features/auth/hooks";
import { useAuth } from "@/context/AuthContext";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in email and password");
      return;
    }

    try {
      const res = await loginMutation.mutateAsync({
        email,
        password,
      });

      refreshAuth();

      toast.success(res.message);

      router.push("/");
    } catch {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <h1 className="mb-8 text-center text-xl font-bold text-brand-pink sm:text-2xl">
        Welcome Back!
      </h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={setEmail}
        />

        <PasswordInput
          id="password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
        />

        <div className="mb-7 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-neutral-900">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4.5 w-4.5 accent-brand-pink"
            />
            Remember me
          </label>

          <Link
            href="/forget-password"
            className="text-sm font-medium text-brand-pink hover:underline"
          >
            Forget password?
          </Link>
        </div>

        <AuthButton
          loading={loginMutation.isPending}
          loadingText="Logging in..."
        >
          Log in
        </AuthButton>
      </form>

      <p className="mt-5 text-center text-sm text-neutral-900">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-brand-pink hover:underline"
        >
          Signup
        </Link>
      </p>

      <SocialLogin type="login" />
    </>
  );
};

export default LoginForm;
