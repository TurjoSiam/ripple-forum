import banner from "../../assets/banner.png"


const AboutUs = () => {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative">
                        <img
                            src={banner}
                            alt="About Us"
                            className="w-full h-64 object-cover brightness-50"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h1 className="text-white text-4xl font-bold">About Us</h1>
                        </div>
                    </div>
                    <div className="bg-gradient-to-tr from-purple-100 to-blue-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Who We Are
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Welcome to our platform! We are dedicated to providing honest and unbiased reviews for a wide range of services.
                            Our mission is to empower users like you to make informed decisions and help businesses grow by receiving valuable feedback.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We aim to create a community where everyone can share their genuine experiences with different services.
                            By fostering transparency and trust, we hope to improve service standards and ensure a better experience for all.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Why Choose Us
                        </h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>Unbiased and authentic reviews from real users.</li>
                            <li>A user-friendly platform to find and rate services easily.</li>
                            <li>Helping businesses improve through constructive feedback.</li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 p-6 text-center">
                        <p className="text-gray-600">
                            Join us in building a trusted community by sharing your thoughts!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;