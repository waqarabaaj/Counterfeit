"use client"
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiAddCircleFill, RiMedicineBottleFill } from "react-icons/ri";
import { FaBoxOpen, FaTruckMoving } from "react-icons/fa";
import { BsFillHospitalFill } from "react-icons/bs";
import { toast } from 'react-toastify'
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Manufacturer = (props) => {
    // Sample data (replace with actual data)
    const manufacturersData = [
        {

            name: "ABC Corporation",
            email: "abc@gmail.com",
            role: "Manufacturer",
        },
        {
            profile: 2,
            name: "XYZ Inc.",
            email: "xyz@gmail.com",
            role: "Manufacturer",

        },

    ]





    // this state will setup the loading section after hiting the register button  
    const [loading, setLoading] = React.useState(false);

    // state to show and hide the update item form 
    const [showForm, setShowForm] = useState(false);

    // state whill get the updated data of the item 
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        role: "",
    })

    // this function will be responsible to show or hide the form after clicking on update button
    const handleCardClick = (itemId, name, email, role) => {
        // setShowForm(!showForm);
        // setFormdata({ ...formData, name: name, email: email, role: role })
    };

    // State to store data received from the API
    const [data, setData] = useState([]);

    // Effect to fetch data from the API when props.manufacturerId changes
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                // Make an API request to fetch data for the specific manufacturer
                const response = await axios.get(`/api/admin/getManufacturers`);

                // Update the state with the received data
                setData(response.data);

                // Note: The console.log here won't log the updated state immediately due to the asynchronous nature of setState
            } catch (error) {
                // Handle the error as needed, e.g., set an error state
                console.error("Error fetching data:", error);
            }
        };

        // Check if props.manufacturerId is defined and greater than 0 before fetching data
        fetchData();

    }, []);

    // If you want to log the updated state, use a useEffect with [data] as a dependency
    useEffect(() => {
        console.log(data);
    }, [data]);


    // This function will handle the deletion of items 
    // NOTE: agr sirf manufacturer ko delete kr dia to to uski entries data base mein reh jayein gi 

    const handleDelete = async (itemId) => {
        let confirmDelete = confirm("Are you sure?")

        try {
            if (confirmDelete) {

                // This try catch will first delete the all the entries of the manufacturer and then delete the manufacturer 
                try {
                    const response = await axios.delete(`/api/admin/getManufacturers/deleteEntries/${itemId}`)
                    toast.success(response.data.message, { position: "top-center" })

                } catch (error) {
                    toast.error(error.response.data.message, { position: "top-center" })
                }

                const response = await axios.delete(`/api/admin/getManufacturers/${itemId}`)
                setData((prevData) => prevData.filter(item => item._id !== itemId));
                toast.success(response.data.message, { position: "top-right" })

            }
        } catch (error) {
            toast.error(error.response.data.message, { position: "top-right" })
        }
    }

    // This function will handle the updataion of items 
    const handleUpdate = async () => {

        alert("please write the functionality of the updation ")
        // try {
        //     setLoading(true)
        //     const response = await axios.put(`/api/manufacturerData/${props.manufacturerId}`, formData)
        //     toast.success(response.data.message, { position: "top-right" })
        // } catch (error) {
        //     setLoading(false)
        //     console.log("Error while Updating Item", error);
        //     toast.success(error.response.data.message, { position: "top-right" })
        // }
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar heading="Manufacturer" />
                <div className="mt-8">
                    {/* <h2 className="text-xl font-bold mb-4">User Id {props.manufacturerId}</h2> */}
                    <table className="w-full border border-gray-300 py-2">
                        <thead>
                            <tr>
                                <th className="border bg-gray-200 px-4 py-2">Sr#</th>
                                <th className="border bg-gray-200 px-4 py-2">Name</th>
                                <th className="border bg-gray-200 px-4 py-2">Email</th>
                                <th className="border bg-gray-200 px-4 py-2">Role</th>
                                <th className="border bg-gray-200 px-4 py-2">Varified</th>
                                <th className="border bg-gray-200 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item._id} className="text-center">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.role}</td>
                                    <td className="border px-4 py-2"><span className="text-purple-600 font-bold">true</span></td>
                                    <td className="border px-6 py-2 flex gap-6">
                                        <div className=' w-full flex gap-4 items-center justify-center'>
                                            <button type='button' onClick={() => handleUpdate()}>
                                                <FaEdit className="text-blue-500 cursor-pointer" />
                                            </button>
                                            <button type='button' onClick={() => handleDelete(item._id)}>
                                                <FaTrash className="text-red-600 cursor-pointer" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <form
                            className="relative bg-white rounded-lg shadow-md p-8 w-full max-w-2xl"
                            onSubmit={handleUpdate}
                        >
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="mb-8 text-center flex flex-col items-center justify-center">
                                {JSON.stringify(formData)}
                                <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
                                    Update Your Data
                                </h2>
                            </div>

                            {/* First Row */}
                            <div className="flex flex-wrap -mx-4 mb-4">
                                {/* GLN */}
                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        GLN (Global Location Number)
                                    </label>
                                    <div className="relative">
                                        <BsFillHospitalFill className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.gln}
                                            onChange={(event) => { setFormdata({ ...formData, gln: event.target.value }) }}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter GLN"
                                        />
                                    </div>
                                </div>

                                {/* GTIN */}
                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="text-sm font-semibold text-gray-600 flex items-center">
                                        GTIN (Global Trade Item Number)
                                    </label>
                                    <div className="relative">
                                        <RiMedicineBottleFill className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.gtin}
                                            onChange={(event) => { setFormdata({ ...formData, gtin: event.target.value }) }}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter GTIN"
                                        />
                                    </div>
                                </div>

                                {/* SSCC */}
                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        SSCC (Serial Shipping Container Code)
                                    </label>
                                    <div className="relative">
                                        <FaBoxOpen className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.sscc}
                                            onChange={(event) => { setFormdata({ ...formData, sscc: event.target.value }) }}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter SSCC"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Second Row */}
                            <div className="flex flex-wrap -mx-4 mb-4">
                                {/* GRAI */}
                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        GRAI (Global Returnable Asset Identifier)
                                    </label>
                                    <div className="relative">
                                        <FaTruckMoving className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.grai}
                                            onChange={(event) => { setFormdata({ ...formData, grai: event.target.value }) }}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter GRAI"
                                        />
                                    </div>
                                </div>

                                {/* GIAI */}
                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">
                                        GIAI (Global Individual Asset Identifier)
                                    </label>
                                    <div className="relative">
                                        <FaTruckMoving className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                                        <input
                                            type="text"
                                            value={formData.giai}
                                            onChange={(event) => { setFormdata({ ...formData, giai: event.target.value }) }}
                                            className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="Enter GIAI"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 mt-4">
                                    <label className="block mb-2 text-sm font-semibold text-gray-600">
                                        Quantity:
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="number"
                                            value={formData.quantity}
                                            onChange={(event) => { setFormdata({ ...formData, quantity: event.target.value }) }}
                                            className="w-full p-2 border rounded-lg text-center focus:outline-none focus:ring focus:border-blue-700"
                                            min="0"
                                            max="500"
                                            step="1" // Add step attribute
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                {loading ? "Processing" : "Update"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Manufacturer;
