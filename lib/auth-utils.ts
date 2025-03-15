import type { User } from "@/types/user"
import { loginUser as apiLoginUser, createUser as apiCreateUser } from "@/lib/api-service"

// Clé pour stocker l'utilisateur dans le localStorage
const USER_STORAGE_KEY = "current_user"

// Fonction pour authentifier un utilisateur
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    // Appeler l'API pour authentifier l'utilisateur
    const user = await apiLoginUser(email, password)
    return user
  } catch (error) {
    console.error("Erreur d'authentification:", error)
    return null
  }
}

// Fonction pour créer un nouvel utilisateur
export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    // Appeler l'API pour créer un nouvel utilisateur
    const user = await apiCreateUser(name, email, password)
    return user
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error)
    return null
  }
}

// Fonction pour définir l'utilisateur actuel
export function setCurrentUser(user: User): void {
  // Stocker l'utilisateur dans le localStorage
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

// Fonction pour récupérer l'utilisateur actuel
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null
  }

  // Récupérer l'utilisateur depuis le localStorage
  const userJson = localStorage.getItem(USER_STORAGE_KEY)

  if (!userJson) {
    return null
  }

  try {
    return JSON.parse(userJson) as User
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return null
  }
}

// Fonction pour déconnecter l'utilisateur
export function logoutUser(): void {
  // Supprimer l'utilisateur du localStorage
  localStorage.removeItem(USER_STORAGE_KEY)
}

// Fonction pour mettre à jour les données de l'utilisateur
export function updateUserData(userData: Partial<User>): void {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return
  }

  // Mettre à jour les données de l'utilisateur
  const updatedUser = {
    ...currentUser,
    ...userData,
  }

  // Stocker l'utilisateur mis à jour dans le localStorage
  setCurrentUser(updatedUser)
}

// Fonction pour vérifier si l'utilisateur est connecté
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Fonction pour mettre à jour la progression de l'utilisateur
export function updateUserProgress(progressData: Partial<User["progress"]>): void {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return
  }

  // Mettre à jour la progression de l'utilisateur
  const updatedUser = {
    ...currentUser,
    progress: {
      ...currentUser.progress,
      ...progressData,
    },
  }

  // Stocker l'utilisateur mis à jour dans le localStorage
  setCurrentUser(updatedUser)
}

