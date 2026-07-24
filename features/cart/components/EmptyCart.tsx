import { FiShoppingCart } from "react-icons/fi";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-neutral-400">
      <FiShoppingCart size={48} />
      <p className="text-lg">Your cart is empty.</p>
    </div>
  );
};

export default EmptyCart;
