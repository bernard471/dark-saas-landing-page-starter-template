'use client'

import { useRef, useState } from 'react'
import { Bell, Camera, FileText, LayoutDashboard, LogOut, Mail, MailWarning, Menu, PhoneForwarded, Settings, User, Users, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useEffect } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import NotificationsPanel from '../dashboard/notification/page'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

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

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
  
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post("/api/users/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
  
      if (response.data.success) {
        toast.success("Password updated successfully");
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error: any) {
      console.error('Password update error:', error);
      toast.error(error.response?.data?.error || "Failed to update password");
    }
  };

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
    profileImage: "",
  })

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create FormData to send the image
      const formData = new FormData()
      formData.append('profileImage', file)
  
      try {
        // Upload image to your backend
        const response = await axios.post('/api/users/upload-profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
  
        // Update local state with the returned image URL
        setProfileImage(response.data.imageUrl)
        toast.success('Profile image updated successfully')
      } catch (error) {
        toast.error('Failed to upload image')
        console.error('Image upload error:', error)
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const [data, setData] = useState("nothing")

  const handleLogout = async () => {
    // Handle logout logic here
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

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
      <header className="border-b border-gray-800 sticky top-0 z-10 bg-gray-900">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-gray-800 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6">
                    <Image src={logoImage} alt="logo" className="h-12 w-[100px] relative" />
                  </div>
                  <nav className="flex-1 space-y-2 px-3">
                  <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
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
            </Sheet>
            <Link href="/" className="flex items-center">
              <Image src={logoImage} alt="logo" className="h-8 w-auto" />
            </Link>
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
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for tablet and desktop */}
        <aside className="hidden md:flex w-74 flex-col bg-gray-800 border-r border-gray-700">

          <nav className="flex-1 space-y-2 px-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            
            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-teal-500 overflow-hidden">
                        {profileImage ? (
                          <Image src={profileImage} alt="Profile" layout="fill" objectFit="cover" 
                          className='w-32 h-32 rounded-full'/>
                        ) : (
                          userData.username ? userData.username[0].toUpperCase() : ''
                        )}
                      </div>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full bg-teal-500 text-white hover:bg-teal-600"
                      onClick={triggerFileInput}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-gray-400">{userData.username}</p>
                    <p className="text-gray-400">{userData.email}</p>
                    <p className="text-gray-400">{userData.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>


            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="personal" className="data-[state=active]:bg-gray-700">
                  Personal Information
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-700">
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="bg-gray-700 border-gray-600" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="bg-gray-700 border-gray-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="bg-gray-700 border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Tell us about yourself" className="bg-gray-700 border-gray-600" />
                    </div>
                    <Button className="bg-teal-500 hover:bg-teal-600">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      className="bg-gray-700 border-gray-600"
                      value={passwords.currentPassword}
                      onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        className="bg-gray-700 border-gray-600"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        className="bg-gray-700 border-gray-600"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                      />
                    </div>
                    <Button 
                        className="bg-teal-500 hover:bg-teal-600"
                        onClick={handlePasswordChange}
                      >
                        Update Password
                      </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                      <Button variant="outline" className="border-gray-600">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-400">Receive push notifications on your devices</p>
                      </div>
                      <Button variant="outline" className="border-gray-600">
                        Disabled
                      </Button>
                    </div>
                    <Button className="bg-teal-500 hover:bg-teal-600">Save Preferences</Button>
                    <Button onClick={handleLogout}
                    className="flex bg-teal-500 hover:bg-teal-600">
                    <LogOut className="h-5 w-5 mr-3 text-white-500" />
                      Logout</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <footer className="border-t border-gray-800 p-6 text-center text-sm text-gray-400">
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
  )}

