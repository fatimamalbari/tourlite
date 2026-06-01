// Shared types, theme variations, and mock data for the TourLite AI dashboard.

export type ThemeMode = "dark" | "light"

export interface TourLiteTheme {
  slug: string
  name: string
  tagline: string
  mode: ThemeMode
  /** Use a monospace face for headings / brand for a more developer-y feel. */
  monoHeadings: boolean
  /** Tighter vertical rhythm for a denser, data-heavy feel. */
  compact: boolean
  /** Visual swatches used for the gallery preview chips. */
  swatch: string[]
  /** CSS custom properties applied to the dashboard root. */
  vars: Record<string, string>
}

/* -------------------------------------------------------------------------- */
/*  Theme variations                                                          */
/* -------------------------------------------------------------------------- */

export const themes: TourLiteTheme[] = [
  {
    slug: "midnight",
    name: "Midnight",
    tagline: "Deep blue, the signature Linear-style dark workspace.",
    mode: "dark",
    monoHeadings: false,
    compact: false,
    swatch: ["#0b0d12", "#161922", "#4f7cff"],
    vars: {
      "--tl-bg": "#0a0c11",
      "--tl-panel": "#11141b",
      "--tl-panel-2": "#161a23",
      "--tl-border": "#222734",
      "--tl-border-strong": "#2e3443",
      "--tl-fg": "#e8ebf2",
      "--tl-muted": "#9aa3b5",
      "--tl-faint": "#646d80",
      "--tl-accent": "#5b8cff",
      "--tl-accent-fg": "#0a0c11",
      "--tl-accent-soft": "rgba(91,140,255,0.14)",
      "--tl-ok": "#34d399",
      "--tl-warn": "#fbbf24",
      "--tl-radius": "12px",
      "--tl-radius-sm": "8px",
    },
  },
  {
    slug: "daylight",
    name: "Daylight",
    tagline: "Crisp light mode with a confident cobalt accent.",
    mode: "light",
    monoHeadings: false,
    compact: false,
    swatch: ["#ffffff", "#f3f4f7", "#2563eb"],
    vars: {
      "--tl-bg": "#f6f7f9",
      "--tl-panel": "#ffffff",
      "--tl-panel-2": "#fbfbfc",
      "--tl-border": "#e6e8ed",
      "--tl-border-strong": "#d6d9e0",
      "--tl-fg": "#121620",
      "--tl-muted": "#5b6474",
      "--tl-faint": "#9099a8",
      "--tl-accent": "#2563eb",
      "--tl-accent-fg": "#ffffff",
      "--tl-accent-soft": "rgba(37,99,235,0.10)",
      "--tl-ok": "#0f9d58",
      "--tl-warn": "#d97706",
      "--tl-radius": "12px",
      "--tl-radius-sm": "8px",
    },
  },
  {
    slug: "terminal",
    name: "Terminal",
    tagline: "Near-black canvas, mono type, phosphor-green accent.",
    mode: "dark",
    monoHeadings: true,
    compact: true,
    swatch: ["#08090a", "#101213", "#3ddc84"],
    vars: {
      "--tl-bg": "#08090a",
      "--tl-panel": "#0f1112",
      "--tl-panel-2": "#141718",
      "--tl-border": "#1f2426",
      "--tl-border-strong": "#2a3133",
      "--tl-fg": "#e6ece8",
      "--tl-muted": "#8b9590",
      "--tl-faint": "#5c6661",
      "--tl-accent": "#3ddc84",
      "--tl-accent-fg": "#08090a",
      "--tl-accent-soft": "rgba(61,220,132,0.13)",
      "--tl-ok": "#3ddc84",
      "--tl-warn": "#e5b567",
      "--tl-radius": "6px",
      "--tl-radius-sm": "4px",
    },
  },
  {
    slug: "aurora",
    name: "Aurora",
    tagline: "Charcoal panels with a calm teal Supabase glow.",
    mode: "dark",
    monoHeadings: false,
    compact: false,
    swatch: ["#0c0e0e", "#161a1a", "#2dd4bf"],
    vars: {
      "--tl-bg": "#0b0d0d",
      "--tl-panel": "#121515",
      "--tl-panel-2": "#181c1c",
      "--tl-border": "#232827",
      "--tl-border-strong": "#2f3534",
      "--tl-fg": "#e7eceb",
      "--tl-muted": "#97a19f",
      "--tl-faint": "#646e6c",
      "--tl-accent": "#2dd4bf",
      "--tl-accent-fg": "#04110f",
      "--tl-accent-soft": "rgba(45,212,191,0.13)",
      "--tl-ok": "#2dd4bf",
      "--tl-warn": "#facc15",
      "--tl-radius": "14px",
      "--tl-radius-sm": "9px",
    },
  },
  {
    slug: "paper",
    name: "Paper",
    tagline: "Warm off-white stationery with a terracotta accent.",
    mode: "light",
    monoHeadings: false,
    compact: false,
    swatch: ["#f5f2ec", "#ffffff", "#e0633b"],
    vars: {
      "--tl-bg": "#f4f1ea",
      "--tl-panel": "#fffdf9",
      "--tl-panel-2": "#faf7f0",
      "--tl-border": "#e7e1d4",
      "--tl-border-strong": "#dad2c1",
      "--tl-fg": "#211d17",
      "--tl-muted": "#6b6357",
      "--tl-faint": "#9c9384",
      "--tl-accent": "#d9542f",
      "--tl-accent-fg": "#fffdf9",
      "--tl-accent-soft": "rgba(217,84,47,0.10)",
      "--tl-ok": "#3f8f5b",
      "--tl-warn": "#c98a16",
      "--tl-radius": "10px",
      "--tl-radius-sm": "7px",
    },
  },
  {
    slug: "contrast",
    name: "Contrast",
    tagline: "Pure black, hairline borders, sharp zero-radius edges.",
    mode: "dark",
    monoHeadings: true,
    compact: true,
    swatch: ["#000000", "#0b0b0b", "#ffffff"],
    vars: {
      "--tl-bg": "#000000",
      "--tl-panel": "#0a0a0a",
      "--tl-panel-2": "#101010",
      "--tl-border": "#242424",
      "--tl-border-strong": "#383838",
      "--tl-fg": "#fafafa",
      "--tl-muted": "#a1a1a1",
      "--tl-faint": "#6b6b6b",
      "--tl-accent": "#fafafa",
      "--tl-accent-fg": "#000000",
      "--tl-accent-soft": "rgba(250,250,250,0.10)",
      "--tl-ok": "#4ade80",
      "--tl-warn": "#facc15",
      "--tl-radius": "0px",
      "--tl-radius-sm": "0px",
    },
  },
  {
    slug: "slate",
    name: "Slate Pro",
    tagline: "Cool slate with sky-blue accents, tuned for density.",
    mode: "dark",
    monoHeadings: false,
    compact: true,
    swatch: ["#0f141c", "#1a2230", "#38bdf8"],
    vars: {
      "--tl-bg": "#0e131b",
      "--tl-panel": "#151c27",
      "--tl-panel-2": "#1b2433",
      "--tl-border": "#26303f",
      "--tl-border-strong": "#324154",
      "--tl-fg": "#eaf0f7",
      "--tl-muted": "#94a3b8",
      "--tl-faint": "#64748b",
      "--tl-accent": "#38bdf8",
      "--tl-accent-fg": "#061018",
      "--tl-accent-soft": "rgba(56,189,248,0.13)",
      "--tl-ok": "#34d399",
      "--tl-warn": "#fbbf24",
      "--tl-radius": "8px",
      "--tl-radius-sm": "6px",
    },
  },
  {
    slug: "ember",
    name: "Ember",
    tagline: "Warm graphite with a glowing amber call-to-action.",
    mode: "dark",
    monoHeadings: false,
    compact: false,
    swatch: ["#0d0b0a", "#181513", "#f59e0b"],
    vars: {
      "--tl-bg": "#0c0a09",
      "--tl-panel": "#15110f",
      "--tl-panel-2": "#1b1714",
      "--tl-border": "#2a231f",
      "--tl-border-strong": "#372d27",
      "--tl-fg": "#f1ebe6",
      "--tl-muted": "#a89b91",
      "--tl-faint": "#6f6258",
      "--tl-accent": "#f59e0b",
      "--tl-accent-fg": "#1a1206",
      "--tl-accent-soft": "rgba(245,158,11,0.13)",
      "--tl-ok": "#4ade80",
      "--tl-warn": "#f59e0b",
      "--tl-radius": "12px",
      "--tl-radius-sm": "8px",
    },
  },
]

export function getTheme(slug: string): TourLiteTheme | undefined {
  return themes.find((t) => t.slug === slug)
}

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                 */
/* -------------------------------------------------------------------------- */

export type TourStatus = "published" | "draft" | "generating"

export interface Metric {
  label: string
  value: string
  delta: string
  trend: "up" | "down"
  spark: number[]
}

export const metrics: Metric[] = [
  { label: "Active tours", value: "24", delta: "+3", trend: "up", spark: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14] },
  { label: "Avg. completion", value: "68%", delta: "+4.2%", trend: "up", spark: [40, 44, 52, 49, 58, 61, 60, 64, 66, 68] },
  { label: "Steps generated", value: "1,284", delta: "+182", trend: "up", spark: [200, 320, 410, 560, 690, 820, 980, 1060, 1180, 1284] },
  { label: "Users reached", value: "12.4k", delta: "-1.1%", trend: "down", spark: [14, 13, 15, 12, 13, 11, 12, 13, 12, 12] },
]

export interface Tour {
  id: string
  name: string
  app: string
  status: TourStatus
  steps: number
  completion: number
  updated: string
  author: string
}

export const tours: Tour[] = [
  { id: "t1", name: "First-run product walkthrough", app: "app.northwind.io", status: "published", steps: 7, completion: 74, updated: "2h ago", author: "AI · reviewed" },
  { id: "t2", name: "Billing & invoices setup", app: "app.northwind.io", status: "published", steps: 5, completion: 61, updated: "5h ago", author: "Mara K." },
  { id: "t3", name: "Connect your first integration", app: "console.flux.dev", status: "draft", steps: 6, completion: 0, updated: "1d ago", author: "AI · draft" },
  { id: "t4", name: "Team workspace invite flow", app: "app.northwind.io", status: "generating", steps: 4, completion: 0, updated: "just now", author: "AI · scanning" },
  { id: "t5", name: "Dashboard data filters", app: "console.flux.dev", status: "published", steps: 8, completion: 82, updated: "2d ago", author: "Devon R." },
  { id: "t6", name: "Export & reporting basics", app: "console.flux.dev", status: "draft", steps: 5, completion: 0, updated: "3d ago", author: "AI · draft" },
]

export interface TourStep {
  id: string
  index: number
  title: string
  selector: string
  element: string
  body: string
  placement: "top" | "bottom" | "left" | "right"
}

export const editorSteps: TourStep[] = [
  {
    id: "s1",
    index: 1,
    title: "Welcome aboard",
    selector: "#app-shell > header",
    element: "Top navigation bar",
    body: "Welcome to Northwind! This quick tour shows you the essentials so you can get set up in under two minutes.",
    placement: "bottom",
  },
  {
    id: "s2",
    index: 2,
    title: "Create your first project",
    selector: "button[data-cta='new-project']",
    element: "New project button",
    body: "Everything starts with a project. Click here to spin one up — we'll pre-fill sensible defaults for you.",
    placement: "right",
  },
  {
    id: "s3",
    index: 3,
    title: "Invite your team",
    selector: "[data-nav='members']",
    element: "Members sidebar link",
    body: "Collaboration is better together. Invite teammates and assign roles from the members panel.",
    placement: "right",
  },
  {
    id: "s4",
    index: 4,
    title: "You're all set",
    selector: "[data-cta='finish']",
    element: "Primary action button",
    body: "That's the tour! Jump back in any time from the help menu in the top-right corner.",
    placement: "left",
  },
]

export interface ScanEvent {
  id: string
  app: string
  elements: number
  status: "complete" | "running"
  time: string
}

export const scanFeed: ScanEvent[] = [
  { id: "sc1", app: "app.northwind.io/onboarding", elements: 38, status: "complete", time: "2m ago" },
  { id: "sc2", app: "app.northwind.io/settings", elements: 52, status: "running", time: "now" },
  { id: "sc3", app: "console.flux.dev/projects", elements: 41, status: "complete", time: "1h ago" },
  { id: "sc4", app: "console.flux.dev/billing", elements: 29, status: "complete", time: "4h ago" },
]
