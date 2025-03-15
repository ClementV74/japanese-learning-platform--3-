"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface LessonFiltersProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function LessonFilters({ selectedCategory, onCategoryChange, searchTerm, onSearchChange }: LessonFiltersProps) {
  const categories = ["Grammaire", "Vocabulaire", "Conversation", "Lecture", "Écriture", "Culture", "Préparation JLPT"]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des leçons..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Catégories</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                >
                  {category}
                </Button>
              ))}
              {selectedCategory && (
                <Button variant="ghost" size="sm" onClick={() => onCategoryChange(null)}>
                  <X className="mr-1 h-4 w-4" />
                  Effacer les filtres
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

