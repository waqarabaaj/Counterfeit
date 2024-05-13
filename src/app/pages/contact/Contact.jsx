// pages/contact.js
import Head from "next/head";
import Navbar from "@/components/Navbar";

const ContactPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto my-8 p-8">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

                <p className="text-lg mb-4">
                    For inquiries, partnerships, or to report suspicious activities
                    related to counterfeit drugs, please reach out to us using the
                    following contact information:
                </p>

                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Email:</h2>
                    <p className="text-lg">info@counterfeitdrugs.org</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Phone:</h2>
                    <p className="text-lg">+1 (555) 123-4567</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
