"use client";

import { motion } from "framer-motion";

interface Props {
    title: string;
    description?: string;
    align: "left" | "right" | "center";
}

export default function TextSection({ title, description, align }: Props) {
    const xAnimate = align === "left" ? -100 : align === "right" ? 100 : 0;
    const yAnimate = align === "center" ? 50 : 0;

    return (
        <div className={`w-full flex ${align === "left" ? "justify-start text-left" :
                align === "right" ? "justify-end text-right" :
                    "justify-center text-center"
            }`}>
            <motion.div
                initial={{ opacity: 0, x: xAnimate, y: yAnimate }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ amount: 0.5, once: false }} // Re-trigger potentially
                className="max-w-4xl px-8"
            >
                <h2 className="text-6xl md:text-8xl font-bold font-oswald text-white uppercase leading-none drop-shadow-xl mb-4">
                    {title}
                </h2>
                {description && (
                    <p className="text-xl md:text-3xl font-outfit text-gray-200 font-light drop-shadow-md">
                        {description}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
