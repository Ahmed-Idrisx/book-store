"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useResetPassword, useResetSession } from "@/features/auth/hooks";
import AuthButton from "./AuthButton";
import PasswordInput from "./PasswordInput";

const ResetPasswordForm = () => {
  const router = useRouter();
  const resetPasswordMutation = useResetPassword();
  const resetSession = useResetSession();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [completed, setCompleted] = useState(false);

  const { email, otp } = resetSession.getSession();

  useEffect(() => {
    if (completed) return;

    if (!email || !otp) {
      toast.error("Please start the reset process again");
      router.push("/forget-password");
    }
  }, [completed, email, otp, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !otp) return;

    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await resetPasswordMutation.mutateAsync({
        email,
        otp,
        password,
        password_confirmation: confirmPassword,
      });

      setCompleted(true);

      resetSession.clear();

      toast.success(res.message);

      router.replace("/login");
    } catch {
      toast.error("Something went wrong, please try again");
    }
  };

  if (!email || !otp) return null;

  return (
    <>
      <h1 className="mb-2 text-center text-xl font-bold text-brand-pink sm:text-2xl">
        Create new password!
      </h1>

      <p className="mb-1 text-center text-sm text-neutral-500">
        Create a strong password
      </p>

      <p className="mb-8 text-center text-sm text-neutral-500">
        Your new password must be different from previous one
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          autoComplete="new-password"
          placeholder="Enter password"
          helperText="Must be at least 8 characters"
          onChange={setPassword}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          value={confirmPassword}
          autoComplete="new-password"
          placeholder="Confirm password"
          onChange={setConfirmPassword}
        />

        <AuthButton
          loading={resetPasswordMutation.isPending}
          loadingText="Resetting..."
        >
          Reset password
        </AuthButton>
      </form>
    </>
  );
};

export default ResetPasswordForm;
