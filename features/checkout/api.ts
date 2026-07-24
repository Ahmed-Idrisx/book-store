import { apiRequest } from "@/lib/api-client";

export const PAYMENT_METHOD_MAP = {
  online: 1,
  cash: 2,
  pos: 3,
} as const;

export type PaymentMethodKey = keyof typeof PAYMENT_METHOD_MAP;

export interface CheckoutPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  government: string;
  payment_method: number;
  note?: string;
}

export interface CheckoutResponseData {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  government: string;
  payment_method: string;
  code: string;
  tax: number;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const ordersApi = {
  checkout: (payload: CheckoutPayload) =>
    apiRequest<CheckoutResponseData>("/order/checkout", {
      method: "POST",
      body: payload,
    }),
};
