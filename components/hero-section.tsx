"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t("heroTitle")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{t("heroSubtitle")}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  {t("startLearning")}
                </Button>
              </Link>
              <Link href="/lessons">
                <Button variant="outline" size="lg" className="px-8">
                  {t("exploreLessons")}
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 to-purple-400/40 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <motion.div
                      className="text-6xl md:text-8xl font-bold text-primary"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      日本語
                    </motion.div>
                    <motion.div
                      className="text-xl md:text-2xl font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      Nihongo Master
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

