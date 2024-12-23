import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import Image from '@/models/imageModel';

connect();



export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const formData = await request.formData();
    const image = formData.get('profileImage');
    
    if (!image || !(image instanceof Blob)) {
      return NextResponse.json({ error: "No valid image provided" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageBase64 = `data:${image.type};base64,${buffer.toString('base64')}`;

    // Store image in Image collection
    await Image.findOneAndUpdate(
      { userId },
      { imageData: imageBase64 },
      { upsert: true, new: true }
    );

    // Update user's profile image reference
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: true },
      { new: true }
    );

    return NextResponse.json({
      message: "Profile image updated successfully",
      imageUrl: imageBase64,
      user: updatedUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}