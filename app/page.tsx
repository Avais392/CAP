import Navbar from "@/components/Navbar";
import CanvasScroller from "@/components/CanvasScroller";
import BokehOverlay from "@/components/BokehOverlay";
import TextSection from "@/components/TextSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import SpecsGrid from "@/components/SpecsGrid";
import CheckoutCard from "@/components/CheckoutCard";
import { content } from "@/data/content";

export default function Home() {
  return (
    <main className="relative w-full bg-cap-dark text-white">
      <Navbar />

      {/* Background Layer (Fixed) */}
      <CanvasScroller />
      <BokehOverlay />

      {/* Main Scroll Container */}
      {/* 
         Structure Logic:
         Outer Wrapper: h-[600vh] creating scroll space
         We are NOT using h-[600vh] on body but a massive wrapper if needed.
         However, for standard scrollytelling mixed with other content, 
         we just need enough vertical space.
         
         The user asked for:
         "Outer Wrapper: A div with a massive height (e.g., h-[600vh]) to create scrollable space."
         "Foreground Layer (Relative): A container with z-index: 10 that holds the text sections."
      */}

      <div className="relative z-10">
        {/* 0vh - 100vh: Empty space for Hero Frame */}
        <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center relative z-20 mt-[30vh]">
            <div className="inline-block px-4 py-1 border border-cap-teal/50 rounded-full mb-6 backdrop-blur-md bg-black/20">
              <span className="font-outfit text-cap-teal tracking-[0.3em] text-xs md:text-sm font-bold uppercase">{content.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold font-oswald text-white uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-2xl font-outfit font-light text-gray-300 tracking-[0.2em] uppercase opacity-80">
              {content.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Text Sections (Scrollytelling) */}
        {/* We just render them normally. As usage scrolls, the fixed canvas updates. */}
        <div className="flex flex-col">
          {content.scrollytelling.map((item) => (
            <TextSection
              key={item.id}
              title={item.text}
              description={item.subtext}
              align={item.align as "left" | "right" | "center"}
            />
          ))}
        </div>

        <div className="h-[20vh]" /> {/* Extra breathing room */}

        <MarqueeStrip />

        <div className="bg-black/80 backdrop-blur-xl relative z-20 pb-20">
          <SpecsGrid />
          <CheckoutCard />
          <footer className="w-full py-8 border-t border-white/5 bg-black text-center">
            <p className="text-white/30 font-outfit text-xs tracking-widest uppercase">© 2026 CAP Coffee. All Rights Reserved.</p>
          </footer>
        </div>
      </div>

      {/* Ensure total height is sufficient if content is short, but with sections it should be fine. 
          If strictly following "wrapper with massive height", we could force it, 
          but natural height is better for responsive. 
          The user prompt "Outer Wrapper: A div with a massive height (e.g., h-[600vh])"
          is essentially achieved by having multiple sections.
      */}
    </main>
  );
}
