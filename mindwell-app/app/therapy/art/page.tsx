"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Palette, Download, Share2, Info } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

type ArtActivity = {
  id: string
  title: string
  description: string
  duration: string
  category: string
  imageUrl: string
  materials: string[]
  steps: string[]
  benefits: string[]
}

const artActivities: ArtActivity[] = [
  {
    id: "1",
    title: "Mindful Coloring",
    description: "Reduce anxiety through focused coloring of intricate patterns.",
    duration: "15-30 minutes",
    category: "anxiety",
    imageUrl: "/placeholder.svg?height=200&width=400",
    materials: ["Coloring pages", "Colored pencils or markers", "Comfortable seating"],
    steps: [
      "Find a quiet, comfortable space",
      "Choose a coloring page that appeals to you",
      "Focus on your breathing as you color",
      "Pay attention to the sensations of coloring",
      "Don't worry about perfection - enjoy the process",
    ],
    benefits: [
      "Reduces anxiety and stress",
      "Improves focus and concentration",
      "Promotes mindfulness",
      "Provides a creative outlet",
    ],
  },
  {
    id: "2",
    title: "Emotion Painting",
    description: "Express and process emotions through abstract painting.",
    duration: "30-45 minutes",
    category: "expression",
    imageUrl: "/placeholder.svg?height=200&width=400",
    materials: ["Canvas or paper", "Acrylic or watercolor paints", "Brushes", "Water container", "Paper towels"],
    steps: [
      "Identify an emotion you want to explore",
      "Choose colors that represent this emotion",
      "Apply paint freely without planning",
      "Let your emotions guide your movements",
      "Reflect on your creation and how it represents your feelings",
    ],
    benefits: [
      "Helps process complex emotions",
      "Provides emotional release",
      "Increases emotional awareness",
      "Creates a visual record of emotional states",
    ],
  },
  {
    id: "3",
    title: "Nature Collage",
    description: "Connect with nature by creating a collage from natural materials.",
    duration: "45-60 minutes",
    category: "grounding",
    imageUrl: "/placeholder.svg?height=200&width=400",
    materials: [
      "Cardboard or heavy paper",
      "Glue",
      "Scissors",
      "Natural materials (leaves, flowers, twigs)",
      "Optional: paint or markers",
    ],
    steps: [
      "Collect natural materials during a mindful walk",
      "Arrange materials on your base before gluing",
      "Create a composition that feels meaningful to you",
      "Secure materials with glue",
      "Add additional elements with paint or markers if desired",
    ],
    benefits: [
      "Encourages time in nature",
      "Promotes mindfulness and presence",
      "Develops appreciation for natural beauty",
      "Creates a tangible connection to the natural world",
    ],
  },
  {
    id: "4",
    title: "Clay Sculpting",
    description: "Release tension through tactile clay work.",
    duration: "30-60 minutes",
    category: "stress",
    imageUrl: "/placeholder.svg?height=200&width=400",
    materials: ["Air-dry clay or modeling clay", "Clay tools (optional)", "Work surface", "Water (for air-dry clay)"],
    steps: [
      "Begin by kneading the clay to warm it up",
      "Notice the sensations in your hands as you work",
      "Create shapes that feel satisfying to form",
      "Focus on the process rather than the outcome",
      "Allow your creation to dry if using air-dry clay",
    ],
    benefits: [
      "Provides tactile stress relief",
      "Improves fine motor skills",
      "Encourages present-moment awareness",
      "Offers a sense of accomplishment",
    ],
  },
  {
    id: "5",
    title: "Gratitude Jar",
    description: "Create a visual reminder of things you're grateful for.",
    duration: "30-45 minutes initially, then ongoing",
    category: "positivity",
    imageUrl: "/placeholder.svg?height=200&width=400",
    materials: ["Glass jar or container", "Decorative materials (paint, ribbon, stickers)", "Paper", "Pens or markers"],
    steps: [
      "Decorate your jar in a way that brings you joy",
      "Cut paper into small slips",
      "Write one thing you're grateful for on each slip",
      "Add to your jar regularly",
      "Read through your gratitude notes when you need a boost",
    ],
    benefits: [
      "Cultivates a positive mindset",
      "Creates a resource for difficult days",
      "Develops gratitude practice",
      "Provides ongoing therapeutic benefit",
    ],
  },
  {
    id: "6",
    title: "Zentangle Drawing",
    description: "Create structured patterns to promote focus and calm.",
    duration: "20-40 minutes",
    category: "focus",
    imageUrl: "/placeholder.svg?height=200&width=400",
    materials: ["Paper", "Fine-tip black pen", "Pencil", "Optional: colored pencils"],
    steps: [
      "Draw a square border on your paper",
      "Add a light pencil 'string' dividing the square into sections",
      "Fill each section with a different pattern",
      "Work slowly and deliberately",
      "Shade or add color if desired",
    ],
    benefits: [
      "Improves concentration",
      "Reduces anxiety through focused attention",
      "Provides a sense of accomplishment",
      "Develops creativity within structure",
    ],
  },
]

export default function ArtTherapyPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedActivity, setSelectedActivity] = useState<ArtActivity | null>(null)

  const filteredActivities =
    activeTab === "all" ? artActivities : artActivities.filter((activity) => activity.category === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader title="Art Therapy" />

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {selectedActivity ? (
          <div className="space-y-6">
            <Button
              variant="ghost"
              className="text-teal-600 hover:text-teal-700 -ml-2"
              onClick={() => setSelectedActivity(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to activities
            </Button>

            <Card>
              <div className="relative h-48 md:h-64 bg-slate-200 dark:bg-slate-700">
                <img
                  src={selectedActivity.imageUrl || "/placeholder.svg"}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{selectedActivity.title}</CardTitle>
                <CardDescription className="text-base">{selectedActivity.description}</CardDescription>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Duration: {selectedActivity.duration}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Materials Needed:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedActivity.materials.map((material, index) => (
                      <li key={index} className="text-slate-600 dark:text-slate-300">
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-2">Steps:</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    {selectedActivity.steps.map((step, index) => (
                      <li key={index} className="text-slate-600 dark:text-slate-300">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-2">Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedActivity.benefits.map((benefit, index) => (
                      <li key={index} className="text-slate-600 dark:text-slate-300">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Save Activity
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
                <TabsTrigger value="stress">Stress</TabsTrigger>
                <TabsTrigger value="expression">Expression</TabsTrigger>
                <TabsTrigger value="focus">Focus</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredActivities.map((activity) => (
                    <ArtActivityCard
                      key={activity.id}
                      activity={activity}
                      onClick={() => setSelectedActivity(activity)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

function ArtActivityCard({ activity, onClick }: { activity: ArtActivity; onClick: () => void }) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative h-40 bg-slate-200 dark:bg-slate-700">
        <img
          src={activity.imageUrl || "/placeholder.svg"}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
            {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start">
          <Palette className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
          <div>
            <CardTitle className="text-lg">{activity.title}</CardTitle>
            <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Info className="h-4 w-4 mr-1" />
          <span>Duration: {activity.duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-teal-600 hover:bg-teal-700">View Activity</Button>
      </CardFooter>
    </Card>
  )
}
