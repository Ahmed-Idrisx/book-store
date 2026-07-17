import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "About Us", href: "/about" },
];

const SOCIAL = [
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
  { Icon: FaXTwitter, href: "#", label: "X (Twitter)" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-night py-10 text-white">
      <div className="container mx-auto px-4">
        {/* Top */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left */}
          <div className="flex flex-wrap items-center">
            <div className="flex items-center gap-2 text-sm font-semibold border-r border-white pr-6 mr-6">
              <Image src="/images/logo.png" alt="logo" width={30} height={30} />
              <span>Bookshop</span>
            </div>

            <nav className="flex gap-4">
              {FOOTER_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-semibold transition-colors duration-200 hover:text-brand-amber"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-2xl transition-colors duration-200 hover:text-brand-amber"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        {/* Divider */}
        <hr className="my-6 border-white/50" />

        {/* Bottom */}

        <p className="text-center text-sm font-normal text-white">
          &lt;Developed By&gt; Ahmed Idris &lt;All Copy Rights Reserved
          @2026&gt;
        </p>
      </div>
    </footer>
  );
}
