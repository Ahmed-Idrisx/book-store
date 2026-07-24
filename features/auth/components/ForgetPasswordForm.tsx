"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForgetPassword, useResetSession } from "@/features/auth/hooks";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const forgetPasswordMutation = useForgetPassword();
  const resetSession = useResetSession();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await forgetPasswordMutation.mutateAsync({
        email,
      });

      resetSession.saveEmail(email);

      toast.success(res.message);

      router.push("/verify-code");
    } catch {
      toast.error("Could not send reset code, please try again");
    }
  };

  return (
    <>
      <h1 className="mb-2 text-center text-xl font-bold text-brand-pink sm:text-2xl">
        Forget Password?
      </h1>

      <p className="mb-8 text-center text-sm text-neutral-500">
        Enter your email to reset your password
      </p>

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

        <AuthButton
          loading={forgetPasswordMutation.isPending}
          loadingText="Sending..."
        >
          Send reset code
        </AuthButton>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
