"use client";

import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiEdit3,
  FiPhone,
  FiMessageSquare,
  FiMapPin,
} from "react-icons/fi";
import { useSendContact } from "@/features/contacts/hooks";

const CONTACT_INFO = [
  { icon: FiPhone, text: "01123456789" },
  { icon: FiMessageSquare, text: "Example@gmail.com" },
  {
    icon: FiMapPin,
    text: "adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
  },
];

export default function ContactSection() {
  const sendContactMutation = useSendContact();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    sendContactMutation.mutate(
      {
        name,
        email,
        subject,
        message,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);

          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
        onError: () => {
          toast.error("Failed to send message, Try again later");
        },
      },
    );
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand-night px-6 py-16 sm:px-10"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div className="relative mx-auto grid max-w-275 grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: heading + info */}
        <div>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Have a Questions?
            <br />
            Get in Touch
          </h2>
          <p className="mb-8 text-white/60">
            Have a question about our books, your order, or need a
            recommendation? Our team is here to help. Send us a message, and
            we&apos;ll get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-4">
            {CONTACT_INFO.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-pink text-white">
                  <Icon size={16} />
                </span>
                <span className="text-sm text-white/80">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col justify-center"
        >
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 py-3.5">
              <FiUser size={16} className="shrink-0 text-white/50" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 py-3.5">
              <FiMail size={16} className="shrink-0 text-white/50" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 py-3.5">
            <FiEdit3 size={16} className="shrink-0 text-white/50" />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
            />
          </div>
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-white/20 bg-transparent px-4 py-3.5">
            <FiEdit3 size={16} className="mt-0.5 shrink-0 text-white/50" />
            <textarea
              placeholder="Your Message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={sendContactMutation.isPending}
            className="rounded-lg bg-brand-pink px-8 py-3.5 text-sm font-bold text-white hover:bg-brand-pink-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sendContactMutation.isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
