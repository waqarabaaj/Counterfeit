import Head from "next/head";
import Navbar from "@/components/Navbar";

const AboutPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto my-8 p-8">
                <h1 className="text-4xl font-bold mb-6">AboutPage Us</h1>

                <p className="text-lg mb-4">
                    At Counterfeit Drugs, we are dedicated to ensuring the safety and
                    well-being of individuals by combating the proliferation of
                    counterfeit drugs in the market.
                </p>

                <p className="text-lg mb-4">
                    Our mission is to raise awareness, provide education, and collaborate
                    with stakeholders to implement effective strategies that minimize the
                    impact of counterfeit drugs on public health.
                </p>

                <p className="text-lg">
                    Join us in our commitment to creating a safer and healthier future for
                    all.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
