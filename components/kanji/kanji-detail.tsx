import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { KanjiStrokeOrder } from "@/components/kanji/kanji-stroke-order"
import type { KanjiDetail as KanjiDetailType } from "@/lib/api-service"

interface KanjiDetailProps {
  kanji: string
  kanjiData: KanjiDetailType
}

export function KanjiDetail({ kanji, kanjiData }: KanjiDetailProps) {
  if (!kanjiData) return null

  // Convertir le niveau JLPT en format N5, N4, etc.
  const jlptLevel = kanjiData.jlpt_level ? `N${kanjiData.jlpt_level}` : "Inconnu"

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Détails du Kanji</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-6xl font-bold">{kanji}</div>
            <div className="space-y-2">
              <Badge variant="outline">{jlptLevel}</Badge>
              {kanjiData.grade && (
                <div className="text-sm text-muted-foreground">
                  {kanjiData.grade === 8 ? "Niveau avancé" : `Niveau scolaire ${kanjiData.grade}`}
                </div>
              )}
              <div className="text-sm text-muted-foreground">{kanjiData.stroke_count} traits</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Signification</h3>
            {kanjiData.meanings && kanjiData.meanings.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {kanjiData.meanings.map((meaning: string, index: number) => (
                  <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                    {meaning}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucune signification disponible</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Lectures</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-muted-foreground">On'yomi (音読み)</h4>
                <div className="mt-1 space-y-1">
                  {kanjiData.on_readings && kanjiData.on_readings.length > 0 ? (
                    kanjiData.on_readings.map((reading: string) => (
                      <Badge key={reading} variant="secondary" className="mr-1 mb-1 inline-flex">
                        {reading}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Aucune lecture on'yomi</span>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm text-muted-foreground">Kun'yomi (訓読み)</h4>
                <div className="mt-1 space-y-1">
                  {kanjiData.kun_readings && kanjiData.kun_readings.length > 0 ? (
                    kanjiData.kun_readings.map((reading: string) => (
                      <Badge key={reading} variant="secondary" className="mr-1 mb-1 inline-flex">
                        {reading}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Aucune lecture kun'yomi</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {kanjiData.examples && kanjiData.examples.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Exemples de mots</h3>
              <div className="space-y-2">
                {kanjiData.examples.map((example: any, index: number) => (
                  <div key={index} className="rounded-md border p-2">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium">{example.word}</div>
                      <div className="text-sm text-muted-foreground">{example.reading}</div>
                    </div>
                    <div className="text-sm">{example.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <KanjiStrokeOrder kanji={kanji} />

        <Card>
          <CardHeader>
            <CardTitle>Composants du Kanji</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="radicals">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="radicals">Radicaux</TabsTrigger>
                <TabsTrigger value="similar">Kanji similaires</TabsTrigger>
              </TabsList>
              <TabsContent value="radicals" className="space-y-4 pt-4">
                {kanjiData.radical ? (
                  <div className="flex items-center rounded-md border p-2">
                    <div className="text-2xl font-bold mr-2">{kanjiData.radical}</div>
                    <div>
                      <div className="text-sm font-medium">Radical principal</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    Information sur les radicaux non disponible
                  </div>
                )}
              </TabsContent>
              <TabsContent value="similar" className="space-y-4 pt-4">
                <div className="text-center text-muted-foreground py-4">Kanji similaires non disponibles</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

