"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

interface LessonQuizProps {
  lessonId: number
  onComplete: () => void
}

export function LessonQuiz({ lessonId, onComplete }: LessonQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  // Questions de quiz fictives - dans une vraie application, elles viendraient d'une base de données ou d'une API basée sur l'ID de la leçon
  const questions = [
    {
      question: "Quel est le mot japonais pour 'bonjour' ?",
      options: ["こんにちは", "さようなら", "ありがとう", "おはよう"],
      correctAnswer: "こんにちは",
    },
    {
      question: "Quelle particule est utilisée pour marquer l'objet d'un verbe ?",
      options: ["は", "が", "を", "に"],
      correctAnswer: "を",
    },
    {
      question: "Quelle est la façon correcte de dire 'Je suis étudiant' en japonais ?",
      options: ["学生です。", "学生じゃありません。", "学生でした。", "学生になります。"],
      correctAnswer: "学生です。",
    },
    {
      question: "Lequel de ces éléments N'EST PAS un système d'écriture japonais ?",
      options: ["Hiragana", "Katakana", "Kanji", "Romaji", "Hangul"],
      correctAnswer: "Hangul",
    },
    {
      question: "Que signifie l'expression 'よろしくお願いします' ?",
      options: ["Enchanté de vous rencontrer", "Je vous en prie", "Merci beaucoup", "Je suis désolé"],
      correctAnswer: "Je vous en prie",
    },
  ]

  // Modifier la fonction onComplete dans LessonQuiz pour s'assurer qu'elle appelle correctement la fonction de mise à jour
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
        if (score + (answer === questions[currentQuestion].correctAnswer ? 1 : 0) >= questions.length * 0.7) {
          console.log("Quiz completed successfully, calling onComplete")
          onComplete()
        }
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz de la leçon</CardTitle>
        <CardDescription>Testez vos connaissances de cette leçon</CardDescription>
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
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option) => (
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
                    className="justify-start text-left"
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
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
                  ? "Bon travail ! Vous avez réussi le quiz."
                  : "Continuez à étudier et réessayez pour terminer la leçon."}
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
          <div className="text-sm text-muted-foreground">Sélectionnez une réponse pour continuer</div>
        )}
      </CardFooter>
    </Card>
  )
}

