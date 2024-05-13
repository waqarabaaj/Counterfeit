import React from "react";
import { IoIosNotifications } from "react-icons/io";

const Navbar = ({ heading }) => {
    return (
        <div className="flex-1 p-8 overflow-hidden">
            {/* Navbar */}
            <div className="flex justify-between items-center mb-8">
                <div className="text-4xl font-semibold">{heading}</div>
                <div className="flex items-center space-x-4">
                    {/* Notification Icon (Replace with your icon or use a library like Heroicons) */}
                    <IoIosNotifications className="text-4xl" />
                    {/* Logout Button */}
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
