import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import MissionSection from "@/components/about/MissionSection";
import ContactSection from "@/components/about/ContactSection";

export default function AboutPage() {
  return (
    <main>
      <Hero type="about" />
      <MissionSection />
      <ContactSection />
      <Features />
    </main>
  );
}
