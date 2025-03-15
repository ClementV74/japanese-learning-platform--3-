export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  progress: UserProgress
}

export interface UserProgress {
  lessonsCompleted: number
  kanaLearned: number
  kanjiLearned: number
  quizzesTaken: number
  streak: number
  totalXp: number
  lastActivity: string
}

