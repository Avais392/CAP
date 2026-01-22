"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { product } from "@/data/content";

interface CanvasScrollerProps {
    scrollYProgress: MotionValue<number>;
}

export default function CanvasScroller({ scrollYProgress }: CanvasScrollerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Load Image Sequence
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        const totalFrames = product.totalFrames;
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${product.folderPath}/${i}.gif`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) setImagesLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalFrames) setImagesLoaded(true); // Proceed even if fails (will fall back)
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
                const dpr = window.devicePixelRatio || 1;
                // Set internal resolution to match device pixel ratio for sharp rendering
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;

                // Ensure the context knows we might want to use this scale if we were drawing primitives,
                // but since we calculate draw dimensions based on canvas.width (physical), we don't strictly *need* ctx.scale()
                // unless we want to use CSS logic coordinates. 
                // However, our renderFrame logic uses canvas.width directly, so it adapts to physical pixels automatically.
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Draw Logic
    const renderFrame = (progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Map progress 0..1 to Frame 0..119
        const frameIndex = Math.min(product.totalFrames - 1, Math.floor(progress * (product.totalFrames - 1)));
        const activeImg = images[frameIndex];

        if (activeImg && activeImg.naturalHeight > 0) {
            // "Contain" and Center
            const imgAspect = activeImg.width / activeImg.height;
            const canvasAspect = width / height;

            let drawWidth, drawHeight;

            if (canvasAspect > imgAspect) {
                drawHeight = height * 0.85; // 85% height availability
                drawWidth = drawHeight * imgAspect;
            } else {
                drawWidth = width * 0.85; // 85% width availability
                drawHeight = drawWidth / imgAspect;
            }

            const x = (width - drawWidth) / 2;
            const y = (height - drawHeight) / 2;

            ctx.drawImage(activeImg, x, y, drawWidth, drawHeight);
        } else {
            // Fallback: Teal Cup Circle
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.save();
            ctx.translate(centerX, centerY);

            // Simple rotation effect based on scroll
            ctx.rotate(progress * Math.PI * 2);

            ctx.fillStyle = "#00897B";
            ctx.beginPath();
            const r = Math.min(width, height) * 0.25;
            ctx.arc(0, 0, r, 0, 2 * Math.PI);
            ctx.fill();

            // Add "CAP" Text
            ctx.fillStyle = "white";
            ctx.font = "bold 40px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("CAP", 0, 0);

            ctx.restore();
        }
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Initial Draw Attempt
    useEffect(() => {
        if (imagesLoaded) {
            renderFrame(scrollYProgress.get() || 0);
        }
    }, [imagesLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
