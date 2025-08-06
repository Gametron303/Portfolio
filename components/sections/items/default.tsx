// components/sections/items/default.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import {
  BlocksIcon,
  EclipseIcon,
  FastForwardIcon,
  LanguagesIcon,
  MonitorSmartphoneIcon,
  RocketIcon,
  ScanFaceIcon,
  SquarePenIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { RevealText } from "@/components/ui/revealtext";

import { Item, ItemDescription, ItemIcon, ItemTitle } from "../../ui/item";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Items({
                                title = "Мои услуги",
                                items = [
                                  {
                                    title: "3D-анимация",
                                    description: "Профессиональная 3D-анимация для фильмов, игр и рекламы",
                                    icon: <ScanFaceIcon className="size-5 stroke-1" />,
                                  },
                                  {
                                    title: "3D-моделирование",
                                    description: "Создание высокополигональных моделей и сцен",
                                    icon: <MonitorSmartphoneIcon className="size-5 stroke-1" />,
                                  },
                                  {
                                    title: "VFX и композитинг",
                                    description: "Интеграция визуальных эффектов в ваше видео",
                                    icon: <EclipseIcon className="size-5 stroke-1" />,
                                  },
                                  {
                                    title: "Motion Graphics",
                                    description: "Анимированные заставки, логотипы и инфографика",
                                    icon: <BlocksIcon className="size-5 stroke-1" />,
                                  },
                                  {
                                    title: "Пост-продакшн",
                                    description: "Монтаж, цветокоррекция и работа со звуком",
                                    icon: <FastForwardIcon className="size-5 stroke-1" />,
                                  },
                                  {
                                    title: "Оптимизация рендеринга",
                                    description: "Ускорение и оптимизация пайплайнов работы",
                                    icon: <RocketIcon className="size-5 stroke-1" />,
                                  },
                                  {
                                    title: "Инфографика и дашборды",
                                    description: "Создание понятных визуальных отчётов",
                                    icon: <LanguagesIcon className="size-5 stroke-1" />,
                                  },
                                  {
                                    title: "Сопровождение проектов",
                                    description: "Поддержка и консультации на всех этапах",
                                    icon: <SquarePenIcon className="size-5 stroke-1" />,
                                  },
                                ],
                                className,
                              }: ItemsProps) {
  return (
      <Section className={className}>
        <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
          {/* Анимированный заголовок */}
          <RevealText
              as="h2"
              className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight"
          >
            {title}
          </RevealText>

          {/* Анимированная сетка */}
          {items !== false && items.length > 0 && (
              <motion.div
                  className="grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={container}
              >
                {items.map((it, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        className="group overflow-hidden rounded-lg bg-card p-6 transition-transform hover:scale-[1.02] hover:shadow-lg"
                    >
                      <Item>
                        <ItemTitle className="flex items-center gap-2">
                          <ItemIcon>{it.icon}</ItemIcon>
                          {it.title}
                        </ItemTitle>
                        <ItemDescription>{it.description}</ItemDescription>
                      </Item>
                    </motion.div>
                ))}
              </motion.div>
          )}
        </div>
      </Section>
  );
}
