import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/features/api/authApi"; // Make sure you have this API hook
import { Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email) return toast.error("Please enter your email");

        try {
            const res = await forgotPassword({ email }).unwrap();
            toast.success(res.message || "Password reset link sent!");
            // Optionally redirect back to login page after success
            // navigate("/login");
        } catch (err) {
            toast.error(err.data?.message || "Failed to send reset link");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-white to-[#e8efff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
            <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-xl backdrop-blur-sm p-8">
                <h2 className="text-3xl font-bold text-center text-[#3869EB] mb-4">
                    Forgot Password
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    Enter your registered email address to receive a password reset link.
                </p>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-12 border-gray-200 dark:border-gray-600 focus:border-[#3869EB]"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full h-12 bg-[#3869EB] hover:bg-[#2c52b9] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-[#3869EB] hover:underline focus:outline-none"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
