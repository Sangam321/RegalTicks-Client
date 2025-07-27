import { useState } from "react";

const faqs = [
    {
        question: "How can I publish a watch on RegalTicks?",
        answer:
            "After creating your watch content, go to your seller dashboard and click 'Publish'. Make sure all required fields like title, description, and video watch_detailss are filled in before publishing.",
    },
    {
        question: "Is my payment information secure?",
        answer:
            "Absolutely. We use industry-standard encryption and secure gateways to protect your payment data at all times.",
    },
    {
        question: "Can users track their progress?",
        answer:
            "Yes, each enrolled buyer gets a progress tracker for every watch, allowing them to resume where they left off and view completion status.",
    },
    {
        question: "Do you provide customer support?",
        answer:
            "Yes, our support team is available 24/7 via email and live chat to assist with any issues or questions.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#141414] dark:to-[#1a1a1a] py-12">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-bold text-3xl mb-4 text-gray-900 dark:text-white tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <div
                        className="w-24 h-1 mx-auto rounded-full"
                        style={{ background: "#3869EB" }}
                    ></div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <button
                                className="w-full flex justify-between items-center text-left px-6 py-5 focus:outline-none"
                                onClick={() => toggleFaq(idx)}
                            >
                                <span className="text-lg font-medium text-gray-800 dark:text-white">
                                    {faq.question}
                                </span>
                                <span className="text-2xl text-[#3869EB]">
                                    {openIndex === idx ? "−" : "+"}
                                </span>
                            </button>
                            {openIndex === idx && (
                                <div className="px-6 pb-5 text-gray-600 dark:text-gray-300">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
