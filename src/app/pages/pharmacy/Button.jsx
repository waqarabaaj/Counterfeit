import React, { useState } from "react";
import Drawer from "./Drawer";
const ButtonPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const manufacturerData = [
        {
            distributor: "Distributor 1",
            sNo: 1,
            quantity: 50,
            gln: "1234567890123",
            gtin: "9876543210123",
            sscc: "112233445566778899",
            grai: "ABCDEF1234567890",
            giai: "XYZ12345678901234567",
        },
        {
            distributor: "Distributor 2",
            sNo: 2,
            quantity: 75,
            gln: "2345678901234",
            gtin: "8765432101234",
            sscc: "223344556677889900",
            grai: "BCDEFG1234567890",
            giai: "YZX123456789012345678",
        },
        {
            distributor: "Distributor 3",
            sNo: 3,
            quantity: 100,
            gln: "3456789012345",
            gtin: "7654321098765",
            sscc: "334455667788990011",
            grai: "CDEFGH1234567890",
            giai: "ZXY1234567890123456789",
        },
        // Add more data as needed
    ];

    const openDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <div className="flex justify-center items-center">
                <button
                    onClick={openDrawer}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Show Distributor Data
                </button>
                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    manufacturerData={manufacturerData}
                />
            </div>
        </div>
    );
};

export default ButtonPage