import type { UserProgress } from "@/types/user"
import type { User } from "@/types/user"

const API_BASE_URL = "https://feegaffe.fr/japan"

// Fonction pour se connecter
export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
    // Créer un objet FormData pour l'envoi
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    // Envoyer la requête de connexion
    const response = await fetch(`${API_BASE_URL}/login.php`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Échec de la connexion: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    if (data.success && data.user) {
      // Créer un objet utilisateur avec les données reçues
      const user: User = {
        id: data.user.id,
        name: data.user.pseudo,
        email: email,
        createdAt: new Date().toISOString(),
        progress: {
          lessonsCompleted: 0,
          kanaLearned: 0,
          kanjiLearned: 0,
          quizzesTaken: 0,
          streak: 0,
          totalXp: 0,
          lastActivity: new Date().toISOString(),
        },
      }

      // Récupérer les statistiques de l'utilisateur
      try {
        const statsResponse = await fetch(`${API_BASE_URL}/api.php?action=getStats&user_id=${user.id}`)
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          if (statsData && !statsData.error) {
            user.progress = {
              ...user.progress,
              totalXp: statsData.xp_total || 0,
              streak: statsData.serie_actuelle || 0,
              lessonsCompleted: statsData.lecons_terminees || 0,
              kanaLearned: statsData.kana_appris || 0,
              kanjiLearned: statsData.kanji_appris || 0,
              quizzesTaken: statsData.quiz_completes || 0,
            }
          }
        }
      } catch (statsError) {
        console.error("Erreur lors de la récupération des statistiques:", statsError)
      }

      return user
    }

    return null
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return null
  }
}

// Fonction pour créer un utilisateur
export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    // Créer un objet pour l'envoi
    const userData = {
      pseudo: name,
      email: email,
      password: password,
    }

    // Envoyer la requête d'inscription
    const response = await fetch(`${API_BASE_URL}/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`Échec de l'inscription: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === "error") {
      throw new Error(data.message)
    }

    if (data.status === "success") {
      // Après l'inscription réussie, connecter l'utilisateur
      return await loginUser(email, password)
    }

    return null
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error)
    return null
  }
}

export async function updateUserStats(userId: string, progressUpdate: Partial<UserProgress>): Promise<UserProgress> {
  try {
    // Récupérer les statistiques actuelles
    const statsResponse = await fetch(`${API_BASE_URL}/api.php?action=getStats&user_id=${userId}`)

    if (!statsResponse.ok) {
      throw new Error(`Échec de la récupération des statistiques: ${statsResponse.status}`)
    }

    const statsData = await statsResponse.json()

    // Retourner les statistiques mises à jour
    return {
      lessonsCompleted: progressUpdate.lessonsCompleted || statsData.lecons_terminees || 0,
      kanaLearned: progressUpdate.kanaLearned || statsData.kana_appris || 0,
      kanjiLearned: progressUpdate.kanjiLearned || statsData.kanji_appris || 0,
      quizzesTaken: progressUpdate.quizzesTaken || statsData.quiz_completes || 0,
      streak: statsData.serie_actuelle || 0,
      totalXp: statsData.xp_total || 0,
      lastActivity: new Date().toISOString(),
      ...progressUpdate,
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des statistiques:", error)
    // Retourner des valeurs par défaut en cas d'erreur
    return {
      lessonsCompleted: 0,
      kanaLearned: 0,
      kanjiLearned: 0,
      quizzesTaken: 0,
      streak: 0,
      totalXp: 0,
      lastActivity: new Date().toISOString(),
      ...progressUpdate,
    }
  }
}

// Fonction pour mettre à jour les statistiques globales de l'utilisateur
export async function updateUserGlobalStats(
  userId: string,
  statsUpdate: {
    lessonsCompleted?: number
    xpGained?: number
    studyTime?: number
  },
): Promise<boolean> {
  try {
    const data = {
      lessons_completed: statsUpdate.lessonsCompleted || 0,
      xp_gained: statsUpdate.xpGained || 0,
      study_time: statsUpdate.studyTime || 0,
    }

    const response = await fetch(`${API_BASE_URL}/api.php?action=updateUserStats&user_id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Échec de la mise à jour des statistiques: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData.success === true
  } catch (error) {
    console.error("Erreur lors de la mise à jour des statistiques globales:", error)
    return false
  }
}

export async function getUserMissions(userId: string): Promise<any[]> {
  try {
    // Récupérer les récompenses de l'utilisateur
    const rewardsResponse = await fetch(`${API_BASE_URL}/api.php?action=getUserRewards&user_id=${userId}`)

    if (!rewardsResponse.ok) {
      throw new Error(`Échec de la récupération des récompenses: ${rewardsResponse.status}`)
    }

    const rewardsData = await rewardsResponse.json()

    // Si nous avons des données de récompenses, les convertir au format attendu
    if (Array.isArray(rewardsData)) {
      return rewardsData.map((reward, index) => ({
        id: `reward-${index}`,
        name: {
          fr: reward.nom,
          en: reward.nom, // Utiliser le même nom en anglais par défaut
        },
        description: {
          fr: reward.description,
          en: reward.description, // Utiliser la même description en anglais par défaut
        },
        icon: "award", // Icône par défaut
        requiredValue: reward.valeur_requise || 1,
        currentValue: reward.valeur_actuelle || 0,
        unlocked: reward.debloque === 1,
        category: reward.categorie || "achievements",
        reward: {
          type: "xp",
          value: reward.xp_bonus || 50,
        },
      }))
    }

    // Si aucune récompense n'est trouvée, retourner des récompenses par défaut
    return [
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
    ]
  } catch (error) {
    console.error("Erreur lors de la récupération des missions:", error)
    // Retourner des missions par défaut en cas d'erreur
    return [
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
    ]
  }
}

// Fonction pour récupérer toutes les leçons
export async function getLessons(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api.php?action=getLessons`)

    if (!response.ok) {
      throw new Error(`Échec de la récupération des leçons: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data)) {
      return data.map((lesson) => ({
        id: lesson.id_lecon,
        title: lesson.titre,
        description: lesson.description,
        category: lesson.categorie,
        level: lesson.difficulte,
        duration: lesson.duree,
        xp: lesson.xp,
      }))
    }

    return []
  } catch (error) {
    console.error("Erreur lors de la récupération des leçons:", error)
    return []
  }
}

// Fonction pour récupérer la progression des leçons d'un utilisateur
export async function getLessonProgress(userId: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api.php?action=getLessonProgress&user_id=${userId}`)

    if (!response.ok) {
      throw new Error(`Échec de la récupération de la progression: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data)) {
      return data
    }

    return []
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression des leçons:", error)
    return []
  }
}

// Fonction pour mettre à jour la progression d'une leçon
export async function updateLessonProgress(
  userId: string,
  lessonId: number,
  exercicesFaits: number,
  xpGagne: number,
): Promise<boolean> {
  try {
    const data = {
      id_lecon: lessonId,
      exercices_faits: exercicesFaits,
      xp_gagne: xpGagne,
    }

    const response = await fetch(`${API_BASE_URL}/api.php?action=updateProgress&user_id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Échec de la mise à jour de la progression: ${response.status}`)
    }

    const responseData = await response.json()

    return responseData.success === true
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression de la leçon:", error)
    return false
  }
}

// Fonction pour récupérer les statistiques d'un utilisateur
export async function getUserStats(userId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api.php?action=getStats&user_id=${userId}`)

    if (!response.ok) {
      throw new Error(`Échec de la récupération des statistiques: ${response.status}`)
    }

    const data = await response.json()

    return (
      data || {
        xp_total: 0,
        niveau: 1,
        heures_etude: 0,
        serie_actuelle: 0,
        lecons_terminees: 0,
        kana_appris: 0,
        kanji_appris: 0,
        quiz_completes: 0,
      }
    )
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    return {
      xp_total: 0,
      niveau: 1,
      heures_etude: 0,
      serie_actuelle: 0,
      lecons_terminees: 0,
      kana_appris: 0,
      kanji_appris: 0,
      quiz_completes: 0,
    }
  }
}

// Fonction pour récupérer l'activité récente d'un utilisateur
export async function getUserActivity(userId: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api.php?action=getActivity&user_id=${userId}`)

    if (!response.ok) {
      throw new Error(`Échec de la récupération de l'activité: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data)) {
      return data
    }

    return []
  } catch (error) {
    console.error("Erreur lors de la récupération de l'activité:", error)
    return []
  }
}

// Fonction pour récupérer les kanji par niveau JLPT
export async function getKanjiByJlptLevel(level: number): Promise<any[]> {
  try {
    // Simuler une récupération de kanji depuis une API
    // Dans une vraie application, cette fonction ferait une requête à une API de kanji
    return [
      {
        kanji: "日",
        meanings: ["jour", "soleil", "Japon"],
        kun_readings: ["ひ", "-び", "-か"],
        on_readings: ["ニチ", "ジツ"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 4,
        radical: "日",
      },
      {
        kanji: "一",
        meanings: ["un"],
        kun_readings: ["ひと-", "ひと.つ"],
        on_readings: ["イチ", "イツ"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 1,
        radical: "一",
      },
      {
        kanji: "人",
        meanings: ["personne"],
        kun_readings: ["ひと", "-り", "-と"],
        on_readings: ["ジン", "ニン"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 2,
        radical: "人",
      },
      {
        kanji: "大",
        meanings: ["grand", "gros"],
        kun_readings: ["おお-", "おお.きい"],
        on_readings: ["ダイ", "タイ"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 3,
        radical: "大",
      },
      {
        kanji: "年",
        meanings: ["année", "an"],
        kun_readings: ["とし"],
        on_readings: ["ネン"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 6,
        radical: "干",
      },
      {
        kanji: "月",
        meanings: ["mois", "lune"],
        kun_readings: ["つき"],
        on_readings: ["ゲツ", "ガツ"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 4,
        radical: "月",
      },
      {
        kanji: "本",
        meanings: ["livre", "origine", "réel"],
        kun_readings: ["もと"],
        on_readings: ["ホン"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 5,
        radical: "木",
      },
      {
        kanji: "水",
        meanings: ["eau"],
        kun_readings: ["みず"],
        on_readings: ["スイ"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 4,
        radical: "水",
      },
      {
        kanji: "火",
        meanings: ["feu"],
        kun_readings: ["ひ"],
        on_readings: ["カ"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 4,
        radical: "火",
      },
      {
        kanji: "金",
        meanings: ["or", "argent", "métal"],
        kun_readings: ["かね", "かな-", "-がね"],
        on_readings: ["キン", "コン"],
        jlpt_level: level,
        grade: 1,
        stroke_count: 8,
        radical: "金",
      },
    ]
  } catch (error) {
    console.error("Erreur lors de la récupération des kanji:", error)
    return []
  }
}

export interface Lesson {
  id: number
  title: string
  description: string
  category?: string
  level?: string
  duration?: string
  xp?: number
  progress?: number
}

export interface KanjiDetail {
  kanji: string
  meanings: string[]
  kun_readings: string[]
  on_readings: string[]
  jlpt_level?: number
  grade?: number
  stroke_count: number
  radical?: string
  parts?: string[]
  examples?: {
    word: string
    reading: string
    meaning: string
  }[]
}

export interface Mission {
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
  category: string
  reward?: {
    type: string
    value: number | string
  }
}

