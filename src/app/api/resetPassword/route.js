import { connectDB } from "@/helper/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from 'bcrypt';



connectDB()


export async function POST(request) {


    try {
        const reqBody = await request.json()
        const { token, password } = reqBody
        console.log(token);

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        user.password = hashedPassword;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password Changed Successfully",
            success: true
        })


    } catch (error) {
        console.log("Problem occure while resetting the password", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}