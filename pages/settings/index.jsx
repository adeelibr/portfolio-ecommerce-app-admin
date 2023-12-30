import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'

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
                <span className="text-green-700">Profile</span>
              </h1>
              <p className="mt-1.5 text-md text-gray-500 max-w-lg">This information will only be displayed to you.</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-5 py-3 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring"
                type="button"
                onClick={handleLogout}
              >
                <span className="text-md font-medium">Logout {session.user.name?.split(' ')?.[0]}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <hr className="my-1 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">
        {/* username here */}
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 bg-gray-100 text-gray-500 sm:text-md">admin/</span>
              <input
                type="text"
                className="block flex-1 border-0 bg-gray-100 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6"
                value={session.user.email}
                disabled
              />
            </div>
          </div>
        </div>

        {/* about section */}
        <div className="col-span-full my-7">
          <label htmlFor="about" className="block text-md font-medium leading-6 text-gray-900">
            About
          </label>

          <p className="text-md leading-6 text-gray-600">You are one of the administrators of this dashboard.</p>
        </div>

        {/* profile picture section */}
        <div className="col-span-full">
          <label htmlFor="photo" className="block text-md font-medium leading-6 text-gray-900">
            Photo
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            <div className="w-10 h-10">
              <Image
                class="h-full w-full rounded-full object-contain object-center"
                src={session.user.image}
                alt={session.user.email}
                width={34}
                height={34}
              />
            </div>
          </div>
        </div>

        {/* start of form section */}
        <div className="border-b border-gray-900/10 pb-12 my-7">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-md leading-6 text-gray-600">
            You can only view your information, you won&apos;t be able to edit.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="first-name" className="block text-md font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 sm:text-md sm:leading-6 pl-6"
                  value={session.user.name.split(' ')[0]}
                  disabled
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="last-name" className="block text-md font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 sm:text-md sm:leading-6 pl-6"
                  value={session.user.name.split(' ')[1]}
                  disabled
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 sm:text-md sm:leading-6 pl-6"
                  value={session.user.email}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        {/* end of form section */}
      </div>
    </div>
  )
}

export default Settings
