'use client'

import React, { useEffect, useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { RiUserLine, RiLockLine, RiMailLine, RiGlobalLine, RiShieldLine, RiHistoryLine, RiNotification3Line, RiLoader4Line } from 'react-icons/ri'
import Image from 'next/image'
import axios from 'axios'
import { formatLastLogin } from '@/utils/dateFormatter'
import toast from 'react-hot-toast'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
  })



  const tabs = [
    { id: 'profile', label: 'Profile', icon: RiUserLine },
    { id: 'security', label: 'Security', icon: RiShieldLine },
    { id: 'activity', label: 'Activity', icon: RiHistoryLine },
    { id: 'notifications', label: 'Notifications', icon: RiNotification3Line },
  ]

  useEffect(() => {
    getUserDetails();
  }, []);

  const [accountStats, setAccountStats] = useState<AccountStats>({
    memberSince: '',
    lastLogin: ''
  });

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserData({
        username: res.data.data.username,
        email: res.data.data.email,
        role: res.data.data.role || 'Administrator'
      });
    
      // Format the dates using the user's data
      setAccountStats({
        memberSince: new Date(res.data.data.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        }),
        lastLogin: formatLastLogin(res.data.data.lastLoginAt)
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/logout');
      
      if (response.data.success) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
  
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post("/api/users/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
  
      if (response.data.success) {
        toast.success("Password updated successfully");
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error: any) {
      console.error('Password update error:', error);
      toast.error(error.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <div className="flex bg-zinc-950">
      <Sidebar />
      
      <div className="flex-1 w-full md:w-[calc(100%-288px)] ml-0 md:ml-72">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <p className="mt-2 text-gray-400">Manage your account preferences and settings</p>
            </div>

            {/* Profile Header Card */}
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-500">

                  </div>
                  <button className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full 
                                   text-white hover:bg-teal-600 transition-colors duration-200">
                    <RiUserLine className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white text-center md:text-left">{userData.username}</h2>
                  <p className="text-gray-400 text-center md:text-left">{userData.email}</p>
                  <p className="text-gray-400 text-center md:text-left">{userData.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-8 bg-zinc-900 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200
                            ${activeTab === tab.id 
                              ? 'bg-teal-500 text-white' 
                              : 'text-gray-400 hover:text-white hover:bg-zinc-800'}`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
              {/* Main Content Area */}
              <div className="mt-8">
                {activeTab === 'profile' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Right Column - Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                        <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                              <input 
                                type="text"
                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg
                                       text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                                       transition-colors duration-200"
                                placeholder="John"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                              <input 
                                type="text"
                                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg
                                       text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                                       transition-colors duration-200"
                                placeholder="Doe"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <div className="flex">
                              <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0
                                         border-zinc-700 bg-zinc-800 text-gray-400">
                                <RiMailLine className="w-5 h-5" />
                              </span>
                              <input 
                                type="email"
                                className="w-full flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-r-lg
                                       text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                                       transition-colors duration-200"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                            <textarea 
                              rows={4}
                              className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg
                                     text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                                     transition-colors duration-200"
                              placeholder="Tell us about yourself..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-start gap-4">
                        <button className="px-6 py-2.5 text-gray-400 hover:text-white transition-colors duration-200">
                          Cancel
                        </button>
                        <button 
                          className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600
                                 transition-colors duration-200 flex items-center gap-2"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <RiLoader4Line className="animate-spin" />
                              Saving Changes...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600
                                    transition-colors duration-200 flex items-center gap-2"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <RiLoader4Line className="animate-spin" />
                                Logging out...
                              </>
                            ) : (
                              'Logout'
                            )}
                          </button>

                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                        <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                              <Input 
                                id="currentPassword" 
                                type="password" 
                                className="bg-zinc-800 border-gray-600"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                              />
                            </div>
                            <div>
                            <Label htmlFor="newPassword">New Password</Label>
                              <Input 
                                id="newPassword" 
                                type="password" 
                                className="bg-zinc-800 border-gray-600"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                              />
                            </div>
                            <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                              <Input 
                                id="confirmPassword" 
                                type="password" 
                                className="bg-zinc-800 border-gray-600"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                              />
                            </div>
                            <Button 
                              className="bg-teal-500 hover:bg-teal-600"
                              onClick={handlePasswordChange}
                            >
                              Update Password
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                    <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        { action: 'Profile Updated', time: '2 hours ago', icon: RiUserLine },
                        { action: 'Password Changed', time: '2 days ago', icon: RiLockLine },
                        { action: 'Login from new device', time: '5 days ago', icon: RiGlobalLine },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg">
                          <div className="p-2 bg-zinc-700 rounded-lg">
                            <activity.icon className="w-5 h-5 text-teal-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white">{activity.action}</p>
                            <p className="text-sm text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                    <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
                    <div className="space-y-6">
                      {[
                        { title: 'Email Notifications', desc: 'Receive email updates about your account activity' },
                        { title: 'Push Notifications', desc: 'Get push notifications in your browser' },
                        { title: 'Security Alerts', desc: 'Important alerts about your account security' },
                        { title: 'Product Updates', desc: 'Learn about new features and updates' },
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">{setting.title}</h4>
                            <p className="text-sm text-gray-400">{setting.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-teal-500 
                                        peer-checked:after:translate-x-full after:content-[''] after:absolute 
                                        after:top-0.5 after:left-[2px] after:bg-white after:rounded-full 
                                        after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
