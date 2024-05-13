import User from "@/models/userModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function GET() {

    try {
        const distributors = await User.find({ role: "distributor" })
        return NextResponse.json(distributors)
    } catch (error) {
        console.log("Error in Fectchind data in route /api/admin/getDistriuter : ", error)
        return NextResponse.json({
            message: "Failed to get Distributors",
            success: true,
        })
    }
}
