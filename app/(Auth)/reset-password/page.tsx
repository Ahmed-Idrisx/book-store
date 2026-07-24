import AuthContainer from "@/features/auth/components/AuthContainer";
import AuthHero from "@/features/auth/components/AuthHero";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <AuthHero />
      <AuthContainer>
        <ResetPasswordForm />
      </AuthContainer>
    </>
  );
}
