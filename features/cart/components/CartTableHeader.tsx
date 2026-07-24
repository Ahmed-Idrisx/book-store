const CartTableHeader = () => {
  return (
    <div className="mb-4 hidden grid-cols-12 px-5 text-center text-sm font-bold text-neutral-700 lg:grid">
      <div className="col-span-5 text-left">Item</div>
      <div className="col-span-2">Quantity</div>
      <div className="col-span-2">Price</div>
      <div className="col-span-2">Total Price</div>
      <div className="col-span-1">Actions</div>
    </div>
  );
};

export default CartTableHeader;
