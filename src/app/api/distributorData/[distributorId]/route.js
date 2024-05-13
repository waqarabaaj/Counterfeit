import { connectDB } from "@/helper/connectDB";
import Distributor from "@/models/distributorModel";
import { NextResponse } from "next/server";
// import { getDataFromToken } from "@/helper/getDataFromToken";

connectDB();

// Ye API kisi bhi particular manufacturer ki jo entries hain unko database say feth karti hai 
export async function GET(request, { params }) {
    const { distributorId } = params;
    try {
        const userItems = await Distributor.find({ distributorid: distributorId });
        return NextResponse.json(userItems);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// Ye API kisi bhi particular item ko Delete karny kay liye hai 

export async function DELETE(request, { params }) {
    const { distributorId } = params;
    // NOTE: manufacturerId ye aik dynamic route ki key hai jis mein particular item ki id hogi jiski madad say ham us item ko delete kar sakty hain 
    try {

        await Distributor.findByIdAndDelete(distributorId)
        return NextResponse.json({
            message: "Deleted Successfully",
            success: true,
        })

    } catch (error) {
        console.log("Error occure while deleting item", error);

        return NextResponse.json({
            message: "Faild to Delete item",
            success: false,
        })
    }
}

// Ye API kisi bhi particular item ko UPDATE karny kay liye hai 

export async function PUT(request) {
    const { gln, sscc, giai, itemId, quantity, } = await request.json();

    // console.log({ gln, gtin, sscc, grai, giai, itemId, quantity, });
    try {
        await Distributor.findByIdAndUpdate(itemId, {
            gln, sscc, giai, quantity
        })

        return NextResponse.json({
            message: "Updated Successfully",
            success: true,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to Update",
            success: false,
        })
    }


}