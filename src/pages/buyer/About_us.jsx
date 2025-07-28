const AboutUs = () => {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-[#141414] dark:to-[#1a1a1a] py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="font-bold text-3xl mb-4 text-gray-900 dark:text-white">About Courzeo</h2>
                    <div className="w-24 h-1 mx-auto rounded-full" style={{ background: '#3869EB' }}></div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Side - Image */}
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Buyers collaborating and collection online"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                            <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50"></div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full opacity-50"></div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                                Empowering Collection Through Technology
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Courzeo is a cutting-edge online collection platform that connects passionate educators
                                with eager learners worldwide. We believe that quality education should be accessible
                                to everyone, regardless of their location or background.
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Our platform provides a seamless experience for both watch creators and buyers,
                                offering advanced tools for content delivery, interactive collection, and progress tracking.
                                Whether you're looking to acquire new skills or share your expertise, Courzeo is your
                                gateway to unlimited collection opportunities.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expert Sellers</span>
                            </div>
                            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Interactive Content</span>
                            </div>
                            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lifetime Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Our Mission</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            To democratize education by making high-quality collection accessible to everyone,
                            everywhere. We strive to break down barriers and create opportunities for personal
                            and professional growth through innovative online collection experiences.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Our Vision</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            To become the world's leading platform for online education, fostering a global
                            community where knowledge knows no boundaries. We envision a future where collection
                            is continuous, engaging, and transformative for millions of learners worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
