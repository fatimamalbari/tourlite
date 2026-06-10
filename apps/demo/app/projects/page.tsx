'use client'

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2 rounded">
        + Create New Project
      </button>
      <div className="mt-6 bg-[var(--color-card)] p-4 rounded shadow">Project List...</div>
    </div>
  )
}
