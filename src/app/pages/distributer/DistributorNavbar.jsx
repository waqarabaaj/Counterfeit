import { FaBell, FaSignOutAlt, FaArrowRight } from "react-icons/fa";
import { BsFillHospitalFill } from "react-icons/bs";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaBoxOpen, FaTruckMoving } from "react-icons/fa";
import { LuContainer } from "react-icons/lu";
import { toast } from "react-toastify";
import Typewriter from "./Typewriter";
import axios from "axios";
import { useRouter } from "next/navigation";



const DistributorNavbar = ({ name }) => {

    const router = useRouter()

    const logout = async () => {
        try {
            const response = await axios.get('/api/logout')
            toast.success(response.data.message, { position: "top-right" })
            router.push('/pages/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message, { position: "top-right" })
        }
    }

    return (
        <div>

            {/* NavBar */}
            <nav className="w-full bg-blue-500 p-4 flex items-center justify-between">
                <div className="text-red-600 text-4xl font-bold">
                    <span className="text-yellow-400">Authenti</span>Care
                </div>
                <div className=" text-white font-bold text-4xl">
                    <Typewriter manufacturerName={name} />
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-white">
                        <FaBell className="text-4xl" />
                    </button>
                    <button onClick={logout} className="cursor-pointer">
                        <FaSignOutAlt className="text-4xl text-white" />
                    </button>
                </div>
            </nav>

            {/* Manufacturer Dashboard content */}
            <div className="p-8 flex items-center justify-center gap-2">
                {/* <h1 className="text-4xl font-bold">Manufacturer Dashboard</h1>
        <BsFillHospitalFill className="text-4xl text-blue-500" /> */}
            </div>
            <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-center">GLN</p>
                    <BsFillHospitalFill className="text-4xl text-green-500 transform transition-transform hover:scale-125" />
                    <p className="text-center">Manufacturer</p>
                </div>
                <FaArrowRight className="text-4xl text-blue-700" />
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-center">GTIN </p>
                    <RiMedicineBottleFill className="text-4xl text-blue-600 transform transition-transform hover:scale-125" />
                    <p className="text-center">Item</p>
                </div>
                <FaArrowRight className="text-4xl text-blue-700" />
                <div className="flex flex-col relative bottom-3 gap-2 items-center">
                    <p className="text-center">GTIN</p>
                    <p className="text-center">SSCC</p>
                    <FaBoxOpen className="text-4xl text-green-700 transform transition-transform hover:scale-125" />
                    <p className="text-center">Case</p>
                </div>
                <FaArrowRight className="text-4xl text-blue-700" />
                <div className="flex flex-col relative bottom-7 gap-2 items-center">
                    <p className="text-center">GRAI</p>
                    <p className="text-center">GTIN</p>
                    <p className="text-center">SSCC</p>
                    <LuContainer className="text-4xl relative text-slate-600 transform transition-transform hover:scale-125" />
                    <p className="text-center">Pallet</p>
                </div>
                <FaArrowRight className="text-4xl text-blue-700" />
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-center">GIAI</p>
                    <FaTruckMoving className="text-4xl text-purple-700 transform transition-transform hover:scale-125" />
                    <p className="text-center">Transport</p>
                </div>
            </div>
        </div>
    );
};

export default DistributorNavbar;
