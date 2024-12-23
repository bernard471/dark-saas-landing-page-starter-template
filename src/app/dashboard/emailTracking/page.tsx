'use client'

import { Bell, FileText, MailWarning, LayoutDashboard, Menu, Search, Settings, Users, PhoneForwarded, X} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NotificationsPanel from "../notification/page"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useTrackedEmails } from "@/hooks/use-tracked-emails"
import { EmailTrackingTable } from "@/components/email-tracking-table"




export default function EmailTrackingPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [emailToTrack, setEmailToTrack] = useState("")
  const { trackedEmails, totalEmails, refreshEmails } = useTrackedEmails();
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
    profileImage: "",
  })

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserData({
        username: res.data.data.username,
        email: res.data.data.email,
        role: res.data.data.role || 'Consumer',
        profileImage: res.data.data.profileImage
      });
      
      // Set profile image state if it exists in the response
      if (res.data.data.profileImage) {
        setProfileImage(res.data.data.profileImage);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleTrackEmail = async () => {
    try {
      const response = await axios.post("/api/emails/track", { email: emailToTrack })
      refreshEmails() // Refresh the email list after tracking
      setEmailToTrack("") // Clear the input
    } catch (error) {
      console.error("Error tracking email:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}

        <header className="border-b border-gray-700 sticky top-0 z-10 bg-gray-900">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Sheet>
            
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
                
              </SheetTrigger>
              <SheetContent side="left" className="w-74 bg-gray-800 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6">
                   
                  </div>
                  <nav className="flex-1 space-y-1 px-3">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-lg hover:bg-gray-700 px-3 py-2 text-grey-400 transition-colors"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Overview
                    </Link>
                    <Link
                      href="/dashboard/emailTracking"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-teal-300 bg-gray-700 transition-colors"
                    >
                      <MailWarning className="h-5 w-5" />
                      E-mail Tracking
                    </Link>
                    <Link
                      href="/dashboard/phoneNumberTracking"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <PhoneForwarded className="h-5 w-5" />
                      Phone Number Tracking
                    </Link>
                    <Link
                      href="/dashboard/fakePageDetection"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                      Fake Page Detection
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                  </nav>
                </div>
              </SheetContent>
              <Link href="/" className="relative">
                <div className="absolute w-full top-2 bottom-0 bg-transparent blur-md"></div>
                <Image src={logoImage} alt="logo" className="h-12 w-[100px] relative"/>
              </Link>
            </Sheet>

          </div>  
          <div className="flex items-center gap-4">
          <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-gray-100"
                onClick={toggleNotifications}
              >
                <Bell className="h-5 w-5" />
              </Button>
              {showNotifications && (
                <div
                  ref={notificationRef}
                  className="fixed inset-x-0 top-[64px] bottom-0 md:absolute md:inset-auto md:right-0 md:top-full md:w-96 bg-gray-800 border border-gray-700 md:rounded-md shadow-lg overflow-hidden z-50"
                >
                  <div className="flex justify-between items-center p-4 border-b border-gray-700 md:hidden">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNotifications(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[80vh]">
                    <NotificationsPanel />
                  </div>
                </div>
              )}
            </div>
            <Link href="/profile">
            <Button size="icon" className="rounded-full bg-teal-500 text-white hover:bg-teal-600">
              {profileImage ? (
                <Image 
                  src={profileImage} 
                  alt="Profile" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                />
              ) : (
                userData.username ? userData.username[0].toUpperCase() : ''
              )}
            </Button>
            </Link>
          </div>
        </div>
      </header>


      <div className="flex flex-1">
        {/* Sidebar for tablet and desktop */}
        <aside className="hidden md:flex w-74 flex-col bg-gray-800 border-r border-gray-700">

          <nav className="flex-1 space-y-1 px-3 mt-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg hover:bg-gray-700 px-3 py-2 text-gray-300  transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </Link>
            <Link
              href="/dashboard/emailTracking"
              className="flex items-center gap-3 rounded-lg px-3 py-2  text-teal-400 bg-gray-700 transition-colors"
            >
              <MailWarning className="h-5 w-5" />
              E-mail Tracking
            </Link>
            <Link
              href="/dashboard/phoneNumberTracking"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <PhoneForwarded className="h-5 w-5" />
              Phone Number Tracking
            </Link>
            <Link
              href="/dashboard/fakePageDetection"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <FileText className="h-5 w-5" />
              Fake Page Detection
            </Link>
            <Link
              href="/dashboard/accountReports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <FileText className="h-5 w-5" />
              Account Reports
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Email Tracking</h2>
                        
            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-teal-200">Track New Email</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter email address" 
                  className="flex-grow bg-gray-700 text-gray-100"
                  value={emailToTrack}
                  onChange={(e) => setEmailToTrack(e.target.value)}
                />
                <Button 
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={handleTrackEmail}
                >
                  <MailWarning className="mr-2 h-4 w-4" /> Track
                </Button>
              </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-teal-200">Recent Email Traced</CardTitle>
      </CardHeader>
      <CardContent>
        <EmailTrackingTable emails={trackedEmails} />
      </CardContent>
    </Card>
          </div>
        </main>
      </div>

      <footer className="border-t border-gray-700 p-6 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="#" className="text-teal-400 hover:text-teal-300">
            Support
          </Link>
          <Link href="#" className="text-teal-400 hover:text-teal-300">
            Documentation
          </Link>
          <Link href="#" className="text-teal-400 hover:text-teal-300">
            Privacy Policy
          </Link>
        </div>
        <p>© 2024 Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  )
}




