import { getDataFromToken } from "@/helpers/getdatafromtoken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Image from "@/models/imageModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    
    // Fetch user's image if it exists
    const userImage = await Image.findOne({ userId });
    
    const userData = {
      ...user.toObject(),
      profileImage: userImage ? userImage.imageData : null
    };

    return NextResponse.json({
      message: "User found",
      data: userData
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}

