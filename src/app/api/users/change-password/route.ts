
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { currentPassword, newPassword } = reqBody;

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();

        return NextResponse.json({
            message: "Password updated successfully",
            success: true
        });

    } catch (error: any) {
        console.error('Server error during password change:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
