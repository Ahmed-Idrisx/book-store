import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface MissionCard {
  title: string;
  text: string;
  action: { label: string; href: string } | "soon";
}

const MISSION_CARDS: MissionCard[] = [
  {
    title: "Quality Selection",
    text: "We carefully curate a diverse collection of books across every genre, ensuring our readers always have access to inspiring stories, trusted bestsellers, and timeless classics that enrich every reading journey.",
    action: {
      label: "Browse Books",
      href: "/books",
    },
  },
  {
    title: "Exceptional Service",
    text: "Our commitment goes beyond selling books. We provide a seamless shopping experience, secure payments, fast delivery, and dedicated customer support to help you every step of the way.",
    action: {
      label: "Contact Us",
      href: "#contact",
    },
  },
  {
    title: "Growing Community",
    text: "We're building more than a bookstore—we're creating a community of passionate readers. Discover new releases, share recommendations, and stay connected as we continue to grow and bring more to book lovers everywhere.",
    action: "soon",
  },
];

export default function MissionSection() {
  return (
    <section className="bg-neutral-100 px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-275">
        <h2 className="mb-10 text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          Our Mission
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MISSION_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-xl bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 font-bold text-neutral-900">{card.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-500">
                {card.text}
              </p>
              {card.action === "soon" ? (
                <span className="text-sm font-bold text-brand-pink">Soon</span>
              ) : (
                <Link
                  href={card.action.href}
                  className="flex items-center gap-1.5 text-sm font-bold text-brand-pink hover:underline"
                >
                  {card.action.label}
                  <FiArrowRight size={14} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
