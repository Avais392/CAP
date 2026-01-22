"use client";

import { content } from "@/data/content";
import { motion } from "framer-motion";

export default function MarqueeStrip() {
    return (
        <div className="w-full bg-black py-10 overflow-hidden relative z-30 border-y border-white/10">
            <div className="relative flex select-none overflow-hidden">
                <motion.div
                    animate={{ x: "-100%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex whitespace-nowrap"
                >
                    {/* Repeat enough times to fill width */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex">
                            {content.marquee.map((text, j) => (
                                <span key={`${i}-${j}`} className="text-5xl md:text-7xl font-oswald font-bold text-cap-teal mx-8 uppercase">
                                    {text} <span className="text-white/20 mx-4">•</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate for seamless loop (actually my loop above uses x: -100% of the container, so I need to ensure 2nd copy follows instantly. 
            The efficient way is 2 divs. 
        */}
                <motion.div
                    animate={{ x: "-100%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex whitespace-nowrap absolute top-0 left-full"
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex">
                            {content.marquee.map((text, j) => (
                                <span key={`${i}-${j}`} className="text-5xl md:text-7xl font-oswald font-bold text-cap-teal mx-8 uppercase">
                                    {text} <span className="text-white/20 mx-4">•</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
