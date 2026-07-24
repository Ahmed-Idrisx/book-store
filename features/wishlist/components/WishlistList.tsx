"use client";

import type { WishlistItem as WishlistItemType } from "@/features/wishlist/api";
import WishlistItem from "./WishlistItem";

interface WishlistListProps {
  items: WishlistItemType[];
  removingBookId?: number;
  onDelete: (item: WishlistItemType) => void;
}

const WishlistList = ({
  items,
  removingBookId,
  onDelete,
}: WishlistListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <WishlistItem
          key={item.book.id}
          item={item}
          isRemoving={removingBookId === item.book.id}
          onDelete={() => onDelete(item)}
        />
      ))}
    </div>
  );
};

export default WishlistList;
