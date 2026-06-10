import { db } from "@/db"
import { scans } from "@/db/schema"
import { desc } from "drizzle-orm"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const allScans = await db.select().from(scans).orderBy(desc(scans.createdAt)).limit(10)
    return NextResponse.json(allScans)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { appUrl, elements } = await request.json()
    
    const newScan = {
      id: `sc-${uuidv4().substring(0, 8)}`,
      appUrl,
      elements,
      status: "complete",
      createdAt: new Date(),
    }

    await db.insert(scans).values(newScan)
    return NextResponse.json(newScan)
  } catch (error) {
    console.error("Scan Save Error:", error)
    return NextResponse.json({ error: "Failed to save scan" }, { status: 500 })
  }
}
