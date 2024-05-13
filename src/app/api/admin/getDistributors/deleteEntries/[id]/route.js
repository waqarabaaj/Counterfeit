import Manufacturer from "@/models/manufacturerModel";
import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";


connectDB();

// NOTE: NOTE: NOTE: 
// YE API ABHI KAM NAHI KAR RAHI KEYU KAY DISTRIBUTOR ABHI READY NAHI HAI HMARA JAISY E READY HO JAYE KA TO IS API KO USKY MUTABIQ MODIFY KREIN GY 

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
