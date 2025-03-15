"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createUser, setCurrentUser } from "@/lib/auth-utils"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired")
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("invalidEmail")
    }

    if (!formData.password) {
      newErrors.password = t("passwordRequired")
    } else if (formData.password.length < 6) {
      newErrors.password = t("passwordTooShort")
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("passwordsDontMatch")
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
      // Créer un nouvel utilisateur via l'API
      const user = await createUser(formData.name, formData.email, formData.password)

      if (user) {
        // Connecter l'utilisateur
        setCurrentUser(user)

        toast({
          title: t("accountCreated"),
          description: t("accountCreatedDesc"),
        })

        // Rediriger directement vers le tableau de bord
        router.push("/dashboard")
      } else {
        setApiError(t("registrationErrorDesc"))
        toast({
          title: t("registrationError"),
          description: t("registrationErrorDesc"),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      setApiError(t("registrationErrorDesc"))
      toast({
        title: t("registrationError"),
        description: t("registrationErrorDesc"),
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
          <AlertTitle>{t("registrationError")}</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t("namePlaceholder")}
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

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
        <Label htmlFor="password">{t("password")}</Label>
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? "border-destructive" : ""}
        />
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isLoading}
      >
        {isLoading ? t("creatingAccount") : t("createAccount")}
      </Button>
    </form>
  )
}

