import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import PhoneTrack from "@/models/phoneTrackModel"
import { getDataFromToken } from "@/helpers/getdatafromtoken"

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request)
    await connect()
    const recentPhones = await PhoneTrack.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
    
    return NextResponse.json(recentPhones)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recent phone tracks" }, { status: 500 })
  }
}