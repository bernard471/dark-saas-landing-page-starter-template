import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import PhoneTrack from "@/models/phoneTrackModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { phoneNumber } = reqBody;

        // Here you can integrate with a phone number lookup service
        // to get location and status information
        const newTrackedPhone = new PhoneTrack({
            userId,
            phoneNumber,
            status: 'Active',
            location: 'Detecting...',
            date: new Date()
        });

        await newTrackedPhone.save();

        return NextResponse.json({
            message: "Phone tracking started",
            success: true,
            trackedPhone: newTrackedPhone
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
