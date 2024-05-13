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

const Pharmacy = (props) => {

    // State to store data received from the API
    const [data, setData] = useState([]);

    // Effect to fetch data from the API when props.DistributorId changes
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                // Make an API request to fetch data for the specific Pharmacy
                const response = await axios.get(`/api/admin/getPharmacy`);

                // Update the state with the received data
                setData(response.data);

                // Note: The console.log here won't log the updated state immediately due to the asynchronous nature of setState
            } catch (error) {
                // Handle the error as needed, e.g., set an error state
                console.error("Error fetching data:", error);
            }
        };

        // Check if props.DistributorId is defined and greater than 0 before fetching data
        fetchData();

    }, []);

    // If you want to log the updated state, use a useEffect with [data] as a dependency
    useEffect(() => {
        // console.log(data);
    }, [data]);


    // This function will handle the deletion of items 
    // NOTE: agr sirf Pharmacy ko delete kr dia to to uski entries data base mein reh jayein gi 

    const handleDelete = async (itemId) => {

        confirmDelete = confirm("Are you sure?")

        try {
            if (confirmDelete) {



                const response = await axios.delete(`/api/admin/getPharmacy/${itemId}`)
                setData((prevData) => prevData.filter(item => item._id !== itemId));
                toast.success(response.data.message, { position: "top-right" })

            }
        } catch (error) {
            toast.error(error.response.data.message, { position: "top-right" })
        }
    }


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar heading="Pharmacy" />
                <div className="mt-8">
                    {/* <h2 className="text-xl font-bold mb-4">User Id {props.DistributorId}</h2> */}
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

            </div>
        </div>
    );
};

export default Pharmacy;
