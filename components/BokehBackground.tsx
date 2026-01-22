"use client";

export default function BokehBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-cap-dark">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cap-dark via-transparent to-transparent z-10" />

            {/* Bokeh Elements */}
            <div className="absolute inset-0 z-0">
                {[...Array(15)].map((_, i) => {
                    const size = Math.floor(Math.random() * 400) + 100;
                    return (
                        <div
                            key={i}
                            className="absolute rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-slow-spin"
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                backgroundColor: i % 3 === 0 ? "#FFD700" : "#00897B", // Gold and Teal
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 50 + 30}s`,
                                animationDelay: `-${Math.random() * 50}s`,
                                transformOrigin: `${Math.random() * 100 - 50}px ${Math.random() * 100 - 50}px`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
