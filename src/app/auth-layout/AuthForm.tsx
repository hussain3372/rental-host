import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
// import { Modal } from "../shared/modals";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  otp?: string[];
}

interface AuthFormProps {
  mode: "login" | "signup" | "forgot" | "otp" | "reset-password";
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  error?: string;
  onGoogleLogin?: () => void;      // Add this
  onAppleLogin?: () => void;       // Add this
  socialLoading?: boolean;         // Add loading state for social logins
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  loading = false,
  error,
  onGoogleLogin,           // Add this
  onAppleLogin,            // Add this
  socialLoading = false,   // Add this
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    otp: ["", "", "", "", "", ""],
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && formData.otp) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prev) => ({ ...prev, otp: newOtp }));

      // Clear OTP error when user starts typing
      if (errors.otp) {
        setErrors((prev) => ({
          ...prev,
          otp: "",
        }));
      }

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(
          `otp-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (
      e.key === "Backspace" &&
      formData.otp &&
      !formData.otp[index] &&
      index > 0
    ) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (mode) {
      case "login":
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password.trim()) {
          newErrors.password = "Password is required";
        }
        break;

      case "signup":
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password.trim()) {
          newErrors.password = "Password is required";
        }
        break;

      case "forgot":
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;

      case "otp":
        const otpComplete = formData.otp?.every(digit => digit.trim() !== "");
        if (!otpComplete) {
          newErrors.otp = "Please enter all 6 digits";
        }
        break;

      case "reset-password":
        if (!formData.password.trim()) {
          newErrors.password = "Password is required";
        }

        if (!formData.confirmPassword?.trim()) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const config = {
    login: {
      title: "Welcome Back!",
      subtitle: "Sign in to explore your personalized dashboard.",
      buttonText: "Login",
    },
    signup: {
      title: "Create Your Account",
      subtitle: "Join us today and unlock your personalized experience.",
      buttonText: "Create Account",
    },
    forgot: {
      title: "Forgot Password",
      subtitle: "Recover access to your account in a few simple steps.",
      buttonText: "Send Link",
    },
    otp: {
      title: "Verify Your Email",
      subtitle: "We've sent a verification code to your email address. Please enter it below to continue.",
      buttonText: "Verify",
    },
    "reset-password": {
      title: "Create New Password",
      subtitle: "Create a new password for your account.",
      buttonText: "Reset Password",
    },
  };

  const currentConfig = config[mode];
  const [timeLeft, setTimeLeft] = useState(120);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleResend = () => {
    toast.success("Your OTP has been resent");
    setTimeLeft(120); // restart
    setShowResend(false);

  };

  const renderFields = () => {
    switch (mode) {
      case "login":
        return (
          <>

            <div className=" pt-[20px] max-w-[1100px] sm:pt-[40px]">
              <label className="text-white font-medium leading-[18px] text-sm ">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className={`w-full   text-[14px] mt-[10px] bg-gradient-to-b from-[#202020] to-[#101010] border ${errors.email ? 'border-red-500' : 'border-[#404040]'} rounded-xl px-4 py-3 text-white  focus:outline-none transition-colors`}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="max-w-[1100px]">
              <label className="text-white text-sm font-medium leading-[18px]">Password</label>
              <div className="relative">
                <input
                  type={!showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full  text-[14px]  mt-[10px] bg-gradient-to-b from-[#202020] to-[#101010] border ${errors.password ? 'border-red-500' : 'border-[#404040]'} rounded-xl px-4 py-3 pr-12 text-white  focus:outline-none transition-colors`}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/4 text-[#999999] "
                >
                  {!showPassword ? (
                    <Image
                      src="/images/eye-off.png"
                      alt="hide password"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <Link href="/auth/forgot-password" className="flex justify-end w-[103%] 2xl:w-full">
                <p className="text-white opacity-80 text-[14px] leading-[18px] font-medium pt-[10px]">Forgot Password?</p>
              </Link>
            </div>
          </>
        );

      case "signup":
        return (
          <>
            <div className="max-w-[1100px]">
              <label className="text-white text-sm font-medium leading-[18px]">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className={`w-full mt-[10px] text-[14px] bg-gradient-to-b from-[#202020] to-[#101010] border ${errors.email ? 'border-red-500' : 'border-[#404040]'} rounded-xl px-4 py-3 text-white  focus:outline-none transition-colors`}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-1 max-w-[1100px]">
              <label className="text-white text-sm font-medium leading-[18px]">Password</label>
              <div className="relative">
                <input
                  type={!showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full mt-[10px] text-[14px] bg-gradient-to-b from-[#202020] to-[#101010] border ${errors.password ? 'border-red-500' : 'border-[#404040]'} rounded-xl px-4 py-3 pr-12 text-white  focus:outline-none transition-colors`}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-6 transform  text-[#999999] "
                >
                  {!showPassword ? (
                    <Image
                      src="/images/eye-off.png"
                      alt="hide password"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </>
        );

      case "forgot":
        return (
          <div className="space-y-1 max-w-[1100px]">
            <label className="text-white text-sm font-medium leading-[18px]">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className={`w-full mt-[10px] text-[14px] bg-gradient-to-b from-[#202020] to-[#101010] border ${errors.email ? 'border-red-500' : 'border-[#404040]'} rounded-lg px-4 py-3 text-white  focus:outline-none transition-colors`}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        );

      case "otp":
        return (
          <div className="space-y-4">
            <div className="flex gap-3">
              {formData.otp?.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className={`w-[48px] h-[48px] sm:w-[72px] sm:h-[60px] md:w-[93px] md:h-[64px] 
              mt-[30px] sm:mt-[40px] md:mt-[60px] 
              bg-gradient-to-b from-[#202020] to-[#101010] border 
              ${errors.otp ? 'border-red-500' : 'border-[#404040]'} 
              rounded-xl text-center text-white text-lg font-semibold  
              focus:outline-none transition-colors`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />

              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm text-center">{errors.otp}</p>
            )}
            <p className="text-white pt-[40px] max-w-[602px] text-center font-bold text-[28px] leading-[32px]">
              {formatTime(timeLeft)}
            </p>

            <div
              className="font-semibold max-w-[602px] text-[18px] leading-[22px] text-[#EFFC76] text-center pt-[40px] flex !justify-center"
            >
              <button onClick={handleResend} disabled={!showResend} className={`"text-center  underline ${showResend ? "!cursor-pointer" : "cursor-not-allowed opacity-50"}"`}> Resend Code </button>
            </div>
          </div>
        );

      case "reset-password":
        return (
          <>
            <div className="space-y-1 max-w-[1100px]">
              <label className="text-white text-sm font-medium  leading-[18px]">New password</label>
              <div className="relative">
                <input
                  type={!showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className={`w-full mt-[10px] bg-gradient-to-b from-[#202020] to-[#101010] border ${errors.password ? 'border-red-500' : 'border-[#404040]'} rounded-xl px-4 py-3 pr-12 text-white  focus:outline-none transition-colors`}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 cursor-pointer top-6 transform  text-gray-500 hover:text-white"
                >
                  {!showPassword ? <Image
                    src="/images/eye-off.png"
                    alt="hide password"
                    width={20}
                    height={20}
                  /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="space-y-1 max-w-[1100px]">
              <label className="text-white text-sm font-medium leading-[18px] ">Confirm new password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className={`w-full bg-gradient-to-b mt-[10px] from-[#202020] to-[#101010] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#404040]'} rounded-xl px-4 py-3 pr-12 text-white  focus:outline-none transition-colors`}
                  value={formData.confirmPassword || ""}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute cursor-pointer right-4 top-6 transform  text-gray-500 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <Image
                      src="/images/eye-off.png"
                      alt="hide password"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </>
        );
    }
  };
  const shapesCount = 9;

  return (
    <div className="min-h-screen  bg-[#121315] xl:gap-[80px] flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="flex items-center px-[20px] md:pl-[80px] py-8  lg:w-1/2">
        <div className="w-full max-w-[640px] space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 ">
            <Image
              src="/images/auth-logo.png"
              alt="logo"
              width={100}
              height={58}
            />
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl text-white leading-[48px] font-bold text-[30px] sm:text-[40px]">
              {currentConfig.title}
            </h1>
            <p className="text-white opacity-60 font-regular text-[20px] leading-[24px] pt-[12px]">
              {currentConfig.subtitle}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFields()}

            {/* Submit Button */}
            {mode === "signup" && (onGoogleLogin || onAppleLogin) && (
              <div className="space-y-4">
                {/* Divider */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-[#121315] via-white to-[#121315]"></div>
                  <span className="text-white opacity-60 text-sm">or</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#121315] via-white to-[#121315]"></div>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-[18px]">
                  {onGoogleLogin && (
                    <button
                      type="button"
                      onClick={onGoogleLogin}
                      disabled={socialLoading}
                      className="w-full bg-[#252628] cursor-pointer  rounded-[8px] px-4 py-3 text-white hover:border-[#505050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                      <Image
                        src="/images/google.png"
                        alt="Google"
                        width={20}
                        height={20}
                      />
                      <span className="font-medium  text-[16px]">
                        {socialLoading ? "Please wait..." : "Google"}
                      </span>
                    </button>
                  )}

                  {/* {onAppleLogin && (
              <button
                type="button"
                onClick={onAppleLogin}
                disabled={socialLoading}
                className="w-full cursor-pointer bg-[#252628] border border-[#404040] rounded-xl px-4 py-3 text-white hover:border-[#505050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[52px] flex items-center justify-center space-x-3"
              >
                <Image
                  src="/images/apple.png"
                  alt="Apple"
                  width={20}
                  height={20}
                />
                <span className="font-medium text-[16px]">
                  {socialLoading ? "Please wait..." : "Apple"}
                </span>
              </button>
            )} */}
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#EFFC76] yellow-btn mt-[40px] cursor-pointer text-[#101010] py-4 px-[40px] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-inner font-semibold text-[18px] leading-[22px] 
    ${mode === "login" ? "w-full" : "inline"}`}
            >
              {loading ? "Please wait..." : currentConfig.buttonText}
            </button>

            <div className={`py-[60px] ${mode === "signup" || mode === "login" || mode === "forgot" ? "block" : "hidden"}`}>
              <p className="text-white/60 font-regular text-[16px] leading-[20px]">   {mode === "signup" ? "Already have an account?" : mode === "forgot" ? "Remember your password?" : "Don't have an account?"} <Link className="text-[#EFFC76] font-bold" href={mode === "signup" || mode === "forgot" ? "/auth/login" : "/auth/signup"}>{mode === "signup" ? "Login" : mode === "forgot" ? "Login" : "Signup"}</Link> </p>
            </div>
          </form>

          {/* Social Login for Signup */}
        </div>
      </div>


      {/* Right Panel */}
      <div className="hidden lg:flex  rounded-2xl  flex relative z-[10] lg:w-1/2 items-end p-12 ">
        {/* Video background */}
        <video
          src="/videos/auth.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        />

        {/* Gradient array background */}
        <div className="absolute inset-0 flex blur-[1px] z-[1]">
          {[...Array(shapesCount)].map((_, i) => (
            <div key={i} className="flex-1">
              <div
                className="h-full w-full mix-blend-lighten"
                style={{
                  opacity: 0.68,
                  background:
                    "linear-gradient(77deg, rgba(255,255,255,0.2) 11.03%, rgba(255,255,255,0.00) 92.77%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex bg-[#202122] p-5 rounded-2xl items-center space-x-3">
            <Image
              src="/images/vector.png"
              alt="vector"
              width={48}
              height={48}
              className="z-[10]"
            />
            <div>
              <p className="text-white  font-regular text-[12px] md:text-[20px] max-w-[473px] leading-[24px]">
                Log in to list your property, manage your details, and earn your
                verified badge for more trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage Examples
const LoginPage = () => {
  const handleLogin = (data: FormData) => {
    console.log("Login:", data);
    // Make API call
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
};

const SignupPage = () => {
  const handleSignup = (data: FormData) => {
    console.log("Signup:", data);
    // Make API call
  };

  const handleGoogleSignup = () => {
    console.log("Google signup");
    // Handle Google signup
  };

  const handleAppleSignup = () => {
    console.log("Apple signup");
    // Handle Apple signup
  };

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
      onGoogleLogin={handleGoogleSignup}
      onAppleLogin={handleAppleSignup}
    />
  );
};

const OTPPage = () => {
  const handleOTP = (data: FormData) => {
    const otpCode = data.otp?.join("") || "";
    console.log("OTP:", otpCode);
    // Verify OTP
  };

  return <AuthForm mode="otp" onSubmit={handleOTP} />;
};

export default AuthForm;
export { LoginPage, SignupPage, OTPPage };