"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RiSearchLine, RiFilterLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri"
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { BubbleLoader } from "../BubbleLoader"

interface User {
  isAdmin: any
  _id: string
  username: string
  email: string
  isVerified: string
  lastLogin: Date
  role: string
  status: 'active' | 'inactive'
}

export function UserTable() {
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch users from database
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users')
        setUsers(response.data)
      } catch (error) {
        toast({
          title: "Error fetching users",
          description: "Please try again later",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [toast])

  // Update user details
  const handleUpdateUser = async (userId: string, updatedData: Partial<User>) => {
    try {
      const response = await axios.put(`/api/admin/users/${userId}`, updatedData)
      setUsers(users.map(user => 
        user._id === userId ? { ...user, ...response.data } : user
      ))
      toast({
        title: "User updated successfully",
        description: "The user details have been updated",
      })
      setEditingUser(null)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update user details",
        variant: "destructive",
      })
    }
  }

// Delete user
const handleDeleteUser = async (userId: string) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    
    if (confirmDelete) {
      setDeletingUserId(userId); // Start loading state
      await axios.delete(`/api/admin/users/delete?userId=${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      
      toast({
        title: "User deleted successfully",
        description: "The user has been removed from the system.",
      });
    }
  } catch (error: unknown) {
    toast({
      title: "Error",
      description: "Failed to delete user",
      variant: "destructive",
    });
  } finally {
    setDeletingUserId(null); // End loading state
  }
};

const filteredUsers = users.filter(user => {
  const matchesSearch = (user.username?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                       (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  const matchesRole = selectedRole === "all" || 
                     (selectedRole === "admin" && user.isAdmin) || 
                     (selectedRole === "user" && !user.isAdmin)
  return matchesSearch && matchesRole
})

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900 p-4 rounded-lg">
        <div className="relative w-full sm:w-96">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg
                     text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <RiFilterLine /> Filters
          </Button>
        </div>
      </div>

      {/* User Table */}
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-900/50">
              <TableHead className="text-zinc-400">Name</TableHead>
              <TableHead className="text-zinc-400">Email</TableHead>
              <TableHead className="text-zinc-400">Role</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400">Last Login</TableHead>
              <TableHead className="text-zinc-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-zinc-400">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-zinc-400">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user._id} className="border-zinc-800">
                <TableCell className="font-medium text-zinc-100">
                  {editingUser?._id === user._id ? (
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
                    />
                  ) : user.username || 'N/A'}
                </TableCell>
                <TableCell className="text-zinc-100">{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.isAdmin 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.isVerified 
                      ? 'bg-teal-500/20 text-teal-500' 
                      : 'bg-zinc-500/20 text-zinc-400'
                  }`}>
                    {user.isVerified == `true` ? 'Verified' : 'Pending'}
                  </span>
                </TableCell>
                <TableCell className="text-zinc-400">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {editingUser?._id === user._id ? (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleUpdateUser(user._id, editingUser)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingUser(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-zinc-800"
                            onClick={() => setEditingUser(user)}
                          >
                            <RiEditLine className="w-4 h-4" />
                          </Button>
                          <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={deletingUserId === user._id}
                    >
                      {deletingUserId === user._id ? (
                        <BubbleLoader />
                      ) : (
                        <RiDeleteBinLine className="w-4 h-4" />
                      )}
                    </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}