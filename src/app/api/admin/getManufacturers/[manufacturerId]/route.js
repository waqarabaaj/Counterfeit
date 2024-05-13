import User from "@/models/userModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function DELETE(request, { params }) {

    const { manufacturerId } = params;
    try {
        await User.findByIdAndDelete({ _id: manufacturerId })
        return NextResponse.json({
            message: "Deleted successfully",
            success: true,
        })
    } catch (error) {
        console.log("Error in Fectchind data in route /api/admin/getManufacturers/[manufacturerId] : ", error)
        return NextResponse.json({
            message: "Deletion Failed!",
            success: false,
        })
    }
}
