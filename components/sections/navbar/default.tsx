import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  /** Логотип или текст имени */
  logo?: ReactNode;
  /** Отображаемое имя */
  name?: string;
  /** Куда ведёт клик по логотипу */
  homeUrl?: string;
  /** Ссылки в моб. меню */
  mobileLinks?: NavbarLink[];
  /** Кнопки справа (Resume, Contact и т.д.) */
  actions?: NavbarActionProps[];
  /** Показывать ли десктопное меню */
  showNavigation?: boolean;
  /** Если нужно заменить стандартный Navigation */
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
                                 // Вместо LaunchUI — просто ваше имя.
                                 logo = <span className="text-2xl font-extrabold">Copperhead</span>,
                                 name = "Copperhead",
                                 // Домашняя страница — корень сайта
                                 homeUrl = "/",
                                 // Мобильное меню с якорными ссылками на секции
                                 mobileLinks = [
                                   { text: "Проекты", href: "#projects" },
                                   { text: "Обо мне", href: "#about"    },
                                   { text: "Контакты", href: "#contact"  },
                                 ],
                                 // Десктопные кнопки справа
                                 actions = [
                                   { text: "Резюме",  href: "/resume.pdf",    isButton: false  },
                                   { text: "Контакты", href: "#contact",       variant: "default", isButton: true },
                                 ],
                                 showNavigation = true,
                                 customNavigation,
                                 className,
                               }: NavbarProps) {
  return (
      <header className={cn("sticky top-0 z-50 px-4 pb-4 bg-background/80 backdrop-blur-lg", className)}>
        <div className="max-w-container mx-auto">
          <NavbarComponent>

            {/* Левая часть: логотип + навигация */}
            <NavbarLeft>
              <a href={homeUrl} className="flex items-center gap-2">
                {logo}
              </a>
              {showNavigation && (customNavigation || <Navigation />)}
            </NavbarLeft>

            {/* Правая часть: десктопные ссылки и бургер для мобилы */}
            <NavbarRight>
              {actions.map((action, idx) =>
                  action.isButton ? (
                      <Button key={idx} variant={action.variant || "default"} asChild>
                        <a href={action.href}>
                          {action.icon}
                          {action.text}
                          {action.iconRight}
                        </a>
                      </Button>
                  ) : (
                      <a
                          key={idx}
                          href={action.href}
                          className="hidden text-sm md:block hover:underline"
                      >
                        {action.text}
                      </a>
                  )
              )}

              {/* Бургер-меню для мобильных */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4 text-lg">
                    <a href={homeUrl} className="text-xl font-bold">{name}</a>
                    {mobileLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            className="hover:text-foreground"
                        >
                          {link.text}
                        </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

            </NavbarRight>
          </NavbarComponent>
        </div>
      </header>
  );
}
