import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import AccountReport from "@/models/accountReportModel"
import { getDataFromToken } from "@/helpers/getdatafromtoken"

export async function POST(request: NextRequest) {
  try {
    await connect() // Ensure DB connection
    
    const userId = await getDataFromToken(request)
    const data = await request.json()
    
    // Validate required fields
    if (!data.username || !data.accountId || !data.platform) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    const newReport = new AccountReport({
      userId,
      username: data.username,
      accountId: data.accountId,
      platform: data.platform,
      evidence: data.evidence || [],
      status: 'Pending',
      submittedAt: new Date(),
      lastUpdated: new Date()
    })
    
    await newReport.save()
    
    return NextResponse.json({
      success: true,
      report: newReport
    })
  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect()
    const userId = await getDataFromToken(request)
    
    const reports = await AccountReport.find({ userId })
      .sort({ submittedAt: -1 })
    
    return NextResponse.json({ 
      success: true, 
      reports 
    })
  } catch (error: any) {
    console.error('Fetch Error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
