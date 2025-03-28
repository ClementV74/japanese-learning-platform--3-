// Ajout des traductions manquantes pour la page de progression
export type Language = "fr" | "en"

export const translations = {
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
    kanaKanjiDesc: "Maîtrisez les systèmes d'écriture japonais avec des animations interactives d'ordre des traits.",
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
    pricingSubtitle: "Sélectionnez le plan qui correspond le mieux à vos objectifs d'apprentissage et à votre budget.",
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

    // Stroke order
    stroke: "Trait",
    of: "sur",

    // Auth
    nameRequired: "Le nom est requis",
    emailRequired: "L'email est requis",
    invalidEmail: "Format d'email invalide",
    passwordRequired: "Le mot de passe est requis",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
    passwordsDontMatch: "Les mots de passe ne correspondent pas",
    confirmPassword: "Confirmer le mot de passe",
    accountCreated: "Compte créé !",
    accountCreatedDesc: "Votre compte a été créé avec succès.",
    registrationError: "Erreur d'inscription",
    registrationErrorDesc: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
    loginSuccess: "Connexion réussie !",
    loginFailed: "Échec de la connexion",
    invalidCredentials: "Email ou mot de passe incorrect",
    invalidCredentialsDesc:
      "Veuillez vérifier vos identifiants et réessayer. Si vous avez oublié votre mot de passe, utilisez le lien 'Mot de passe oublié'.",
    loginError: "Erreur de connexion",
    loginErrorDesc: "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
    signingIn: "Connexion en cours...",
    creatingAccount: "Création du compte...",
    demoCredentials: "Identifiants de démonstration :",
    namePlaceholder: "Jean Dupont",

    // Settings
    settingsDesc: "Personnalisez votre expérience d'apprentissage",
    notifications: "Notifications",
    appearance: "Apparence",
    learning: "Apprentissage",
    account: "Compte",
    notificationSettings: "Paramètres de notification",
    notificationSettingsDesc: "Gérez comment et quand vous recevez des notifications",
    emailNotifications: "Notifications par email",
    emailNotificationsDesc: "Recevez des mises à jour et des rappels par email",
    dailyReminder: "Rappel quotidien",
    dailyReminderDesc: "Recevez un rappel quotidien pour étudier",
    achievementsNotification: "Notifications de récompenses",
    achievementsNotificationDesc: "Soyez notifié lorsque vous débloquez une récompense",
    newContentNotification: "Nouveau contenu",
    newContentNotificationDesc: "Soyez informé lorsque de nouvelles leçons sont disponibles",
    saveSettings: "Enregistrer les paramètres",
    settingsSaved: "Paramètres enregistrés",
    settingsSavedDesc: "Vos paramètres ont été enregistrés avec succès",
    appearanceSettings: "Paramètres d'apparence",
    appearanceSettingsDesc: "Personnalisez l'apparence de l'application",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    system: "Système",
    sakura: "Sakura",
    fontSize: "Taille de police",
    selectFontSize: "Sélectionner une taille de police",
    small: "Petite",
    medium: "Moyenne",
    large: "Grande",
    enableAnimations: "Activer les animations",
    enableAnimationsDesc: "Activer les animations et les transitions dans l'interface",
    learningSettings: "Paramètres d'apprentissage",
    learningSettingsDesc: "Personnalisez votre expérience d'apprentissage",
    dailyGoal: "Objectif quotidien",
    minutes: "minutes",
    difficulty: "Difficulté",
    selectDifficulty: "Sélectionner une difficulté",
    easy: "Facile",
    normal: "Normal",
    hard: "Difficile",
    showFurigana: "Afficher les furigana",
    showFuriganaDesc: "Afficher les furigana au-dessus des kanji",
    autoPlayAudio: "Lecture audio automatique",
    autoPlayAudioDesc: "Lire automatiquement l'audio pour les exemples",
    accountSettings: "Paramètres du compte",
    accountSettingsDesc: "Gérez les informations de votre compte",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    saveAccountSettings: "Enregistrer les paramètres du compte",
    notLoggedIn: "Non connecté",
    loginToSaveSettings: "Connectez-vous pour enregistrer vos paramètres",
    incorrectPassword: "Mot de passe incorrect",
    enterCorrectPassword: "Veuillez entrer votre mot de passe actuel correct",
    confirmPasswordAgain: "Veuillez confirmer à nouveau votre mot de passe",
    accountUpdated: "Compte mis à jour",
    accountUpdatedDesc: "Les informations de votre compte ont été mises à jour avec succès",
    logout: "Déconnexion",
    orContinueWith: "Ou continuer avec",

    // Progress
    progressDesc: "Suivez votre progression dans l'apprentissage du japonais",
    learningProgress: "Progression d'apprentissage",
    learningProgressDesc: "Votre progression dans les différentes sections",
    activityCharts: "Graphiques d'activité",
    activityChartsDesc: "Visualisez votre activité d'apprentissage",
    weeklyActivity: "Activité hebdomadaire",
    studyTime: "Temps d'étude",
    monthlyXP: "XP mensuel",
    week: "Semaine",
    detailedProgress: "Progression détaillée",
    detailedProgressDesc: "Statistiques détaillées de votre progression",
    totalStudyTime: "Temps d'étude total",
    currentStreak: "Série actuelle",
    days: "jours",
    level: "Niveau",
    totalXP: "XP total",
    recentActivity: "Activité récente",
    lesson: "Leçon",
    quiz: "Quiz",
    basicGreetings: "Salutations de base",
    hiraganaQuiz: "Quiz Hiragana",
    basicKanji: "Kanji de base",
    katakanaBasics: "Bases du Katakana",
    characters: "caractères",

    // Profile
    profile: "Profil",
    profileDesc: "Gérez vos informations personnelles et consultez vos statistiques d'apprentissage",
    profileInformation: "Informations du profil",
    profileInformationDesc: "Consultez et modifiez vos informations personnelles",
    memberSince: "Membre depuis",
    editProfile: "Modifier le profil",
    saveChanges: "Enregistrer les modifications",
    cancel: "Annuler",
    profileUpdated: "Profil mis à jour",
    profileUpdatedDesc: "Vos informations de profil ont été mises à jour avec succès",
    learningStats: "Statistiques d'apprentissage",
    learningStatsDesc: "Suivez vos progrès dans l'apprentissage du japonais",
    kanaLearned: "Kana appris",
    kanjiLearned: "Kanji appris",
    quizzesTaken: "Quiz complétés",
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

    // Stroke order
    stroke: "Stroke",
    of: "of",

    // Auth
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    invalidEmail: "Invalid email format",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 6 characters",
    passwordsDontMatch: "Passwords don't match",
    confirmPassword: "Confirm password",
    accountCreated: "Account created!",
    accountCreatedDesc: "Your account has been successfully created.",
    registrationError: "Registration error",
    registrationErrorDesc: "An error occurred during registration. Please try again.",
    loginSuccess: "Login successful!",
    loginFailed: "Login failed",
    invalidCredentials: "Incorrect email or password",
    invalidCredentialsDesc:
      "Please check your credentials and try again. If you forgot your password, use the 'Forgot your password' link.",
    loginError: "Login error",
    loginErrorDesc: "An error occurred during login. Please try again.",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    demoCredentials: "Demo credentials:",
    namePlaceholder: "John Doe",

    // Settings
    settingsDesc: "Customize your learning experience",
    notifications: "Notifications",
    appearance: "Appearance",
    learning: "Learning",
    account: "Account",
    notificationSettings: "Notification Settings",
    notificationSettingsDesc: "Manage how and when you receive notifications",
    emailNotifications: "Email notifications",
    emailNotificationsDesc: "Receive updates and reminders via email",
    dailyReminder: "Daily reminder",
    dailyReminderDesc: "Receive a daily reminder to study",
    achievementsNotification: "Achievement notifications",
    achievementsNotificationDesc: "Get notified when you unlock an achievement",
    newContentNotification: "New content",
    newContentNotificationDesc: "Be informed when new lessons are available",
    saveSettings: "Save settings",
    settingsSaved: "Settings saved",
    settingsSavedDesc: "Your settings have been successfully saved",
    appearanceSettings: "Appearance Settings",
    appearanceSettingsDesc: "Customize the appearance of the application",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    sakura: "Sakura",
    fontSize: "Font size",
    selectFontSize: "Select font size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    enableAnimations: "Enable animations",
    enableAnimationsDesc: "Enable animations and transitions in the interface",
    learningSettings: "Learning Settings",
    learningSettingsDesc: "Customize your learning experience",
    dailyGoal: "Daily goal",
    minutes: "minutes",
    difficulty: "Difficulty",
    selectDifficulty: "Select difficulty",
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    showFurigana: "Show furigana",
    showFuriganaDesc: "Display furigana above kanji",
    autoPlayAudio: "Auto-play audio",
    autoPlayAudioDesc: "Automatically play audio for examples",
    accountSettings: "Account Settings",
    accountSettingsDesc: "Manage your account information",
    currentPassword: "Current password",
    newPassword: "New password",
    saveAccountSettings: "Save account settings",
    notLoggedIn: "Not logged in",
    loginToSaveSettings: "Please log in to save your settings",
    incorrectPassword: "Incorrect password",
    enterCorrectPassword: "Please enter your correct current password",
    confirmPasswordAgain: "Please confirm your password again",
    accountUpdated: "Account updated",
    accountUpdatedDesc: "Your account information has been successfully updated",
    logout: "Log out",
    orContinueWith: "Or continue with",

    // Progress
    progressDesc: "Track your progress in learning Japanese",
    learningProgress: "Learning Progress",
    learningProgressDesc: "Your progress in different sections",
    activityCharts: "Activity Charts",
    activityChartsDesc: "Visualize your learning activity",
    weeklyActivity: "Weekly Activity",
    studyTime: "Study Time",
    monthlyXP: "Monthly XP",
    week: "Week",
    detailedProgress: "Detailed Progress",
    detailedProgressDesc: "Detailed statistics of your progress",
    totalStudyTime: "Total study time",
    currentStreak: "Current streak",
    days: "days",
    level: "Level",
    totalXP: "Total XP",
    recentActivity: "Recent Activity",
    lesson: "Lesson",
    quiz: "Quiz",
    basicGreetings: "Basic Greetings",
    hiraganaQuiz: "Hiragana Quiz",
    basicKanji: "Basic Kanji",
    katakanaBasics: "Katakana Basics",
    characters: "characters",

    // Profile
    profile: "Profile",
    profileDesc: "Manage your personal information and view your learning statistics",
    profileInformation: "Profile Information",
    profileInformationDesc: "View and edit your personal information",
    memberSince: "Member since",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    profileUpdated: "Profile Updated",
    profileUpdatedDesc: "Your profile information has been successfully updated",
    learningStats: "Learning Statistics",
    learningStatsDesc: "Track your progress in learning Japanese",
    kanaLearned: "Kana Learned",
    kanjiLearned: "Kanji Learned",
    quizzesTaken: "Quizzes Completed",
  },
}

export const getTranslation = (key: string, language: Language): string => {
  const langData = translations[language]
  return langData[key as keyof typeof langData] || key
}

