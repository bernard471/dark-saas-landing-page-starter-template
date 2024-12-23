"use client"

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from "@/assets/images/Screenshot__198_-removebg-preview.png"

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const token = searchParams.get("token")
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('/api/users/resetpassword', { 
        token,
        newPassword: formData.password 
      })
      toast.success('Password reset successful')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="space-y-8 w-full max-w-md">
        <div className="flex justify-center">
          <Image 
            src={logoImage} 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Reset Password
            </h1>
            <p className="text-gray-400">
              Enter your new password below to reset your account password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-200"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 
                       text-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 
                       focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Enter new password"
                required
                minLength={6}
              />
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-200"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 
                       text-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 
                       focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
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
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="text-center">
            <Link 
              href="/login"
              className="text-sm text-teal-400 hover:text-teal-300 transition duration-200"
            >
              Back to Login
            </Link>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
