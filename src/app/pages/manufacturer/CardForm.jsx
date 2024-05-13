"use client";
import React, { useEffect, useState } from "react";
import { RiAddCircleFill, RiMedicineBottleFill } from "react-icons/ri";
import { FaBoxOpen, FaTruckMoving } from "react-icons/fa";
import { BsFillHospitalFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

// QuantityIncreaseBox component

// CardForm component
const CardForm = (props) => {
  // this state will setup the loading section after hiting the register button
  const [loading, setLoading] = React.useState(false);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormdata] = useState({
    gln: "",
    gtin: "",
    sscc: "",
    grai: "",
    giai: "",
    manufacturerid: props.manufacturerId,
    quantity: 0,
  });

  useEffect(() => {
    setFormdata({ ...formData, manufacturerid: props.manufacturerId });
  }, [props.manufacturerId]);

  const handleCardClick = () => {
    setShowForm(!showForm);
  };

  const handleIncrease = (value) => {
    setQuantity(parseInt(value, 10));
  };

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation for fields are not emplty
    if (
      !formData.giai ||
      !formData.gln ||
      !formData.grai ||
      !formData.sscc ||
      !formData.quantity ||
      !formData.manufacturerid ||
      formData.giai.length <= 0 ||
      formData.gln.length <= 0 ||
      formData.grai.length <= 0 ||
      formData.sscc.length <= 0 ||
      formData.quantity.length <= 0 ||
      formData.manufacturerid.length <= 0
    ) {
      return toast.warning("Please fill all the Input Fields");
    }

    try {
      setLoading(true);
      // axios request will be fire
      const response = await axios.post("/api/manufacturerData", formData);
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // Define a function to generate random data
  const generateRandomData = () => {
    const randomGLN = Math.floor(Math.random() * 1000000000000).toString();
    const randomGTIN = Math.floor(Math.random() * 1000000000000).toString();
    const randomSSCC = Math.floor(Math.random() * 1000000000000).toString();
    const randomGRAI = Math.floor(Math.random() * 1000000000000).toString();
    const randomGIAI = Math.floor(Math.random() * 1000000000000).toString();
    const randomQuantity = Math.floor(Math.random() * 500);

    setFormdata({
      gln: randomGLN,
      gtin: randomGTIN,
      sscc: randomSSCC,
      grai: randomGRAI,
      giai: randomGIAI,
      quantity: randomQuantity,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex items-center justify-center">
        <div
          className="bg-white p-8 rounded-lg shadow-lg cursor-pointer flex items-center justify-center"
          onClick={handleCardClick}
        >
          <RiAddCircleFill className="text-3xl mr-2" />
          <div>
            <h2 className="text-2xl font-bold text-center">Add new Entry</h2>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form
            className="relative bg-white rounded-lg shadow-md p-8 w-full max-w-2xl"
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-8 text-center flex flex-col items-center justify-center">
              {/* {JSON.stringify(formData)} */}
              <button
                className="mr-2 text-blue-500 hover:text-blue-700"
                onClick={generateRandomData}
              >
                Fill Random Data
              </button>
              <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
                Add Your Data
              </h2>
            </div>

            {/* First Row */}
            <div className="flex flex-wrap -mx-4 mb-4">
              {/* GLN */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  GLN (Global Location Number)
                </label>
                <div className="relative">
                  <BsFillHospitalFill className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                  <input
                    type="text"
                    value={formData.gln}
                    onChange={(event) => {
                      setFormdata({ ...formData, gln: event.target.value });
                    }}
                    className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter GLN"
                  />
                </div>
              </div>

              {/* GTIN */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 flex items-center">
                  GTIN (Global Trade Item Number)
                </label>
                <div className="relative">
                  <RiMedicineBottleFill className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                  <input
                    type="text"
                    value={formData.gtin}
                    onChange={(event) => {
                      setFormdata({ ...formData, gtin: event.target.value });
                    }}
                    className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter GTIN"
                  />
                </div>
              </div>

              {/* SSCC */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  SSCC (Serial Shipping Container Code)
                </label>
                <div className="relative">
                  <FaBoxOpen className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                  <input
                    type="text"
                    value={formData.sscc}
                    onChange={(event) => {
                      setFormdata({ ...formData, sscc: event.target.value });
                    }}
                    className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter SSCC"
                  />
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-wrap -mx-4 mb-4">
              {/* GRAI */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  GRAI (Global Returnable Asset Identifier)
                </label>
                <div className="relative">
                  <FaTruckMoving className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                  <input
                    type="text"
                    value={formData.grai}
                    onChange={(event) => {
                      setFormdata({ ...formData, grai: event.target.value });
                    }}
                    className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter GRAI"
                  />
                </div>
              </div>

              {/* GIAI */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  GIAI (Global Individual Asset Identifier)
                </label>
                <div className="relative">
                  <FaTruckMoving className="absolute h-6 w-6 text-gray-500 top-3 left-3" />
                  <input
                    type="text"
                    value={formData.giai}
                    onChange={(event) => {
                      setFormdata({ ...formData, giai: event.target.value });
                    }}
                    className="w-full p-2 pl-10 border rounded-md mt-1 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter GIAI"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 mt-4">
                <label className="block mb-2 text-sm font-semibold text-gray-600">
                  Quantity:
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(event) => {
                      setFormdata({
                        ...formData,
                        quantity: event.target.value,
                      });
                    }}
                    className="w-full p-2 border rounded-lg text-center focus:outline-none focus:ring focus:border-blue-700"
                    min="0"
                    max="500"
                    step="1" // Add step attribute
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              {loading ? "Processing" : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CardForm;
