"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface MenuItem {
  title: string;
  href: string;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  className?: string;
}

export default function Navigation({
                                     menuItems = [
                                       { title: "Projects", href: "#projects" },
                                       { title: "About",    href: "#about"    },
                                       { title: "Contact",  href: "#contact"  },
                                     ],
                                   }: NavigationProps) {
  return (
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {menuItems.map((item, idx) => (
              <NavigationMenuItem key={idx}>
                <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                >
                  <Link href={item.href}>
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
  );
}
