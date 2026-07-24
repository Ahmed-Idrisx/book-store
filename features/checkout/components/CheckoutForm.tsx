"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCart } from "@/features/cart/hooks";
import {
  PAYMENT_METHOD_MAP,
  type PaymentMethodKey,
} from "@/features/checkout/api";
import { useCheckout } from "@/features/checkout/hooks";

import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import OrderNote from "./OrderNote";
import OrderSummary from "./OrderSummary";
import CheckoutLoading from "./CheckoutLoading";

const CheckoutForm = () => {
  const router = useRouter();

  const { data: cart, isLoading } = useCart();

  const checkoutMutation = useCheckout();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [government, setGovernment] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKey>("cash");

  const [promoCode, setPromoCode] = useState("");

  const items = cart?.items ?? [];

  const subtotal = cart?.subTotal ?? 0;
  const tax = cart?.tax ?? 0;
  const total = cart?.total ?? 0;

  const handleApplyCoupon = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    toast.info("Coupons are not available at the moment");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !phone ||
      !email ||
      !city ||
      !state ||
      !government ||
      !zip ||
      !address
    ) {
      toast.error("Please fill in all shipping fields");
      return;
    }

    if (phone.length < 10 || phone.length > 15) {
      toast.error("The phone field must be between 10 and 15 digits.");
      return;
    }

    if (zip.length !== 5) {
      toast.error("The ZIP code must be exactly 5 digits.");
      return;
    }

    checkoutMutation.mutate(
      {
        name,
        phone,
        email,
        city,
        state,
        zip,
        address,
        government,
        payment_method: PAYMENT_METHOD_MAP[paymentMethod],
        note,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          router.push("/orders");
        },
        onError: () => {
          toast.error("Could not place order, Try again later");
        },
      },
    );
  };

  if (isLoading) {
    return <CheckoutLoading />;
  }

  return (
    <div className="mx-auto max-w-325 px-5 py-10 sm:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
        {/* LEFT: the real checkout form */}
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="order-2 flex flex-col gap-6 lg:order-1"
        >
          {/* Shipping */}
          <ShippingForm
            name={name}
            phone={phone}
            email={email}
            city={city}
            state={state}
            government={government}
            zip={zip}
            address={address}
            setName={setName}
            setPhone={setPhone}
            setEmail={setEmail}
            setCity={setCity}
            setState={setState}
            setGovernment={setGovernment}
            setZip={setZip}
            setAddress={setAddress}
          />
          {/* Payment */}
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          {/* Note */}
          <OrderNote note={note} setNote={setNote} />
        </form>
        {/* RIGHT: order summary */}
        <OrderSummary
          items={items}
          subtotal={subtotal}
          tax={tax}
          total={total}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          onApplyCoupon={handleApplyCoupon}
          loading={checkoutMutation.isPending}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
