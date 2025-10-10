'use client'
import AuthForm from "@/app/Layout/auth-layout/AuthForm";
import { SignUp } from "@/app/api/auth/CreateUserAPI";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  otp?: string[];
}

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData: FormData) => {
    try {
      setLoading(true);
      
      if (!formData.firstName || !formData.lastName) {
        toast.error("First name and last name are required");
        return;
      }

      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      };
      
      const response = await SignUp(payload);
      
      // ✅ Simple type-safe approach
      if (response.success) {
        toast.success(response.message || "Account created successfully!");
        // window.location.href = "/auth/login";
      } else {
        toast.error(response.message || "Signup failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthForm
        emptyemailmessage="Email address is required"
        emptyfirstNamemessage="First name is required"
        emptylastNamemessage="Last name is required"
        wronginputmessage="Please enter a valid email address"
        emptypasswordmessage="Please enter your password"
        title="Create Your Account"
        subtitle="Join us today and unlock your personalized experience."
        submitText="Create Account"
        showAlter={true}
        alterText="Already have an account?"
        linktext=" Login"
        link="/auth/login"
        loading={loading}
        mode="signup"
        onAppleLogin={() => {
          console.log("apple login");
        }}
        onGoogleLogin={() => {
          console.log("Google login");
        }}
        onSubmit={handleSignup}
      />
    </div>
  );
}