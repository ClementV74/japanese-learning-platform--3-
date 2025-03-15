"\"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { getCurrentUser, setCurrentUser } from "@/lib/auth-utils"

export function ProfileForm() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [user, setUser] = useState(getCurrentUser())
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const handleSave = () => {
    // Simulate saving profile information
    if (user) {
      const updatedUser = { ...user, name: name, email: email }
      setCurrentUser(updatedUser)
      setUser(updatedUser)

      toast({
        title: t("profileUpdated"),
        description: t("profileUpdatedDesc"),
      })
    } else {
      toast({
        title: "Not logged in",
        description: "You must be logged in to save profile information.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("profileInformation")}</CardTitle>
        <CardDescription>{t("profileInformationDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">{t("cancel")}</Button>
        <Button onClick={handleSave}>{t("saveChanges")}</Button>
      </CardFooter>
    </Card>
  )
}
\
"

