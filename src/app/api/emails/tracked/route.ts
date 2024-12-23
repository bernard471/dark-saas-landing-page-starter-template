import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import EmailTrack from "@/models/emailTrackModel";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    
    // Fetch emails tracked by this user
    const trackedEmails = await EmailTrack.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    // Get total count
    const totalEmails = await EmailTrack.countDocuments({ userId });

    return NextResponse.json({
      success: true,
      emails: trackedEmails,
      total: totalEmails
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
