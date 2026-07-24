"use client";

import { useAuth } from "@/context/AuthContext";
import AuthHero from "@/features/auth/components/AuthHero";
import ProfileForm from "@/features/auth/components/ProfileForm";
import ProfileLoading from "@/features/auth/components/ProfileLoading";

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (!user) {
    // Middleware already blocks this route without a token
    return null;
  }

  return (
    <>
      <AuthHero />
      <ProfileForm key={user.email} initialUser={user} />
    </>
  );
};

export default Profile;
