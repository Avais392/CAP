"use client";

import { motion } from "framer-motion";

interface TextSectionProps {
    title: string;
    description?: string;
    align: "left" | "right" | "center";
}

export default function TextSection({ title, description, align }: TextSectionProps) {
    const xAnimate = align === "left" ? -100 : align === "right" ? 100 : 0;
    const yAnimate = align === "center" ? 100 : 0; // Fade up for center

    return (
        <section className={`min-h-screen flex items-center w-full px-6 md:px-20 py-24 ${align === "left" ? "justify-start text-left" :
                align === "right" ? "justify-end text-right" :
                    "justify-center text-center"
            }`}>
            <motion.div
                initial={{ opacity: 0, x: xAnimate, y: yAnimate }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                className="max-w-4xl"
            >
                <h2 className="text-6xl md:text-8xl font-bold font-oswald text-white uppercase leading-[0.9] drop-shadow-lg mb-6">
                    {title}
                </h2>
                {description && (
                    <p className="text-xl md:text-3xl font-outfit text-gray-200 font-light drop-shadow-md">
                        {description}
                    </p>
                )}
            </motion.div>
        </section>
    );
}
