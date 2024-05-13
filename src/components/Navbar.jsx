import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-white p-4 border-b-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black">
                    <Link href="/" className="text-3xl font-bold">
                        <div className="text-red-600">
                            {" "}
                            <span className="text-yellow-400">Authenti</span>Care
                        </div>
                    </Link>
                </div>
                <div className="space-x-4 flex gap-6 text-black text-lg">
                    <Link href="/">
                        <div className="">Home</div>
                    </Link>
                    <Link href="/pages/drugDictionary">
                        <div className="">Drug Dictionary</div>
                    </Link>
                    <Link href="/pages/counterfeit">
                        <div className="">Counterfeit</div>
                    </Link>
                    <Link href="/pages/about">
                        <div className="">About Us</div>
                    </Link>
                    <Link href="/pages/contact">
                        <div className="">Contact Us</div>
                    </Link>
                </div>
                <div>
                    <Link href={"/pages/login"} className="bg-blue-500 text-white text-lg px-4 py-2 rounded">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
