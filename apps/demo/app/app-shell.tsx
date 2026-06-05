'use client'

import { useState } from 'react'
import { TourProvider, useAiGeneration, scanPage } from '@tour-ai/sdk'
import { themes } from '@/lib/tourlite'
import Link from 'next/link'
import {
  Route,
  ScanLine,
  Search,
  Plus,
  Sparkles,
  ChevronRight,
  Command,
  Globe,
  Settings as SettingsIcon,
} from 'lucide-react'
import { GenerateTourModal } from '@/components/tourlite/GenerateTourModal'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <TourProvider>
      <ShellContent>{children}</ShellContent>
    </TourProvider>
  )
}

function ShellContent({ children }: { children: React.ReactNode }) {
  const theme = themes.find((t) => t.slug === 'aurora') || themes[0]
  const [activeNav, setActiveNav] = useState('dashboard')
  const { generate, isGenerating } = useAiGeneration()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGenerate = async (goal: string) => {
    try {
      const tour = await generate(goal)
      
      // Save tour to database
      await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tour.name || `Tour for ${goal}`,
          appUrl: window.location.href,
          steps: tour.steps
        }),
      })

      setIsModalOpen(false)
      // Trigger a silent update of the lists
      window.dispatchEvent(new Event('refreshData'))
    } catch (error) {
      console.error('AI Generation Error:', error)
      alert('Failed to generate tour. Check your API key or console for details.')
    }
  }

  const handleScan = async () => {
    const elements = scanPage()
    
    // Save scan to database
    await fetch('/api/scans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appUrl: window.location.href,
        elements: elements.length
      }),
    })

    console.table(elements)
    alert(`Scanned ${elements.length} elements. View them in the console!`)
    
    // Trigger a silent update of the lists
    window.dispatchEvent(new Event('refreshData'))
  }

  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: Route, href: '/' },
    { id: 'tours', label: 'Tours', icon: Route, href: '/projects' },
    { id: 'scans', label: 'Scans', icon: ScanLine, href: '/team' },
    { id: 'analytics', label: 'Analytics', icon: Sparkles, href: '/projects' },
  ]

  return (
    <div
      className="flex h-dvh w-full overflow-hidden bg-[var(--tl-bg)] text-[var(--tl-fg)] antialiased"
      style={theme.vars as React.CSSProperties}
    >
      <GenerateTourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--tl-border)] bg-[var(--tl-panel)] md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-[var(--tl-border)] px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] text-[var(--tl-accent-fg)]">
            <Route className="h-4 w-4" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">TourLite AI</span>
          <ChevronRight className="ml-auto h-4 w-4 text-[var(--tl-faint)]" />
        </div>

        <div className="px-3 py-3">
          <button className="flex w-full items-center gap-2 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel-2)] px-2.5 py-1.5 text-left text-[13px] text-[var(--tl-muted)] transition-colors hover:border-[var(--tl-border-strong)]">
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="ml-auto flex items-center gap-0.5 rounded border border-[var(--tl-border)] px-1 text-[10px] text-[var(--tl-faint)]">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] px-2.5 py-2 text-[13px] font-medium text-[var(--tl-accent-fg)] transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> New tour
          </button>

          <ul className="space-y-0.5">
            {NAV.map((item) => {
              const active = activeNav === item.id
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-2 text-[13px] transition-colors ${
                      active
                        ? 'bg-[var(--tl-accent-soft)] font-medium text-[var(--tl-fg)]'
                        : 'text-[var(--tl-muted)] hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]'
                    }`}
                  >
                    <item.icon
                      className="h-4 w-4"
                      style={active ? { color: 'var(--tl-accent)' } : undefined}
                    />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <p className="px-2.5 pb-1.5 pt-5 text-[10px] font-medium uppercase tracking-wider text-[var(--tl-faint)]">
            Connected apps
          </p>
          <ul className="space-y-0.5">
            <li>
              <button className="flex w-full items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-1.5 text-[12px] text-[var(--tl-muted)] transition-colors hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]">
                <Globe className="h-3.5 w-3.5 text-[var(--tl-faint)]" />
                <span className="truncate">app.northwind.io</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="border-t border-[var(--tl-border)] p-3">
          <button className="mb-2 flex w-full items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-1.5 text-[13px] text-[var(--tl-muted)] transition-colors hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]">
            <SettingsIcon className="h-4 w-4" /> Settings
          </button>
          <div className="flex items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--tl-accent-soft)] text-[11px] font-semibold text-[var(--tl-accent)]">
              F
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium">Fatima</p>
              <p className="truncate text-[11px] text-[var(--tl-faint)]">Pro workspace</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--tl-border)] bg-[var(--tl-panel)] px-4 lg:px-5">
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-[var(--tl-faint)]">Tours</span>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--tl-faint)]" />
            <span className="font-medium text-[var(--tl-fg)]">Overview</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button 
              onClick={handleScan}
              className="flex h-8 items-center gap-1.5 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] px-2.5 text-[12px] text-[var(--tl-muted)] transition-colors hover:border-[var(--tl-border-strong)] hover:text-[var(--tl-fg)]"
            >
              <ScanLine className="h-3.5 w-3.5" /> Scan app
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex h-8 items-center gap-1.5 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] px-3 text-[12px] font-medium text-[var(--tl-accent-fg)] transition-opacity hover:opacity-90"
            >
              <Sparkles className="h-3.5 w-3.5" /> Generate tour
            </button>
          </div>
        </header>
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
