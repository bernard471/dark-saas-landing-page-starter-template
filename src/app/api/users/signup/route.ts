import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        // Check if username and email already exist
        const user = await User.findOne({username: username})

        if (user) {
            return NextResponse.json({error: "Username already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        })

        // Save user

        const savedUser = await newUser.save()
        console.log(savedUser);


        // Send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

            

    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500})
        }
        return NextResponse.json({error: "An unknown error occurred"}, {status: 500})
    }

}