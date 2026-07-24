"use client";

import { FiArrowRight } from "react-icons/fi";

interface WishlistActionsProps {
  itemsCount: number;
  total: number;
  loading: boolean;
  onMoveToCart: () => void;
  onCheckout: () => void;
}

const WishlistActions = ({
  itemsCount,
  total,
  loading,
  onMoveToCart,
  onCheckout,
}: WishlistActionsProps) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onMoveToCart}
        disabled={loading}
        className="rounded-lg border-2 border-brand-pink px-6 py-4.5 text-sm font-bold text-brand-pink hover:bg-brand-pink/10 disabled:opacity-50"
      >
        {loading ? "Moving..." : "Move to cart"}
      </button>

      <button
        type="button"
        onClick={onCheckout}
        className="flex items-center gap-4 rounded-lg bg-brand-pink px-4 py-3 text-sm font-bold text-white hover:bg-brand-pink-dark"
      >
        <span className="flex flex-col text-left leading-tight">
          <span className="text-xs font-normal text-white/80">
            {itemsCount} Item{itemsCount !== 1 && "s"}
          </span>

          <span>${total}</span>
        </span>

        <span>Check out</span>

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-pink">
          <FiArrowRight size={14} />
        </span>
      </button>
    </div>
  );
};

export default WishlistActions;
