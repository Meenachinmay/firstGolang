import type { Metadata } from 'next'
import { Inter, Monofett } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const monofett = Monofett({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'Chat app with Golang',
  description: 'My first golang + nextjs project. i am a beginner with golang who is making it as my main backend language.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
