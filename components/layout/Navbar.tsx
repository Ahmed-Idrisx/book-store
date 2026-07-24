"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/features/cart/hooks";
import { useWishlist } from "@/features/wishlist/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBook,
  FaCartShopping,
  FaGear,
  FaRegHeart,
  FaRegUser,
} from "react-icons/fa6";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "About us", href: "/about" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { data: cart } = useCart(!!user);
  const { data: wishlist } = useWishlist(!!user);
  const cartCount = cart?.items.reduce((sum, item) => sum + item.qty, 0) ?? 0;
  const wishlistCount = wishlist?.length ?? 0;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  const hasValidImage =
    !!user?.image && user.image !== "default" && user.image.trim() !== "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 65);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(target)
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mobileMenuClasses = cn(
    "w-full lg:flex lg:w-auto lg:flex-1 lg:items-center lg:justify-between",
    mobileOpen ? "block mt-2.5 rounded-lg p-4" : "hidden",
    mobileOpen && (scrolled ? "bg-white shadow-lg" : "bg-brand-night"),
  );

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-1030  transition-[background-color] duration-400 ease-in-out  ${
        scrolled ? "bg-brand-night" : "backdrop-blur-xs"
      }`}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6 lg:px-10 xl:px-35">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 border-r border-white pr-6 mr-6 font-normal text-white"
        >
          <Image src="/images/logo.png" alt="logo" width={28} height={28} />
          Bookshop
        </Link>
        {/* Mobile toggler */}
        <button
          ref={mobileToggleRef}
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-controls="navbarMain"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          className="ml-auto flex items-center justify-center border-none  text-white lg:hidden"
        >
          <FaBars size={25} />
        </button>

        {/* Collapsible content */}
        <div id="navbarMain" ref={mobileMenuRef} className={mobileMenuClasses}>
          {/* Nav links */}
          <ul className="mb-2 flex flex-col lg:mb-0 lg:mr-auto lg:flex-row">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              const linkClasses = cn(
                "block py-2 lg:mr-10 lg:py-0 lg:text-lg font-semibold transition-colors ",
                isActive
                  ? "text-brand-amber"
                  : "text-white hover:text-brand-amber",
                mobileOpen && scrolled && "max-lg:text-brand-night",
              );
              return (
                <li key={href}>
                  <Link href={href} className={linkClasses}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* User Info || Action Buttons */}
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            {user ? (
              <>
                <div className="flex gap-4 text-2xl">
                  <Link
                    href="/wishlist"
                    className={`relative text-white transition-colors hover:text-brand-amber ${
                      mobileOpen && scrolled && "max-lg:text-brand-night"
                    }`}
                  >
                    <FaRegHeart className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 h-4 w-4 flex items-center justify-center rounded-full border-2 border-white bg-brand-pink text-[9px] text-white">
                      {wishlistCount}
                    </span>
                  </Link>
                  <Link
                    href="/cart"
                    className={`relative text-white transition-colors hover:text-brand-amber ${
                      mobileOpen && scrolled && "max-lg:text-brand-night"
                    }`}
                  >
                    <FaCartShopping className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 h-4 w-4 flex items-center justify-center rounded-full border-2 border-white bg-brand-pink text-[9px] text-white">
                      {cartCount}
                    </span>
                  </Link>
                </div>
                {/* User dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-3 rounded-lg  bg-white/10 px-3 py-0.5 backdrop-blur-sm"
                  >
                    <span className="relative">
                      {hasValidImage ? (
                        <Image
                          src={user.image as string}
                          alt="User profile"
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full border-2 border-brand-pink object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-pink bg-white/20 text-sm font-bold uppercase text-white">
                          {user.first_name.charAt(0)}
                          {user.last_name.charAt(0)}
                        </span>
                      )}
                      <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-white bg-brand-green" />
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        className={`font-semibold text-white ${
                          mobileOpen && scrolled && "max-lg:text-brand-night"
                        }`}
                      >
                        {user.first_name} {user.last_name}
                      </span>
                      <span
                        className={`text-white/70 ${
                          mobileOpen && scrolled && "max-lg:text-brand-night"
                        }`}
                      >
                        {user.email}
                      </span>
                    </div>
                  </button>
                  {/* User menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                      <ul className="flex flex-col gap-1">
                        <li>
                          <Link
                            href="/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                          >
                            <FaRegUser className="h-4 w-4 text-gray-500" />
                            <span>Profile</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/orders"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                          >
                            <FaBook className="h-4 w-4 text-gray-500" />
                            <span>My Orders</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/settings"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                          >
                            <FaGear className="h-4 w-4 text-gray-500" />
                            <span>Settings</span>
                          </Link>
                        </li>

                        <li>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center rounded-lg bg-brand-pink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-pink-dark"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="w-fit whitespace-nowrap rounded-lg border border-brand-pink bg-brand-pink px-4 py-2.5 text-white font-semibold transition-all  hover:bg-brand-pink-dark "
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="w-fit whitespace-nowrap rounded-lg border border-brand-pink bg-white px-4 py-2.5 text-brand-pink font-semibold transition-all hover:text-brand-pink-dark"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
