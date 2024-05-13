import User from "@/models/userModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function GET() {

    try {
        const pharmacy = await User.find({ role: "pharmacy" })
        return NextResponse.json(pharmacy)
    } catch (error) {
        console.log("Error in Fectchind data in route api/admin/getPharmacy : ", error)
        return NextResponse.json({
            message: "Failed to get Manufacturers",
            success: true,
        })
    }
}
