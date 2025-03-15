"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { authenticateUser, setCurrentUser } from "@/lib/auth-utils"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // Effacer l'erreur API lorsque l'utilisateur modifie les champs
    if (apiError) {
      setApiError(null)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired")
    }

    if (!formData.password) {
      newErrors.password = t("passwordRequired")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setApiError(null)

    try {
      // Authentifier l'utilisateur via l'API
      const user = await authenticateUser(formData.email, formData.password)

      if (user) {
        // Connecter l'utilisateur
        setCurrentUser(user)

        toast({
          title: t("loginSuccess"),
          description: t("welcomeBack"),
        })

        // Rediriger vers le tableau de bord
        router.push("/dashboard")
      } else {
        setApiError(t("invalidCredentials"))
        toast({
          title: t("loginFailed"),
          description: t("invalidCredentialsDesc"),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setApiError(t("loginErrorDesc"))
      toast({
        title: t("loginError"),
        description: t("loginErrorDesc"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {apiError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("loginFailed")}</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">{t("password")}</Label>
          <Link href="/forgot-password" className="text-sm underline underline-offset-4 hover:text-primary">
            {t("forgotPassword")}
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isLoading}
      >
        {isLoading ? t("signingIn") : t("signIn")}
      </Button>
    </form>
  )
}

