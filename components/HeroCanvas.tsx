"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll();
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Load Image Sequence
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        const totalFrames = 120;
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            // Placeholder path: assumes images are in public/images/sequence/
            img.src = `/images/sequence/${i}.webp`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) setImagesLoaded(true);
            };
            img.onerror = () => {
                // If images are invalid/missing, we still mark as loaded to allow fallback
                loadedCount++;
                if (loadedCount === totalFrames) setImagesLoaded(true);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Update Canvas Size
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                // Trigger a redraw if needed, or wait for scroll
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Draw Logic
    const draw = (progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const frameIndex = Math.min(119, Math.floor(progress * 119));
        const activeImg = images[frameIndex];

        if (activeImg && activeImg.naturalHeight > 0) {
            // Calculate scale to "contain" or "cover"
            // We want the cup to be prominent. Contain is safer.
            const imgAspect = activeImg.width / activeImg.height;
            const canvasAspect = width / height;

            let drawWidth, drawHeight;

            if (canvasAspect > imgAspect) {
                drawHeight = height * 0.8; // 80% height
                drawWidth = drawHeight * imgAspect;
            } else {
                drawWidth = width * 0.8; // 80% width
                drawHeight = drawWidth / imgAspect;
            }

            const x = (width - drawWidth) / 2;
            const y = (height - drawHeight) / 2;

            ctx.drawImage(activeImg, x, y, drawWidth, drawHeight);
        } else {
            // Fallback Drawing (Teal Cup Representation)
            const centerX = width / 2;
            const centerY = height / 2;

            // Draw a Teal Circle/Cup shape
            ctx.fillStyle = "#00897B";
            ctx.beginPath();
            // Scale circle slightly with scroll
            const scale = 1 + progress * 0.2;
            ctx.arc(centerX, centerY, 150 * scale, 0, 2 * Math.PI);
            ctx.fill();

            // Add Shadow
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 20;

            // Text
            ctx.font = "bold 24px Oswald, sans-serif";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("THE SIGNATURE CAP", centerX, centerY);
            ctx.shadowColor = "transparent";
        }
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        draw(latest);
    });

    // Initial draw to show something before scroll
    useEffect(() => {
        draw(0);
    }, [imagesLoaded]); // Redraw when images report loaded (or failed and fallback ready)

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none sticky top-0">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
