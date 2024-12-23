import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import PageTrack from "@/models/pageTrackModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        // Fetch pages tracked by this user
        const trackedPages = await PageTrack.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);

        // Get total count
        const totalPages = await PageTrack.countDocuments({ userId });

        return NextResponse.json({
            success: true,
            pages: trackedPages,
            total: totalPages
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
