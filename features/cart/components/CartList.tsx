"use client";

import type { CartItem as CartItemType } from "@/features/cart/api";
import CartItem from "./CartItem";

interface CartListProps {
  items: CartItemType[];
  updatingBookId?: number;
  removingCartId?: number;
  onIncrease: (item: CartItemType) => void;
  onDecrease: (item: CartItemType) => void;
  onDelete: (item: CartItemType) => void;
}

const CartList = ({
  items,
  updatingBookId,
  removingCartId,
  onIncrease,
  onDecrease,
  onDelete,
}: CartListProps) => {
  return (
    <div className="mb-8 flex flex-col gap-2">
      {items.map((item) => (
        <CartItem
          key={item.cartId}
          item={item}
          isUpdating={updatingBookId === item.bookId}
          isRemoving={removingCartId === item.cartId}
          onIncrease={() => onIncrease(item)}
          onDecrease={() => onDecrease(item)}
          onDelete={() => onDelete(item)}
        />
      ))}
    </div>
  );
};

export default CartList;
