import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SmileIcon as MoodHappy, MessageSquareText, Users, User, Music, Palette, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-4">MindWell</h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Your personal mental health companion. Track your mood, chat with our AI, find therapists, and explore
            therapy resources.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="AI Chatbot"
            description="Talk to our supportive AI assistant anytime you need someone to listen."
            icon={<MessageSquareText className="h-8 w-8 text-teal-500" />}
            href="/chat"
          />

          <FeatureCard
            title="Mood Tracker"
            description="Log and visualize your mood patterns over time."
            icon={<MoodHappy className="h-8 w-8 text-teal-500" />}
            href="/mood"
          />

          <FeatureCard
            title="Find Therapists"
            description="Connect with licensed therapists who can provide professional support."
            icon={<Users className="h-8 w-8 text-teal-500" />}
            href="/therapists"
          />

          <FeatureCard
            title="Profile"
            description="Customize your profile and preferences."
            icon={<User className="h-8 w-8 text-teal-500" />}
            href="/profile"
          />

          <FeatureCard
            title="Meditation Pack"
            description="Guided meditations to help you relax and focus."
            icon={<Sparkles className="h-8 w-8 text-teal-500" />}
            href="/therapy/meditation"
          />

          <FeatureCard
            title="Music Therapy"
            description="Therapeutic music to improve your mood and reduce stress."
            icon={<Music className="h-8 w-8 text-teal-500" />}
            href="/therapy/music"
          />

          <FeatureCard
            title="Art Therapy"
            description="Express yourself through creative activities."
            icon={<Palette className="h-8 w-8 text-teal-500" />}
            href="/therapy/art"
            className="md:col-start-2"
          />
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  className?: string
}

function FeatureCard({ title, description, icon, href, className }: FeatureCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <CardTitle className="text-xl text-teal-700 dark:text-teal-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-slate-600 dark:text-slate-300 min-h-[60px]">{description}</CardDescription>
        <Button
          asChild
          variant="ghost"
          className="mt-4 text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-slate-800"
        >
          <Link href={href}>Explore</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
