import { NextRequest, NextResponse } from "next/server"
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

// GET all users
export async function GET() {
  try {
    await connect()
    const users = await User.find({}).select('-password')
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({
       error: "Failed to fetch users" }, { status: 500 })
  }
}


// POST new user
export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { username, email, password, isAdmin, isVerified } = reqBody;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user with verification token
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      isVerified: 'false',
      lastLogin: new Date()
    });

    // Send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: newUser._id
    });

    // Remove password from response
    const userWithoutPassword = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      isVerified: newUser.isVerified,
      lastLogin: newUser.lastLogin
    };

    return NextResponse.json({
      message: "User created successfully. Verification email sent.",
      success: true,
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error creating user" },
      { status: 500 }
    );
  }
}

