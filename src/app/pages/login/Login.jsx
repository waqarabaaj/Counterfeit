"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
import LoginDataValidation from '@/helper/loginDataValidation'


export default function LoginPage() {

    // router will push the user to profile page after successfull login 
    const router = useRouter();



    // this state will will set the text loading whenever user press the login button this will show that request is in processing mode 
    const [loading, setLoading] = React.useState(false);

    //This state will manage the login data 
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: "",
        role: "none",
    })

    // userEffect hook will monitor the loginData State after each change in input field 
    useEffect(() => {


    }, [LoginDataValidation(loginData.email, loginData.password, loginData.role)])


    const loginHandler = async (event) => {
        event.preventDefault()

        // This function is checking the validation of the data which user is enter 
        const validationResult = LoginDataValidation(loginData.email, loginData.password);

        // IF ANY ERROR IN THE VALIDATON IS OCCURE 
        if (validationResult.error) {

            // showing the validation error 
            toast.error(validationResult.error, { position: "top-right" })
        }

        // After validation of the credentials of the user the user will be saved into the database 
        else {

            try {
                setLoading(true)
                const response = await axios.post("/api/login", loginData);
                console.log(response.data);
                toast.success(response.data.message)
                // after successfull registration of user push the user to their pags accouditng to their roles (manufacturer, user, distributer or pharmacy)
                console.log(response.data.user);

                const role = response.data.user.role

                if (role === 'user') {
                    return router.push("/pages/profile");
                }
                if (role === 'manufacturer') {
                    return router.push("/pages/manufacturer");
                }
                if (role === 'distributor') {
                    return router.push("/pages/distributer");
                }
                if (role === 'pharmacy') {
                    return router.push("/pages/pharmacy");
                }

            } catch (error) {
                toast.error(error.response.data.message, { position: "top-right" })
                setLoading(false);

            } finally {
                setLoading(false)
            }

        }
    }

    return (
        <section>
            {/* {JSON.stringify(loginData)} */}
            <div className="flex  items-center justify-center px-4 py-24 dark:bg-slate-900 ">
                <div className=" w-[40%]  bg-white py-4 px-6 shadow-lg border rounded-md dark:bg-slate-800">

                    {/* Sign in logo Image */}
                    <div className="mb-2 flex justify-center">

                        <Image src={"/logo.png"} alt='loading...' width={70} height={70}>

                        </Image>

                    </div>

                    {/* LOGIN HEADING  */}
                    <h2 className="text-center text-2xl font-bold leading-tight dark:text-white text-black">

                        Sign in with your account
                    </h2>

                    {/* DONT HAVE AN ACCOUNT SECTION  */}
                    <p className="mt-2 text-center text-sm dark:text-white text-gray-600 ">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/pages/signup"
                            title=""
                            className="font-semibold text-[#5E18EA] transition-all duration-200 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>

                    <form onSubmit={loginHandler} action="#" method="POST" className="mt-8">

                        <div className="space-y-3">

                            {/* EMAIL FILED SECTION  */}
                            <div>
                                <label htmlFor="" className="text-base font-medium dark:text-white text-gray-900">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        value={loginData.email}
                                        onChange={function (event) { setLoginData({ ...loginData, email: event.target.value }) }}

                                    ></input>
                                </div>
                            </div>

                            {/* PASSWORD FILED SECTION  */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium dark:text-white text-gray-900">
                                        {' '}
                                        Password{' '}
                                    </label>
                                    <Link href="/pages/forgotPassword" title="" className="text-sm font-semibold text-[#5E18EA] hover:underline">
                                        {' '}
                                        Forgot password?{' '}
                                    </Link>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={function (event) { setLoginData({ ...loginData, password: event.target.value }) }}
                                    ></input>
                                </div>



                            </div>

                            {/* ROLE SECTION  */}
                            {/*
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">
                                        {' '}
                                        Role{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <select
                                        className="flex h-8 w-full rounded-md border  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={loginData.role}
                                        onChange={function (event) { setLoginData({ ...loginData, role: event.target.value }) }}

                                    >
                                        <option className='dark:text-black' value="none" selected disabled>--Select Option--</option>
                                        <option className='dark:text-black' value="User">User</option>
                                        <option className='dark:text-black' value="Manufacturer">Manufacturer</option>
                                        <option className='dark:text-black' value="Distributor">Distributor</option>
                                        <option className='dark:text-black' value="Pharmacy">Pharmacy</option>
                                    </select>
                                </div>
                            </div>
    */}
                            <div className='flex flex-col gap-2 ' >
                                <button
                                    type='submit'
                                    className={`inline-flex w-full items-center justify-center rounded-md bg-[#5E18EA] px-3.5 py-1.5 font-semibold leading-7 text-white ${loading ? 'disabled' : 'hover:bg-[#5E18EA]/80'
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Sign in"}
                                </button>

                                {/* <p className='text-center'>OR</p> */}

                                {/* <button
                                    type="button"
                                    className=" bg-[#FF65C1]/20 flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-1.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black hover:bg-[#FF65C1]/40 focus:bg-gray-100 focus:text-black focus:outline-none"
                                >
                                    <span className="mr-2 inline-block">
                                        <svg
                                            className="h-6 w-6 text-rose-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                        </svg>
                                    </span>
                                    Sign in with Google
                                </button> */}
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3 w-full">


                        {/* LOGIN WITH FACEBOOK */}
                        {/* <button
                            type="button"
                            className=" bg-[#FF65C1]/20 relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-1.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black hover:bg-[#FF65C1]/40 focus:bg-gray-100 focus:text-black focus:outline-none"
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    className="h-6 w-6 text-[#2563EB]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                </svg>
                            </span>
                            Sign in with Facebook
                        </button> */}
                    </div>
                </div>
            </div >
        </section >
    )
}
