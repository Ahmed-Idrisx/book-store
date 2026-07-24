import { apiRequest } from "@/lib/api-client";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export function sendContact(data: ContactPayload) {
  return apiRequest<Contact>("/contacts/store", {
    method: "POST",
    body: data,
  });
}
