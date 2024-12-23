import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import EmailTrack from "@/models/emailTrackModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { email } = reqBody;

        const newTrackedEmail = new EmailTrack({
            userId,
            email,
            status: 'Delivered',
            date: new Date()
        });

        await newTrackedEmail.save();

        return NextResponse.json({
            message: "Email tracking started",
            success: true,
            trackedEmail: newTrackedEmail
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
