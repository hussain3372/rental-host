"use client";
import React, { useState } from "react";
import AuthForm from "@/app/Layout/auth-layout/AuthForm";
import toast from "react-hot-toast";
import { Login } from "@/app/api/auth/LoginAPI";

interface LoginFormData {
  email: string;
  password: string;
} 

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: LoginFormData) => {
    try {
      setLoading(true);

      if (!formData.email || !formData.password) {
        toast.error("Email and password are required");
        return;
      }

      const response = await Login({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", response); // Debug log

      if (response.success) {
        toast.success(response.message || "Login successful!");
        // Redirect after successful login
        // window.location.href = "/admin/dashboard";
      } else {
        // This should now show the actual error message
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login error:", error.message);
        toast.error(error?.message || "Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthForm
        emptyemailmessage="Email address is required"
        wronginputmessage="Please enter a valid email address"
        emptypasswordmessage="Please enter your password"
        title="Welcome Back!"
        subtitle="Sign in to explore your personalized dashboard."
        submitText="Login"
        showAlter={true}
        alterText="Don't have an account?"
        linktext="Sign up"
        loading={loading}
        link="/auth/signup"
        mode="login"
        onSubmit={handleLogin}
      />
    </div>
  );
}