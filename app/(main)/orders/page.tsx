import Hero from "@/features/checkout/components/Hero";
import Link from "next/link";
import { FiClock, FiArrowLeft } from "react-icons/fi";

export default function OrdersPage() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      <div className="mx-auto flex max-w-150 flex-col items-center px-5 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-brand-pink">
          <FiClock size={28} />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-neutral-900">
          My Orders — Coming Soon
        </h1>
        <p className="mb-8 text-sm text-neutral-500">
          We&apos;re working on bringing your order history to this page. Check
          back soon.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-brand-pink px-6 py-3 text-sm font-bold text-white hover:bg-brand-pink-dark"
        >
          <FiArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
