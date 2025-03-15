import type { User } from "@/types/user"
import { getCurrentUser, setCurrentUser as setUser } from "@/lib/auth-utils"

// Fonction pour définir l'utilisateur actuel
export const setCurrentUser = (user: User | null): void => {
  setUser(user)
}

// Fonction pour récupérer l'utilisateur actuel
export const getUser = (): User | null => {
  return getCurrentUser()
}

