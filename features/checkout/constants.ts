import type { PaymentMethodKey } from "./api";

export const PAYMENT_OPTIONS: {
  value: PaymentMethodKey;
  label: string;
}[] = [
  {
    value: "online",
    label: "Online payment",
  },
  {
    value: "cash",
    label: "Cash on delivery",
  },
  {
    value: "pos",
    label: "POS on delivery",
  },
];
