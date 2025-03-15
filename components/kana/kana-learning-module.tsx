"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanaTable } from "@/components/kana/kana-table"
import { KanaQuiz } from "@/components/kana/kana-quiz"
import { KanaStrokeOrder } from "@/components/kana/kana-stroke-order"
import { hiraganaData, katakanaData } from "@/lib/kana-data"

export function KanaLearningModule() {
  const [selectedKana, setSelectedKana] = useState<string | null>(null)
  const [kanaType, setKanaType] = useState<"hiragana" | "katakana">("hiragana")

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="hiragana"
        className="w-full"
        onValueChange={(value) => setKanaType(value as "hiragana" | "katakana")}
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="hiragana">Hiragana</TabsTrigger>
          <TabsTrigger value="katakana">Katakana</TabsTrigger>
        </TabsList>
        <TabsContent value="hiragana" className="space-y-6">
          <KanaTable data={hiraganaData} onSelectKana={(kana) => setSelectedKana(kana)} selectedKana={selectedKana} />
        </TabsContent>
        <TabsContent value="katakana" className="space-y-6">
          <KanaTable data={katakanaData} onSelectKana={(kana) => setSelectedKana(kana)} selectedKana={selectedKana} />
        </TabsContent>
      </Tabs>

      {selectedKana && (
        <div className="grid gap-6 md:grid-cols-2">
          <KanaStrokeOrder kana={selectedKana} type={kanaType} />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Practice</h3>
            <p className="text-muted-foreground">
              Practice writing the kana character by following the stroke order. Try to match the correct stroke order
              and direction.
            </p>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="text-center text-6xl font-bold py-8">{selectedKana}</div>
              <div className="text-center text-lg">
                {kanaType === "hiragana"
                  ? hiraganaData.find((k) => k.character === selectedKana)?.romaji
                  : katakanaData.find((k) => k.character === selectedKana)?.romaji}
              </div>
            </div>
          </div>
        </div>
      )}

      <KanaQuiz kanaType={kanaType} />
    </div>
  )
}

