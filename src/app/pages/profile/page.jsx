"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function profile() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            const response = await axios.get('/api/logout')
            toast.success(response.data.message, { position: "top-right" })
            router.push('/pages/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message, { position: "top-right" })
        }
    }

    // This function will extract the user information from the database against the specific user 
    const getUserDetails = async () => {
        const res = await axios.get('/api/getUserInfo')
        console.log(res.data);
        setData(res.data.data)
    }

    console.log(data)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 >{data === 'nothing' ? "Nothing" : <div className="flex gap-3 flex-col items-center justify-center">

                <p className="p-1 rounded bg-green-500">User Id: <span className=" font-bold text-white py-1 px-2 rounded-md">{data._id}</span></p>
                <p className="p-1 rounded bg-green-500" >User Name: <span className="font-bold text-white py-1 px-2 rounded-md">{data.name}</span></p>
                <p className="p-1 rounded bg-green-500" >UserEmail: <span className="font-bold text-white py-1 px-2 rounded-md">{data.email}</span></p>

            </div>} </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>

        </div>
    )
}