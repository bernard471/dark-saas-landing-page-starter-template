"use client"

import { Card } from "@/components/ui/card"

interface UserStatsProps {
  users: any[]
}

export function UserStats({ users }: UserStatsProps) {
  const totalUsers = users.length
  const verifiedUsers = users.filter(user => user.isVerified == `true`).length
  const activeUsers = users.filter(user => user.lastLogin).length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <Card className="p-4 sm:p-6 bg-zinc-900/30 border-zinc-800 transform hover:scale-105 transition-transform duration-200">
        <div className="flex flex-col">
          <span className="text-zinc-400 text-sm font-medium">Total Users</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-teal-500">{totalUsers}</span>
            <div className="hidden sm:flex h-12 w-12 rounded-full bg-teal-500/10 items-center justify-center">
              <span className="text-teal-500 text-xl">👥</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-zinc-900/30 border-zinc-800 transform hover:scale-105 transition-transform duration-200">
        <div className="flex flex-col">
          <span className="text-zinc-400 text-sm font-medium">Verified Users</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-teal-500">{verifiedUsers}</span>
            <div className="hidden sm:flex h-12 w-12 rounded-full bg-teal-500/10 items-center justify-center">
              <span className="text-teal-500 text-xl">✓</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-zinc-900/30 border-zinc-800 transform hover:scale-105 transition-transform duration-200">
        <div className="flex flex-col">
          <span className="text-zinc-400 text-sm font-medium">Active Users</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-teal-500">{activeUsers}</span>
            <div className="hidden sm:flex h-12 w-12 rounded-full bg-teal-500/10 items-center justify-center">
              <span className="text-teal-500 text-xl">⚡</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
