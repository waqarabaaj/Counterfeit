"use client"
import React, { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { BsFillHospitalFill } from "react-icons/bs";
import { FaTruckMoving, FaRegUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Dashboard = () => {


    // Use more descriptive names for state variables
    const [pharmacyData, setPharmacyData] = useState([]);
    const [manufacturersData, setManufacturersData] = useState([]);
    const [distributorsData, setDistributorsData] = useState([]);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        // Define an asynchronous function to fetch data
        const fetchData = async () => {
            try {
                // Fetch pharmacy data
                const pharmacyResponse = await axios.get("/api/admin/getPharmacy");
                setPharmacyData(pharmacyResponse.data);

                // Fetch manufacturers data
                const manufacturersResponse = await axios.get("/api/admin/getManufacturers");
                setManufacturersData(manufacturersResponse.data);

                // Fetch distributors data
                const distributorsResponse = await axios.get("/api/admin/getDistributors");
                setDistributorsData(distributorsResponse.data);

                // Fetch users data
                const usersResponse = await axios.get("/api/admin/getUsers");
                setUsersData(usersResponse.data);
            } catch (error) {
                console.error("Failed to load data from the database in pages/admin:", error);
            }
        };

        // Call the function to fetch data when the component mounts
        fetchData();
    }, []);
    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar />
            {/* <Slider /> */}

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-hidden">
                <Navbar />
                {/* Cards for Dashboard, Manufacturer, Distributor, Pharmacy, and User data */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Dashboard Card */}
                    <div className="bg-white p-6 rounded-lg text-center shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                        <RiAdminFill className="text-4xl mb-2" />
                        <h2 className="text-xl font-semibold mb-2">Dashboard Overview</h2>
                    </div>

                    {/* Manufacturer Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                        <BsFillHospitalFill className="text-4xl mb-2" />
                        <h2 className="text-xl font-semibold mb-4">Manufacturer Stats</h2>
                        <p className=" ">Active Manufacturer: <span className="text-blue-600 font-bold text-xl">{manufacturersData.length}</span></p>
                    </div>

                    {/* Distributor Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                        <FaTruckMoving className="text-4xl mb-2" />
                        <h2 className="text-xl font-semibold mb-4">Distributor Stats</h2>
                        <p className=" ">Active Distributors: <span className="text-blue-600 font-bold text-xl">{distributorsData.length}</span></p>
                    </div>

                    {/* Pharmacy Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                        <FaShop className="text-4xl mb-2" />
                        <h2 className="text-xl font-semibold mb-4">Pharmacy Stats</h2>
                        <p className=" ">Total Pharmacies: <span className="text-blue-600 font-bold text-xl">{pharmacyData.length}</span></p>
                    </div>

                    {/* User Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform-gpu duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:text-white flex flex-col items-center">
                        <FaRegUser className="text-4xl mb-2" />
                        <h2 className="text-xl font-semibold mb-4">User Stats</h2>
                        <p className=" ">Total Users:<span className="text-blue-600 font-bold text-xl">{usersData.length}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
