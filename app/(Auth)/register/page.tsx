import AuthContainer from "@/features/auth/components/AuthContainer";
import AuthHero from "@/features/auth/components/AuthHero";
import RegisterForm from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <AuthHero />
      <AuthContainer>
        <RegisterForm />
      </AuthContainer>
    </>
  );
}
