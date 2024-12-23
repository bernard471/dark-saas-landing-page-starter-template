'use client'

import { Bell, FileText, MailWarning, LayoutDashboard, Menu, Settings, PhoneForwarded, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import NotificationsPanel from "../notification/page"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { AccountReportsTable } from "@/components/account-reports-table"
import { ReportDetailsModal } from "@/components/report-details-modal"

// Add these constants at the top
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf"
];

interface AccountReport {
  id: string;
  username: string;
  accountId: string;
  platform: string;
  status: string;
  submittedAt: string;
  evidence: string[];
}

const reportSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    accountId: z.string().min(1, "Account ID is required"),
    platform: z.string().min(1, "Platform is required"),
    evidence: z.array(z.any()).optional()
  })
  
  type ReportFormValues = z.infer<typeof reportSchema>

export default function AccountReportsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reports, setReports] = useState<AccountReport[]>([])
const [isLoading, setIsLoading] = useState(true)

const fetchReports = async () => {
  try {
    setIsLoading(true)
    const response = await axios.get('/api/reports')
    setReports(response.data.reports)
  } catch (error) {
    toast({
      title: "Failed to fetch reports",
      variant: "destructive",
    })
  } finally {
    setIsLoading(false)
  }
}

useEffect(() => {
  fetchReports()
}, [])

  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      username: "",
      accountId: "",
      platform: "",
      evidence: []
    }
  })

const onSubmit = async (data: ReportFormValues) => {
  try {
    setIsSubmitting(true)
    
    // Handle file uploads first
    const formData = new FormData()
    files.forEach(file => formData.append('evidence', file))
    
    // Create report data
    const reportData = {
      username: data.username,
      accountId: data.accountId,
      platform: data.platform,
      evidence: files.map(file => file.name) // We'll update this with actual URLs later
    }
    
    const response = await axios.post('/api/reports', reportData)
    
    if (response.data.success) {
      toast({
        title: "Report submitted successfully",
        description: "We'll review your report shortly.",
        variant: "default",
      })
      
      form.reset()
      setFiles([])
      fetchReports() // Refresh the reports list
    }
  } catch (error: any) {
    console.error('Submission error:', error)
    toast({
      title: "Error submitting report",
      description: error.response?.data?.error || "Please try again later.",
      variant: "destructive",
    })
  } finally {
    setIsSubmitting(false)
  }
}

  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Validate each file
    const validFiles = selectedFiles.filter(file => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return false;
      }
      
      // Check file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });
  
    setFiles(prev => [...prev, ...validFiles]);
  };

const handleStatusUpdate = async (reportId: string, newStatus: string) => {
  try {
    const response = await axios.put('/api/reports/status', {
      reportId,
      status: newStatus
    })
    
    if (response.data.success) {
      toast({
        title: "Status updated successfully",
        variant: "default",
      })
      fetchReports()
    }
  } catch (error) {
    toast({
      title: "Failed to update status",
      description: "Please try again later",
      variant: "destructive",
    })
  }
}


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
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header section similar to email tracking page */}
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
        {/* Sidebar similar to email tracking page */}
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
                className="flex items-center gap-3 rounded-lg px-3 py-2  text-teal-400 bg-gray-700 transition-colors"
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
            <h2 className="text-2xl font-semibold mb-6">Account Reports & Take-Down</h2>
            
            <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle className="text-teal-200">Submit Account Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <Input 
              {...form.register("username")}
              placeholder="Enter account username" 
              className="mt-1 bg-gray-700 text-gray-100"
            />
            {form.formState.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Account ID</label>
            <Input 
              {...form.register("accountId")}
              placeholder="Enter account ID" 
              className="mt-1 bg-gray-700 text-gray-100"
            />
            {form.formState.errors.accountId && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.accountId.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Platform</label>
            <Select onValueChange={(value) => form.setValue("platform", value)}>
              <SelectTrigger className="mt-1 bg-gray-700 text-gray-100">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800">
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.platform && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.platform.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Evidence</label>
            <div className="mt-1">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="text-sm text-gray-400">
                      Drop files here or click to upload
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.gif,.pdf"
                    />
                </label>
              </div>
              
              {/* File Preview */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                      <span className="text-sm text-gray-200">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Report'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
    <Card className="bg-gray-800 border-gray-700">
    <CardHeader>
      <CardTitle className="text-teal-200">Recent Reports</CardTitle>
    </CardHeader>
    <CardContent>
      {reports.length > 0 ? (
        <AccountReportsTable reports={reports} />
      ) : (
        <p className="text-gray-400">No reports submitted yet.</p>
      )}
    </CardContent>
  </Card>


          </div>
        </main>
      </div>

      {/* Footer section similar to email tracking page */}
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
