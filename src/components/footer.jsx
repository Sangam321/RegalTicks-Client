import {
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhone,
} from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-[#0b0b0b] via-[#111111] to-[#1a1a1a] text-white overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#146321] rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#146321] rounded-full blur-3xl translate-x-32 translate-y-32"></div>
            </div>

            <div className="relative z-10 py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-sm">
                        {/* Regal Ticks Brand Info */}
                        <div className="md:col-span-2">
                            <div className="mb-6">
                                <h3 className="text-[#146321] font-bold text-2xl mb-4 flex items-center gap-2">
                                    <FaRegClock className="text-[#146321]" /> Regal <span className="text-white">Ticks</span>
                                </h3>
                                <p className="leading-relaxed text-gray-300 text-base mb-6">
                                    Regal Ticks curates timeless luxury watches that blend elegance,
                                    precision, and heritage. Discover your signature timepiece today.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-[#146321]/20 text-[#146321] rounded-full text-xs font-medium">
                                        Luxury Timepieces
                                    </span>
                                    <span className="px-3 py-1 bg-[#146321]/20 text-[#146321] rounded-full text-xs font-medium">
                                        Swiss Craftsmanship
                                    </span>
                                    <span className="px-3 py-1 bg-[#146321]/20 text-[#146321] rounded-full text-xs font-medium">
                                        Timeless Elegance
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#146321] to-green-600 rounded-full"></div>
                                Contact Us
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group">
                                    <div className="w-8 h-8 bg-[#146321]/20 rounded-lg flex items-center justify-center group-hover:bg-[#146321]/30 transition-colors duration-300">
                                        <FaMapMarkerAlt className="text-[#146321] text-sm" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                        Durbarmarg, Kathmandu
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group cursor-pointer">
                                    <div className="w-8 h-8 bg-[#146321]/20 rounded-lg flex items-center justify-center group-hover:bg-[#146321]/30 transition-colors duration-300">
                                        <FaEnvelope className="text-[#146321] text-sm" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                        contact@regalticks.com
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group cursor-pointer">
                                    <div className="w-8 h-8 bg-[#146321]/20 rounded-lg flex items-center justify-center group-hover:bg-[#146321]/30 transition-colors duration-300">
                                        <FaPhone className="text-[#146321] text-sm" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                        +977 9702285911
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Collections */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#146321] to-green-600 rounded-full"></div>
                                Collections
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Men’s Watches",
                                    "Women’s Collection",
                                    "Limited Editions",
                                    "Custom Engraving"
                                ].map((item, index) => (
                                    <li key={index} className="group cursor-pointer">
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full group-hover:bg-[#146321] transition-colors duration-300"></div>
                                            <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                                {item}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Info */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#146321] to-green-600 rounded-full"></div>
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "About Us",
                                    "Our Heritage",
                                    "Boutique Locations",
                                    "Care & Service"
                                ].map((item, index) => (
                                    <li key={index} className="group cursor-pointer">
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full group-hover:bg-[#146321] transition-colors duration-300"></div>
                                            <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                                {item}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Social Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-700/50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h4 className="text-white font-semibold text-lg mb-4">Follow Regal Ticks</h4>
                                <div className="flex gap-4">
                                    {[
                                        { icon: FaFacebookF, color: "bg-[#146321] hover:bg-[#104c19]", label: "Facebook" },
                                        { icon: FaInstagram, color: "bg-[#146321] hover:bg-[#104c19]", label: "Instagram" },
                                        { icon: FaLinkedinIn, color: "bg-[#146321] hover:bg-[#104c19]", label: "LinkedIn" },
                                    ].map((social, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className={`${social.color} p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                                            aria-label={social.label}
                                        >
                                            <social.icon className="group-hover:rotate-12 transition-transform duration-300" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-gray-300 text-lg font-medium mb-2">
                                    Thank you for trusting Regal Ticks
                                </p>
                                <p className="text-[#146321] font-semibold">
                                    Where elegance meets precision
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-6 border-t border-gray-700/30 text-center">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Regal Ticks. All rights reserved.
                            <span className="mx-2">•</span>
                            <a href="#" className="hover:text-[#146321] transition-colors duration-300">Privacy Policy</a>
                            <span className="mx-2">•</span>
                            <a href="#" className="hover:text-[#146321] transition-colors duration-300">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;