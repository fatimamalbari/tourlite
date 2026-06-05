'use client'

import { metrics } from "@/lib/tourlite";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Layers, 
  ChevronRight, 
  ScanLine, 
  Check, 
  Plus 
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [tours, setTours] = useState<any[]>([]);
  const [scans, setScans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [toursRes, scansRes] = await Promise.all([
          fetch('/api/tours'),
          fetch('/api/scans')
        ]);
        const toursData = await toursRes.json();
        const scansData = await scansRes.json();
        setTours(toursData);
        setScans(scansData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();

    // Listen for custom refresh events
    const handleRefresh = () => fetchData();
    window.addEventListener('refreshData', handleRefresh);
    
    return () => window.removeEventListener('refreshData', handleRefresh);
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--tl-fg)]">Welcome back, Fatima</h1>
          <p className="mt-1 text-[13px] text-[var(--tl-muted)]">
            Your AI-generated onboarding tours across {tours.length} connected apps.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-[var(--tl-radius-sm)] border border-[var(--tl-border)] bg-[var(--tl-panel)] px-3 py-1.5 text-[12px] text-[var(--tl-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--tl-ok)]" />
          {scans.length > 0 ? "System Ready" : "Waiting for first scan"}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)] p-4 shadow-sm"
          >
            <p className="text-[12px] text-[var(--tl-muted)]">{m.label}</p>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="text-2xl font-semibold tracking-tight text-[var(--tl-fg)]">{m.value}</span>
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
            <div className="mt-3 h-7 w-full opacity-50 bg-[var(--tl-accent-soft)] rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Tours Table */}
        <section className="lg:col-span-2 rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)] shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-4 py-3">
            <h2 className="text-[13px] font-semibold text-[var(--tl-fg)]">Your tours</h2>
            <button className="flex items-center gap-1 text-[12px] text-[var(--tl-muted)] transition-colors hover:text-[var(--tl-fg)]">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="divide-y divide-[var(--tl-border)]">
            {tours.length === 0 && !isLoading && (
              <p className="p-10 text-center text-sm text-[var(--tl-faint)]">No tours generated yet. Click "Generate tour" to start!</p>
            )}
            {tours.map((t) => (
              <div
                key={t.id}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--tl-panel-2)] cursor-pointer"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-radius-sm)] bg-[var(--tl-accent-soft)]">
                  <Layers className="h-4 w-4 text-[var(--tl-accent)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-[var(--tl-fg)]">{t.name}</p>
                  <p className="truncate text-[11px] text-[var(--tl-faint)]">
                    {new URL(t.appUrl).hostname} · {t.status}
                  </p>
                </div>
                <div className="hidden w-24 sm:block">
                  <div className="h-1.5 w-full bg-[var(--tl-panel-2)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--tl-accent)]" style={{ width: `70%` }} />
                  </div>
                </div>
                <span className="hidden w-24 text-right text-[11px] text-[var(--tl-faint)] md:block">
                  {new Date(t.updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Scan Feed */}
        <section className="rounded-[var(--tl-radius)] border border-[var(--tl-border)] bg-[var(--tl-panel)] shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--tl-border)] px-4 py-3">
            <h2 className="text-[13px] font-semibold text-[var(--tl-fg)]">Recent scans</h2>
            <ScanLine className="h-4 w-4 text-[var(--tl-faint)]" />
          </div>
          <div className="space-y-1 p-2">
            {scans.length === 0 && !isLoading && (
              <p className="p-6 text-center text-xs text-[var(--tl-faint)]">No scans yet.</p>
            )}
            {scans.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-[var(--tl-radius-sm)] px-2 py-2 transition-colors hover:bg-[var(--tl-panel-2)]"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--tl-accent-soft)]"
                >
                  <Check className="h-3.5 w-3.5 text-[var(--tl-accent)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] text-[var(--tl-fg)]">{new URL(s.appUrl).pathname || '/'}</p>
                  <p className="text-[11px] text-[var(--tl-faint)]">
                    {s.elements} elements · {new Date(s.createdAt).toLocaleTimeString()}
                  </p>
                </div>
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
  );
}
