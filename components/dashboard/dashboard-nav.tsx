"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart, BookOpen, GraduationCap, Home, Layers, Settings, Trophy } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems: NavItem[] = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: t("lessons"),
      href: "/lessons",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      title: t("kana"),
      href: "/kana",
      icon: <Layers className="mr-2 h-4 w-4" />,
    },
    {
      title: t("kanji"),
      href: "/kanji",
      icon: <GraduationCap className="mr-2 h-4 w-4" />,
    },
    {
      title: t("progress"),
      href: "/progress",
      icon: <BarChart className="mr-2 h-4 w-4" />,
    },
    {
      title: t("achievements"),
      href: "/achievements",
      icon: <Trophy className="mr-2 h-4 w-4" />,
    },
    {
      title: t("settings"),
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
          >
            {item.icon}
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}

