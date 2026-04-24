"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Interests from "@/components/Interests";
import Goals2026 from "@/components/Goals2026";
import Carousel from "@/components/Carousel";
import AIChatCTA from "@/components/AIChatCTA";


export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-full">
      <Hero />
      <Skills />
      <Interests />
      <Goals2026 />
      <AIChatCTA />
      <Carousel />
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-10 z-100 bottom-10 h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white flex"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
