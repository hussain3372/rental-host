import AuthForm from "@/app/Layout/auth-layout/AuthForm";
import React from "react";

export default function Signup() {
  return (
    <div>
      <AuthForm
      emptyemailmessage="Email address is required"
        wronginputmessage="Please enter a valid email address"
        emptypasswordmessage="Please enter your password"
        title="Create Your Account"
        subtitle="Join us today and unlock your personalized experience."
        submitText="Create Account"
        showAlter={true}
        alterText="Already have an account?"
        linktext=" Login"
        link="/auth/login"
        mode="signup"
        onAppleLogin={() => {
          console.log("apple login");
        }}
        onGoogleLogin={() => {
          console.log("Google login");
        }}
        onSubmit={() => (window.location.href = "/auth/login")}
      />
    </div>
  );
}
