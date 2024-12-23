"use client"

import { useEffect, useState } from "react"
import { UserTable } from "@/components/admin/user-table"
import { Sidebar } from "@/components/admin/sidebar"

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <div>
      <Sidebar /> 
        <div className="flex-1 w-full md:w-[calc(100%-288px)] ml-0 md:ml-72">
          <div className="flex items-center justify-between mt-14 mb-5">
            <h1 className="text-3xl font-bold text-zinc-100">User Management</h1>
          </div>
          <UserTable />
        </div>
    </div>
  )
}