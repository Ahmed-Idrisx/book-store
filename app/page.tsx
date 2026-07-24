import BestSeller from "@/components/home/BestSeller";
import Features from "@/components/home/Features";
import FlashSale from "@/components/home/FlashSale";
import Hero from "@/components/home/Hero";
import Recommended from "@/components/home/Recommended";

export default function Home() {
  return (
    <main>
      <Hero type="home" />
      <Features />
      <BestSeller />
      <Recommended />
      <FlashSale />
    </main>
  );
}
