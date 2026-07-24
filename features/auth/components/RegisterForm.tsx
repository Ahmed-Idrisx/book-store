"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useRegister } from "@/features/auth/hooks";

import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
  const router = useRouter();
  const registerMutation = useRegister();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agree) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    try {
      const res = await registerMutation.mutateAsync({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      toast.success(res.message);

      router.push("/login");
    } catch {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AuthInput
            id="firstName"
            label="First Name"
            placeholder="John"
            value={firstName}
            onChange={setFirstName}
          />

          <AuthInput
            id="lastName"
            label="Last Name"
            placeholder="Smith"
            value={lastName}
            onChange={setLastName}
          />
        </div>

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
          autoComplete="new-password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Enter password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <label className="mb-7 flex items-center gap-2 text-sm text-neutral-900">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="h-4.5 w-4.5 accent-brand-pink"
          />
          Agree with{" "}
          <Link
            href="/terms"
            className="font-medium text-brand-pink hover:underline"
          >
            Terms & Conditions
          </Link>
        </label>

        <AuthButton
          loading={registerMutation.isPending}
          loadingText="Creating account..."
        >
          Sign Up
        </AuthButton>
      </form>

      <p className="mt-5 text-center text-sm text-neutral-900">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-brand-pink hover:underline"
        >
          Login
        </Link>
      </p>

      <SocialLogin type="signup" />
    </>
  );
};

export default RegisterForm;
