"use client";

import { FormEvent } from "react";
import type { CartItem } from "@/features/cart/api";
import AuthButton from "@/features/auth/components/AuthButton";

import CouponForm from "./CouponForm";
import OrderItem from "./OrderItem";
import SummaryTotals from "./SummaryTotals";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;

  promoCode: string;
  setPromoCode: (value: string) => void;
  onApplyCoupon: (e: FormEvent<HTMLFormElement>) => void;

  loading: boolean;
}

const OrderSummary = ({
  items,
  subtotal,
  tax,
  total,
  promoCode,
  setPromoCode,
  onApplyCoupon,
  loading,
}: OrderSummaryProps) => {
  return (
    <div className="order-1 h-fit rounded-xl bg-white p-6 lg:order-2 sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-neutral-900">Order summary</h2>

      <div className="mb-6 flex flex-col gap-5">
        {items.map((item) => (
          <OrderItem key={item.cartId} item={item} />
        ))}
      </div>

      <hr className="mb-5 border-neutral-200" />

      <CouponForm
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        onSubmit={onApplyCoupon}
      />

      <hr className="mb-5 border-neutral-200" />

      <SummaryTotals subtotal={subtotal} tax={tax} total={total} />

      <AuthButton
        type="submit"
        form="checkout-form"
        loading={loading}
        loadingText="Placing order..."
        disabled={items.length === 0}
      >
        Confirm order
      </AuthButton>
    </div>
  );
};

export default OrderSummary;
