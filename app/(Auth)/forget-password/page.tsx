import AuthContainer from "@/features/auth/components/AuthContainer";
import AuthHero from "@/features/auth/components/AuthHero";
import ForgetPasswordForm from "@/features/auth/components/ForgetPasswordForm";

export default function ForgetPasswordPage() {
  return (
    <>
      <AuthHero />
      <AuthContainer>
        <ForgetPasswordForm />
      </AuthContainer>
    </>
  );
}
