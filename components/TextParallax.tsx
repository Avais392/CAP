"use client";

import { content } from "@/data/content";
import { motion } from "framer-motion";

export default function TextParallax() {
    return (
        <div className="w-full relative z-20 flex flex-col">
            {content.scrollytelling.map((item) => (
                <Section key={item.id} item={item} />
            ))}
        </div>
    );
}

function Section({ item }: { item: typeof content.scrollytelling[0] }) {
    return (
        <section className="min-h-screen flex items-center justify-center w-full px-6 md:px-12 py-24 pointer-events-none">
            <motion.div
                initial={{
                    opacity: 0,
                    x: item.align === 'left' ? -100 : item.align === 'right' ? 100 : 0,
                    scale: item.align === 'center' ? 0.8 : 1
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: item.align === 'center' ? 1.2 : 1
                }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`flex flex-col max-w-7xl w-full ${item.align === 'left' ? 'items-start text-left' :
                        item.align === 'right' ? 'items-end text-right' :
                            'items-center text-center'
                    }`}
            >
                <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-oswald text-white drop-shadow-2xl leading-[0.9] tracking-tighter uppercase break-words">
                    {item.text}
                </h2>
                <p className="text-xl md:text-3xl font-outfit text-gray-200 mt-6 max-w-3xl drop-shadow-lg font-light">
                    {item.subtext}
                </p>
            </motion.div>
        </section>
    );
}
