export interface Achievement {
  id: string
  name: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  icon: string
  requiredValue: number
  currentValue: number
  unlocked: boolean
  category: "lessons" | "kana" | "kanji" | "streak" | "quiz"
  reward?: {
    type: "xp" | "badge" | "theme"
    value: number | string
  }
}

export const achievementsData: Achievement[] = [
  {
    id: "first-lesson",
    name: {
      fr: "Premier pas",
      en: "First Step",
    },
    description: {
      fr: "Terminez votre première leçon",
      en: "Complete your first lesson",
    },
    icon: "rocket",
    requiredValue: 1,
    currentValue: 1,
    unlocked: true,
    category: "lessons",
    reward: {
      type: "xp",
      value: 50,
    },
  },
  {
    id: "lesson-streak-3",
    name: {
      fr: "Sur la bonne voie",
      en: "On the Right Track",
    },
    description: {
      fr: "Complétez des leçons 3 jours de suite",
      en: "Complete lessons for 3 days in a row",
    },
    icon: "flame",
    requiredValue: 3,
    currentValue: 3,
    unlocked: true,
    category: "streak",
    reward: {
      type: "badge",
      value: "streak-3",
    },
  },
  {
    id: "lesson-streak-7",
    name: {
      fr: "Semaine parfaite",
      en: "Perfect Week",
    },
    description: {
      fr: "Complétez des leçons 7 jours de suite",
      en: "Complete lessons for 7 days in a row",
    },
    icon: "flame",
    requiredValue: 7,
    currentValue: 7,
    unlocked: true,
    category: "streak",
    reward: {
      type: "badge",
      value: "streak-7",
    },
  },
  {
    id: "hiragana-master",
    name: {
      fr: "Maître Hiragana",
      en: "Hiragana Master",
    },
    description: {
      fr: "Apprenez tous les caractères Hiragana",
      en: "Learn all Hiragana characters",
    },
    icon: "pen-tool",
    requiredValue: 46,
    currentValue: 46,
    unlocked: true,
    category: "kana",
    reward: {
      type: "badge",
      value: "hiragana-master",
    },
  },
  {
    id: "katakana-master",
    name: {
      fr: "Maître Katakana",
      en: "Katakana Master",
    },
    description: {
      fr: "Apprenez tous les caractères Katakana",
      en: "Learn all Katakana characters",
    },
    icon: "pen-tool",
    requiredValue: 46,
    currentValue: 32,
    unlocked: false,
    category: "kana",
    reward: {
      type: "badge",
      value: "katakana-master",
    },
  },
  {
    id: "kanji-beginner",
    name: {
      fr: "Débutant Kanji",
      en: "Kanji Beginner",
    },
    description: {
      fr: "Apprenez 10 kanjis",
      en: "Learn 10 kanji characters",
    },
    icon: "book",
    requiredValue: 10,
    currentValue: 10,
    unlocked: true,
    category: "kanji",
    reward: {
      type: "xp",
      value: 100,
    },
  },
  {
    id: "kanji-enthusiast",
    name: {
      fr: "Enthousiaste Kanji",
      en: "Kanji Enthusiast",
    },
    description: {
      fr: "Apprenez 50 kanjis",
      en: "Learn 50 kanji characters",
    },
    icon: "book",
    requiredValue: 50,
    currentValue: 23,
    unlocked: false,
    category: "kanji",
    reward: {
      type: "badge",
      value: "kanji-50",
    },
  },
  {
    id: "perfect-quiz",
    name: {
      fr: "Quiz parfait",
      en: "Perfect Quiz",
    },
    description: {
      fr: "Obtenez un score parfait sur un quiz",
      en: "Get a perfect score on a quiz",
    },
    icon: "award",
    requiredValue: 1,
    currentValue: 1,
    unlocked: true,
    category: "quiz",
    reward: {
      type: "xp",
      value: 75,
    },
  },
  {
    id: "quiz-master",
    name: {
      fr: "Maître des quiz",
      en: "Quiz Master",
    },
    description: {
      fr: "Complétez 10 quiz avec un score d'au moins 80%",
      en: "Complete 10 quizzes with a score of at least 80%",
    },
    icon: "award",
    requiredValue: 10,
    currentValue: 6,
    unlocked: false,
    category: "quiz",
    reward: {
      type: "theme",
      value: "sakura",
    },
  },
  {
    id: "beginner-complete",
    name: {
      fr: "Niveau débutant terminé",
      en: "Beginner Level Complete",
    },
    description: {
      fr: "Terminez toutes les leçons de niveau débutant",
      en: "Complete all beginner level lessons",
    },
    icon: "check-circle",
    requiredValue: 15,
    currentValue: 9,
    unlocked: false,
    category: "lessons",
    reward: {
      type: "badge",
      value: "beginner-complete",
    },
  },
]

