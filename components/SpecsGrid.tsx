"use client";

import { content } from "@/data/content";

export default function SpecsGrid() {
    return (
        <div className="relative z-20 py-24 bg-black/40 backdrop-blur-md border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                {content.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                        <span className="text-cap-teal font-oswald text-sm md:text-base tracking-[0.2em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                            {spec.label}
                        </span>
                        <span className="text-3xl md:text-5xl font-outfit font-bold text-white group-hover:text-cap-teal transition-colors duration-300">
                            {spec.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
