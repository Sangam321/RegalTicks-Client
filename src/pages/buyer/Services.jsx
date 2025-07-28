import { BookOpen, ShieldCheck, UserCog } from "lucide-react";

const services = [
    {
        icon: <BookOpen size={40} className="text-white" />,
        title: "Watch Creation Tools",
        description:
            "Enable sellers to create, update, and publish high-quality online watchs with video, quizzes, and resources.",
        gradient: "from-blue-500 to-blue-600",
    },
    {
        icon: <ShieldCheck size={40} className="text-white" />,
        title: "Secure Watch Delivery",
        description:
            "Provide seamless access to enrolled learners with responsive UI, secure video streaming, and progress tracking.",
        gradient: "from-emerald-500 to-emerald-600",
    },
    {
        icon: <UserCog size={40} className="text-white" />,
        title: "User & Purchase Management",
        description:
            "Robust user management system for buyers and sellers, along with purchase history and analytics dashboard.",
        gradient: "from-purple-500 to-purple-600",
    },
];

const Services = () => {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#141414] dark:to-[#1a1a1a] py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-bold text-3xl mb-4 text-gray-900 dark:text-white tracking-tight">
                        Our Services
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full" style={{ background: '#3869EB' }}></div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transform hover:-translate-y-2"
                        >
                            {/* Icon */}
                            <div className={`bg-gradient-to-r ${service.gradient} p-4 rounded-2xl -mt-12 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white leading-snug">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                {service.description}
                            </p>

                            {/* Decorative Line */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-200 dark:bg-gray-600 rounded-full group-hover:w-20 group-hover:bg-[#3869EB] transition-all duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-20 text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Support", value: "24/7" },
                            { label: "Uptime", value: "99.9%" },
                            { label: "Watchs", value: "10K+" },
                            { label: "Buyers", value: "50K+" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="text-4xl font-bold mb-2 text-[#3869EB]">
                                    {item.value}
                                </div>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
