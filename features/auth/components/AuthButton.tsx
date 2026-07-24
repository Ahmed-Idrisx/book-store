import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthButtonProps {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
  disabled?: boolean;
  className?: string;
}

const AuthButton = ({
  loading,
  loadingText,
  children,
  type = "submit",
  form,
  disabled,
  className,
}: AuthButtonProps) => {
  const isDisabled = loading || disabled;
  return (
    <button
      type={type}
      form={form}
      disabled={isDisabled}
      className={cn(
        "w-full rounded-lg bg-brand-pink py-4 text-base font-bold text-white transition-colors hover:bg-brand-pink-dark",
        loading && "cursor-not-allowed opacity-70",
        className,
      )}
    >
      {loading ? (loadingText ?? children) : children}
    </button>
  );
};

export default AuthButton;
