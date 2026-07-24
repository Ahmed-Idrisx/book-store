"use client";

import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2, FiTruck } from "react-icons/fi";

import { getBookCoverImage } from "@/features/books/api";
import type { CartItem as CartItemType } from "@/features/cart/api";

interface CartItemProps {
  item: CartItemType;
  isUpdating: boolean;
  isRemoving: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

const CartItem = ({
  item,
  isUpdating,
  isRemoving,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemProps) => {
  const cover = getBookCoverImage(item.book);

  return (
    <div className="grid grid-cols-1 items-center gap-4 rounded-lg bg-white p-5 shadow-sm lg:grid-cols-12">
      {/* Item */}
      <div className="flex gap-4 lg:col-span-5">
        <div className="w-25 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
          <div className="relative h-full w-full">
            {cover ? (
              <Image
                src={cover}
                alt={item.book.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                {item.book.title}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="space-y-1">
            <h5 className="font-bold text-neutral-900">{item.book.title}</h5>
            <p className="text-sm text-neutral-500">
              <span className="text-neutral-400">Author: </span>
              {item.book.author}
            </p>
            <p className="mb-2 text-sm text-neutral-500">
              {item.book.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500">
              <FiTruck size={12} />
              Free Shipping
            </span>
            {item.book.asinCode && (
              <p className="text-xs text-neutral-400">
                <span className="font-semibold">ASIN:</span>{" "}
                {item.book.asinCode}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3 lg:col-span-2 lg:justify-center">
        <button
          type="button"
          onClick={onDecrease}
          disabled={item.qty <= 1 || isUpdating}
          className="text-brand-pink disabled:opacity-30"
        >
          <FiMinus size={16} />
        </button>

        <span className="w-6 text-center text-lg font-bold">{item.qty}</span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={item.qty >= item.book.stock || isUpdating}
          className="text-brand-pink disabled:opacity-30"
        >
          <FiPlus size={16} />
        </button>
      </div>

      {/* Price */}
      <div className="lg:text-center text-xl font-bold text-neutral-900 lg:col-span-2">
        <span className="lg:hidden text-md font-normal text-neutral-400">
          Book Price:{" "}
        </span>
        ${item.finalPrice}
      </div>

      {/* Total */}
      <div className="lg:text-center text-xl font-bold text-neutral-900 lg:col-span-2">
        <span className="lg:hidden text-md font-normal text-neutral-400">
          Total Price:{" "}
        </span>
        ${item.lineTotal}
      </div>

      {/* Delete */}
      <div className="flex lg:justify-center lg:col-span-1">
        <button
          type="button"
          onClick={onDelete}
          disabled={isRemoving}
          aria-label="Remove item"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-40"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
