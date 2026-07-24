"use client";

import { ChangeEvent, KeyboardEvent, RefObject } from "react";

interface Props {
  code: string[];
  setCode: (code: string[]) => void;
  inputsRef: RefObject<(HTMLInputElement | null)[]>;
  length?: number;
}

const OtpInput = ({ code, setCode, inputsRef, length = 6 }: Props) => {
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(-1);

    const next = [...code];
    next[index] = value;
    setCode(next);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {code.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-15 w-12 rounded-lg border border-neutral-200 bg-white text-center text-xl font-semibold outline-none focus:border-brand-pink sm:h-16.25 sm:w-13.75"
        />
      ))}
    </div>
  );
};

export default OtpInput;
