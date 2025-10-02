"use client";
import React from "react";
import AuthForm from "@/app/Layout/auth-layout/AuthForm";

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
        showAlter={true}
        alterText="Don’t have an account?"
        linktext=" SignUp"
        link="/auth/signup"
        mode="login"
        onSubmit={() => (window.location.href = "/dashboard")}
      />
    </div>
  );
}
