"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M7 10h10" />
              <path d="M7 14h10" />
              <path d="M12 10v8" />
            </svg>
            <span className="text-xl font-bold">日本語マスター</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/lessons" className="text-sm font-medium hover:underline underline-offset-4">
              {t("lessons")}
            </Link>
            <Link href="/kana" className="text-sm font-medium hover:underline underline-offset-4">
              {t("kana")}
            </Link>
            <Link href="/kanji" className="text-sm font-medium hover:underline underline-offset-4">
              {t("kanji")}
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              {t("about")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                {t("login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">{t("signup")}</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}

