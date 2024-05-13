"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const DrugDictionaryPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDrugs, setFilteredDrugs] = useState([]);

    const allDrugs = [
        { name: "Drug A", description: "Description of Drug A" },
        { name: "Drug B", description: "Description of Drug B" },
        { name: "Drug C", description: "Description of Drug C" },
        { name: "Paracetamol", description: "Commonly used for pain and fever" },
        {
            name: "Ibuprofen",
            description: "Nonsteroidal anti-inflammatory drug (NSAID)",
        },
        {
            name: "Amoxicillin",
            description: "Antibiotic used for various infections",
        },
        { name: "Atorvastatin", description: "Lipid-lowering medication" },
        {
            name: "Omeprazole",
            description: "Proton-pump inhibitor used for stomach issues",
        },
        {
            name: "Panadol",
            description: "Sir dard k liye",
        },
    ];

    const handleSearch = () => {
        const normalizedSearchTerm = searchTerm.toLowerCase();
        const filtered = allDrugs.filter((drug) =>
            drug.name.toLowerCase().includes(normalizedSearchTerm)
        );
        setFilteredDrugs(filtered);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8">Drug Dictionary</h1>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search for a drug..."
                        className="p-2 border border-gray-300 flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDrugs.length > 0 ? (
                        filteredDrugs.map((drug, index) => (
                            <div key={index} className="bg-white p-4 shadow-md rounded-md">
                                <h2 className="text-lg font-bold mb-2">{drug.name}</h2>
                                <p>{drug.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No matching drugs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DrugDictionaryPage;
