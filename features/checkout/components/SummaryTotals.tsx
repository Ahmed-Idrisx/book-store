"use client";

interface SummaryTotalsProps {
  subtotal: number;
  tax: number;
  total: number;
}

const SummaryTotals = ({ subtotal, tax, total }: SummaryTotalsProps) => {
  return (
    <>
      <div className="mb-2 flex justify-between text-sm text-neutral-600">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="mb-2 flex justify-between text-sm text-neutral-600">
        <span>Tax</span>
        <span>${tax}</span>
      </div>
      <div className="mb-2 flex justify-between text-sm text-neutral-600">
        <span>Shipping</span>
        <span>$0</span>
      </div>
      <div className="mb-6 flex justify-between text-base">
        <span className="font-semibold text-neutral-900">Total (USD)</span>
        <span className="text-xl font-bold text-brand-pink">${total}</span>
      </div>
    </>
  );
};

export default SummaryTotals;
