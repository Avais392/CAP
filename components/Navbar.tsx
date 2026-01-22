"use client";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 pointer-events-none mix-blend-difference">
            {/* Use pointer-events-auto for interactive elements */}
            <div className="pointer-events-auto cursor-pointer group">
                <span className="text-4xl font-oswald font-bold text-white tracking-widest group-hover:text-cap-teal transition-colors">
                    CAP<span className="text-cap-teal">.</span>
                </span>
            </div>

            <button className="pointer-events-auto text-sm font-outfit text-white uppercase tracking-[0.2em] border border-white/20 px-6 py-2 rounded-full backdrop-blur-md hover:bg-white hover:text-black transition-all">
                Cart (0)
            </button>
        </nav>
    );
}
