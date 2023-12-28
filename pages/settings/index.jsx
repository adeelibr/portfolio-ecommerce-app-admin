import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const Settings = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await router.push('/')
    await signOut()
  }

  if (!session) return null

  return (
    <div>
      <header>
        <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                <span className="text-green-700">{session.user.name}</span>
              </h1>
              <p className="mt-1.5 text-md text-gray-500 max-w-lg">{session.user.email}</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-5 py-3 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring"
                type="button"
                onClick={handleLogout}
              >
                <span className="text-md font-medium"> Logout </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <hr className="my-1 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">settings here</div>
    </div>
  )
}

export default Settings
