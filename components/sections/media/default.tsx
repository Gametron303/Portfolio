// components/sections/media/MediaSection.tsx
"use client";

import {
    AnimatePresence,
    LayoutGroup,
    motion,
    Variants,
} from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

type MediaItem = { src: string; alt?: string; isVideo?: boolean };

// в тех же файлах, где у вас containerVariants и itemVariants

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            // общая длительность появления контейнера
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
            // задержка перед появлением первого ребёнка
            delayChildren: 0.3,
            // интервал между появлением детей
            staggerChildren: 0.25,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            // чуть более длинная анимация для каждого элемента
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
        },
    },
};


const mediaItems: MediaItem[] = [
    { src: "/media/anim1.mp4", isVideo: true },
    { src: "/media/images/image.png", alt: "Project still 1" },
    { src: "/media/anim2.mp4", isVideo: true },
];

export default function MediaSection() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <section id="media" className="py-24 bg-background">
            <div className="max-w-container mx-auto px-4">
                <LayoutGroup>
                    {/* Grid of media items */}
                    <motion.div
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        exit="hidden"
                    >
                        {mediaItems.map((item, idx) => (
                            <motion.div
                                key={item.src}
                                variants={itemVariants}
                                className="group overflow-hidden rounded-lg cursor-pointer"
                                onClick={() => !item.isVideo && setSelected(idx)}
                                layoutId={!item.isVideo ? item.src : undefined}
                            >
                                {item.isVideo ? (
                                    <video
                                        src={item.src}
                                        controls
                                        autoPlay
                                        muted
                                        playsInline
                                        loop
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
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Overlay + Lightbox */}
                    <AnimatePresence>
                        {selected !== null && (
                            <motion.div
                                key="overlay"
                                className="fixed inset-0 bg-black bg-opacity-60 z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelected(null)}
                            />
                        )}

                        {selected !== null && !mediaItems[selected].isVideo && (
                            <motion.div
                                key="lightbox"
                                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                                layoutId={mediaItems[selected].src}
                            >
                                <Image
                                    src={mediaItems[selected].src}
                                    alt={mediaItems[selected].alt || ""}
                                    width={800}
                                    height={600}
                                    className="max-w-full max-h-full rounded-lg shadow-lg"
                                    onClick={() => setSelected(null)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>
        </section>
    );
}
