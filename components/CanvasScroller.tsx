"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function CanvasScroller() {
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
            img.src = `/images/sequence/${i}.webp`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) setImagesLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalFrames) setImagesLoaded(true);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Responsive Canvas Sizing
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                // Set canvas dimensions to match window
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Draw Function
    const renderFrame = (progress: number) => {
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
            // "Contain" logic
            const imgAspect = activeImg.width / activeImg.height;
            const canvasAspect = width / height;

            let drawWidth, drawHeight;

            if (canvasAspect > imgAspect) {
                drawHeight = height * 0.9;
                drawWidth = drawHeight * imgAspect;
            } else {
                drawWidth = width * 0.9;
                drawHeight = drawWidth / imgAspect;
            }

            const x = (width - drawWidth) / 2;
            const y = (height - drawHeight) / 2;

            ctx.drawImage(activeImg, x, y, drawWidth, drawHeight);
        } else {
            // Fallback Visual
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.save();
            ctx.translate(centerX, centerY);
            const scale = 1 + progress * 0.5;
            ctx.scale(scale, scale);

            // Outer Glow
            ctx.shadowColor = "rgba(0, 137, 123, 0.5)";
            ctx.shadowBlur = 50;

            ctx.fillStyle = "#00897B";
            ctx.beginPath();
            ctx.arc(0, 0, 150, 0, 2 * Math.PI);
            ctx.fill();

            // Add Text
            ctx.shadowColor = "transparent";
            ctx.fillStyle = "white";
            ctx.font = "bold 24px Oswald, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // We can rotate the text slightly?
            ctx.rotate(progress * Math.PI);
            ctx.fillText("THE SIGNATURE CAP", 0, 0);

            ctx.restore();
        }
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Initial render
    useEffect(() => {
        if (imagesLoaded) renderFrame(scrollYProgress.get());
    }, [imagesLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none w-full h-full object-contain"
        />
    );
}
