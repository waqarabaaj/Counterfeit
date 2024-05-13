"use client";
import { BsFillHospitalFill } from "react-icons/bs";
import { FaTruckMoving, FaRegUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div
            className={`bg-blue-500 text-white ${isSidebarOpen ? "w-64" : "w-16"
                } p-4 transition-all duration-300`}
        >
            <div className="flex items-center justify-between">
                <h1 className={`text-4xl font-semibold ${isSidebarOpen ? "mb-4" : ""}`}>
                    <span className="text-yellow-400">Authenti</span>care
                </h1>
                {/* Collapse Button for Smaller Screens */}
                <button
                    className="md:hidden focus:outline-none focus:shadow-outline-blue"
                    onClick={toggleSidebar}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                isSidebarOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16m-7 6h7"
                            }
                        ></path>
                    </svg>
                </button>
            </div>
            <nav className={`${isSidebarOpen ? "block" : "hidden"}`}>
                <ul className="py-2 text-2xl">
                    <li className="mb-2 py-2">
                        <Link href="/pages/admin" className="flex items-center">
                            <RiDashboardFill className="mr-2" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="mb-2 py-2">
                        <Link href="/pages/admin/manufacturer" className="flex items-center">
                            <BsFillHospitalFill className="mr-2" />
                            <span>Manufacturer</span>
                        </Link>
                    </li>
                    <li className="mb-2 py-2">
                        <Link href="/pages/admin/distributor" className="flex items-center">
                            <FaTruckMoving className="mr-2" />
                            <span>Distributor</span>
                        </Link>
                    </li>
                    <li className="mb-2 py-2">
                        <Link href="/pages/admin/pharmacy" className="flex items-center">
                            <FaShop className="mr-2" />
                            <span>Pharmacy</span>
                        </Link>
                    </li>
                    <li className="mb-2 py-2">
                        <Link href="/pages/admin/user" className="flex items-center">
                            <FaRegUser className="mr-2" />
                            <span>User</span>
                        </Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default Sidebar;
