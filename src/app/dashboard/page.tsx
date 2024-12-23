'use client'

import { Bell, FileText, LayoutDashboard, MailWarning, Menu, PhoneForwarded, Search, Settings, Users, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image";
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png";
import { useRef, useEffect, useState } from "react"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NotificationsPanel from "./notification/page" 
import axios from "axios";
import { useTrackedEmails } from "@/hooks/use-tracked-emails";
import { EmailStatsCard } from "@/components/email-stats-card";
import { PhoneStatsCard } from "@/components/phone-stats-card";
import { useTrackedPhones } from "@/hooks/use-tracked-phones";
import { useTrackedPages } from "@/hooks/use-tracked-pages";
import { PageStatsCard } from "@/components/page-stats-card";
import { ToolUsageChart } from "@/components/charts/ToolUsageChart";
import { ToolDistributionChart } from "@/components/charts/ToolDistributionChart";


const userGrowthData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 1000 },
  { name: "May", users: 1200 },
  { name: "Jun", users: 1400 },
]

const contentDistributionData = [
  { name: "e-mails", count: 120 },
  { name: "fake pages", count: 80 },
  { name: "phone numbers", count: 40 },
]

interface Activity {
  type: 'email' | 'phone' | 'page';
  description: string;
  timestamp: Date;
  createdAt: string | number | Date;
}

export default function Dashboard() {
  const { totalPages } = useTrackedPages();
  const { totalPhones } = useTrackedPhones();
  const { totalEmails } = useTrackedEmails();
  const totalAssetsInvestigated = totalEmails + totalPhones + totalPages;
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [recentActivities, setRecentActivities] = useState<Activity[]>([])
  const [toolUsageData, setToolUsageData] = useState([])
  const [toolDistributionData, setToolDistributionData] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [emailTracks, phoneTracks, pageDetections] = await Promise.all([
          axios.get('/api/tracking/emails/recent'),
          axios.get('/api/tracking/phones/recent'), 
          axios.get('/api/tracking/pages/recent')
        ])
  

  
        const allActivities: Activity[] = [
          ...emailTracks.data.map((track: { createdAt: string | number | Date }) => ({
            ...track,
            type: 'email' as const,
            timestamp: new Date(track.createdAt)
          })),
          ...phoneTracks.data.map((track: { createdAt: string | number | Date }) => ({
            ...track,
            type: 'phone' as const,
            timestamp: new Date(track.createdAt) 
          })),
          ...pageDetections.data.map((detection: { createdAt: string | number | Date }) => ({
            ...detection,
            type: 'page' as const,
            timestamp: new Date(detection.createdAt)
          }))
        ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  
        setRecentActivities(allActivities)
      } catch (error) {
        console.error('Error fetching activities:', error)
      }
    }
  
    fetchActivities()
  }, [])

  useEffect(() => {
    const fetchToolData = async () => {
      try {
        // Replace with your actual API endpoints
        const usageResponse = await axios.get('/api/tools/usage')
        const distributionResponse = await axios.get('/api/tools/distribution')
        
        setToolUsageData(usageResponse.data)
        setToolDistributionData(distributionResponse.data)
      } catch (error) {
        console.error('Error fetching tool data:', error)
      }
    }
  
    fetchToolData()
    // Set up polling every 5 minutes
    const interval = setInterval(fetchToolData, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])
  

// Modify the getUserDetails function to update the user data
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
                      className="flex items-center gap-3 rounded-lg bg-gray-700 px-3 py-2 text-teal-400 transition-colors"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Overview
                    </Link>
                    <Link
                      href="/dashboard/emailTracking"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
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
              className="flex items-center gap-3 rounded-lg bg-gray-700 px-3 py-2 text-teal-400 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </Link>
            <Link
              href="/dashboard/emailTracking"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
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
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
              <div className="relative w-full max-w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  className="w-full bg-gray-800 border-gray-700 text-gray-100 pl-9"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-orange-600 text-white">
              <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <h3 className="font-medium">Total Assets investigated</h3>
              </div>
              <p className="text-3xl font-bold">{totalAssetsInvestigated}</p>
            </CardContent>
              </Card>
              
              <EmailStatsCard totalEmails={totalEmails} />
              
              <PhoneStatsCard totalPhones={totalPhones} />
              
              <PageStatsCard totalPages={totalPages} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ToolUsageChart />
              <ToolDistributionChart />
            </div>


            <Card className="bg-gray-800 border-gray-700">
  <CardContent className="p-6">
    <h3 className="text-lg font-semibold mb-4 text-teal-300">Recent Activity</h3>
    <div className="space-y-4">
      {recentActivities.length > 0 ? (
        recentActivities.map((activity: { type: string; description: string; timestamp: Date }, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-400 border-b border-gray-700 pb-3">
            {activity.type === 'email' && <MailWarning className="h-5 w-5 text-blue-400" />}
            {activity.type === 'phone' && <PhoneForwarded className="h-5 w-5 text-green-400" />}
            {activity.type === 'page' && <FileText className="h-5 w-5 text-orange-400" />}
            <div>
              <p className="text-gray-200">{activity.description}</p>
              <p className="text-sm">{activity.timestamp.toLocaleString()}</p>
            </div>
          </div>
        ))      ) : (
        <p className="text-gray-400">No recent activities found</p>
      )}
    </div>
  </CardContent>
</Card>
          </div>
        </main>
      </div>

      <footer className="border-t border-gray-700 p-6 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="#" className="text-teal-400 hover:text-teal-200">
            Support
          </Link>
          <Link href="#" className="text-teal-400 hover:text-teal-200">
            Documentation
          </Link>
          <Link href="#" className="text-teal-400 hover:text-teal-200">
            Privacy Policy
          </Link>
        </div>
        <p>© 2024 Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  )
}