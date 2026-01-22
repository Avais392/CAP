"use client";

// Predefined config for circles
const circles = [...Array(15)].map((_, i) => ({
    width: Math.random() * 300 + 50,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 20 + 20, // 20-40s
    delay: Math.random() * -20,
    color: i % 2 === 0 ? "rgba(255, 215, 0, 0.15)" : "rgba(0, 137, 123, 0.15)" // Gold vs Teal
}));

export default function BokehOverlay() {
    return (
        <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden bg-transparent">
            {circles.map((c, i) => (
                <div
                    key={i}
                    className="absolute rounded-full blur-[60px] animate-float"
                    style={{
                        width: c.width,
                        height: c.width, // Circle
                        backgroundColor: c.color,
                        top: `${c.top}%`,
                        left: `${c.left}%`,
                        animationDuration: `${c.duration}s`,
                        animationDelay: `${c.delay}s`,
                    }}
                />
            ))}
            <style jsx global>{`
           @keyframes float {
               0%, 100% { transform: translate(0, 0); }
               50% { transform: translate(30px, -30px); }
           }
           .animate-float {
               animation-name: float;
               animation-timing-function: ease-in-out;
               animation-iteration-count: infinite;
           }
        `}</style>
        </div>
    );
}
