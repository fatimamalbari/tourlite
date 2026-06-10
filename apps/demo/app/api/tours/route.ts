import { db } from "@/db"
import { tours, steps } from "@/db/schema"
import { desc } from "drizzle-orm"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const allTours = await db.select().from(tours).orderBy(desc(tours.updatedAt))
    return NextResponse.json(allTours)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, appUrl, steps: tourSteps } = await request.json()
    
    const tourId = `t-${uuidv4().substring(0, 8)}`
    
    // 1. Insert Tour
    await db.insert(tours).values({
      id: tourId,
      name,
      appUrl,
      status: "published",
      author: "AI · reviewed",
      updatedAt: new Date(),
    })

    // 2. Insert Steps
    if (tourSteps && Array.isArray(tourSteps)) {
      const formattedSteps = tourSteps.map((s, index) => ({
        id: `s-${uuidv4().substring(0, 8)}`,
        tourId,
        index: index + 1,
        title: s.title,
        content: s.content || s.body,
        selector: s.target || s.selector,
        placement: s.position || s.placement || "bottom",
      }))
      
      await db.insert(steps).values(formattedSteps)
    }

    return NextResponse.json({ id: tourId, success: true })
  } catch (error) {
    console.error("Tour Save Error:", error)
    return NextResponse.json({ error: "Failed to save tour" }, { status: 500 })
  }
}
