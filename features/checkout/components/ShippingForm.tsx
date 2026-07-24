"use client";

import AuthInput from "@/features/auth/components/AuthInput";

interface ShippingFormProps {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  government: string;
  zip: string;
  address: string;

  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setEmail: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setGovernment: (value: string) => void;
  setZip: (value: string) => void;
  setAddress: (value: string) => void;
}

const ShippingForm = ({
  name,
  phone,
  email,
  city,
  state,
  government,
  zip,
  address,
  setName,
  setPhone,
  setEmail,
  setCity,
  setState,
  setGovernment,
  setZip,
  setAddress,
}: ShippingFormProps) => {
  return (
    <div className="rounded-xl bg-white p-6 sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-neutral-900">
        Shipping information
      </h2>

      <div className="mb-4  grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AuthInput
          id="name"
          label="Name"
          value={name}
          placeholder="Ahmed Idris"
          onChange={setName}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />

        <AuthInput
          id="phone"
          label="Phone"
          type="text"
          value={phone}
          placeholder="01023456789"
          onChange={setPhone}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          placeholder="ahmed@example.com"
          onChange={setEmail}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />

        <AuthInput
          id="city"
          label="City"
          value={city}
          placeholder="Cairo"
          onChange={setCity}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AuthInput
          id="state"
          label="State"
          value={state}
          placeholder="Cairo"
          onChange={setState}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />

        <AuthInput
          id="zip"
          label="Zip"
          value={zip}
          placeholder="11211"
          onChange={setZip}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AuthInput
          id="government"
          label="Government"
          value={government}
          placeholder="Cairo"
          onChange={setGovernment}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />

        <AuthInput
          id="address"
          label="Address"
          value={address}
          placeholder="15 Street, Cairo, Egypt."
          onChange={setAddress}
          className="py-3.5"
          labelClassName="font-medium text-neutral-500"
        />
      </div>
    </div>
  );
};

export default ShippingForm;
