"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  type: "login" | "signup";
}

const SocialLogin = ({ type }: Props) => {
  return (
    <>
      <div className="my-5 text-center text-sm text-neutral-400">or</div>

      <button
        type="button"
        onClick={() => toast.info("Google login is not implemented yet")}
        className="mb-3.5 flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white py-3.5 text-sm text-neutral-900 hover:bg-neutral-50"
      >
        <FcGoogle size={20} />
        {type === "login" ? "Login with Google" : "Sign up with Google"}
      </button>

      <button
        type="button"
        onClick={() => toast.info("Facebook login is not implemented yet")}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white py-3.5 text-sm text-neutral-900 hover:bg-neutral-50"
      >
        <FaFacebook size={20} className="text-[#1877F2]" />
        {type === "login" ? "Login with Facebook" : "Sign up with Facebook"}
      </button>
    </>
  );
};

export default SocialLogin;
