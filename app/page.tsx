import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import BokehBackground from "@/components/BokehBackground";
import TextParallax from "@/components/TextParallax";
import MarqueeStrip from "@/components/MarqueeStrip";
import SpecsGrid from "@/components/SpecsGrid";
import CheckoutCard from "@/components/CheckoutCard";
import { content } from "@/data/content";

export default function Home() {
  return (
    <main className="min-h-screen relative w-full overflow-hidden bg-cap-dark text-white">
      <Navbar />

      {/* Fixed Elements */}
      <BokehBackground />
      <HeroCanvas />

      {/* Scrollable Content */}
      <div className="relative z-20 w-full flex flex-col">

        {/* Hero Section */}
        <header className="h-screen w-full flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="text-center relative z-30 mt-[30vh] md:mt-[40vh]">
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

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></span>
            <span className="text-[10px] font-outfit uppercase tracking-widest text-white">Scroll</span>
          </div>
        </header>

        {/* Storytelling */}
        <TextParallax />

        {/* Marquee */}
        <MarqueeStrip />

        {/* Specs */}
        <SpecsGrid />

        {/* Checkout */}
        <CheckoutCard />

        {/* Simple Footer */}
        <footer className="w-full py-8 border-t border-white/5 bg-black text-center relative z-30">
          <p className="text-white/30 font-outfit text-xs tracking-widest uppercase">© 2026 CAP Coffee. All Rights Reserved.</p>
        </footer>
      </div>
    </main>
  );
}
