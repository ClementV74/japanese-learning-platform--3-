"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-utils"
import { Skeleton } from "@/components/ui/skeleton"

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const user = getCurrentUser()

    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }

    setIsLoading(false)
  }, [router])

  // Afficher un écran de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    )
  }

  // Afficher les enfants uniquement si l'utilisateur est autorisé
  return isAuthorized ? <>{children}</> : null
}

