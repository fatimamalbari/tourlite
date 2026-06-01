'use client'

import { useState } from 'react'
import { TourProvider, useAiGeneration } from '@tour-ai/sdk'
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
} from 'lucide-react'
import { GenerateTourModal } from '@/components/tourlite/GenerateTourModal'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const theme = themes.find((t) => t.slug === 'aurora') || themes[0]
  const [activeNav, setActiveNav] = useState('dashboard')
  const { generate, isGenerating } = useAiGeneration()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGenerate = async (goal: string) => {
    try {
      await generate(goal)
      setIsModalOpen(false)
    } catch (error) {
      alert('Failed to generate tour. Check your API key.')
    }
  }

  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: Route, href: '/' },
    { id: 'tours', label: 'Tours', icon: Route, href: '/projects' },
    { id: 'scans', label: 'Scans', icon: ScanLine, href: '/team' },
    { id: 'analytics', label: 'Analytics', icon: Sparkles, href: '/projects' },
  ]

  return (
    <TourProvider>
      <div className="flex h-dvh w-full overflow-hidden bg-[var(--tl-bg)] text-[var(--tl-fg)] antialiased" style={theme.vars as Record<string, string>}>
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
          <button className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] px-2.5 py-2 text-[13px] font-medium text-[var(--tl-accent-fg)] transition-opacity hover:opacity-90">
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
        </nav>
      </aside>

      <DashboardShell>
        {children}
      </DashboardShell>
    </div>
    </TourProvider>
  )
}

function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
