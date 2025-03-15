"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { getCurrentUser, setCurrentUser } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"

export function SettingsForm() {
  const { toast } = useToast()
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState(getCurrentUser())
  const router = useRouter()

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      dailyReminder: true,
      achievements: true,
      newContent: false,
    },
    appearance: {
      theme: theme || "light",
      fontSize: "medium",
      animationsEnabled: true,
    },
    learning: {
      dailyGoal: "15",
      difficulty: "normal",
      furiganaEnabled: true,
      autoPlayAudio: true,
    },
    account: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    // Mettre à jour l'utilisateur si connecté
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setSettings((prev) => ({
        ...prev,
        account: {
          ...prev.account,
          name: currentUser.name,
          email: currentUser.email,
        },
      }))
    }

    // Charger les paramètres depuis localStorage au démarrage
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)

        // Appliquer les paramètres chargés
        if (parsedSettings.appearance.fontSize) {
          handleFontSizeChange(parsedSettings.appearance.fontSize)
        }
        if (parsedSettings.appearance.animationsEnabled !== undefined) {
          handleAnimationsChange(parsedSettings.appearance.animationsEnabled)
        }
      } catch (error) {
        console.error("Error parsing saved settings:", error)
      }
    }
  }, [])

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handleAppearanceChange = (key: string, value: string | boolean) => {
    if (key === "theme") {
      setTheme(value as string)
    }

    setSettings((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value,
      },
    }))
  }

  const handleLearningChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      learning: {
        ...prev.learning,
        [key]: value,
      },
    }))
  }

  const handleAccountChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        [key]: value,
      },
    }))
  }

  const saveSettings = () => {
    // Enregistrer les paramètres dans localStorage
    localStorage.setItem("userSettings", JSON.stringify(settings))

    toast({
      title: t("settingsSaved"),
      description: t("settingsSavedDesc"),
    })
  }

  const saveAccountSettings = () => {
    // Vérifier si l'utilisateur est connecté
    if (!user) {
      toast({
        title: t("notLoggedIn"),
        description: t("loginToSaveSettings"),
        variant: "destructive",
      })
      return
    }

    // Simuler la mise à jour du compte
    toast({
      title: t("accountUpdated"),
      description: t("accountUpdatedDesc"),
    })
  }

  const handleLogout = () => {
    setCurrentUser(null)
    router.push("/")
  }

  const handleFontSizeChange = (value: string) => {
    handleAppearanceChange("fontSize", value)

    // Appliquer la taille de police
    const root = document.documentElement
    switch (value) {
      case "small":
        root.style.fontSize = "14px"
        break
      case "medium":
        root.style.fontSize = "16px"
        break
      case "large":
        root.style.fontSize = "18px"
        break
      default:
        root.style.fontSize = "16px"
    }
  }

  const handleAnimationsChange = (checked: boolean) => {
    handleAppearanceChange("animationsEnabled", checked)

    // Appliquer le paramètre d'animation
    const root = document.documentElement
    if (checked) {
      root.classList.remove("no-animations")
    } else {
      root.classList.add("no-animations")
    }
  }

  return (
    <Tabs defaultValue="notifications" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Apparence</TabsTrigger>
        <TabsTrigger value="learning">Apprentissage</TabsTrigger>
        <TabsTrigger value="account">Compte</TabsTrigger>
      </TabsList>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de notification</CardTitle>
            <CardDescription>Gérez comment et quand vous recevez des notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Notifications par email</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Recevez des mises à jour et des rappels par email
                </span>
              </Label>
              <Switch
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleNotificationChange("email", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="daily-reminder" className="flex flex-col space-y-1">
                <span>Rappel quotidien</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Recevez un rappel quotidien pour étudier
                </span>
              </Label>
              <Switch
                id="daily-reminder"
                checked={settings.notifications.dailyReminder}
                onCheckedChange={(checked) => handleNotificationChange("dailyReminder", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="achievements-notification" className="flex flex-col space-y-1">
                <span>Notifications de récompenses</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Soyez notifié lorsque vous débloquez une récompense
                </span>
              </Label>
              <Switch
                id="achievements-notification"
                checked={settings.notifications.achievements}
                onCheckedChange={(checked) => handleNotificationChange("achievements", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="new-content" className="flex flex-col space-y-1">
                <span>Nouveau contenu</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Soyez informé lorsque de nouvelles leçons sont disponibles
                </span>
              </Label>
              <Switch
                id="new-content"
                checked={settings.notifications.newContent}
                onCheckedChange={(checked) => handleNotificationChange("newContent", checked)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>{t("saveSettings")}</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>{t("appearanceSettings")}</CardTitle>
            <CardDescription>{t("appearanceSettingsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>{t("theme")}</Label>
              <RadioGroup
                value={settings.appearance.theme}
                onValueChange={(value) => handleAppearanceChange("theme", value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">{t("light")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">{t("dark")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system">{t("system")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sakura" id="sakura" />
                  <Label htmlFor="sakura">{t("sakura")}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">{t("fontSize")}</Label>
              <Select value={settings.appearance.fontSize} onValueChange={(value) => handleFontSizeChange(value)}>
                <SelectTrigger id="font-size">
                  <SelectValue placeholder={t("selectFontSize")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">{t("small")}</SelectItem>
                  <SelectItem value="medium">{t("medium")}</SelectItem>
                  <SelectItem value="large">{t("large")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="animations" className="flex flex-col space-y-1">
                <span>{t("enableAnimations")}</span>
                <span className="font-normal text-sm text-muted-foreground">{t("enableAnimationsDesc")}</span>
              </Label>
              <Switch
                id="animations"
                checked={settings.appearance.animationsEnabled}
                onCheckedChange={(checked) => handleAnimationsChange(checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("interfaceLanguage")}</Label>
              <RadioGroup
                value={language}
                onValueChange={(value) => setLanguage(value as "fr" | "en")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fr" id="fr" />
                  <Label htmlFor="fr">🇫🇷 Français</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en">🇬🇧 English</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>{t("saveSettings")}</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="learning">
        <Card>
          <CardHeader>
            <CardTitle>{t("learningSettings")}</CardTitle>
            <CardDescription>{t("learningSettingsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="daily-goal">{t("dailyGoal")}</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="daily-goal"
                  type="number"
                  min="5"
                  max="60"
                  value={settings.learning.dailyGoal}
                  onChange={(e) => handleLearningChange("dailyGoal", e.target.value)}
                  className="w-20"
                />
                <span>{t("minutes")}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">{t("difficulty")}</Label>
              <Select
                value={settings.learning.difficulty}
                onValueChange={(value) => handleLearningChange("difficulty", value)}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder={t("selectDifficulty")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">{t("easy")}</SelectItem>
                  <SelectItem value="normal">{t("normal")}</SelectItem>
                  <SelectItem value="hard">{t("hard")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="furigana" className="flex flex-col space-y-1">
                <span>{t("showFurigana")}</span>
                <span className="font-normal text-sm text-muted-foreground">{t("showFuriganaDesc")}</span>
              </Label>
              <Switch
                id="furigana"
                checked={settings.learning.furiganaEnabled}
                onCheckedChange={(checked) => handleLearningChange("furiganaEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-play" className="flex flex-col space-y-1">
                <span>{t("autoPlayAudio")}</span>
                <span className="font-normal text-sm text-muted-foreground">{t("autoPlayAudioDesc")}</span>
              </Label>
              <Switch
                id="auto-play"
                checked={settings.learning.autoPlayAudio}
                onCheckedChange={(checked) => handleLearningChange("autoPlayAudio", checked)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>{t("saveSettings")}</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>{t("accountSettings")}</CardTitle>
            <CardDescription>{t("accountSettingsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="account-name">{t("name")}</Label>
              <Input
                id="account-name"
                value={settings.account.name}
                onChange={(e) => handleAccountChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-email">{t("email")}</Label>
              <Input
                id="account-email"
                type="email"
                value={settings.account.email}
                onChange={(e) => handleAccountChange("email", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleLogout}>
              {t("logout")}
            </Button>
            <Button onClick={saveAccountSettings}>{t("saveAccountSettings")}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

