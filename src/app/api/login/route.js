import { connectDB } from "@/helper/connectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

connectDB()

export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 })
        }

        // check user is Verified or not 
        if (user.isVerified !== true) {
            return NextResponse.json({ message: "User is Not Varified" }, { status: 400 })
        }


        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user,
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        return response;

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}