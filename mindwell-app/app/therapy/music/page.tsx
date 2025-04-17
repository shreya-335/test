"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

type Track = {
  id: string
  title: string
  artist: string
  duration: number // in seconds
  category: string
  imageUrl: string
  audioUrl: string
  favorite?: boolean
}

const musicTracks: Track[] = [
  {
    id: "1",
    title: "Calm Waters",
    artist: "Nature Sounds",
    duration: 180,
    category: "relaxation",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#", // Would be a real audio file in production
    favorite: true,
  },
  {
    id: "2",
    title: "Forest Meditation",
    artist: "Ambient Therapy",
    duration: 240,
    category: "meditation",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#",
  },
  {
    id: "3",
    title: "Gentle Rain",
    artist: "Nature Sounds",
    duration: 300,
    category: "sleep",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#",
  },
  {
    id: "4",
    title: "Piano Dreams",
    artist: "Classical Therapy",
    duration: 210,
    category: "focus",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#",
  },
  {
    id: "5",
    title: "Ocean Waves",
    artist: "Nature Sounds",
    duration: 360,
    category: "relaxation",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#",
  },
  {
    id: "6",
    title: "Peaceful Guitar",
    artist: "Acoustic Therapy",
    duration: 240,
    category: "focus",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#",
  },
  {
    id: "7",
    title: "Night Sounds",
    artist: "Nature Sounds",
    duration: 420,
    category: "sleep",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#",
  },
  {
    id: "8",
    title: "Meditation Bells",
    artist: "Ambient Therapy",
    duration: 180,
    category: "meditation",
    imageUrl: "/placeholder.svg?height=200&width=200",
    audioUrl: "#",
  },
]

export default function MusicTherapyPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [favorites, setFavorites] = useState<string[]>(
    musicTracks.filter((track) => track.favorite).map((track) => track.id),
  )

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const filteredTracks =
    activeTab === "all"
      ? musicTracks
      : activeTab === "favorites"
        ? musicTracks.filter((track) => favorites.includes(track.id))
        : musicTracks.filter((track) => track.category === activeTab)

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentTrack])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume / 100
  }, [volume])

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
      setCurrentTime(0)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentTrack) {
      const newTime = value[0]
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const toggleFavorite = (trackId: string) => {
    setFavorites((prev) => (prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader title="Music Therapy" />

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Audio Player */}
        <audio
          ref={audioRef}
          src={currentTrack?.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />

        {currentTrack && (
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4">
                <img
                  src={currentTrack.imageUrl || "/placeholder.svg"}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{currentTrack.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{currentTrack.artist}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(currentTrack.id)}
                    className={favorites.includes(currentTrack.id) ? "text-red-500" : ""}
                  >
                    <Heart className="h-5 w-5" fill={favorites.includes(currentTrack.id) ? "currentColor" : "none"} />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Slider value={[currentTime]} max={currentTrack.duration} step={1} onValueChange={handleSeek} />
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(currentTrack.duration)}</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center space-x-4">
                    <Button variant="ghost" size="icon" disabled>
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      className={`h-12 w-12 rounded-full ${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-teal-600 hover:bg-teal-700"}`}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" disabled>
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setVolume(value[0])}
                      className="w-32"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="relaxation">Relax</TabsTrigger>
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTracks.length > 0 ? (
                filteredTracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    isPlaying={isPlaying && currentTrack?.id === track.id}
                    isFavorite={favorites.includes(track.id)}
                    onPlay={() => handlePlayTrack(track)}
                    onToggleFavorite={() => toggleFavorite(track.id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-slate-600 dark:text-slate-300">No tracks found in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function TrackCard({
  track,
  isPlaying,
  isFavorite,
  onPlay,
  onToggleFavorite,
}: {
  track: Track
  isPlaying: boolean
  isFavorite: boolean
  onPlay: () => void
  onToggleFavorite: () => void
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-24 h-24">
          <img src={track.imageUrl || "/placeholder.svg"} alt={track.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{track.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{track.artist}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
              </p>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleFavorite}>
                <Heart
                  className="h-4 w-4"
                  fill={isFavorite ? "currentColor" : "none"}
                  className={isFavorite ? "text-red-500" : ""}
                />
              </Button>
              <Button
                size="icon"
                className={`h-8 w-8 ${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-teal-600 hover:bg-teal-700"}`}
                onClick={onPlay}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
