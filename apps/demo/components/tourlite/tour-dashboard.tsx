"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Route,
  ScanLine,
  BarChart3,
  Settings,
  Search,
  Plus,
  Sparkles,
  Bell,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight,
  MousePointerClick,
  Check,
  Play,
  Pencil,
  Trash2,
  GripVertical,
  Globe,
  Command,
  Wand2,
  Layers,
  Eye,
} from "lucide-react"
import {
  type TourLiteTheme,
  type Tour,
  type TourStep,
  metrics,
  tours,
  editorSteps,
  scanFeed,
} from "@/lib/tourlite"

/* -------------------------------------------------------------------------- */

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tours", label: "Tours", icon: Route },
  { id: "scans", label: "Scans", icon: ScanLine },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
]

const APPS = [
  { id: "northwind", label: "app.northwind.io" },
  { id: "flux", label: "console.flux.dev" },
]

export function TourDashboard({ theme }: { theme: TourLiteTheme }) {
  const [view, setView] = useState<"overview" | "editor">("overview")
  const [activeNav, setActiveNav] = useState("dashboard")
  const [selectedTour, setSelectedTour] = useState<Tour>(
    tours[0] ?? {
      id: 't-fallback',
      name: 'Default tour',
      app: 'app.northwind.io',
      status: 'draft',
      steps: 0,
      completion: 0,
      updated: 'unknown',
      author: 'AI',
    }
  )
  const [selectedStep, setSelectedStep] = useState<TourStep>(
    editorSteps[0] ?? {
      id: 's-fallback',
      index: 1,
      title: 'Step details unavailable',
      selector: '',
      element: 'Unknown element',
      body: 'No step data is available.',
      placement: 'bottom',
    }
  )

  const head = theme.monoHeadings ? "font-mono tracking-tight" : "font-sans tracking-tight"
  const dense = theme.compact

  const openEditor = (tour: Tour) => {
    setSelectedTour(tour)
    setSelectedStep(
      editorSteps[0] ?? {
        id: 's-fallback',
        index: 1,
        title: 'Step details unavailable',
        selector: '',
        element: 'Unknown element',
        body: 'No step data is available.',
        placement: 'bottom',
      }
    )
    setActiveNav("tours")
    setView("editor")
  }

  return (
    <div
      style={theme.vars as React.CSSProperties}
      className="flex h-dvh w-full overflow-hidden bg-[var(--tl-bg)] text-[var(--tl-fg)] antialiased"
    >
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--tl-border)] bg-[var(--tl-panel)] md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-[var(--tl-border)] px-4">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] text-[var(--tl-accent-fg)]"
            aria-hidden
          >
            <Route className="h-4 w-4" />
          </div>
          <span className={`text-[15px] font-semibold ${head}`}>TourLite AI</span>
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
            onClick={() => openEditor(selectedTour)}
            className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] px-2.5 py-2 text-[13px] font-medium text-[var(--tl-accent-fg)] transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> New tour
          </button>

          <ul className="space-y-0.5">
            {NAV.map((item) => {
              const active = activeNav === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveNav(item.id)
                      setView("overview")
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-2 text-[13px] transition-colors ${
                      active
                        ? "bg-[var(--tl-accent-soft)] font-medium text-[var(--tl-fg)]"
                        : "text-[var(--tl-muted)] hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]"
                    }`}
                  >
                    <item.icon
                      className="h-4 w-4"
                      style={active ? { color: "var(--tl-accent)" } : undefined}
                    />
                    {item.label}
                    {item.id === "tours" && (
                      <span className="ml-auto rounded-full bg-[var(--tl-panel-2)] px-1.5 text-[10px] text-[var(--tl-faint)]">
                        24
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="px-2.5 pb-1.5 pt-5 text-[10px] font-medium uppercase tracking-wider text-[var(--tl-faint)]">
            Connected apps
          </p>
          <ul className="space-y-0.5">
            {APPS.map((app) => (
              <li key={app.id}>
                <button className="flex w-full items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-1.5 text-[12px] text-[var(--tl-muted)] transition-colors hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]">
                  <Globe className="h-3.5 w-3.5 text-[var(--tl-faint)]" />
                  <span className="truncate">{app.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[var(--tl-border)] p-3">
          <button className="mb-2 flex w-full items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-1.5 text-[13px] text-[var(--tl-muted)] transition-colors hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <div className="flex items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2.5 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--tl-accent-soft)] text-[11px] font-semibold text-[var(--tl-accent)]">
              JD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium">Jordan Diaz</p>
              <p className="truncate text-[11px] text-[var(--tl-faint)]">Pro workspace</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar theme={theme} view={view} setView={setView} tour={selectedTour} head={head} />

        <main className={`flex-1 overflow-y-auto ${dense ? "p-4" : "p-5 lg:p-6"}`}>
          {view === "overview" ? (
            <Overview theme={theme} head={head} onEdit={openEditor} />
          ) : (
            <Editor
              theme={theme}
              head={head}
              tour={selectedTour}
              selectedStep={selectedStep}
              setSelectedStep={setSelectedStep}
            />
          )}
        </main>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Top bar                                                                   */
/* -------------------------------------------------------------------------- */

function Topbar({
  theme,
  view,
  setView,
  tour,
  head,
}: {
  theme: TourLiteTheme
  view: "overview" | "editor"
  setView: (v: "overview" | "editor") => void
  tour: Tour
  head: string
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--tl-border)] bg-[var(--tl-panel)] px-4 lg:px-5">
      <Link
        href="/"
        className="flex items-center gap-1 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] px-2 py-1 text-[12px] text-[var(--tl-muted)] transition-colors hover:text-[var(--tl-fg)]"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Gallery
      </Link>

      <div className="flex items-center gap-1.5 text-[13px]">
        <span className="text-[var(--tl-faint)]">Tours</span>
        <ChevronRight className="h-3.5 w-3.5 text-[var(--tl-faint)]" />
        <span className={`font-medium ${head}`}>
          {view === "overview" ? "Overview" : tour.name}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-1 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel-2)] p-0.5 sm:flex">
          <button
            onClick={() => setView("overview")}
            className={`rounded-[calc(var(--tl-radius-sm)-2px)] px-2.5 py-1 text-[12px] transition-colors ${
              view === "overview"
                ? "bg-[var(--tl-panel)] font-medium text-[var(--tl-fg)] shadow-sm"
                : "text-[var(--tl-muted)] hover:text-[var(--tl-fg)]"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setView("editor")}
            className={`rounded-[calc(var(--tl-radius-sm)-2px)] px-2.5 py-1 text-[12px] transition-colors ${
              view === "editor"
                ? "bg-[var(--tl-panel)] font-medium text-[var(--tl-fg)] shadow-sm"
                : "text-[var(--tl-muted)] hover:text-[var(--tl-fg)]"
            }`}
          >
            Editor
          </button>
        </div>

        <button
          className="hidden h-8 items-center gap-1.5 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] px-2.5 text-[12px] text-[var(--tl-muted)] transition-colors hover:border-[var(--tl-border-strong)] hover:text-[var(--tl-fg)] lg:flex"
        >
          <ScanLine className="h-3.5 w-3.5" /> Scan app
        </button>

        <button className="relative flex h-8 w-8 items-center justify-center rounded-[var(--tl-radius-sm)] text-[var(--tl-muted)] transition-colors hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--tl-accent)]" />
        </button>

        <button className="flex h-8 items-center gap-1.5 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] px-3 text-[12px] font-medium text-[var(--tl-accent-fg)] transition-opacity hover:opacity-90">
          <Sparkles className="h-3.5 w-3.5" /> Generate tour
        </button>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Overview                                                                  */
/* -------------------------------------------------------------------------- */

function Overview({
  theme,
  head,
  onEdit,
}: {
  theme: TourLiteTheme
  head: string
  onEdit: (t: Tour) => void
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className={`text-xl font-semibold ${head}`}>Welcome back, Jordan</h1>
          <p className="mt-1 text-[13px] text-[var(--tl-muted)]">
            Your AI-generated onboarding tours across 2 connected apps.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel)] px-3 py-1.5 text-[12px] text-[var(--tl-muted)]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--tl-ok)" }} />
          1 scan running
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)] p-4"
          >
            <p className="text-[12px] text-[var(--tl-muted)]">{m.label}</p>
            <div className="mt-1.5 flex items-end justify-between">
              <span className={`text-2xl font-semibold ${head}`}>{m.value}</span>
              <span
                className="flex items-center gap-0.5 text-[11px] font-medium"
                style={{ color: m.trend === "up" ? "var(--tl-ok)" : "var(--tl-warn)" }}
              >
                {m.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {m.delta}
              </span>
            </div>
            <Sparkline data={m.spark} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Tours table */}
        <section className="lg:col-span-2 rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)]">
          <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-4 py-3">
            <h2 className={`text-[13px] font-semibold ${head}`}>Your tours</h2>
            <button className="flex items-center gap-1 text-[12px] text-[var(--tl-muted)] transition-colors hover:text-[var(--tl-fg)]">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="divide-y divide-[var(--tl-border)]">
            {tours.map((t) => (
              <button
                key={t.id}
                onClick={() => onEdit(t)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--tl-panel-2)]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent-soft)]">
                  <Layers className="h-4 w-4 text-[var(--tl-accent)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{t.name}</p>
                  <p className="truncate text-[11px] text-[var(--tl-faint)]">
                    {t.app} · {t.steps} steps · {t.author}
                  </p>
                </div>
                <div className="hidden w-28 sm:block">
                  <CompletionBar value={t.completion} />
                </div>
                <StatusBadge status={t.status} />
                <span className="hidden w-16 text-right text-[11px] text-[var(--tl-faint)] md:block">
                  {t.updated}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Scan feed */}
        <section className="rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)]">
          <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-4 py-3">
            <h2 className={`text-[13px] font-semibold ${head}`}>Recent scans</h2>
            <ScanLine className="h-4 w-4 text-[var(--tl-faint)]" />
          </div>
          <div className="space-y-1 p-2">
            {scanFeed.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-[var(--tl-radius-sm)] px-2 py-2 transition-colors hover:bg-[var(--tl-panel-2)]"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--tl-accent-soft)" }}
                >
                  {s.status === "running" ? (
                    <ScanLine className="h-3.5 w-3.5 animate-pulse text-[var(--tl-accent)]" />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-[var(--tl-accent)]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px]">{s.app}</p>
                  <p className="text-[11px] text-[var(--tl-faint)]">
                    {s.elements} elements · {s.time}
                  </p>
                </div>
                {s.status === "running" && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                    style={{ background: "var(--tl-accent-soft)", color: "var(--tl-accent)" }}
                  >
                    live
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--tl-border)] p-3">
            <button className="flex w-full items-center justify-center gap-1.5 rounded-[var(--tl-radius-sm)] border border-dashed border-[var(--tl-border-strong)] py-2 text-[12px] text-[var(--tl-muted)] transition-colors hover:text-[var(--tl-fg)]">
              <Plus className="h-3.5 w-3.5" /> Scan a new page
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Split-screen editor                                                       */
/* -------------------------------------------------------------------------- */

function Editor({
  theme,
  head,
  tour,
  selectedStep,
  setSelectedStep,
}: {
  theme: TourLiteTheme
  head: string
  tour: Tour
  selectedStep: TourStep
  setSelectedStep: (s: TourStep) => void
}) {
  return (
    <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
      {/* Live preview */}
      <section className="flex min-h-[420px] flex-col overflow-hidden rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)]">
        <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
            <span className="ml-2 rounded-[var(--tl-radius-sm)] bg-[var(--tl-panel-2)] px-2 py-0.5 text-[11px] text-[var(--tl-muted)]">
              {tour.app}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--tl-faint)]">
            <Eye className="h-3.5 w-3.5" /> Live preview
          </div>
        </div>

        {/* Mock app canvas */}
        <div className="relative flex-1 overflow-hidden bg-[var(--tl-bg)] p-4">
          <MockApp theme={theme} step={selectedStep} />
        </div>

        <div className="flex items-center justify-between border-t border-[var(--tl-border)] px-3 py-2">
          <div className="flex items-center gap-1.5">
            {editorSteps.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStep(s)}
                aria-label={`Go to step ${s.index}`}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: s.id === selectedStep.id ? 22 : 8,
                  background: s.id === selectedStep.id ? "var(--tl-accent)" : "var(--tl-border-strong)",
                }}
              />
            ))}
          </div>
          <span className="text-[11px] text-[var(--tl-faint)]">
            Step {selectedStep.index} of {editorSteps.length}
          </span>
        </div>
      </section>

      {/* Step config */}
      <section className="flex flex-col overflow-hidden rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)]">
        <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-4 py-3">
          <h2 className={`text-[13px] font-semibold ${head}`}>Tour steps</h2>
          <span className="flex items-center gap-1 rounded-full bg-[var(--tl-accent-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--tl-accent)]">
            <Wand2 className="h-3 w-3" /> AI generated
          </span>
        </div>

        {/* Step list */}
        <div className="max-h-44 overflow-y-auto border-b border-[var(--tl-border)] p-2">
          {editorSteps.map((s) => {
            const active = s.id === selectedStep.id
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStep(s)}
                className={`group flex w-full items-center gap-2.5 rounded-[var(--tl-radius-sm)] px-2 py-2 text-left transition-colors ${
                  active ? "bg-[var(--tl-accent-soft)]" : "hover:bg-[var(--tl-panel-2)]"
                }`}
              >
                <GripVertical className="h-3.5 w-3.5 text-[var(--tl-faint)] opacity-0 group-hover:opacity-100" />
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                  style={{
                    background: active ? "var(--tl-accent)" : "var(--tl-panel-2)",
                    color: active ? "var(--tl-accent-fg)" : "var(--tl-muted)",
                  }}
                >
                  {s.index}
                </span>
                <span
                  className={`flex-1 truncate text-[12px] ${active ? "font-medium" : "text-[var(--tl-muted)]"}`}
                >
                  {s.title}
                </span>
              </button>
            )
          })}
          <button className="mt-1 flex w-full items-center gap-2 rounded-[var(--tl-radius-sm)] px-2 py-2 text-[12px] text-[var(--tl-muted)] transition-colors hover:bg-[var(--tl-panel-2)] hover:text-[var(--tl-fg)]">
            <Plus className="h-3.5 w-3.5" /> Add step
          </button>
        </div>

        {/* Selected step config */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <Field label="Step title">
            <input
              key={selectedStep.id + "-title"}
              defaultValue={selectedStep.title}
              className="w-full rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel-2)] px-2.5 py-2 text-[13px] outline-none transition-colors focus:border-[var(--tl-accent)]"
            />
          </Field>

          <Field label="Target element" hint="Detected by AI scan">
            <div className="flex items-center gap-2 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel-2)] px-2.5 py-2">
              <MousePointerClick className="h-3.5 w-3.5 text-[var(--tl-accent)]" />
              <span className="text-[13px]">{selectedStep.element}</span>
              <code className="ml-auto truncate font-mono text-[11px] text-[var(--tl-faint)]">
                {selectedStep.selector}
              </code>
            </div>
          </Field>

          <Field label="Tooltip copy">
            <textarea
              key={selectedStep.id + "-body"}
              defaultValue={selectedStep.body}
              rows={4}
              className="w-full resize-none rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel-2)] px-2.5 py-2 text-[13px] leading-relaxed outline-none transition-colors focus:border-[var(--tl-accent)]"
            />
            <button className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[var(--tl-accent)]">
              <Sparkles className="h-3 w-3" /> Rewrite with AI
            </button>
          </Field>

          <Field label="Tooltip placement">
            <div className="grid grid-cols-4 gap-1.5">
              {(["top", "bottom", "left", "right"] as const).map((p) => {
                const active = p === selectedStep.placement
                return (
                  <span
                    key={p}
                    className={`rounded-[var(--tl-radius-sm)] border px-2 py-1.5 text-center text-[11px] capitalize transition-colors ${
                      active
                        ? "border-[var(--tl-accent)] text-[var(--tl-fg)]"
                        : "border-[var(--tl-border)] text-[var(--tl-muted)]"
                    }`}
                    style={active ? { background: "var(--tl-accent-soft)" } : undefined}
                  >
                    {p}
                  </span>
                )
              })}
            </div>
          </Field>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 border-t border-[var(--tl-border)] p-3">
          <button className="flex items-center gap-1.5 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] px-2.5 py-1.5 text-[12px] text-[var(--tl-muted)] transition-colors hover:text-[var(--tl-fg)]">
            <Play className="h-3.5 w-3.5" /> Preview
          </button>
          <button className="flex items-center gap-1.5 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] px-2.5 py-1.5 text-[12px] text-[var(--tl-muted)] transition-colors hover:text-[var(--tl-fg)]">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button className="ml-auto flex items-center gap-1.5 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)] px-3 py-1.5 text-[12px] font-medium text-[var(--tl-accent-fg)] transition-opacity hover:opacity-90">
            <Check className="h-3.5 w-3.5" /> Publish tour
          </button>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Mock app preview with a coach-mark tooltip                                */
/* -------------------------------------------------------------------------- */

function MockApp({ theme, step }: { theme: TourLiteTheme; step: TourStep }) {
  return (
    <div className="relative h-full min-h-[300px] w-full rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel)]">
      {/* fake header */}
      <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-[4px] bg-[var(--tl-accent)]" />
          <span className="h-2 w-16 rounded bg-[var(--tl-border-strong)]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-5 w-14 rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent)]" />
          <span className="h-5 w-5 rounded-full bg-[var(--tl-border-strong)]" />
        </div>
      </div>
      {/* fake body */}
      <div className="flex gap-3 p-3">
        <div className="hidden w-24 shrink-0 space-y-1.5 sm:block">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-5 rounded bg-[var(--tl-panel-2)]"
              style={i === 2 ? { background: "var(--tl-accent-soft)" } : undefined}
            />
          ))}
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-16 rounded-[var(--tl-radius-sm)] bg-[var(--tl-panel-2)]" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 rounded-[var(--tl-radius-sm)] bg-[var(--tl-panel-2)]" />
            <div className="h-12 rounded-[var(--tl-radius-sm)] bg-[var(--tl-panel-2)]" />
            <div className="h-12 rounded-[var(--tl-radius-sm)] bg-[var(--tl-panel-2)]" />
          </div>
          <div className="h-20 rounded-[var(--tl-radius-sm)] bg-[var(--tl-panel-2)]" />
        </div>
      </div>

      {/* Highlight ring */}
      <div
        className="pointer-events-none absolute rounded-[var(--tl-radius-sm)]"
        style={{
          top: "10px",
          right: "12px",
          width: "56px",
          height: "20px",
          boxShadow: "0 0 0 2px var(--tl-accent), 0 0 0 6px var(--tl-accent-soft)",
        }}
      />

      {/* Coach-mark tooltip */}
      <div
        className="absolute w-56 rounded-[var(--tl-radius)] border border-[var(--tl-border-strong)] bg-[var(--tl-panel-2)] p-3 shadow-xl"
        style={{ top: "44px", right: "16px" }}
      >
        <div className="mb-1.5 flex items-center justify-between">
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ background: "var(--tl-accent)", color: "var(--tl-accent-fg)" }}
          >
            {step.index}/{editorSteps.length}
          </span>
          <Sparkles className="h-3 w-3 text-[var(--tl-accent)]" />
        </div>
        <p className="text-[12px] font-semibold">{step.title}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--tl-muted)]">{step.body}</p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[10px] text-[var(--tl-faint)]">Skip</span>
          <span
            className="rounded-[var(--tl-radius-sm)] px-2 py-1 text-[10px] font-medium"
            style={{ background: "var(--tl-accent)", color: "var(--tl-accent-fg)" }}
          >
            Next
          </span>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Small UI primitives                                                       */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-[11px] font-medium uppercase tracking-wide text-[var(--tl-faint)]">
          {label}
        </label>
        {hint && <span className="text-[10px] text-[var(--tl-faint)]">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function StatusBadge({ status }: { status: Tour["status"] }) {
  const map = {
    published: { label: "Published", color: "var(--tl-ok)" },
    draft: { label: "Draft", color: "var(--tl-faint)" },
    generating: { label: "Generating", color: "var(--tl-warn)" },
  } as const
  const s = map[status]
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--tl-border)] px-2 py-0.5 text-[10px] font-medium">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: s.color, ...(status === "generating" ? { animation: "pulse 1.5s infinite" } : {}) }}
      />
      <span style={{ color: "var(--tl-muted)" }}>{s.label}</span>
    </span>
  )
}

function CompletionBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--tl-panel-2)]">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: value === 0 ? "var(--tl-border-strong)" : "var(--tl-accent)" }}
        />
      </div>
      <span className="w-8 text-right text-[10px] text-[var(--tl-faint)]">{value}%</span>
    </div>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 100
  const h = 28
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((d - min) / range) * h
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-7 w-full" preserveAspectRatio="none" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="var(--tl-accent)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
