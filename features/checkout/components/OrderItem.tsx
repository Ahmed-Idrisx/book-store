"use client";

import Image from "next/image";
import { FiTruck } from "react-icons/fi";
import { getBookCoverImage } from "@/features/books/api";
import type { CartItem } from "@/features/cart/api";

interface OrderItemProps {
  item: CartItem;
}

const OrderItem = ({ item }: OrderItemProps) => {
  const cover = getBookCoverImage(item.book);

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-23.5 w-17.25 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
        {cover ? (
          <Image
            src={cover}
            alt={item.book.title}
            fill
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-1 text-center text-[9px] text-neutral-400">
            {item.book.title}
          </div>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <p className="text-sm font-bold text-neutral-900">{item.book.title}</p>
        <p className=" text-xs text-neutral-500">
          Author: <span className="font-semibold">{item.book.author}</span>
        </p>
        <p className=" inline-flex items-center gap-1 text-xs text-neutral-400">
          <FiTruck size={11} /> Free Shipping
        </p>
        <p className="text-sm font-bold text-neutral-900">${item.finalPrice}</p>
      </div>

      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-600">
        {item.qty}
      </span>
    </div>
  );
};

export default OrderItem;
