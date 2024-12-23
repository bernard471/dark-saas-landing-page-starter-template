import { NextRequest, NextResponse } from "next/server"
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { getDataFromToken } from "@/helpers/getdatafromtoken";


connect();



// DELETE user
export async function DELETE(request: NextRequest) {
  try {
    const adminId = await getDataFromToken(request);
    const admin = await User.findById(adminId);
    
    if (!admin.isAdmin) {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    // Get the user ID to delete from the request URL
    const url = new URL(request.url);
    const userIdToDelete = url.searchParams.get("userId");

    const deletedUser = await User.findByIdAndDelete(userIdToDelete);
    
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
