"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Bell, Moon, Lock } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "I'm on a journey to improve my mental health and well-being.",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: {
      moodReminders: true,
      therapyReminders: true,
      newMessages: true,
      appUpdates: false,
    },
    privacy: {
      shareProgress: false,
      anonymousData: true,
    },
  })

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <AppHeader title="Your Profile" />

      <div className="container mx-auto px-4 py-4 max-w-3xl">
        <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your personal information and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-teal-600 hover:bg-teal-700"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-medium">{user.name}</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <Bell className="h-5 w-5 mr-2 text-teal-600" />
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mood-reminders">Daily mood check-in reminders</Label>
                    <Switch
                      id="mood-reminders"
                      checked={settings.notifications.moodReminders}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "moodReminders", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="therapy-reminders">Therapy session reminders</Label>
                    <Switch
                      id="therapy-reminders"
                      checked={settings.notifications.therapyReminders}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "therapyReminders", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-messages">New message notifications</Label>
                    <Switch
                      id="new-messages"
                      checked={settings.notifications.newMessages}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "newMessages", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-updates">App updates and news</Label>
                    <Switch
                      id="app-updates"
                      checked={settings.notifications.appUpdates}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "appUpdates", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center">
                  <Lock className="h-5 w-5 mr-2 text-teal-600" />
                  <div>
                    <CardTitle>Privacy</CardTitle>
                    <CardDescription>Manage your privacy settings.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share-progress">Share progress with therapist</Label>
                    <Switch
                      id="share-progress"
                      checked={settings.privacy.shareProgress}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "shareProgress", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous-data">Share anonymous usage data to improve the app</Label>
                    <Switch
                      id="anonymous-data"
                      checked={settings.privacy.anonymousData}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "anonymousData", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center">
                  <Moon className="h-5 w-5 mr-2 text-teal-600" />
                  <div>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Manage your display preferences.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch
                      id="dark-mode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
