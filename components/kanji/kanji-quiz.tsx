"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from "lucide-react"
import type { KanjiDetail } from "@/lib/api-service"

interface KanjiQuizProps {
  jlptLevel: number
  kanjiList: KanjiDetail[]
}

export function KanjiQuiz({ jlptLevel, kanjiList }: KanjiQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [quizType, setQuizType] = useState<"meaning" | "reading">("meaning")

  useEffect(() => {
    if (kanjiList.length > 0) {
      generateQuiz()
    }
  }, [kanjiList, quizType])

  const generateQuiz = () => {
    if (kanjiList.length < 4) {
      // Pas assez de kanji pour générer un quiz
      setQuestions([])
      return
    }

    // Sélectionner aléatoirement 10 kanji ou moins si pas assez de données
    const shuffledData = [...kanjiList].sort(() => 0.5 - Math.random()).slice(0, Math.min(10, kanjiList.length))

    const questions = shuffledData.map((kanji) => {
      // Générer 3 options incorrectes
      const incorrectOptions = kanjiList
        .filter((k) => k.kanji !== kanji.kanji)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((k) => (quizType === "meaning" ? k.meanings[0] : k.on_readings[0] || k.kun_readings[0] || ""))

      // Combiner la réponse correcte avec les options incorrectes et mélanger
      const correctAnswer =
        quizType === "meaning" ? kanji.meanings[0] : kanji.on_readings[0] || kanji.kun_readings[0] || ""
      const options = [correctAnswer, ...incorrectOptions].sort(() => 0.5 - Math.random())

      return {
        character: kanji.kanji,
        correctAnswer,
        options,
      }
    })

    setQuestions(questions)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)

    // Check if answer is correct
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    // Wait a moment before moving to next question
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const restartQuiz = () => {
    generateQuiz()
  }

  if (questions.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quiz de Kanji</CardTitle>
          <CardDescription>Pas assez de données kanji disponibles pour ce niveau</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4">Nous avons besoin de plus de données kanji pour générer un quiz pour ce niveau.</p>
            <Button onClick={() => generateQuiz()}>Réessayer</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quiz de Kanji</CardTitle>
            <CardDescription>Testez vos connaissances des kanji de niveau {`N${jlptLevel}`}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={quizType === "meaning" ? "default" : "outline"}
              onClick={() => setQuizType("meaning")}
            >
              Signification
            </Button>
            <Button
              size="sm"
              variant={quizType === "reading" ? "default" : "outline"}
              onClick={() => setQuizType("reading")}
            >
              Lecture
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!showResult ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} sur {questions.length}
              </div>
              <div className="text-sm font-medium">Score: {score}</div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-8xl font-bold">{questions[currentQuestion].character}</div>
              <div className="text-lg">
                {quizType === "meaning"
                  ? "Quelle est la signification de ce kanji ?"
                  : "Quelle est la lecture de ce kanji ?"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option: string) => (
                <Button
                  key={option}
                  variant={
                    selectedAnswer === null
                      ? "outline"
                      : selectedAnswer === option
                        ? option === questions[currentQuestion].correctAnswer
                          ? "default"
                          : "destructive"
                        : option === questions[currentQuestion].correctAnswer && selectedAnswer !== null
                          ? "default"
                          : "outline"
                  }
                  className="h-12 text-lg"
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6 py-6">
            <div className="text-2xl font-bold">Quiz terminé !</div>
            <div className="text-5xl font-bold">
              {score} / {questions.length}
            </div>
            <div className="text-lg text-muted-foreground">
              {score === questions.length
                ? "Score parfait ! Excellent travail !"
                : score >= questions.length * 0.7
                  ? "Bon travail ! Continuez à pratiquer !"
                  : "Bon effort ! Continuez à étudier pour vous améliorer."}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {showResult ? (
          <Button onClick={restartQuiz} className="w-full">
            <Shuffle className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        ) : (
          <Button variant="ghost" onClick={restartQuiz} className="w-full">
            <Shuffle className="mr-2 h-4 w-4" />
            Nouveau Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

