"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Mock data for the mood analytics
const mockMoodData = [
  { date: "Mon", mood: "great" },
  { date: "Tue", mood: "good" },
  { date: "Wed", mood: "okay" },
  { date: "Thu", mood: "bad" },
  { date: "Fri", mood: "awful" },
  { date: "Sat", mood: "okay" },
  { date: "Sun", mood: "good" },
  { date: "Mon", mood: "good" },
  { date: "Tue", mood: "great" },
  { date: "Wed", mood: "great" },
  { date: "Thu", mood: "good" },
  { date: "Fri", mood: "okay" },
  { date: "Sat", mood: "good" },
  { date: "Sun", mood: "great" },
]

const moodColors = {
  great: "bg-green-500",
  good: "bg-teal-400",
  okay: "bg-yellow-400",
  bad: "bg-orange-400",
  awful: "bg-red-500",
}

const moodValues = {
  great: 4,
  good: 3,
  okay: 2,
  bad: 1,
  awful: 0,
}

export function MoodAnalytics() {
  const [timeRange, setTimeRange] = useState("2weeks")

  // Filter data based on time range
  const filteredData = timeRange === "2weeks" ? mockMoodData : mockMoodData.slice(7)

  // Calculate mood distribution
  const moodDistribution = filteredData.reduce(
    (acc, { mood }) => {
      acc[mood] = (acc[mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate percentages
  const total = filteredData.length
  const moodPercentages = Object.entries(moodDistribution).map(([mood, count]) => ({
    mood,
    percentage: Math.round((count / total) * 100),
  }))

  // Calculate average mood
  const moodSum = filteredData.reduce((sum, { mood }) => sum + moodValues[mood as keyof typeof moodValues], 0)
  const averageMoodValue = moodSum / total

  // Determine mood label based on average value
  let averageMoodLabel = "Okay"
  if (averageMoodValue >= 3.5) averageMoodLabel = "Great"
  else if (averageMoodValue >= 2.5) averageMoodLabel = "Good"
  else if (averageMoodValue >= 1.5) averageMoodLabel = "Okay"
  else if (averageMoodValue >= 0.5) averageMoodLabel = "Bad"
  else averageMoodLabel = "Awful"

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2weeks">Last 2 Weeks</SelectItem>
            <SelectItem value="1week">Last Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood Timeline</CardTitle>
            <CardDescription>Your mood patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-1">
              {filteredData.map((entry, index) => {
                const moodValue = moodValues[entry.mood as keyof typeof moodValues]
                const height = `${(moodValue + 1) * 20}%` // Scale to fit the container

                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-full ${moodColors[entry.mood as keyof typeof moodColors]} rounded-t-sm`}
                      style={{ height }}
                    ></div>
                    <div className="text-xs mt-2 rotate-45 origin-left">{entry.date}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
            <CardDescription>Breakdown of your moods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodPercentages
                .sort((a, b) => {
                  const moodOrder = ["great", "good", "okay", "bad", "awful"]
                  return moodOrder.indexOf(a.mood) - moodOrder.indexOf(b.mood)
                })
                .map(({ mood, percentage }) => (
                  <div key={mood} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{mood}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${moodColors[mood as keyof typeof moodColors]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
              <div className="text-sm text-slate-600 dark:text-slate-400">Average Mood</div>
              <div className="text-2xl font-bold">{averageMoodLabel}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
          <CardDescription>What we've learned from your mood tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-md">
              <h3 className="font-medium text-teal-800 dark:text-teal-400 mb-1">Positive Trend</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your mood has been trending upward over the past few days. Keep up whatever you've been doing!
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md">
              <h3 className="font-medium text-blue-800 dark:text-blue-400 mb-1">Pattern Detected</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                We've noticed your mood tends to improve on weekends. Consider what weekend activities might be
                contributing to your well-being.
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-md">
              <h3 className="font-medium text-purple-800 dark:text-purple-400 mb-1">Suggestion</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Try incorporating more mindfulness practices on days when your mood is lower. Our meditation exercises
                might help.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
