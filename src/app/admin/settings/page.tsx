'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { RiNotificationLine, RiSecurePaymentLine, RiTeamLine, RiGlobalLine } from 'react-icons/ri'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="flex bg-zinc-950">
      <Sidebar />
      <div className="flex-1 w-full md:w-[calc(100%-288px)] ml-0 md:ml-72 overflow-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="mt-2 text-gray-400">Manage your application preferences and configurations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* General Settings Card */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">General Settings</h2>
                  <RiGlobalLine className="text-teal-500 text-xl" />
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Site Name</label>
                    <input 
                      type="text"
                      className="mt-1 w-full rounded-md bg-gray-700 border border-gray-600 
                               text-white px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                      placeholder="Your Site Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Timezone</label>
                    <select 
                      className="mt-1 w-full rounded-md bg-gray-700 border border-gray-600 
                               text-white px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    >
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Settings Card */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Notifications</h2>
                  <RiNotificationLine className="text-teal-500 text-xl" />
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Push Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Team Settings Card */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Team Management</h2>
                  <RiTeamLine className="text-teal-500 text-xl" />
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 
                                   transition duration-200">
                    Invite Team Member
                  </button>
                </div>
              </div>

              {/* Billing Settings Card */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Billing</h2>
                  <RiSecurePaymentLine className="text-teal-500 text-xl" />
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 
                                   transition duration-200">
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 text-gray-400 hover:text-white transition duration-200">
                Cancel
              </button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 
                               transition duration-200">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}