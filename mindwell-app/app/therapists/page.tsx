"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, MapPin, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

type Therapist = {
  id: string
  name: string
  specialty: string[]
  rating: number
  location: string
  imageUrl: string
  available: boolean
}

const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: ["Anxiety", "Depression", "Trauma"],
    rating: 4.9,
    location: "New York, NY",
    imageUrl: "/placeholder.svg?height=80&width=80",
    available: true,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: ["Stress Management", "Relationships", "Work-Life Balance"],
    rating: 4.8,
    location: "San Francisco, CA",
    imageUrl: "/placeholder.svg?height=80&width=80",
    available: true,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: ["Grief", "PTSD", "Family Therapy"],
    rating: 4.7,
    location: "Chicago, IL",
    imageUrl: "/placeholder.svg?height=80&width=80",
    available: false,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: ["Addiction", "Depression", "Anxiety"],
    rating: 4.9,
    location: "Austin, TX",
    imageUrl: "/placeholder.svg?height=80&width=80",
    available: true,
  },
  {
    id: "5",
    name: "Dr. Lisa Patel",
    specialty: ["Mindfulness", "Stress", "Self-Esteem"],
    rating: 4.8,
    location: "Seattle, WA",
    imageUrl: "/placeholder.svg?height=80&width=80",
    available: true,
  },
]

export default function TherapistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialty, setSpecialty] = useState("all")

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty =
      specialty === "all" || therapist.specialty.some((s) => s.toLowerCase() === specialty.toLowerCase())

    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader title="Find a Therapist" />

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Find Your Ideal Therapist</CardTitle>
            <CardDescription>
              Browse our network of licensed therapists specializing in various areas of mental health.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    placeholder="Search by name or location"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="trauma">Trauma</SelectItem>
                    <SelectItem value="stress">Stress</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                    <SelectItem value="grief">Grief</SelectItem>
                    <SelectItem value="addiction">Addiction</SelectItem>
                    <SelectItem value="mindfulness">Mindfulness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          {filteredTherapists.length > 0 ? (
            filteredTherapists.map((therapist) => <TherapistCard key={therapist.id} therapist={therapist} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-slate-300">
                No therapists found matching your criteria. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TherapistCard({ therapist }: { therapist: Therapist }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex items-center justify-center md:justify-start">
          <Avatar className="h-20 w-20">
            <AvatarImage src={therapist.imageUrl || "/placeholder.svg"} alt={therapist.name} />
            <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
            <div>
              <CardTitle className="text-xl mb-1">{therapist.name}</CardTitle>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{therapist.location}</span>
              </div>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{therapist.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {therapist.specialty.map((spec) => (
              <Badge
                key={spec}
                variant="outline"
                className="bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400 border-teal-200 dark:border-teal-800"
              >
                {spec}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-6 bg-slate-50 dark:bg-slate-800/50">
          <Button
            className={
              therapist.available
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
            }
            disabled={!therapist.available}
          >
            {therapist.available ? (
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Book Session
              </span>
            ) : (
              "Currently Unavailable"
            )}
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
