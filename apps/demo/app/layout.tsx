import type { Metadata } from 'next'
import './globals.css'
import AppShell from './app-shell'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'TourLite Demo',
  description: 'AI-generated tour demo app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  )
}
