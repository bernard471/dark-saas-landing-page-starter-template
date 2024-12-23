import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import PageDetection from "@/models/pageTrackModel"
import { getDataFromToken } from "@/helpers/getdatafromtoken"

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request)
    await connect()
    const recentPages = await PageDetection.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
    
    return NextResponse.json(recentPages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recent page detections" }, { status: 500 })
  }
}
