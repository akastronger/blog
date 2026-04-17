import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <div className="min-h-full">
      <Hero />
      <Skills />
      <Carousel />
    </div>
  );
}
