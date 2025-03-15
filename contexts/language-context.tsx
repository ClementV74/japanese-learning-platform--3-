"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    // Récupérer la langue depuis localStorage si disponible
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("preferredLanguage", lang)
  }

  // Fonction de traduction simplifiée
  const t = (key: string): string => {
    const translations = {
      fr: {
        // Navigation
        lessons: "Leçons",
        kana: "Kana",
        kanji: "Kanji",
        about: "À propos",
        login: "Connexion",
        signup: "S'inscrire",
        dashboard: "Tableau de bord",
        progress: "Progression",
        achievements: "Récompenses",
        settings: "Paramètres",

        // Hero section
        heroTitle: "Maîtrisez le japonais avec confiance",
        heroSubtitle:
          "Apprenez le japonais du niveau débutant à avancé avec nos leçons complètes et interactives. Pratiquez les kana, kanji, vocabulaire et grammaire avec notre plateforme engageante.",
        startLearning: "Commencer à apprendre",
        exploreLessons: "Explorer les leçons",

        // Features
        features: "Fonctionnalités",
        featuresTitle: "Tout ce dont vous avez besoin pour maîtriser le japonais",
        featuresSubtitle:
          "Notre plateforme offre une approche complète pour apprendre le japonais avec des leçons interactives, des quiz et des outils spécialisés.",
        structuredLessons: "Leçons structurées",
        structuredLessonsDesc: "Progressez du niveau débutant à avancé avec notre programme soigneusement structuré.",
        kanaKanji: "Kana & Kanji",
        kanaKanjiDesc:
          "Maîtrisez les systèmes d'écriture japonais avec des animations interactives d'ordre des traits.",
        interactiveQuizzes: "Quiz interactifs",
        interactiveQuizzesDesc: "Testez vos connaissances avec des quiz de style Duolingo et des exercices.",
        progressTracking: "Suivi de progression",
        progressTrackingDesc: "Suivez votre parcours d'apprentissage avec des analyses détaillées de progression.",
        vocabularyBuilder: "Constructeur de vocabulaire",
        vocabularyBuilderDesc: "Développez votre vocabulaire japonais avec l'apprentissage par répétition espacée.",
        communitySupport: "Support communautaire",
        communitySupportDesc: "Connectez-vous avec d'autres apprenants et obtenez de l'aide quand vous en avez besoin.",

        // Testimonials
        testimonials: "Témoignages",
        testimonialsTitle: "Ce que disent nos étudiants",
        testimonialsSubtitle: "Découvrez ce que notre communauté d'apprenants de japonais pense de notre plateforme.",

        // Pricing
        pricing: "Tarifs",
        pricingTitle: "Choisissez votre plan d'apprentissage",
        pricingSubtitle:
          "Sélectionnez le plan qui correspond le mieux à vos objectifs d'apprentissage et à votre budget.",
        free: "Gratuit",
        freeDesc: "Commencez à apprendre le japonais de base.",
        premium: "Premium",
        premiumDesc: "Notre plan le plus populaire pour les apprenants sérieux.",
        pro: "Pro",
        proDesc: "Pour les apprenants avancés et les professionnels.",
        getStarted: "Commencer",
        startPremium: "Démarrer Premium",
        startPro: "Démarrer Pro",

        // Auth
        welcomeBack: "Bon retour parmi nous",
        enterCredentials: "Entrez vos identifiants pour accéder à votre compte",
        email: "Email",
        password: "Mot de passe",
        forgotPassword: "Mot de passe oublié ?",
        dontHaveAccount: "Vous n'avez pas de compte ?",
        createAccount: "Créer un compte",
        alreadyHaveAccount: "Vous avez déjà un compte ?",
        signIn: "Se connecter",

        // Dashboard
        welcomeMessage: "Bienvenue sur votre tableau de bord",
        trackProgress: "Suivez votre progression et continuez votre apprentissage du japonais.",
        studyStreak: "Série d'étude",
        totalStudyTime: "Temps d'étude total",
        lessonsCompleted: "Leçons terminées",
        lessonProgress: "Progression des leçons",
        recentLessons: "Leçons récentes",
        recommendedLessons: "Leçons recommandées",

        // Kana & Kanji
        kanaLearning: "Apprentissage des Kana",
        kanaSubtitle: "Maîtrisez Hiragana et Katakana avec des exercices interactifs",
        hiragana: "Hiragana",
        katakana: "Katakana",
        strokeOrder: "Ordre des traits",
        practice: "Pratique",
        practiceDesc:
          "Entraînez-vous à écrire le caractère kana en suivant l'ordre des traits. Essayez de respecter l'ordre et la direction des traits.",

        // Lessons
        lessonsTitle: "Leçons",
        lessonsSubtitle: "Parcourez nos leçons complètes de japonais du niveau débutant à avancé",
        beginner: "Débutant",
        intermediate: "Intermédiaire",
        advanced: "Avancé",
        categories: "Catégories",
        searchLessons: "Rechercher des leçons...",

        // Quiz
        quizTitle: "Quiz",
        quizComplete: "Quiz terminé !",
        perfectScore: "Score parfait ! Excellent travail !",
        greatJob: "Bon travail ! Continuez à pratiquer !",
        keepStudying: "Bon effort ! Continuez à étudier pour vous améliorer.",
        tryAgain: "Réessayer",

        // Language selector
        languagePreference: "Préférence de langue",
        interfaceLanguage: "Langue de l'interface",

        // Achievements
        achievementsTitle: "Récompenses",
        achievementsSubtitle: "Suivez vos accomplissements et débloquez des badges",
        achievementUnlocked: "Récompense débloquée !",
        achievementProgress: "Progression des récompenses",

        // Footer
        about: "À propos",
        privacy: "Confidentialité",
        terms: "Conditions",
        contact: "Contact",
        allRightsReserved: "Tous droits réservés",
      },
      en: {
        // Navigation
        lessons: "Lessons",
        kana: "Kana",
        kanji: "Kanji",
        about: "About",
        login: "Log In",
        signup: "Sign Up",
        dashboard: "Dashboard",
        progress: "Progress",
        achievements: "Achievements",
        settings: "Settings",

        // Hero section
        heroTitle: "Master Japanese with Confidence",
        heroSubtitle:
          "Learn Japanese from beginner to advanced with our comprehensive, interactive lessons. Practice Kana, Kanji, vocabulary, and grammar with our engaging platform.",
        startLearning: "Start Learning Now",
        exploreLessons: "Explore Lessons",

        // Features
        features: "Features",
        featuresTitle: "Everything You Need to Master Japanese",
        featuresSubtitle:
          "Our platform offers a comprehensive approach to learning Japanese with interactive lessons, quizzes, and specialized tools.",
        structuredLessons: "Structured Lessons",
        structuredLessonsDesc: "Progress from beginner to advanced with our carefully structured curriculum.",
        kanaKanji: "Kana & Kanji",
        kanaKanjiDesc: "Master Japanese writing systems with interactive stroke order animations.",
        interactiveQuizzes: "Interactive Quizzes",
        interactiveQuizzesDesc: "Test your knowledge with Duolingo-style quizzes and exercises.",
        progressTracking: "Progress Tracking",
        progressTrackingDesc: "Monitor your learning journey with detailed progress analytics.",
        vocabularyBuilder: "Vocabulary Builder",
        vocabularyBuilderDesc: "Build your Japanese vocabulary with spaced repetition learning.",
        communitySupport: "Community Support",
        communitySupportDesc: "Connect with fellow learners and get help when you need it.",

        // Testimonials
        testimonials: "Testimonials",
        testimonialsTitle: "What Our Students Say",
        testimonialsSubtitle:
          "Hear from our community of Japanese language learners about their experience with our platform.",

        // Pricing
        pricing: "Pricing",
        pricingTitle: "Choose Your Learning Plan",
        pricingSubtitle: "Select the plan that best fits your learning goals and budget.",
        free: "Free",
        freeDesc: "Get started with basic Japanese learning.",
        premium: "Premium",
        premiumDesc: "Our most popular plan for serious learners.",
        pro: "Pro",
        proDesc: "For advanced learners and professionals.",
        getStarted: "Get Started",
        startPremium: "Start Premium",
        startPro: "Start Pro",

        // Auth
        welcomeBack: "Welcome Back",
        enterCredentials: "Enter your credentials to access your account",
        email: "Email",
        password: "Password",
        forgotPassword: "Forgot your password?",
        dontHaveAccount: "Don't have an account?",
        createAccount: "Create an account",
        alreadyHaveAccount: "Already have an account?",
        signIn: "Sign in",

        // Dashboard
        welcomeMessage: "Welcome to your dashboard",
        trackProgress: "Track your progress and continue your Japanese learning journey.",
        studyStreak: "Study Streak",
        totalStudyTime: "Total Study Time",
        lessonsCompleted: "Lessons Completed",
        lessonProgress: "Lesson Progress",
        recentLessons: "Recent Lessons",
        recommendedLessons: "Recommended Lessons",

        // Kana & Kanji
        kanaLearning: "Kana Learning",
        kanaSubtitle: "Master Hiragana and Katakana with interactive exercises",
        hiragana: "Hiragana",
        katakana: "Katakana",
        strokeOrder: "Stroke Order",
        practice: "Practice",
        practiceDesc:
          "Practice writing the kana character by following the stroke order. Try to match the correct stroke order and direction.",

        // Lessons
        lessonsTitle: "Lessons",
        lessonsSubtitle: "Browse our comprehensive Japanese lessons from beginner to advanced",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        categories: "Categories",
        searchLessons: "Search lessons...",

        // Quiz
        quizTitle: "Quiz",
        quizComplete: "Quiz Complete!",
        perfectScore: "Perfect score! Amazing job!",
        greatJob: "Great job! Keep practicing!",
        keepStudying: "Good effort! Keep studying to improve.",
        tryAgain: "Try Again",

        // Language selector
        languagePreference: "Language Preference",
        interfaceLanguage: "Interface Language",

        // Achievements
        achievementsTitle: "Achievements",
        achievementsSubtitle: "Track your accomplishments and unlock badges",
        achievementUnlocked: "Achievement Unlocked!",
        achievementProgress: "Achievement Progress",

        // Footer
        about: "About",
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact",
        allRightsReserved: "All rights reserved",
      },
    }

    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

