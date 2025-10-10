import AuthForm from "@/app/Layout/auth-layout/AuthForm";
import React from "react";
export default function Password() {
  const handleSubmit = ()=>{
    window.location.href = "/admin/dashboard"
  }
  return (
    <div>
      <AuthForm
        emptyemailmessage="Email address is required"
        wronginputmessage="Please enter a valid email address"
        showAlter={true}
        title="Forgot Password"
        subtitle="Recover access to your account in a few simple steps."
        submitText="Send Link"
        alterText="Remember your password?"
        linktext=" Login"
        link="/admin/auth/login"
        mode="forgot"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
