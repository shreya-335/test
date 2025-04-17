"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Pause, Clock, Award } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

type MeditationSession = {
  id: string
  title: string
  description: string
  duration: number // in minutes
  level: "beginner" | "intermediate" | "advanced"
  category: string
  imageUrl: string
  completed?: boolean
  progress?: number
}

const meditationSessions: MeditationSession[] = [
  {
    id: "1",
    title: "Mindful Breathing",
    description: "Focus on your breath to calm your mind and reduce anxiety.",
    duration: 5,
    level: "beginner",
    category: "anxiety",
    imageUrl: "/placeholder.svg?height=200&width=400",
    progress: 100,
    completed: true,
  },
  {
    id: "2",
    title: "Body Scan Relaxation",
    description: "Progressively relax your body from head to toe.",
    duration: 10,
    level: "beginner",
    category: "stress",
    imageUrl: "/placeholder.svg?height=200&width=400",
    progress: 60,
  },
  {
    id: "3",
    title: "Loving-Kindness Meditation",
    description: "Cultivate feelings of goodwill, kindness, and warmth towards others.",
    duration: 15,
    level: "intermediate",
    category: "compassion",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Focused Attention",
    description: "Improve your concentration by focusing on a single point.",
    duration: 20,
    level: "intermediate",
    category: "focus",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Deep Sleep Meditation",
    description: "Prepare your mind and body for a restful night's sleep.",
    duration: 30,
    level: "beginner",
    category: "sleep",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "Visualization for Anxiety",
    description: "Use guided imagery to reduce anxiety and promote calm.",
    duration: 15,
    level: "beginner",
    category: "anxiety",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
]

export default function MeditationPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredSessions =
    activeTab === "all" ? meditationSessions : meditationSessions.filter((session) => session.category === activeTab)

  const handlePlaySession = (session: MeditationSession) => {
    setCurrentSession(session)
    setIsPlaying(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader title="Meditation Therapy" />

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {currentSession && (
          <Card className="mb-8 overflow-hidden">
            <div className="relative h-48 md:h-64 bg-slate-200 dark:bg-slate-700">
              <img
                src={currentSession.imageUrl || "/placeholder.svg"}
                alt={currentSession.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{currentSession.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{currentSession.description}</p>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{currentSession.duration} minutes</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 mr-4">
                  <Progress value={currentSession.progress || 0} className="h-2" />
                </div>
                <Button
                  size="icon"
                  className={isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-teal-600 hover:bg-teal-700"}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{isPlaying ? "Playing..." : "Paused"}</p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSessions.map((session) => (
                <MeditationCard key={session.id} session={session} onPlay={() => handlePlaySession(session)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MeditationCard({ session, onPlay }: { session: MeditationSession; onPlay: () => void }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-slate-200 dark:bg-slate-700">
        <img src={session.imageUrl || "/placeholder.svg"} alt={session.title} className="w-full h-full object-cover" />
        {session.completed && (
          <div className="absolute top-2 right-2">
            <Badge level={session.level} />
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{session.title}</CardTitle>
          {session.completed && <Award className="h-5 w-5 text-yellow-500" />}
        </div>
        <CardDescription className="line-clamp-2">{session.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Clock className="h-4 w-4 mr-1" />
          <span>{session.duration} minutes</span>
        </div>
        {session.progress !== undefined && <Progress value={session.progress} className="h-1 mt-2" />}
      </CardContent>
      <CardFooter>
        <Button onClick={onPlay} className="w-full bg-teal-600 hover:bg-teal-700">
          <Play className="h-4 w-4 mr-2" />
          {session.progress ? "Continue" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function Badge({ level }: { level: "beginner" | "intermediate" | "advanced" }) {
  const colors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}
