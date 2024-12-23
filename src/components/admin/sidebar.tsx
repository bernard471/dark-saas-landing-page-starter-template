"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  User,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png"

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    color: "text-teal-500"
  },
  {
    label: 'Users',
    icon: Users,
    href: '/admin/users',
    color: "text-teal-500",
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/admin/settings',
    color: "text-teal-500",
  },
  {
    label: 'Profile',
    icon: User,
    href: '/admin/profile',
    color: "text-teal-500",
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button 
        variant="ghost" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 space-y-4 py-4 flex flex-col h-full bg-zinc-900 border-r border-zinc-800 transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-5 py-2">
        <Link href="/" className="relative flex items-center pl-6 py-1 ">
          <Image src={logoImage} alt="logo" className="h-14 w-[140px] relative"/>
        </Link>
        </div>
        <div className="px-3 py-2 ">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-zinc-800/50 rounded-lg transition",
                  pathname === route.href ? "bg-zinc-800 text-teal-500" : "text-zinc-400"
                )}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto px-3 py-2">
          <Link
            href="/api/users/logout"
            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-zinc-800/50 rounded-lg transition text-zinc-400"
          >
            <div className="flex items-center flex-1">
              <LogOut className="h-5 w-5 mr-3 text-red-500" />
              Logout
            </div>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
