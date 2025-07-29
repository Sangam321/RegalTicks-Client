import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/features/api/authApi";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  // Form input states
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  // Authentication states
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [lockTime, setLockTime] = useState(0);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [countdown, setCountdown] = useState(180);

  // UI states
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  // Validation states
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [signupNameError, setSignupNameError] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "bg-gray-200",
  });

  // reCAPTCHA state
  const [signupRecaptchaToken, setSignupRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  // OTP states
  const [otp, setOtp] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [otpRateLimitExceeded, setOtpRateLimitExceeded] = useState(false);
  const [otpRateLimitCountdown, setOtpRateLimitCountdown] = useState(5 * 60);

  // API mutations
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp, error: verifyOtpError }] =
    useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation();

  const navigate = useNavigate();

  // Login rate limit countdown
  useEffect(() => {
    let timer;
    if (rateLimitExceeded && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setRateLimitExceeded(false);
      setCountdown(180);
      localStorage.removeItem("rateLimitExpiry");
    }
    return () => clearInterval(timer);
  }, [rateLimitExceeded, countdown]);

  // OTP resend countdown
  useEffect(() => {
    let timer;
    if (showOtpVerification && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [showOtpVerification, otpCountdown]);

  // OTP rate limit countdown 
  useEffect(() => {
    let timer;
    if (otpRateLimitExceeded && otpRateLimitCountdown > 0) {
      timer = setInterval(() => {
        setOtpRateLimitCountdown((prev) => prev - 1);
      }, 1000);
    } else if (otpRateLimitCountdown === 0) {
      setOtpRateLimitExceeded(false);
      setOtpRateLimitCountdown(5 * 60);
      setOtpAttempts(0);
      localStorage.removeItem("otpRateLimitExpiry");
    }
    return () => clearInterval(timer);
  }, [otpRateLimitExceeded, otpRateLimitCountdown]);

  // Check for existing rate limits on component mount
  useEffect(() => {
    const expiry = localStorage.getItem("rateLimitExpiry");
    if (expiry && Date.now() < expiry) {
      setRateLimitExceeded(true);
      setCountdown(Math.ceil((expiry - Date.now()) / 1000));
    }

    const otpExpiry = localStorage.getItem("otpRateLimitExpiry");
    if (otpExpiry && Date.now() < otpExpiry) {
      setOtpRateLimitExceeded(true);
      setOtpRateLimitCountdown(Math.ceil((otpExpiry - Date.now()) / 1000));
    }
  }, []);

  // Handle OTP verification errors
  useEffect(() => {
    if (verifyOtpError) {
      if (verifyOtpError.status === 429) {
        // Server-enforced rate limit
        const retryAfter = 5 * 60; // 15 minutes in seconds
        setOtpRateLimitExceeded(true);
        setOtpRateLimitCountdown(retryAfter);
        localStorage.setItem("otpRateLimitExpiry", Date.now() + retryAfter * 1000);
        toast.error("Too many OTP attempts. Please try again in 5 minutes.");
      } else {
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);

        if (newAttempts >= 3) {
          const retryAfter = 5 * 60; // 5 minutes in seconds
          setOtpRateLimitExceeded(true);
          setOtpRateLimitCountdown(retryAfter);
          localStorage.setItem("otpRateLimitExpiry", Date.now() + retryAfter * 1000);
          toast.error("Too many OTP attempts. Please try again in 5 minutes.");
        } else {
          toast.error(verifyOtpError.data?.message || "Invalid OTP. Please try again.");
        }
      }
    }
  }, [verifyOtpError]);

  // Handle login errors
  useEffect(() => {
    if (loginError) {
      if (loginError.status === 429) {
        setRateLimitExceeded(true);
        const retryAfter = loginError.data?.retryAfter || 180;
        setCountdown(retryAfter);
        localStorage.setItem("rateLimitExpiry", Date.now() + retryAfter * 1000);
        toast.error(`Too many attempts. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`);
      } else if (loginError.data?.remainingAttempts !== undefined) {
        setRemainingAttempts(loginError.data.remainingAttempts);
      } else if (loginError.data?.lockTime !== undefined) {
        const minutes = Math.ceil(loginError.data.lockTime / 60);
        setLockTime(minutes);
        toast.error(`Account locked. Try again in ${minutes} minutes.`);
      } else if (remainingAttempts < 5) {
        toast.error(`Incorrect credentials. ${remainingAttempts} attempts remaining.`);
      } else {
        toast.error(loginError.data?.message || "Login Failed");
      }
    }

    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }
  }, [loginError, registerError, remainingAttempts]);

  // Handle successful authentication
  useEffect(() => {
    if (loginIsSuccess && loginData && !showOtpVerification) {
      if (loginData.requiresPasswordReset) {
        navigate("/reset-password", { state: { expired: true } });
      } else {
        toast.success(loginData.message || "Login successful.");
        navigate("/");
      }
    }

    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
  }, [loginIsSuccess, registerIsSuccess, loginData, registerData, showOtpVerification, navigate]);

  // Password validation
  const validatePassword = (password) => {
    let score = 0;
    let message = "";
    let color = "bg-gray-200";

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    if (password.length === 0) {
      message = "";
      color = "bg-gray-200";
    } else if (score <= 2) {
      message = "Weak";
      color = "bg-red-500";
    } else if (score <= 4) {
      message = "Moderate";
      color = "bg-yellow-500";
    } else if (score <= 6) {
      message = "Strong";
      color = "bg-green-500";
    } else {
      message = "Very Strong";
      color = "bg-green-700";
    }

    setPasswordStrength({ score, message, color });
    return password.length >= 8 && score >= 4;
  };

  // Name validation
  const validateName = (name) => {
    if (name.length < 6) {
      setSignupNameError("Username must be at least 6 characters");
      return false;
    }
    setSignupNameError("");
    return true;
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSignupEmailError("Please enter a valid email address");
      return false;
    }
    setSignupEmailError("");
    return true;
  };

  // Input change handler
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
      if (name === "password") validatePassword(value);
      else if (name === "name") validateName(value);
      else if (name === "email") validateEmail(value);
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  // Registration handler
  const handleRegistration = async (type) => {
    if (type === "signup" && !signupRecaptchaToken) {
      toast.error("Please verify you're not a robot!");
      return;
    }

    if (type === "signup") {
      const isNameValid = validateName(signupInput.name);
      const isEmailValid = validateEmail(signupInput.email);
      const isPasswordValid = validatePassword(signupInput.password);
      if (!isNameValid || !isEmailValid || !isPasswordValid) return;
    }

    setLastAction(type);
    const inputData = type === "signup" ? signupInput : loginInput;
    const recaptchaToken = type === "signup" ? signupRecaptchaToken : undefined;

    try {
      if (type === "signup") {
        const response = await registerUser({ ...inputData, recaptchaToken });
        if (response.data?.success) {
          toast.success("Account created successfully");
        }
      } else {
        const response = await loginUser({ ...inputData });
        if (response.data?.success) {
          setOtpEmail(loginInput.email);
          setShowOtpVerification(true);
          toast.success("OTP sent to your email");
        }
      }
    } catch (err) {
      console.error(`${type} error:`, err);
      toast.error(err.data?.message || `${type === "signup" ? "Signup" : "Login"} failed`);
    }
  };

  // OTP verification handler
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (otpRateLimitExceeded) {
      const minutes = Math.floor(otpRateLimitCountdown / 60);
      const seconds = otpRateLimitCountdown % 60;
      toast.error(`Too many attempts. Please try again in ${minutes}m ${seconds}s`);
      return;
    }

    try {
      const response = await verifyOtp({ email: otpEmail, otp });
      if (response.data?.success) {
        setOtpAttempts(0);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
    }
  };

  // OTP resend handler
  const handleResendOtp = async () => {
    if (otpRateLimitExceeded) {
      const minutes = Math.floor(otpRateLimitCountdown / 60);
      const seconds = otpRateLimitCountdown % 60;
      toast.error(`Please wait ${minutes}m ${seconds}s before requesting a new OTP.`);
      return;
    }

    try {
      await resendOtp({ email: otpEmail });
      setOtpCountdown(60);
      toast.success("New OTP sent to your email");
    } catch (err) {
      toast.error(err.data?.message || "Failed to resend OTP");
    }
  };

  // Check if signup is disabled
  const isSignupDisabled =
    !signupInput.name ||
    !signupInput.email ||
    !signupInput.password ||
    !!signupPasswordError ||
    !!signupNameError ||
    !!signupEmailError ||
    passwordStrength.score < 4 ||
    !signupRecaptchaToken;

  // OTP Verification UI
  if (showOtpVerification) {
    const minutes = Math.floor(otpRateLimitCountdown / 60);
    const seconds = otpRateLimitCountdown % 60;

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
                Verify Your Identity
              </CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                We've sent a 6-digit code to {otpEmail}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit code"
                  className="text-center text-xl tracking-widest h-14"
                  autoFocus
                  disabled={otpRateLimitExceeded}
                />
                {otpRateLimitExceeded ? (
                  <p className="text-sm text-red-600 mt-1">
                    Too many attempts. Try again in {minutes}m {seconds}s
                  </p>
                ) : (
                  otpAttempts > 0 && (
                    <p className="text-sm text-yellow-600 mt-1">
                      {3 - otpAttempts} attempts remaining
                    </p>
                  )
                )}
              </div>
              <Button
                onClick={handleVerifyOtp}
                className="w-full h-12 bg-[#146321] hover:bg-[#10511a]"
                disabled={isVerifyingOtp || otpRateLimitExceeded}
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={otpCountdown > 0 || isResendingOtp || otpRateLimitExceeded}
                  className="text-[#146321] hover:underline disabled:opacity-50"
                >
                  {isResendingOtp
                    ? "Sending..."
                    : otpCountdown > 0
                      ? `Resend in ${otpCountdown}s`
                      : "Resend OTP"}
                </button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Main Login/Signup UI
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <div className="w-full max-w-md mx-auto -mt-1 md:-mt-1">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 rounded-md transition-all duration-200"
            >
              Sign Up
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 rounded-md transition-all duration-200"
            >
              Login
            </TabsTrigger>
          </TabsList>

          {/* Signup Tab */}
          <TabsContent value="signup" className="mt-6">
            <Card className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
                  Create Account
                </CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                  Join our exclusive club of timepiece collectors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2 relative">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      name="name"
                      value={signupInput.name}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Enter your full name"
                      className="pl-10 h-12 border-gray-200 dark:border-gray-600 focus:border-[#146321]"
                      required
                    />
                  </div>
                  {signupNameError && (
                    <p className="text-xs text-red-600 mt-1">{signupNameError}</p>
                  )}
                </div>
                {/* Email */}
                <div className="space-y-2 relative">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={signupInput.email}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-gray-200 dark:border-gray-600 focus:border-[#146321]"
                      required
                    />
                  </div>
                  {signupEmailError && (
                    <p className="text-xs text-red-600 mt-1">{signupEmailError}</p>
                  )}
                </div>
                {/* Password */}
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showSignupPassword ? "text" : "password"}
                      name="password"
                      value={signupInput.password}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-600 focus:border-[#146321]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      tabIndex={-1}
                      aria-label={
                        showSignupPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.score / 7) * 100}%`,
                        transition: "width 0.3s ease",
                      }}
                    ></div>
                  </div>
                  {signupInput.password && (
                    <p
                      className={`text-xs mt-1 ${passwordStrength.score <= 2
                        ? "text-red-600"
                        : passwordStrength.score <= 4
                          ? "text-yellow-600"
                          : "text-green-600"
                        }`}
                    >
                      {passwordStrength.message}
                      {passwordStrength.score < 4 &&
                        " - Must include uppercase, lowercase, number, and special character"}
                    </p>
                  )}
                </div>

                {/* reCAPTCHA */}
                <div className="mt-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Ldu3Y4rAAAAAC1nz9kFVtbT-0hfWY5CJeR6sho_"
                    onChange={(token) => setSignupRecaptchaToken(token)}
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button
                  disabled={registerIsLoading || isSignupDisabled}
                  onClick={() => handleRegistration("signup")}
                  className="w-full h-12 bg-[#146321] hover:bg-[#10511a] text-white font-medium shadow-lg hover:shadow-xl"
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Login Tab */}
          <TabsContent value="login" className="mt-6">
            <Card className="shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                  Continue your journey in style
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email */}
                <div className="space-y-2 relative">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={loginInput.email}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-gray-200 dark:border-gray-600 focus:border-[#146321]"
                      required
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      name="password"
                      value={loginInput.password}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-600 focus:border-[#146321]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      tabIndex={-1}
                      aria-label={
                        showLoginPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {remainingAttempts < 5 && !lockTime && !rateLimitExceeded && (
                    <p className="text-xs text-yellow-600 mt-1">
                      {remainingAttempts} login attempts remaining
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-[#146321] hover:underline focus:outline-none"
                  >
                    Forgot password?
                  </button>
                  {lockTime > 0 && (
                    <p className="text-sm text-red-600">
                      Account locked for {lockTime} minutes
                    </p>
                  )}
                  {rateLimitExceeded && (
                    <p className="text-sm text-red-600">
                      Too many attempts. Try again in {Math.ceil(countdown / 60)}{" "}
                      minutes
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button
                  disabled={
                    loginIsLoading || lockTime > 0 || rateLimitExceeded
                  }
                  onClick={() => handleRegistration("login")}
                  className="w-full h-12 bg-[#146321] hover:bg-[#10511a] text-white font-medium shadow-lg hover:shadow-xl"
                >
                  {rateLimitExceeded ? (
                    `Try again in ${countdown}s`
                  ) : loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;