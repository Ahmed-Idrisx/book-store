"use client";

import { FormEvent } from "react";
import { toast } from "react-toastify";

interface PaymentSummaryProps {
  promoCode: string;
  setPromoCode: (value: string) => void;
  subtotal: number;
  tax: number;
  total: number;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const PaymentSummary = ({
  promoCode,
  setPromoCode,
  subtotal,
  tax,
  total,
  onCheckout,
  onContinueShopping,
}: PaymentSummaryProps) => {
  const handleApplyCoupon = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info("Promo codes not available yet");
  };

  return (
    <div className="rounded-xl bg-neutral-200/60 p-6 sm:p-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-bold text-neutral-900">
            Payment Summary
          </h2>
          <p className="mb-6 text-sm text-neutral-500">
            You&apos;re just one step away from completing your order. Review
            your information, confirm your purchase, and we&apos;ll take care of
            the rest.
          </p>

          <form onSubmit={handleApplyCoupon}>
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
        </div>

        {/* Right */}
        <div>
          <div className="mb-3 flex justify-between text-sm text-neutral-600">
            <span>Subtotal</span>

            <span className="font-semibold text-neutral-900">${subtotal}</span>
          </div>

          <div className="mb-3 flex justify-between text-sm text-neutral-600">
            <span>Shipping</span>
            <span className="font-semibold text-neutral-900">
              Free Delivery
            </span>
          </div>

          <div className="mb-3 flex justify-between text-sm text-neutral-600">
            <span>Tax</span>

            <span className="font-semibold text-neutral-900">${tax}</span>
          </div>

          <hr className="mb-3 border-neutral-300" />

          <div className="mb-6 flex justify-between text-base">
            <span className="text-neutral-600">Total</span>

            <span className="text-xl font-bold text-brand-pink">${total}</span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            className="mb-2 w-full rounded-lg bg-brand-pink py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-pink-dark"
          >
            Check out
          </button>

          <button
            type="button"
            onClick={onContinueShopping}
            className="w-full rounded-lg border border-brand-pink py-3.5 text-sm font-bold text-brand-pink transition-colors hover:bg-brand-pink/10"
          >
            Keep Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
