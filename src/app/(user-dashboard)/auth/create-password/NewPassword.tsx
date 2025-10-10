"use client"
import React, { useState } from 'react'
import AuthForm from "@/app/Layout/auth-layout/AuthForm";
import { CreatePassword } from '@/app/api/auth/CreatePasswordAPI';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  otp?: string[];
}

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
  
  const handlePassword = async (formData: FormData) => {
    try {
      setLoading(true);
      
      // Get token from URL parameters
      const token = Cookies.get('token') || '';
      
      if (!token) {
        toast.error("Invalid or missing reset token");
        return;
      }

      // Validate that passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await CreatePassword({
        token: token,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword || ''
      });
      
      if (response.success) {
        toast.success(response.message || "Password reset successful!");
        window.location.href = "/dashboard";
      } else {
        toast.error(response.message || "Password reset failed");
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
        emptypasswordmessage="Please enter your password"
        title="Create New Password"
        subtitle="Set a strong new password to secure your account and continue."
        submitText="Reset Password"
        showAlter={true}
        loading={loading}
        mode="reset-password"
        onSubmit={handlePassword}
      />
    </div>
  );
}