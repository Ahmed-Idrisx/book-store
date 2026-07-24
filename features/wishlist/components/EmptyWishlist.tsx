import { FiHeart } from "react-icons/fi";

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-neutral-400">
      <FiHeart size={48} />
      <p className="text-lg">Your wishlist is empty.</p>
    </div>
  );
};

export default EmptyWishlist;
