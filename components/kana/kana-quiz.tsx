"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { hiraganaData, katakanaData } from "@/lib/kana-data"
import { Shuffle } from "lucide-react"

interface KanaQuizProps {
  kanaType: "hiragana" | "katakana"
}

export function KanaQuiz({ kanaType }: KanaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [questions, setQuestions] = useState<any[]>([])

  useEffect(() => {
    generateQuiz()
  }, [kanaType])

  const generateQuiz = () => {
    const data = kanaType === "hiragana" ? hiraganaData : katakanaData
    const shuffledData = [...data].sort(() => 0.5 - Math.random()).slice(0, 10)

    const questions = shuffledData.map((kana) => {
      // Generate 3 random incorrect options
      const incorrectOptions = data
        .filter((k) => k.character !== kana.character)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((k) => k.romaji)

      // Combine correct answer with incorrect options and shuffle
      const options = [kana.romaji, ...incorrectOptions].sort(() => 0.5 - Math.random())

      return {
        character: kana.character,
        correctAnswer: kana.romaji,
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
    return <div>Loading quiz...</div>
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Kana Quiz</CardTitle>
        <CardDescription>Test your knowledge of {kanaType} characters</CardDescription>
      </CardHeader>
      <CardContent>
        {!showResult ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-sm font-medium">Score: {score}</div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-8xl font-bold">{questions[currentQuestion].character}</div>
              <div className="text-lg">What is the reading of this character?</div>
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
            <div className="text-2xl font-bold">Quiz Complete!</div>
            <div className="text-5xl font-bold">
              {score} / {questions.length}
            </div>
            <div className="text-lg text-muted-foreground">
              {score === questions.length
                ? "Perfect score! Amazing job!"
                : score >= questions.length * 0.7
                  ? "Great job! Keep practicing!"
                  : "Good effort! Keep studying to improve."}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {showResult ? (
          <Button onClick={restartQuiz} className="w-full">
            <Shuffle className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        ) : (
          <Button variant="ghost" onClick={restartQuiz} className="w-full">
            <Shuffle className="mr-2 h-4 w-4" />
            New Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

