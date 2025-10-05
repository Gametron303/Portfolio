// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Поддерживаемые языки
const locales = ["en", "ru", "de"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Если уже есть язык в URL — пропускаем
    const hasLocale = locales.some(locale => pathname.startsWith(`/${locale}`));
    if (hasLocale) return;

    // Определяем язык из заголовка браузера
    const acceptLang = request.headers.get("accept-language") || "";
    const userLang = acceptLang.split(",")[0].split("-")[0]; // "ru-RU" → "ru"

    const matchedLocale = locales.includes(userLang) ? userLang : defaultLocale;

    // Редиректим на правильный язык
    return NextResponse.redirect(new URL(`/${matchedLocale}${pathname}`, request.url));
}

// Исключаем статические файлы, API и внутренние маршруты
export const config = {
    matcher: ["/((?!_next|api|favicon.ico|assets|static).*)"],
};
