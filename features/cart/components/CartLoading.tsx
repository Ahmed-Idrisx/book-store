const CartLoading = () => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-4 bg-neutral-100">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-pink" />
      <p className="text-sm text-neutral-500">Loading your cart...</p>
    </div>
  );
};

export default CartLoading;
