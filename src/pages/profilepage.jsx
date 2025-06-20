import React from 'react'
import { useAuth } from '../context/Authcontext'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome {user?.email}</h1>
        <p>This is your profile page.</p>
      </div>
    </div>
  )
}
