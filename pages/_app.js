import { SessionProvider } from 'next-auth/react'
import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/Header'

import '@/styles/globals.css'

const font = Roboto({ subsets: ['latin'], weight: '400' })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <main className={font.className}>
      <SessionProvider session={session}>
        <Header />
        <div className="px-4">
          <Component {...pageProps} />
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </SessionProvider>
    </main>
  )
}
