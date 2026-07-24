import { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <div className="flex justify-center bg-neutral-100 px-5 pb-20 pt-14">
      <div className="w-full max-w-140">{children}</div>
    </div>
  );
};

export default AuthContainer;
