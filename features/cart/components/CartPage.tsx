"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  useCart,
  useUpdateCartQty,
  useRemoveFromCart,
} from "@/features/cart/hooks";
import type { CartItem } from "@/features/cart/api";

import CartLoading from "./CartLoading";
import EmptyCart from "./EmptyCart";
import CartTableHeader from "./CartTableHeader";
import PaymentSummary from "./PaymentSummary";
import Hero from "./Hero";
import CartList from "./CartList";

const CartPage = () => {
  const router = useRouter();

  const { data, isLoading } = useCart();

  const updateQtyMutation = useUpdateCartQty();
  const removeMutation = useRemoveFromCart();

  const [promoCode, setPromoCode] = useState("");

  const items = data?.items ?? [];

  const updatingBookId =
    updateQtyMutation.isPending && updateQtyMutation.variables
      ? Number(updateQtyMutation.variables.bookId)
      : undefined;

  const removingCartId =
    removeMutation.isPending && removeMutation.variables
      ? Number(removeMutation.variables)
      : undefined;

  const handleIncrease = (item: CartItem) => {
    updateQtyMutation.mutate(
      {
        bookId: item.bookId,
        qty: item.qty + 1,
      },
      {
        onError: () => {
          toast.error("Could not update quantity, Try again later");
        },
      },
    );
  };

  const handleDecrease = (item: CartItem) => {
    if (item.qty <= 1) return;

    updateQtyMutation.mutate(
      {
        bookId: item.bookId,
        qty: item.qty - 1,
      },
      {
        onError: () => {
          toast.error("Could not update quantity, Try again later");
        },
      },
    );
  };

  const handleDelete = (item: CartItem) => {
    removeMutation.mutate(item.cartId, {
      onSuccess: (response) => toast.success(response.message),
      onError: () => {
        toast.error("Could not remove item, Try again later");
      },
    });
  };

  if (isLoading) {
    return <CartLoading />;
  }

  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-300 px-5 py-10 sm:px-8">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <CartTableHeader />

            <CartList
              items={items}
              updatingBookId={updatingBookId}
              removingCartId={removingCartId}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onDelete={handleDelete}
            />

            <PaymentSummary
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              subtotal={data?.subTotal ?? 0}
              tax={data?.tax ?? 0}
              total={data?.total ?? 0}
              onCheckout={() => router.push("/checkout")}
              onContinueShopping={() => router.push("/books")}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage;
