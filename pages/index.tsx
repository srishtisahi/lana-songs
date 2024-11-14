'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Simulated Lana Del Rey song data
const lanaSongs = [
  { title: "Video Games", mood: "melancholic", tempo: "slow", theme: "love" },
  { title: "Born to Die", mood: "dramatic", tempo: "medium", theme: "fatalism" },
  { title: "Summertime Sadness", mood: "sad", tempo: "upbeat", theme: "nostalgia" },
  { title: "Young and Beautiful", mood: "romantic", tempo: "slow", theme: "love" },
  { title: "High by the Beach", mood: "carefree", tempo: "medium", theme: "independence" }
]

const questions = [
  {
    question: "How would you describe your current mood?",
    options: ["Happy", "Sad", "Nostalgic", "Rebellious", "Romantic"]
  },
  {
    question: "What's your ideal tempo for a song right now?",
    options: ["Slow and dreamy", "Medium and groovy", "Fast and energetic"]
  },
  {
    question: "Which theme resonates with you the most today?",
    options: ["Love", "Independence", "Nostalgia", "Fatalism", "Escapism"]
  },
  {
    question: "What's your preferred setting for listening to music?",
    options: ["Beach", "City streets", "Bedroom", "Road trip", "Party"]
  },
  {
    question: "How do you feel about your current life situation?",
    options: ["Content", "Longing for change", "Excited", "Melancholic", "Indifferent"]
  }
]

export default function LanaDelReyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [result, setResult] = useState<string | null>(null)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed, determine the result
      const recommendedSong = getRecommendedSong(answers)
      setResult(recommendedSong)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getRecommendedSong = (userAnswers: string[]): string => {
    // This is a simplified recommendation algorithm
    // In a real scenario, you'd use more sophisticated matching or the Spotify API
    const moodIndex = Math.floor(Math.random() * lanaSongs.length)
    return lanaSongs[moodIndex].title
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(''))
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-sky-200 to-indigo-300 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <Card className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Which Lana Del Rey Song Are You?</CardTitle>
          <CardDescription className="text-center">Answer these 5 questions to find out!</CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Your Lana Del Rey song is:</h2>
              <p className="text-3xl font-bold text-primary mb-6">{result}</p>
              <p className="mb-4">This song perfectly captures your current vibe. Give it a listen!</p>
              <Button onClick={resetQuiz}>Take the Quiz Again</Button>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h2>
              <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                {questions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-2 mb-2"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Button 
              onClick={goToPreviousQuestion} 
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
          </div>
          <p className="text-sm text-muted-foreground self-center">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div>
            <Button 
              onClick={goToNextQuestion}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}