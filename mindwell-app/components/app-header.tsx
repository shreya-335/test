"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Home, User, Bell } from "lucide-react"
import { useState } from "react"

interface AppHeaderProps {
  title: string
}

export function AppHeader({ title }: AppHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
          <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-teal-600 dark:text-teal-400 mr-2">MindWell</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-medium">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </nav>
          <ModeToggle />
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-2 grid grid-cols-1 gap-1">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                AI Chat
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/mood" onClick={() => setIsMenuOpen(false)}>
                Mood Tracker
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/therapists" onClick={() => setIsMenuOpen(false)}>
                Find Therapists
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
