import User from "@/models/userModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function GET() {

    try {
        const user = await User.find({ role: "user" })
        return NextResponse.json(user)
    } catch (error) {
        console.log("Error in Fectchind data in route /api/admin/getUsers : ", error)
        return NextResponse.json({
            message: "Failed to get Users",
            success: true,
        })
    }
}
