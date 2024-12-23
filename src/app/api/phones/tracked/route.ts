import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import PhoneTrack from "@/models/phoneTrackModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        // Fetch phones tracked by this user
        const trackedPhones = await PhoneTrack.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);

        // Get total count
        const totalPhones = await PhoneTrack.countDocuments({ userId });

        return NextResponse.json({
            success: true,
            phones: trackedPhones,
            total: totalPhones
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
