import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        
        const user = await User.findOne({email: email})
        if (!user) {
            return NextResponse.json({error: "Email or password is incorrect"}, {status: 400})
        }
        
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect) {
            return NextResponse.json({error: "Email or password is incorrect"}, {status: 400})
        }
        
        const tokenData = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin || false
        }
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
            redirectUrl: user.isAdmin ? '/admin' : '/dashboard'
        })
        
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        

        await User.findByIdAndUpdate(user._id, {
            lastLogin: new Date()
        });

        return response

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500})
        }
        return NextResponse.json({error: "An unknown error occurred"}, {status: 500})
    }
}