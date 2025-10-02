import React from "react";
import AuthForm from "@/app/layout/auth-layout/AuthForm";
export default function Password() {
  return (
    <div>
      <AuthForm
        emptyemailmessage="Email address is required"
        wronginputmessage="Please enter a valid email address"
        title="Forgot Password"
        subtitle="Recover access to your account in a few simple steps."
        submitText="Send Link"
        showAlter={true}
        alterText="Remember your password?"
        linktext=" Login"
        link="/auth/login"
        mode="forgot"
        onSubmit={() => {
          window.location.href = "/auth/email-verification";
        }}
      />
    </div>
  );
}
