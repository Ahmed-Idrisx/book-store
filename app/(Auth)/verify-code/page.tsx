import AuthContainer from "@/features/auth/components/AuthContainer";
import AuthHero from "@/features/auth/components/AuthHero";
import VerifyCodeForm from "@/features/auth/components/VerifyCodeForm";

export default function VerifyCodePage() {
  return (
    <>
      <AuthHero />
      <AuthContainer>
        <VerifyCodeForm />
      </AuthContainer>
    </>
  );
}
