"use client";

import { motion } from "framer-motion";

export default function CheckoutCard() {
    return (
        <div className="w-full flex justify-center py-24 relative z-30 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
            >
                {/* Shiny gradient efffect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <h3 className="text-4xl font-oswald text-white mb-2 uppercase">Secure The Cap</h3>
                <p className="text-gray-400 font-outfit mb-8">Limited drop. Once it's gone, it's gone.</p>

                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                    <div>
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Price</p>
                        <span className="text-5xl font-bold font-oswald text-cap-teal">PKR 450</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-green-400 font-mono font-bold tracking-wider">IN STOCK</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button className="w-full py-4 bg-cap-teal text-white font-oswald text-xl uppercase tracking-widest hover:bg-[#007a6e] hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl shadow-[0_0_20px_rgba(0,137,123,0.4)]">
                        Order Now
                    </button>
                    <button className="w-full py-4 bg-transparent border border-white/20 text-white font-oswald text-xl uppercase tracking-widest hover:bg-white/5 hover:border-white/40 transition-all rounded-xl">
                        Gift a Cap
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
