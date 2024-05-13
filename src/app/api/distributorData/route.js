import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Distributor from "@/models/distributorModel";


connectDB()


// This function will be responsible for data insertion into the database related to the particular Manufacturer 
export async function POST(request) {
    try {

        // getting data from the frond end which is user information {name,email, password, ...}
        const reqBody = await request.json()
        const { gln, sscc, giai, quantity, distributorid } = reqBody

        console.log(reqBody);

        //check if user already exists
        const item = await Distributor.findOne({ gln })

        if (item) {
            return NextResponse.json({ message: "Item is already exists" }, { status: 400 })
        }



        const newItem = new Distributor({
            gln, sscc, giai, quantity, distributorid
        })

        const savedItem = await newItem.save()
        console.log(savedItem);


        return NextResponse.json({
            message: "Data Saved successfully",
            success: true,
        })




    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}

// export async function GET(request) {

//     let decodedToken;
//     const response = NextResponse.json(decodedToken.id);
//     const token = response.cookies.get("token")?.value;
//     decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
//     return response;
// }







