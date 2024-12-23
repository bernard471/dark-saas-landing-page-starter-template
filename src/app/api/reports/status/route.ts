import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import AccountReport from "@/models/accountReportModel"
import { getDataFromToken } from "@/helpers/getdatafromtoken"

export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request)
    const { reportId, status } = await request.json()
    
    await connect()
    
    const report = await AccountReport.findOneAndUpdate(
      { _id: reportId },
      { 
        status,
        lastUpdated: new Date()
      },
      { new: true }
    )

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, report })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
