"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import type { KanjiDetail } from "@/lib/api-service"
import { motion } from "framer-motion"

interface KanjiListProps {
  kanji: KanjiDetail[]
  onSelectKanji: (kanji: string) => void
  selectedKanji: string | null
}

export function KanjiList({ kanji, onSelectKanji, selectedKanji }: KanjiListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const itemsPerPage = 25

  const filteredKanji = kanji.filter(
    (k) =>
      k.kanji.includes(searchTerm) ||
      k.meanings.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
      k.on_readings.some((o) => o.includes(searchTerm)) ||
      k.kun_readings.some((k) => k.includes(searchTerm)),
  )

  const totalPages = Math.ceil(filteredKanji.length / itemsPerPage)
  const currentKanji = filteredKanji.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Réinitialiser la page lorsque le terme de recherche change
  useEffect(() => {
    setCurrentPage(0)
  }, [searchTerm])

  // Faire défiler vers le haut lorsque la page change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [currentPage])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher un kanji par caractère ou signification..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-4">
          <div ref={scrollContainerRef} className="overflow-hidden">
            {filteredKanji.length > 0 ? (
              <motion.div
                className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentKanji.map((k) => (
                  <motion.div
                    key={k.kanji}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Button
                      variant="outline"
                      className={cn(
                        "h-16 w-full text-center transition-all hover:bg-primary/5",
                        selectedKanji === k.kanji && "border-primary bg-primary/10",
                      )}
                      onClick={() => onSelectKanji(k.kanji)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">{k.kanji}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {k.meanings && k.meanings.length > 0 ? k.meanings[0] : ""}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="col-span-full py-8 text-center">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12 text-muted-foreground mb-4"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <p className="text-muted-foreground">Aucun kanji ne correspond à votre recherche</p>
                </div>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} sur {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                className="flex items-center gap-1"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

