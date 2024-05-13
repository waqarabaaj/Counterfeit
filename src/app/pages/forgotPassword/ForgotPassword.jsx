"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {



    // this state will will set the text loading whenever user press the login button this will show that request is in processing mode 
    const [loading, setLoading] = React.useState(false);

    // This state will get the user email 
    const [mail, setMail] = React.useState({
        email: "",
    })


    const forgotHandler = async (event) => {

        event.preventDefault();

        try {
            setLoading(true);
            const resposnse = await axios.post('/api/forgotPassword', mail)
            toast.success(resposnse.data.message, { position: "top-right" })

        } catch (error) {
            console.log("Error occure wile resessing the password", error)
            toast.error(error.resposnse.data.message, { position: "top-right" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <section>
                {/* {JSON.stringify(loginData)} */}
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

                                {/* EMAIL FILED SECTION  */}
                                <div>
                                    <label htmlFor="" className="text-base font-medium dark:text-white text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            value={mail.email}
                                            onChange={(event) => { setMail({ ...mail, email: event.target.value }) }}


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
                                        {loading ? "Processing..." : "Send Email"}
                                    </button>




                                </div>
                            </div>
                        </form>

                    </div>
                </div >
            </section >
        </div>
    )
}

export default ForgotPassword
