  import { NextResponse } from "next/server";
  import { connect } from "@/dbConfig/dbConfig";
  import User from "@/models/userModel";
  import { sendEmail } from "@/helpers/mailer";

  connect();

  export async function POST(request: Request) {
    try {
      const { email } = await request.json();
    
      // Check if user exists
      const user = await User.findOne({ email });
    
      if (!user) {
        return NextResponse.json(
          { error: "User does not exist" },
          { status: 400 }
        );
      }

      // Generate token and save to user
      const resetToken = await sendEmail({ email, emailType: "RESET", userId: user._id });

      return NextResponse.json({
        message: "Password reset email sent successfully",
        success: true,
      });

    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }