"use client"

import { useEffect, useState } from "react"
import { UserStats } from "@/components/admin/user-stats"
import { UserTable } from "@/components/admin/user-table"
import { Sidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { RiUserAddLine } from "react-icons/ri"
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { BubbleLoader } from "@/components/BubbleLoader"

export default function AdminDashboard() {
  const [isCreating, setIsCreating] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    isVerified: 'false',
    createdAt: new Date()
  })
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    try {
      const response = await axios.post('/api/admin/users', newUser)
      setUsers([...users, response.data])
      setShowCreateModal(false)
      setNewUser({ username: '', email: '', password: '', isAdmin: false, isVerified: 'false', createdAt: new Date() })
      toast({
        title: "User created successfully",
        description: "Welcome aboard! You can now log in.",
        className: "bg-zinc-900 border border-zinc-800 text-zinc-100",
        style: {
          backgroundColor: 'rgb(24 24 27)',
          color: 'rgb(244 244 245)',
        },
        duration: 3000,
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
        className: "bg-zinc-900 border border-zinc-800 text-zinc-100",
        style: {
          backgroundColor: 'rgb(24 24 27)',
          color: 'rgb(244 244 245)',
          borderColor: 'rgb(14 165 163)', // Teal accent
        },
        duration: 3000,
      })
    }
      finally {
        setIsCreating(false)
      }
    }
 

  return (
    <div>
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 w-full md:w-[calc(100%-288px)] ml-0 md:ml-72 overflow-hidden">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            {/* Header with Create User Button */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Admin Dashboard</h1>
              <Button 
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600"
                onClick={() => setShowCreateModal(true)}
              >
                <RiUserAddLine className="w-4 h-4" />
                Create User
              </Button>
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md border border-zinc-800">
                  <h2 className="text-xl font-bold text-zinc-100 mb-4">Create New User</h2>
                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Username</label>
                      <input
                        type="text"
                        value={newUser.username}
                        onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                      <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newUser.isAdmin}
                        onChange={(e) => setNewUser({...newUser, isAdmin: e.target.checked})}
                        className="rounded border-zinc-700 bg-zinc-800"
                      />
                      <label className="text-sm font-medium text-zinc-400">Admin User</label>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowCreateModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2"
                        disabled={isCreating}
                      >
                        {isCreating ? (
                          <>
                            <BubbleLoader />
                            <span>Creating...</span>
                          </>
                        ) : (
                          'Create User'
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Stats Section */}
            <section className="w-full">
              <UserStats users={users} />
            </section>

            {/* Table Section */}
            <section className="w-full bg-zinc-900/30 rounded-lg border border-zinc-800">
              <UserTable />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
