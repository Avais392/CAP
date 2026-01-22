"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import CanvasScroller from "@/components/CanvasScroller";
import BokehOverlay from "@/components/BokehOverlay";
import SmoothScroll from "@/components/SmoothScroll";
import TextSection from "@/components/TextSection";
import { Navbar, Marquee, BuyCard } from "@/components/Interface";
import { product } from "@/data/content";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll of the entire window/document
  const { scrollYProgress } = useScroll({
    target: containerRef, // Track this container specifically or default to window if undefined
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="relative w-full bg-cap-black text-white">
      <Navbar />

      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        <CanvasScroller scrollYProgress={scrollYProgress} />
        <BokehOverlay />
      </div>

      {/* Scrollable Structure with specific mapping */}
      <div className="relative z-10 w-full flex flex-col">

        {/* 
             Total Height Logic:
             We need enough height to scroll through the sequence.
             User suggested massive height E.g. 600vh.
             
             Orchestration:
             0-100vh: Hero Empty
             100-200vh: Section 1
             200-300vh: Section 2
             300-400vh: Section 3
             400-500vh: Spacing / Transition
             Bottom: Footer/BuyCard
          */}

        {/* 0vh - 100vh: Hero Placeholder */}
        <section className="h-screen w-full flex items-center justify-center pointer-events-none">
          {/* Center Title for Hero Frame */}
          <div className="text-center z-10 mt-[20vh]">
            <p className="text-cap-teal font-outfit tracking-[0.4em] text-sm font-bold uppercase mb-4">Est. 2026</p>
            <h1 className="text-[12vw] leading-[0.8] font-oswald font-bold text-white uppercase drop-shadow-2xl">
              {product.sections[0].title}
            </h1>
            <p className="text-2xl font-outfit uppercase tracking-widest mt-6 opacity-80">{product.sections[0].subtitle}</p>
          </div>
        </section>

        {/* 100vh - 200vh: Section 1 */}
        <section className="h-screen w-full flex items-center justify-center">
          <TextSection
            title={product.sections[1].title}
            description={product.sections[1].description}
            align={product.sections[1].align as any}
          />
        </section>

        {/* 200vh - 300vh: Section 2 */}
        <section className="h-screen w-full flex items-center justify-center">
          <TextSection
            title={product.sections[2].title}
            description={product.sections[2].description}
            align={product.sections[2].align as any}
          />
        </section>

        {/* 300vh - 400vh: Section 3 */}
        <section className="h-screen w-full flex items-center justify-center">
          <TextSection
            title={product.sections[3].title}
            description={product.sections[3].description}
            align={product.sections[3].align as any}
          />
        </section>

        {/* Buffer / Transition */}
        <div className="h-[50vh] w-full" />

        {/* Final Section */}
        <section className="w-full py-24 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/80 to-transparent">
          <BuyCard specs={product.specs} />
        </section>

        <Marquee />

        <footer className="w-full py-6 bg-black text-center text-white/30 text-xs uppercase tracking-widest font-outfit">
          © 2026 CAP Coffee. All Rights Reserved.
        </footer>
      </div>
    </main>
  );
}
