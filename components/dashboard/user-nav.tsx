"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { getCurrentUser, setCurrentUser } from "@/lib/auth-utils"

export function UserNav() {
  const [user, setUser] = useState(getCurrentUser())
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    // Mettre à jour l'utilisateur si connecté
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user ? (
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
            ) : (
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            )}
            <AvatarFallback>{user ? user.name.substring(0, 2).toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user ? user.name : "Guest"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user ? user.email : "Not logged in"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>{t("profile")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>{t("settings")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/achievements")}>{t("achievements")}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>{t("logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

