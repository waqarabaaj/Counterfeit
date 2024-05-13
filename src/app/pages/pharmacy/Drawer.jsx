"use client"
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Drawer = ({ isOpen, onClose, manufacturerData }) => {

    // State to store data received from the API
    const [data, setData] = useState([]);

    // Effect to fetch data from the API when props.DistributorId changes
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                // Make an API request to fetch data for the specific Pharmacy
                const response = await axios.get(`/api/admin/getUsers`);

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

    return (
        <div
            className={`fixed inset-0 overflow-hidden ${isOpen ? "block" : "hidden"}`}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                />

                <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
                    <div className="w-screen max-w-lg">
                        <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                            <div className="flex justify-end p-4">
                                <button onClick={onClose}>
                                    <IoMdClose size={24} />
                                </button>
                            </div>

                            <div className="p-4">
                                {manufacturerData.map((data) => (
                                    <div key={data.sNo} className="mb-4 p-4 border rounded">
                                        <p>Distributor: {data.distributor}</p>
                                        <p>Serial Number: {data.sNo}</p>
                                        <p>Quantity: {data.quantity}</p>
                                        <p>GLN: {data.gln}</p>
                                        <p>GTIN: {data.gtin}</p>
                                        <p>SSCC: {data.sscc}</p>
                                        <p>GRAI: {data.grai}</p>
                                        <p>GIAI: {data.giai}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Drawer;