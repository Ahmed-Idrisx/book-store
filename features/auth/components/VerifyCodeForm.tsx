"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useForgetPassword, useResetSession } from "@/features/auth/hooks";

import AuthButton from "./AuthButton";
import OtpInput from "./OtpInput";

const CODE_LENGTH = 6;

const VerifyCodeForm = () => {
  const router = useRouter();
  const forgetPasswordMutation = useForgetPassword();
  const resetSession = useResetSession();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(resetSession.getSession().email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (email === null) return;

    if (!email) {
      toast.error("Please request a reset code first");
      router.push("/forget-password");
    }
  }, [email, router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullCode = code.join("");

    if (fullCode.length < CODE_LENGTH) {
      toast.error(`Please enter the ${CODE_LENGTH}-digit code`);
      return;
    }

    resetSession.saveOtp(fullCode);

    router.push("/reset-password");
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      const res = await forgetPasswordMutation.mutateAsync({ email });

      toast.success(res.message);
    } catch {
      toast.error("Something went wrong, please try again");
    }
  };

  if (!email) return null;

  return (
    <>
      <h1 className="mb-2 text-xl font-bold text-brand-pink sm:text-2xl">
        Reset your password!
      </h1>

      <p className="mb-8 text-sm text-neutral-500">
        Enter the {CODE_LENGTH} digits code that you received on your email
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <OtpInput
          code={code}
          setCode={setCode}
          inputsRef={inputsRef}
          length={CODE_LENGTH}
        />

        <AuthButton>Reset password</AuthButton>
      </form>

      <p className="mt-6 text-sm text-neutral-900">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={forgetPasswordMutation.isPending}
          className="font-bold text-brand-pink hover:underline disabled:opacity-60"
        >
          {forgetPasswordMutation.isPending ? "Sending..." : "Send again"}
        </button>
      </p>
    </>
  );
};

export default VerifyCodeForm;
