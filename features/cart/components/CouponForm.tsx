"use client";

import { FormEvent } from "react";

interface CouponFormProps {
  promoCode: string;
  setPromoCode: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CouponForm = ({ promoCode, setPromoCode, onSubmit }: CouponFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <label className="mb-2 block text-sm text-neutral-700">
        Have a discount code?
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-neutral-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-brand-night px-6 py-3 text-sm font-bold text-white hover:bg-brand-night/90"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
