'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'
import Image from 'next/image'
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png"
import { BubbleLoader } from '@/components/BubbleLoader'

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      toast({
        title: "Loggin successful",
        description: "You are being directed to your dashboard",
        className: "bg-zinc-900 border border-zinc-800 text-zinc-100",
        style: {
          backgroundColor: 'rgb(24 24 27)',
          color: 'rgb(244 244 245)',
        },
        duration: 5000,
      })
      // Add delay before redirect to show loading state longer
      await new Promise(resolve => setTimeout(resolve, 4000)) // 2 second delay
      // Use the redirectUrl from the server response
      router.push(response.data.redirectUrl)
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
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <Link 
                href="/forgotpassword"
                className="text-sm text-teal-400 hover:text-teal-300 transition duration-200"
              >
                Forgot password?
              </Link>
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Do not have an account?{' '}
              <Link 
                href="/signup"
                className="text-teal-400 hover:text-teal-300 transition duration-200"
              >
                Sign up
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
