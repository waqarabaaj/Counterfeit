import { connectDB } from "@/helper/connectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";


connectDB()

// Ye API tab call hoti hai jab admin ko saary manufactures chahiye hoty hain 

export async function POST(request) {
    try {

        // getting data from the frond end which is user information {name,email, password, ...}
        const reqBody = await request.json()
        const { email } = reqBody

        //check if user already exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "Email is not Valid" }, { status: 400 })
        }



        //send verification email
        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: "Please Check Your Email",
            success: true,
        })




    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}