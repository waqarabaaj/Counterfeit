import Image from 'next/image'
import Navbar from '@/components/Navbar';
import Link from 'next/link'
import { FaArrowRight, FaTruck } from "react-icons/fa";
import { BsFillHospitalFill, BsPerson } from "react-icons/bs";
import { MdHealthAndSafety } from "react-icons/md";

export const metadata = {
  title: "HOME-Counterfeit"
}

export default function Home() {
  return (
    <div className='dark:bg-slate-900 h-screen'>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Manufacturer Dashboard content */}
        <div className="p-8 flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold">Welcome to AuthentiCare</h1>
        </div>
        <div className="flex items-center justify-center py-10 gap-6">
          <div className="flex flex-col items-center transform transition-transform hover:scale-125">
            <BsFillHospitalFill className="text-9xl text-slate-500" />
            <p className="text-center">Manufacturer</p>
          </div>
          <FaArrowRight className="text-7xl text-blue-700" />
          <div className="flex flex-col items-center transform transition-transform hover:scale-125">
            <FaTruck className="text-9xl" />
            <p className="text-center">Distributor</p>
          </div>
          <FaArrowRight className="text-7xl text-blue-700" />
          <div className="flex flex-col items-center transform transition-transform hover:scale-125">
            <MdHealthAndSafety className="text-9xl text-green-700" />
            <p className="text-center">Pharmacy</p>
          </div>
          <FaArrowRight className="text-7xl text-blue-700" />
          <div className="flex flex-col items-center transform transition-transform hover:scale-125">
            <BsPerson className="text-9xl text-purple-700" />
            <p className="text-center">User</p>
          </div>
        </div>
      </div>
    </div>
  )
}
