"use client";

// Predefined bokeh circles with diverse start positions and animation params
const bokehConfig = [...Array(12)].map((_, i) => ({
    size: Math.random() * 300 + 100, // 100px - 400px
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 20 + 20, // 20s - 40s
    delay: Math.random() * -20,
    color: i % 3 === 0 ? "bg-[#FFD700]" : "bg-[#00897B]", // Gold or Teal
    opacity: "opacity-10",
}));

export default function BokehOverlay() {
    return (
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden mix-blend-screen">
            {bokehConfig.map((circle, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full blur-[80px] animate-float ${circle.color} ${circle.opacity}`}
                    style={{
                        width: `${circle.size}px`,
                        height: `${circle.size}px`,
                        top: `${circle.top}%`,
                        left: `${circle.left}%`,
                        animationDuration: `${circle.duration}s`,
                        animationDelay: `${circle.delay}s`,
                    }}
                />
            ))}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 50px) scale(0.9); }
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
