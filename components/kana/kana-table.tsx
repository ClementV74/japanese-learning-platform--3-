"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KanaCharacter {
  character: string
  romaji: string
  type: string
}

interface KanaTableProps {
  data: KanaCharacter[]
  onSelectKana: (kana: string) => void
  selectedKana: string | null
}

export function KanaTable({ data, onSelectKana, selectedKana }: KanaTableProps) {
  // Group kana by type (basic, dakuten, etc.)
  const groupedKana = data.reduce(
    (acc, kana) => {
      if (!acc[kana.type]) {
        acc[kana.type] = []
      }
      acc[kana.type].push(kana)
      return acc
    },
    {} as Record<string, KanaCharacter[]>,
  )

  return (
    <div className="space-y-6">
      {Object.entries(groupedKana).map(([type, kanaList]) => (
        <Card key={type}>
          <CardContent className="p-4">
            <h3 className="mb-4 font-semibold capitalize">{type}</h3>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-5 md:grid-cols-10">
              {kanaList.map((kana) => (
                <Button
                  key={kana.character}
                  variant="outline"
                  className={cn(
                    "h-16 w-full text-center",
                    selectedKana === kana.character && "border-primary bg-primary/10",
                  )}
                  onClick={() => onSelectKana(kana.character)}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{kana.character}</span>
                    <span className="text-xs text-muted-foreground">{kana.romaji}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

