"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/api-client";
import { User } from "@/features/auth/api";
import { useUpdateProfile } from "@/features/auth/hooks";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileFormProps {
  initialUser: User;
}

const ProfileForm = ({ initialUser }: ProfileFormProps) => {
  const updateProfileMutation = useUpdateProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  const [firstName, setFirstName] = useState(initialUser.first_name);
  const [lastName, setLastName] = useState(initialUser.last_name);
  const [email, setEmail] = useState(initialUser.email);
  const [phone, setPhone] = useState(initialUser.phone ?? "");
  const [address, setAddress] = useState(initialUser.address ?? "");

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (firstName.trim().length < 3) {
      toast.error("First name must be at least 3 characters.");
      return;
    }

    if (lastName.trim().length < 3) {
      toast.error("Last name must be at least 3 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^(010|011|012|015|\+20)\d{8}$/;

    if (!phoneRegex.test(phone.trim())) {
      toast.error(
        "Phone number must start with 010, 011, 012, 015 or +20 and be valid.",
      );
      return;
    }

    if (address.trim().length < 10) {
      toast.error("Address must be at least 10 characters.");
      return;
    }

    try {
      const res = await updateProfileMutation.mutateAsync({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        image: avatarFile,
      });

      setAvatarPreview(null);
      setAvatarFile(undefined);

      toast.success(res.message);
    } catch {
      toast.error("Could not update information, please try again");
    }
  };

  const imageSrc =
    avatarPreview ??
    (initialUser.image !== "default" ? initialUser.image : null);

  return (
    <>
      <ProfileAvatar
        imageSrc={imageSrc}
        firstName={firstName}
        lastName={lastName}
        fileInputRef={fileInputRef}
        onChange={handleAvatarChange}
      />

      <div className="flex justify-center bg-neutral-100 px-5 pb-20 pt-10">
        <div className="w-full max-w-180">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-10">
            <h2 className="mb-8 text-center text-xl font-bold text-brand-pink">
              General Information
            </h2>

            <form
              id="profile-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <AuthInput
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                  labelClassName="font-normal text-neutral-500"
                />

                <AuthInput
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                  labelClassName="font-normal text-neutral-500"
                />
              </div>

              <AuthInput
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={setEmail}
                labelClassName="font-normal text-neutral-500"
              />

              <AuthInput
                id="phone"
                type="tel"
                label="Phone Number"
                value={phone}
                onChange={setPhone}
                labelClassName="font-normal text-neutral-500"
              />

              <AuthInput
                id="address"
                label="Address"
                value={address}
                onChange={setAddress}
                labelClassName="font-normal text-neutral-500"
              />
            </form>
          </div>

          <div className="mt-6 flex justify-center">
            <AuthButton
              form="profile-form"
              loading={updateProfileMutation.isPending}
              loadingText="Updating..."
              className="w-auto px-8 py-3.5"
            >
              Update information
            </AuthButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
