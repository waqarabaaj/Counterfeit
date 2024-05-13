"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";


export default function ResetPassword() {

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [values, setValues] = useState({
        token: "",
        password: "",
        confirmPassword: ""
    })

    const verifyUserEmail = async () => {


    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setValues({ ...values, token: urlToken || "" });
    }, []);





    const forgotHandler = async () => {

        if (values.password.length <= 0 || values.confirmPassword.length <= 0) {
            return toast.info("Password & ConfirmPassword required")
        }

        if (values.password !== values.confirmPassword) {
            return toast.error("New-Password & Confirm-Password must be same");
        }

        if (values.token.length > 0) {
            try {
                setLoading(true);
                const response = await axios.post('/api/resetPassword', values)
                toast.success(response.data.message, { position: 'top-center' })
                router.push("/pages/login");
            } catch (error) {
                console.log(error.reponse.data);
                setLoading(false);

            }
        }
    }

    return (
        <section>
            {JSON.stringify(values)}
            <div className="flex  items-center justify-center px-4 py-4 dark:bg-slate-900 h-screen ">
                <div className=" w-[40%]  bg-white py-4 px-6 shadow-lg border rounded-md dark:bg-slate-800">

                    {/* Sign in logo Image */}
                    <div className="mb-2 flex justify-center">

                        <Image src={"/logo.png"} alt='loading...' width={70} height={70}>

                        </Image>

                    </div>

                    {/* LOGIN HEADING  */}
                    <h2 className="text-center text-2xl font-bold leading-tight dark:text-white text-black">

                        Forgot Password
                    </h2>



                    <form onSubmit={forgotHandler} action="#" method="POST" className="mt-8">

                        <div className="space-y-3">

                            {/* New Password Field   */}
                            <div>
                                <label htmlFor="" className="text-base font-medium dark:text-white text-gray-900">
                                    {' '}
                                    New Password{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="New Password"
                                        value={values.password}
                                        onChange={(event) => { setValues({ ...values, password: event.target.value }) }}


                                    ></input>
                                </div>
                            </div>

                            {/* Confirm Password Field  */}
                            <div>
                                <label htmlFor="" className="text-base font-medium dark:text-white text-gray-900">
                                    {' '}
                                    Confirm Password{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="New Password"
                                        value={values.confirmPassword}
                                        onChange={(event) => { setValues({ ...values, confirmPassword: event.target.value }) }}


                                    ></input>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 ' >
                                <button
                                    type='submit'
                                    className={`inline-flex w-full items-center justify-center rounded-md bg-[#5E18EA] px-3.5 py-1.5 font-semibold leading-7 text-white ${loading ? 'disabled' : 'hover:bg-[#5E18EA]/80'
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Reset Password"}
                                </button>




                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </section >
    )

}