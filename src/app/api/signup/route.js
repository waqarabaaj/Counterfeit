import { connectDB } from "@/helper/connectDB";
import User from "@/models/userModel";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";


connectDB()

// Ye API tab call hoti hai jab admin ko saary manufactures chahiye hoty hain 

export async function POST(request) {
    try {

        // getting data from the frond end which is user information {name,email, password, ...}
        const reqBody = await request.json()
        const { name, email, password, role } = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        })




    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}