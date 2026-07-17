"use client";

import { useRef, useState, FormEvent, ChangeEvent } from "react";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { User } from "@/features/auth/api";
import { ApiError } from "@/lib/api-client";
import { useUpdateProfile } from "@/features/auth/hooks";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Profile = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4 bg-neutral-100">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-pink"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-neutral-500">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    // Middleware already blocks this route without a token, but just in case
    return null;
  }

  // key={user.email} => force re-render when user changes, so that the form is reset with new user data
  return <ProfileForm key={user.email} initialUser={user} />;
};

export default Profile;

function ProfileForm({ initialUser }: { initialUser: User }) {
  const updateProfileMutation = useUpdateProfile();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [firstName, setFirstName] = useState(initialUser.first_name);
  const [lastName, setLastName] = useState(initialUser.last_name);
  const [email, setEmail] = useState(initialUser.email);
  const [phone, setPhone] = useState(initialUser.phone ?? "");
  const [address, setAddress] = useState(initialUser.address ?? "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error("Could not update information, please try again");
      }
    }
  };

  const imageSrc =
    avatarPreview ??
    (initialUser.image !== "default" ? initialUser.image : null);

  return (
    <>
      {/* Hero */}
      <div className="relative h-50 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Avatar */}
      <div className="flex justify-center bg-neutral-100">
        <div className="relative -mt-17.5 h-35 w-35 shrink-0 rounded-full ring-4 ring-neutral-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Profile picture"
              // width={140}
              // height={140}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-500">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Change profile picture"
            className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-white hover:bg-brand-pink/90"
          >
            <FiEdit2 size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      {/* General information */}
      <div className="flex justify-center bg-neutral-100 px-5 pb-20 pt-10">
        <div className="w-full max-w-180">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-10">
            <h2 className="mb-8 text-center text-xl font-bold text-neutral-900">
              General information
            </h2>

            <form id="profile-form" onSubmit={handleSubmit} noValidate>
              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm text-neutral-500"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 outline-none focus:border-brand-pink"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm text-neutral-500"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 outline-none focus:border-brand-pink"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-neutral-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 outline-none focus:border-brand-pink"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm text-neutral-500"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 outline-none focus:border-brand-pink"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm text-neutral-500"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3.5 text-sm text-neutral-900 outline-none focus:border-brand-pink"
                />
              </div>
            </form>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              form="profile-form"
              disabled={updateProfileMutation.isPending}
              className={cn(
                "rounded-lg bg-brand-pink px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-pink-dark",
                updateProfileMutation.isPending &&
                  "cursor-not-allowed opacity-70",
              )}
            >
              {updateProfileMutation.isPending
                ? "Updating..."
                : "Update information"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
