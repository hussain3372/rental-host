"use client";
import React from "react";
import AuthForm from "@/app/layout/auth-layout/AuthForm";

export default function Login() {
  return (
    <div>
      <AuthForm
        emptyemailmessage="Email address is required"
        wronginputmessage="Please enter a valid email address"
        emptypasswordmessage="Please enter your password"
        title="Welcome Back!"
        subtitle="Sign in to explore your personalized dashboard."
        submitText="Login"
        forgotlink="/admin/auth/forgot-password"
        mode="login"
        showAlter={false}
        onSubmit={() => (window.location.href = "/admin/dashboard")}
      />
    </div>
  );
}
