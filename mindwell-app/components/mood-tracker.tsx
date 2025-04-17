"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Save } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

type MoodEntry = {
  id: string
  date: Date
  mood: Mood
  notes: string
}

const moodEmojis: Record<Mood, string> = {
  great: "😄",
  good: "🙂",
  okay: "😐",
  bad: "😔",
  awful: "😢",
}

const moodDescriptions: Record<Mood, string> = {
  great: "I feel fantastic! Everything is going well.",
  good: "I'm feeling pretty good today.",
  okay: "I'm feeling neutral - neither good nor bad.",
  bad: "I'm not feeling great today.",
  awful: "I'm feeling really down today.",
}

export function MoodTracker() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [notes, setNotes] = useState("")
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selectedMood) return

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date,
      mood: selectedMood,
      notes,
    }

    setEntries([...entries, newEntry])
    setIsSubmitted(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setSelectedMood(null)
      setNotes("")
      setDate(new Date())
      setIsSubmitted(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Track your mood to help understand your emotional patterns.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Select date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Select your mood</Label>
            <RadioGroup
              value={selectedMood || ""}
              onValueChange={(value) => setSelectedMood(value as Mood)}
              className="grid grid-cols-5 gap-2"
            >
              {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
                <div key={mood} className="flex flex-col items-center">
                  <RadioGroupItem value={mood} id={mood} className="peer sr-only" />
                  <Label
                    htmlFor={mood}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 [&:has([data-state=checked])]:border-teal-600 cursor-pointer"
                  >
                    <span className="text-3xl mb-1">{moodEmojis[mood]}</span>
                    <span className="text-xs font-medium">{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedMood && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm">{moodDescriptions[selectedMood]}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="What's contributing to your mood today?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={!selectedMood || isSubmitted}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            {isSubmitted ? (
              <span className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Saved!
              </span>
            ) : (
              "Save Mood Entry"
            )}
          </Button>
        </CardFooter>
      </Card>

      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries
                .slice(-3)
                .reverse()
                .map((entry) => (
                  <div key={entry.id} className="flex items-start p-3 border rounded-md">
                    <div className="text-3xl mr-4">{moodEmojis[entry.mood]}</div>
                    <div>
                      <div className="font-medium">{format(entry.date, "EEEE, MMMM d, yyyy")}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Mood: {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                      </div>
                      {entry.notes && <div className="text-sm mt-1">{entry.notes}</div>}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
