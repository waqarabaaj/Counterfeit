import Head from "next/head";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import Navbar from "@/components/Navbar";

const CounterfeitPage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center py-32">
                {/* Left Side */}
                <div className="flex flex-col justify-center items-center p-8">
                    <h1 className="text-4xl font-bold mb-4 text-red-600">
                        <span className="text-yellow-400">Authenti</span>Care
                    </h1>
                    <p className="text-lg mb-6">lorem</p>

                    <div className="flex space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 flex items-center">
                            <FiDownload className="mr-2" />
                            Download on Play Store
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 flex items-center">
                            <FiDownload className="mr-2" />
                            Download on App Store
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex justify-end">
                    <Image
                        src="/phone.png" // replace with your image path
                        alt="Phone Image"
                        width={200}
                        height={200}
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default CounterfeitPage;
