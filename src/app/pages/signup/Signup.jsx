"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SignupDataValidation from '@/helper/signupDataValidation'

export default function SignUpPage() {

    // router will push the user from signup to login page after successfull registration 
    const router = useRouter()

    // this state record user data
    const [signupData, setSignupData] = React.useState(
        {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "none",
        }
    );

    // Modify signupHandler function to include email pattern validation
const EmailsignupHandler = async (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email pattern
    if (!emailPattern.test(signupData.email)) {
        toast.error("Invalid email format", { position: "top-right" });
        return;
    }
}

    // this state will setup the loading section after hiting the register button  
    const [loading, setLoading] = React.useState(false);

    // this state will enable or disable the button after pressing for registration 
    const [buttonDisable, setButtonDisable] = React.useState(false)

    // useEffect hook will manupulate the change in signupData state and rerender it after each change 
    useEffect(() => {


    }, [SignupDataValidation(signupData.name, signupData.email, signupData.password, signupData.password_confirmation, signupData.role)])

    // signupHandler function which will send the data from frontend to backend 
    const signupHandler = async (event) => {
        event.preventDefault()

        // This function is checking the validation of the data which user is enter 
        const validationResult = SignupDataValidation(signupData.name, signupData.email, signupData.password, signupData.password_confirmation, signupData.role);

        // IF ANY ERROR IN THE VALIDATON IS OCCURE 
        if (validationResult.error) {

            // showing the validation error 
            toast.error(validationResult.error, { position: "top-right" })
        }

        // After validation of the credentials of the user the user will be saved into the database 
        else {

            try {
                setLoading(true)
                const response = await axios.post("/api/signup", signupData);
                // console.log(response.data);
                toast.success(response.data.message, { position: 'top-right' })

                // after successfull registration of user push the user to Signin Page 
                router.push("/pages/login");
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message, { position: "top-right" })
                setLoading(false);

            } finally {
                setLoading(false)
            }

        }
    }

    return (
        <section>
            {/* {JSON.stringify(signupData)} */}
            <div className="flex items-center justify-center px-4 py-16  dark:bg-slate-900 ">
                <div className="w-[40%]  bg-white p-4 shadow-lg border rounded-md dark:bg-slate-800">

                    {/* Signup in logo Image and Heading Section */}
                    <div className=" flex flex-col justify-center items-center gap-4">
                        <Image src={"/logo.png"} alt='loading...' width={70} height={70}>

                        </Image>
                        {/* heading for signup  */}
                        <h2 className="text-[#5E18EA] text-center text-2xl font-bold leading-tight dark:text-white">
                            {loading ? "Processing" : "Create Account"}
                        </h2>
                    </div>



                    {/* Alright have an account  or GOTO SIGNIN FORM  */}
                    <p className="mt-0.5 text-center text-base text-gray-600 dark:text-white  ">
                        Already have an account?{' '}
                        <Link
                            href="/pages/login"
                            title=""
                            className="font-medium text-[#5E18EA] transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>


                    <form onSubmit={signupHandler} action="#" method="POST" className="mt-6">
                        <div className="space-y-3  px-4 ">

                            {/* NAME AND EMAIL SECTION  */}
                            <div className='flex justify-between items-center w-full gap-4'>
                                {/* ENTER FULL NAME FIELD SECTION  */}
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white">
                                        {' '}
                                        Full Name{' '}
                                    </label>
                                    <div className="mt-0.5">
                                        <input
                                            className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                            id="name"
                                            value={signupData.fullName}
                                            onChange={(event) => setSignupData({ ...signupData, name: event.target.value })}
                                        ></input>
                                    </div>
                                </div>

                                {/* ENTER EMAIL FIELD SECTION  */}
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-0.5">
                                        <input
                                            className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            value={signupData.email}
                                            onChange={function (event) { setSignupData({ ...signupData, email: event.target.value }) }}
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            {/* PASSWORD AND CONFIRM PASWORD SECTION  */}
                            <div className='flex justify-between gap-4'>
                                {/* ENTER PASSWORD FIELD SECTION  */}
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-0.5">
                                        <input
                                            className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            value={signupData.password}
                                            onChange={function (event) { setSignupData({ ...signupData, password: event.target.value }) }}

                                        ></input>
                                    </div>
                                </div>

                                {/* ENTER CONFIRM PASSWORD FIELD SECTION  */}
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">
                                            {' '}
                                            Confirm Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-0.5">
                                        <input
                                            className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password_confirmation"
                                            value={signupData.password_confirmation}
                                            onChange={function (event) { setSignupData({ ...signupData, password_confirmation: event.target.value }) }}

                                        ></input>
                                    </div>
                                </div>

                            </div>

                            {/* ROLE SECTION  */}

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">
                                        {' '}
                                        Role{' '}
                                    </label>
                                </div>
                                <div className="mt-0.5">
                                    <select
                                        className="flex h-8 w-full rounded-md border border-gray-300 bg-transparent px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={signupData.role}
                                        onChange={function (event) { setSignupData({ ...signupData, role: event.target.value }) }}

                                    >
                                        <option Value="none" selected disabled >-Select Role-</option>
                                        <option className='dark:text-black' value="user">User</option>
                                        <option className='dark:text-black' value="manufacturer">Manufacturer</option>
                                        <option className='dark:text-black' value="distributor">Distributor</option>
                                        <option className='dark:text-black' value="pharmacy">Pharmacy</option>
                                    </select>
                                </div>
                            </div>

                            {/* SIGNUP BUTTON and Social MEDIA SECTION */}
                            <div className='flex flex-col gap-2 '>

                                {/* SIGNUP BUTTON  */}
                                <button
                                    type='submit'
                                    className={`inline-flex w-full items-center justify-center rounded-md bg-[#5E18EA] px-3.5 py-2 font-semibold leading-7 text-white ${loading ? 'disabled' : 'hover:bg-[#5E18EA]/80'
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Register"}
                                </button>

                                {/* <p className='text-center'>OR</p> */}

                                {/* SIGNUP WIRH SOCIAL MEDIA ACCOUNTS */}
                                <div className='flex gap-4'>
                                    {/* SIGNUP WITH GOOGEL BUTTON  */}
                                    {/* <button
                                        type="button"
                                        className=" w-full flex items-center justify-center rounded-md bg-white border px-3.5 py-1.5 font-semibold leading-7 text-black hover:bg-gray-100/50"
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
                                        Sign up with Google
                                    </button> */}

                                    {/* SIGNUP WITH FACEBOOK BUTTON  */}
                                    {/* <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md bg-white border px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-100/50"
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
                                        Sign up with Facebook
                                    </button> */}

                                </div>


                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
