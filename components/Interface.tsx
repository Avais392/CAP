"use client";

import { motion } from "framer-motion";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/10 border-b border-white/5">
            <div className="text-3xl font-oswald font-bold text-white tracking-widest">
                CAP<span className="text-cap-teal">.</span>
            </div>
            <div className="font-outfit text-sm uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full text-white">
                Cart (0)
            </div>
        </nav>
    );
}

export function Marquee() {
    return (
        <div className="w-full bg-cap-teal py-4 overflow-hidden border-y border-black relative z-20">
            <motion.div
                className="whitespace-nowrap flex"
                animate={{ x: "-100%" }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-oswald font-bold text-black mx-8">
                        WORDS CANNOT ESPRESSO HOW MUCH YOU MEAN TO ME •
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function BuyCard({ specs }: { specs: { label: string, value: string }[] }) {
    return (
        <div className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">
            <h3 className="text-4xl font-oswald text-white mb-2">SECURE THE CAP</h3>
            <p className="text-gray-400 font-outfit mb-6">Limited Drop. 2026 Edition.</p>

            <div className="grid grid-cols-3 gap-4 mb-8 border-y border-white/10 py-4">
                {specs.map((s, i) => (
                    <div key={i}>
                        <div className="text-xs text-cap-teal uppercase tracking-widest">{s.label}</div>
                        <div className="text-lg text-white font-bold">{s.value}</div>
                    </div>
                ))}
            </div>

            <button className="w-full bg-cap-teal text-white font-oswald text-xl uppercase py-4 rounded-xl hover:bg-white hover:text-cap-teal transition-all shadow-[0_0_20px_rgba(0,137,123,0.3)]">
                Order Now - PKR 450
            </button>
        </div>
    )
}
