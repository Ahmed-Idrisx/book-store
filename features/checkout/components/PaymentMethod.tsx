"use client";

import { cn } from "@/lib/utils";

import { PAYMENT_OPTIONS } from "../constants";
import { PaymentMethodKey } from "../api";

interface PaymentMethodProps {
  paymentMethod: PaymentMethodKey;
  setPaymentMethod: (value: PaymentMethodKey) => void;
}

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodProps) => {
  return (
    <div className="rounded-xl bg-white p-6 sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-neutral-900">
        Payment Method
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PAYMENT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3.5 text-sm",
              paymentMethod === opt.value
                ? "border-brand-pink bg-brand-pink/10 text-brand-pink"
                : "border-neutral-200 text-neutral-700",
            )}
          >
            <input
              type="radio"
              name="payment"
              value={opt.value}
              checked={paymentMethod === opt.value}
              onChange={() => setPaymentMethod(opt.value)}
              className="accent-brand-pink"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
