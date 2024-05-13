import User from "@/models/userModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function GET() {

    try {
        const manufacturers = await User.find({ role: "manufacturer" })
        return NextResponse.json(manufacturers)
    } catch (error) {
        console.log("Error in Fectchind data in route /api/admin/getManufacturer : ", error)
        return NextResponse.json({
            message: "Failed to get Manufacturers",
            success: true,
        })
    }
}
