'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast" // Add this import
import Link from 'next/link'
import Image from 'next/image'
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png"
import { BubbleLoader } from '@/components/BubbleLoader'

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      toast({
        title: "Account created",
        description: "Welcome aboard! You can now log in.",
        className: "bg-zinc-900 border border-zinc-800 text-zinc-100",
        style: {
          backgroundColor: 'rgb(24 24 27)',
          color: 'rgb(244 244 245)',
        },
        duration: 3000,
      })
      
      router.push('/login')
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.response?.data?.error || 'Failed to create account',
        variant: "destructive",
        className: "bg-zinc-900 border border-zinc-800 text-zinc-100",
        style: {
          backgroundColor: 'rgb(24 24 27)',
          color: 'rgb(244 244 245)',
          borderColor: 'rgb(14 165 163)', // Teal accent
        },
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {loading && <BubbleLoader />}
      <div className="space-y-8 w-full max-w-md">
      <div className="flex justify-center">
        <Link href="/">
          <Image 
            src={logoImage} 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </Link>
      </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Create an Account
            </h1>
            <p className="text-gray-400">
              Join us today and get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-200"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 
                         text-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 
                         focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 
                         text-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 
                         focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 
                         text-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 
                         focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the{' '}
                <Link 
                  href="/terms" 
                  className="text-teal-400 hover:text-teal-300 transition duration-200"
                >
                  Terms of Service
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 
                       hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed
                       transition duration-200"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login"
                className="text-teal-400 hover:text-teal-300 transition duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>
            Need help?{' '}
            <Link 
              href="/contact" 
              className="text-teal-400 hover:text-teal-300 transition duration-200"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}