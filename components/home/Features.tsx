import { FaTruck, FaLock, FaUndoAlt, FaHeadset } from "react-icons/fa";

const FEATURES = [
  {
    icon: FaTruck,
    title: "Fast Book Delivery",
    text: "Get your favorite books delivered to your doorstep quickly with reliable nationwide shipping and live order tracking.",
  },
  {
    icon: FaLock,
    title: "Safe & Secure Checkout",
    text: "Your payments are protected with industry-standard encryption, ensuring every transaction is safe and secure.",
  },
  {
    icon: FaUndoAlt,
    title: "Hassle-Free Returns",
    text: "If your order arrives damaged or isn't what you expected, you can easily request a return within our return period.",
  },
  {
    icon: FaHeadset,
    title: "Dedicated Book Support",
    text: "Need help finding a book or tracking an order? Our support team is always ready to assist you with fast and friendly service.",
  },
];
export default function Features() {
  return (
    <section className="bg-neutral-100 px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-300 grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex gap-4">
              <Icon size={28} className="mt-1 shrink-0 text-neutral-700" />
              <div>
                <h5 className="mb-2 font-bold text-neutral-900">
                  {feature.title}
                </h5>
                <p className="text-sm leading-relaxed text-neutral-500">
                  {feature.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
