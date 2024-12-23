import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import PageTrack from "@/models/pageTrackModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { url } = reqBody;

        // Here you can integrate with a URL analysis service
        // to determine if the page is fake or legitimate
        const newTrackedPage = new PageTrack({
            userId,
            url,
            status: 'Under Investigation',
            detectedDate: new Date(),
            threatLevel: 'Medium'
        });

        await newTrackedPage.save();

        return NextResponse.json({
            message: "Page tracking initiated",
            success: true,
            trackedPage: newTrackedPage
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
