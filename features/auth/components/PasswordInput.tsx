"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({
  id,
  label,
  value,
  placeholder,
  autoComplete,
  helperText,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-neutral-900"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-4 pr-11 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-pink"
        />

        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      {helperText && (
        <p className="mt-2 text-xs text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};

export default PasswordInput;
