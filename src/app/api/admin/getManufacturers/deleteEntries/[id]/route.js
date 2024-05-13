import Manufacturer from "@/models/manufacturerModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function DELETE(request, { params }) {

    const { id } = params;
    try {
        await Manufacturer.deleteMany({ manufacturerid: id })
        return NextResponse.json({
            message: "Deleted successfully",
            success: true,
        })
    } catch (error) {
        console.log("Error in Fectchind data in route /api/admin/deleteEntries/[id] : ", error)
        return NextResponse.json({
            message: "Deletion Failed!",
            success: false,
        })
    }
}
