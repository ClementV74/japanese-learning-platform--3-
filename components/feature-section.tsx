"use client"

import { BookOpen, Award, BarChart, Bookmark, Layers, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export function FeatureSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-pink-500" />,
      title: t("structuredLessons"),
      description: t("structuredLessonsDesc"),
    },
    {
      icon: <Layers className="h-12 w-12 text-purple-500" />,
      title: t("kanaKanji"),
      description: t("kanaKanjiDesc"),
    },
    {
      icon: <Award className="h-12 w-12 text-yellow-500" />,
      title: t("interactiveQuizzes"),
      description: t("interactiveQuizzesDesc"),
    },
    {
      icon: <BarChart className="h-12 w-12 text-blue-500" />,
      title: t("progressTracking"),
      description: t("progressTrackingDesc"),
    },
    {
      icon: <Bookmark className="h-12 w-12 text-green-500" />,
      title: t("vocabularyBuilder"),
      description: t("vocabularyBuilderDesc"),
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-orange-500" />,
      title: t("communitySupport"),
      description: t("communitySupportDesc"),
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-pink-100 dark:bg-pink-900/30 px-3 py-1 text-sm text-pink-600 dark:text-pink-300">
              {t("features")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {t("featuresTitle")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("featuresSubtitle")}
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white dark:bg-gray-950 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

