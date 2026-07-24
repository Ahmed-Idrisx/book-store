"use client";

import { FormEvent } from "react";
import { TfiTicket } from "react-icons/tfi";

interface CouponFormProps {
  promoCode: string;
  setPromoCode: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CouponForm = ({ promoCode, setPromoCode, onSubmit }: CouponFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="coupon" className="text-sm text-neutral-700">
        Have a discount code?
      </label>

      <div className="mb-5 mt-2 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5">
          <TfiTicket size={14} className="shrink-0 text-neutral-400" />
          <input
            id="coupon"
            type="text"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-brand-night px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-night/90"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
