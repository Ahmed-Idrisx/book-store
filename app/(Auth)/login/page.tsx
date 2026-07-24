import AuthContainer from "@/features/auth/components/AuthContainer";
import AuthHero from "@/features/auth/components/AuthHero";
import LoginForm from "@/features/auth/components/LoginForm";

const login = () => {
  return (
    <>
      <AuthHero />
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </>
  );
};

export default login;
