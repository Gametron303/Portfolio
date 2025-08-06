"use client";

import { motion, type Variants } from "framer-motion";
import { ElementType} from "react";

interface RevealTextProps {
    /** Тег-обёртка: h1, h2, p и т.д. */
    as?: ElementType;
    /** Любые дополнительные классы Tailwind */
    className?: string;
    /** Сам текст */
    children: string;
}

// Контейнер, который даёт stagger
const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
};

// Каждый спан «выезжает» снизу и появляется
const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
};

export function RevealText({
                               as: Tag = "p",
                               className = "",
                               children,
                           }: RevealTextProps) {
    // Разбиваем текст на слова (оставляя пробел)
    const words = children.split(" ");

    return (
        <motion.div
            className={`overflow-hidden`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
        >
            <Tag className={`inline-flex flex-wrap gap-4 overflow-hidden ${className}`}>
                {words.map((word, idx) => (
                    <motion.span
                        key={idx}
                        variants={item}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                ))}
            </Tag>
        </motion.div>
    );
}
