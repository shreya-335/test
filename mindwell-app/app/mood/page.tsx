"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { MoodTracker } from "@/components/mood-tracker"
import { MoodAnalytics } from "@/components/mood-analytics"

export default function MoodPage() {
  const [activeTab, setActiveTab] = useState("track")

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader title="Mood Tracker & Analysis" />

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Tabs defaultValue="track" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="track">Track Mood</TabsTrigger>
            <TabsTrigger value="analyze">Analyze Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="track">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="analyze">
            <MoodAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
