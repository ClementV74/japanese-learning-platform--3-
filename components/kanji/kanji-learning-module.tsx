"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanjiList } from "@/components/kanji/kanji-list"
import { KanjiDetail } from "@/components/kanji/kanji-detail"
import { KanjiQuiz } from "@/components/kanji/kanji-quiz"
import { getKanjiByJlptLevel, type KanjiDetail as KanjiDetailType } from "@/lib/api-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { RouteGuard } from "@/components/auth/route-guard"
import { DashboardHeader } from "@/components/header"

export function KanjiLearningModule() {
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null)
  const [jlptLevel, setJlptLevel] = useState<number>(4) // N4 par défaut (plus de kanji que N5)
  const [kanjiList, setKanjiList] = useState<KanjiDetailType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedKanjiDetails, setSelectedKanjiDetails] = useState<KanjiDetailType | null>(null)

  // Modifier la fonction fetchKanji pour gérer les erreurs de l'API
  useEffect(() => {
    const fetchKanji = async () => {
      setLoading(true)
      setError(null)
      try {
        // Utiliser la fonction getKanjiByJlptLevel pour récupérer les kanji
        const kanji = await getKanjiByJlptLevel(jlptLevel)

        if (kanji.length === 0) {
          setError("Aucun kanji trouvé pour ce niveau JLPT ou problème de connexion à l'API.")
        } else {
          setKanjiList(kanji)
        }

        setSelectedKanji(null)
        setSelectedKanjiDetails(null)
      } catch (error) {
        console.error("Erreur lors de la récupération des kanji:", error)
        setError("Une erreur s'est produite lors de la récupération des kanji. Veuillez réessayer plus tard.")
      } finally {
        setLoading(false)
      }
    }

    // Ajouter un timeout pour éviter un chargement infini
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false)
        setError("Le chargement des kanji a pris trop de temps. Veuillez réessayer plus tard.")
      }
    }, 15000) // 15 secondes de timeout

    fetchKanji()

    // Nettoyer le timeout
    return () => clearTimeout(timeoutId)
  }, [jlptLevel])

  // Lorsqu'un kanji est sélectionné, mettre à jour les détails
  useEffect(() => {
    if (selectedKanji) {
      const details = kanjiList.find((k) => k.kanji === selectedKanji) || null
      setSelectedKanjiDetails(details)
    } else {
      setSelectedKanjiDetails(null)
    }
  }, [selectedKanji, kanjiList])

  return (
    <RouteGuard>
      <DashboardHeader
        heading="Apprentissage des Kanji"
        text="Maîtrisez les Kanji japonais avec des données réelles de l'API KanjiAPI"
      />
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="4" className="w-full" onValueChange={(value) => setJlptLevel(Number(value))}>
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="5" className="relative">
              N5
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {jlptLevel === 5 && kanjiList.length > 0 ? kanjiList.length : ""}
              </span>
            </TabsTrigger>
            <TabsTrigger value="4" className="relative">
              N4
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {jlptLevel === 4 && kanjiList.length > 0 ? kanjiList.length : ""}
              </span>
            </TabsTrigger>
            <TabsTrigger value="3" className="relative">
              N3
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {jlptLevel === 3 && kanjiList.length > 0 ? kanjiList.length : ""}
              </span>
            </TabsTrigger>
            <TabsTrigger value="2" className="relative">
              N2
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {jlptLevel === 2 && kanjiList.length > 0 ? kanjiList.length : ""}
              </span>
            </TabsTrigger>
            <TabsTrigger value="1" className="relative">
              N1
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {jlptLevel === 1 && kanjiList.length > 0 ? kanjiList.length : ""}
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={jlptLevel.toString()} className="space-y-6">
            {loading ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center p-8">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-muted-foreground">Chargement des kanji...</p>
                  </div>
                </div>
              </div>
            ) : (
              <KanjiList
                kanji={kanjiList}
                onSelectKanji={(kanji) => setSelectedKanji(kanji)}
                selectedKanji={selectedKanji}
              />
            )}
          </TabsContent>
        </Tabs>

        {selectedKanji && selectedKanjiDetails && (
          <KanjiDetail kanji={selectedKanji} kanjiData={selectedKanjiDetails} />
        )}

        {!loading && kanjiList.length > 0 && <KanjiQuiz jlptLevel={jlptLevel} kanjiList={kanjiList} />}
      </div>
    </RouteGuard>
  )
}

