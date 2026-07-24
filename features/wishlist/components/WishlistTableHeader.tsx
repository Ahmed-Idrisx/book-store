const WishlistTableHeader = () => {
  return (
    <div className="mb-4 hidden grid-cols-12 px-5 text-center text-sm font-bold text-neutral-700 lg:grid">
      <div className="col-span-7 text-left">Item</div>
      <div className="col-span-3">Price</div>
      <div className="col-span-2">Actions</div>
    </div>
  );
};

export default WishlistTableHeader;
