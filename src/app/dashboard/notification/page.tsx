'use client'

import { AlertCircle, ChevronDown, Eye, Settings, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from  "@/components/ui/badge"
import { useState } from "react"

interface Notification {
  id: number
  title: string
  date: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  description: string
  icon: "maintenance" | "password"
  expanded?: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    date: "2024-11-10",
    priority: "HIGH",
    description: "Our system will be undergoing maintenance on November 10th, 2024. Please save your work and log out before the maintenance window begins.",
    icon: "maintenance"
  },
  {
    id: 2,
    title: "Password Changed Successfully",
    date: "2024-11-08",
    priority: "MEDIUM",
    description: "You have successfully changed your password. If you did not make this change, please contact support immediately.",
    icon: "password"
  }
]

export default function NotificationsPanel() {
  const [expandedIds, setExpandedIds] = useState<number[]>([])

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500/10 text-red-500"
      case "MEDIUM":
        return "bg-orange-500/10 text-orange-500"
      case "LOW":
        return "bg-teal-500/10 text-teal-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <RefreshCw className="h-5 w-5 text-teal-500" />
      case "password":
        return <Eye className="h-5 w-5 text-teal-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-teal-500" />
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2 md:hidden">
        <h2 className="text-xl font-semibold text-gray-100">Notifications</h2>
        <p className="text-sm text-gray-400">Stay updated with recent notifications and alerts.</p>
      </div>

      {notifications.map((notification) => (
        <Card key={notification.id} className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 hidden sm:block">
                {getIcon(notification.icon)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-gray-100">{notification.title}</h3>
                    <p className="text-sm text-gray-400">{notification.date}</p>
                  </div>
                  <Badge className={`${getPriorityColor(notification.priority)} self-start`}>
                    {notification.priority}
                  </Badge>
                </div>
                <div className={`overflow-hidden transition-all duration-200 ${expandedIds.includes(notification.id) ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="text-sm text-gray-300 pt-2">
                    {notification.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-teal-500 hover:text-teal-400 p-0 h-auto font-medium"
                  onClick={() => toggleExpand(notification.id)}
                >
                  {expandedIds.includes(notification.id) ? 'Show Less' : 'Show More'}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                    expandedIds.includes(notification.id) ? 'rotate-180' : ''
                  }`} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}