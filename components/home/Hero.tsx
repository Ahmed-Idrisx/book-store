"use client";

import { FiMic, FiSearch } from "react-icons/fi";

interface HeroProps {
  type?: "home" | "about";
}

export default function Hero({ type = "home" }: HeroProps) {
  return (
    <section className="relative flex h-150 w-full items-center justify-center max-sm:h-105">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-1 w-full max-w-175 px-5 text-center">
        {type === "home" ? (
          <>
            <h1 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
              Discover Your Next Favorite Book
            </h1>
            <div className="flex items-center rounded-full bg-white p-2 shadow-lg">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              <button
                type="button"
                aria-label="Voice search"
                className="flex h-10 w-10 items-center justify-center text-neutral-400 hover:text-neutral-600"
              >
                <FiMic size={18} />
              </button>
              <button
                type="button"
                aria-label="Search"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white hover:bg-brand-pink-dark"
              >
                <FiSearch size={18} />
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
              About Bookshop
            </h1>
            <p className="text-xl text-white/80">
              At Bookshop, we believe every book has the power to inspire,
              educate, and entertain. Our mission is to connect readers with
              quality books at affordable prices while providing a seamless
              shopping experience, secure payments, and reliable nationwide
              delivery.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
