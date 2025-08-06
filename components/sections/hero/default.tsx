"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "../../ui/button";
import { Section } from "../../ui/section";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  badge?: React.ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
                               title = "Привет, я Лосицкий Александр",
                               description = "3D-аниматор, видеомонтажер и специалист по VFX. Имею обширный опыт в производтсве 3D контента!",
                               badge = false,
                               buttons = [
                                 {
                                   href: "/resume.pdf",
                                   text: "Resume",
                                   variant: "outline",
                                 },
                                 {
                                   href: "#contact",
                                   text: "Contact",
                                   variant: "default",
                                   iconRight: <ArrowRightIcon className="size-4 ml-1" />,
                                 },
                               ],
                               className,
                             }: HeroProps) {
  return (
      <Section
          id="hero"
          className={cn("relative overflow-hidden fade-bottom pb-0", className)}
      >
        {/* Радиа́льный градиент позади */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                  "radial-gradient(circle at bottom, rgba(239,68,68,0.3) 0%, transparent 60%)",
            }}
        />

        {/* Основной контент поверх градиента */}
        <div className="relative z-10 max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
          <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
            {badge !== false && badge}

            <h1 className="animate-appear from-foreground to-foreground relative inline-block bg-linear-to-r bg-clip-text text-4xl font-semibold text-transparent drop-shadow-lg sm:text-6xl md:text-8xl">
              {title}
            </h1>

            <p className="text-md animate-appear text-muted-foreground max-w-[740px] font-medium opacity-0 delay-100 sm:text-xl">
              {description}
            </p>

            {buttons !== false && buttons.length > 0 && (
                <div className="animate-appear flex justify-center gap-4 opacity-0 delay-300">
                  {buttons.map((button, idx) => (
                      <Button
                          key={idx}
                          variant={button.variant || "default"}
                          size="lg"
                          asChild
                      >
                        <Link href={button.href}>
                          {button.icon}
                          {button.text}
                          {button.iconRight}
                        </Link>
                      </Button>
                  ))}
                </div>
            )}
          </div>
        </div>
      </Section>
  );
}
