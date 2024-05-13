import User from "@/models/userModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function DELETE(request, { params }) {

    const { pharmacyId } = params;
    try {
        await User.findByIdAndDelete({ _id: pharmacyId })
        return NextResponse.json({
            message: "Deleted successfully",
            success: true,
        })
    } catch (error) {
        console.log("Error in Deleting data in route /api/admin/getPharmacy/[pharmacyId] : ", error)
        return NextResponse.json({
            message: "Deletion Failed!",
            success: false,
        })
    }
}
