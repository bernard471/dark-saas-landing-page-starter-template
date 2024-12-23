import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import EmailTrack from "@/models/emailTrackModel"
import { getDataFromToken } from "@/helpers/getdatafromtoken"

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request)
    await connect()
    const recentEmails = await EmailTrack.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
    
    return NextResponse.json(recentEmails)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recent emails" }, { status: 500 })
  }
}