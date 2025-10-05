// components/sections/media/MediaSection.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { RevealText } from "@/components/ui/revealtext";

import { Section } from "../../ui/section";

type MediaItem = { src: string; alt?: string; isVideo?: boolean };

interface MediaSectionProps {
    title?: string;
    className?: string;
    items?: MediaItem[];
}

const defaultItems: MediaItem[] = [
    { src: "/media/anim1.mp4", isVideo: true },
    { src: "/media/images/image.png", alt: "Project still 1" },
    { src: "/media/anim2.mp4", isVideo: true },
];

export default function MediaSection({
                                         title = "Портфолио",
                                         className,
                                         items = defaultItems,
                                     }: MediaSectionProps) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <Section className={className}>
            <div id="media" className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20 px-4">
                <RevealText
                    as="h2"
                    className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight"
                >
                    {title}
                </RevealText>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, idx) => (
                        <button
                            key={item.src}
                            type="button"
                            className="group overflow-hidden rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                            onClick={() => setSelected(idx)}
                        >
                            {item.isVideo ? (
                                <video
                                    src={item.src}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="relative w-full h-64">
                                    <Image
                                        src={item.src}
                                        alt={item.alt || ""}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                        priority={idx < 2}
                                    />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Lightbox with smooth zoom-in */}
                {selected !== null && (
                    <Lightbox
                        item={items[selected]}
                        onClose={() => setSelected(null)}
                    />
                )}
            </div>
        </Section>
    );
}

function Lightbox({
                      item,
                      onClose,
                  }: {
    item: { src: string; alt?: string; isVideo?: boolean };
    onClose: () => void;
}) {
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        const t = requestAnimationFrame(() => setAnimateIn(true));
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => {
            cancelAnimationFrame(t);
            document.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        // ВЕСЬ экран ловит клик для закрытия
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            {/* затемнение */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    animateIn ? "bg-opacity-60" : "bg-opacity-0"
                }`}
            />

            {/* контент; стопим всплытие, чтобы не закрывалось при клике по нему */}
            <div
                className={[
                    "relative max-w-[90vw] max-h-[85vh] rounded-lg shadow-xl overflow-hidden",
                    "transform transition-all duration-300 ease-out",
                    animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95",
                ].join(" ")}
                onClick={(e) => e.stopPropagation()}
            >
                {item.isVideo ? (
                    <video
                        src={item.src}
                        controls
                        autoPlay
                        playsInline
                        className="max-w-full max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <Image
                        src={item.src}
                        alt={item.alt || ""}
                        width={1200}
                        height={800}
                        className="max-w-full max-h-[85vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                )}
            </div>
        </div>
    );
}

