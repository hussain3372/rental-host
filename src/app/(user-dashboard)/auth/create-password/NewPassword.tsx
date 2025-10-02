import React from 'react'
import AuthForm from "@/app/Layout/auth-layout/AuthForm";
export default function NewPassword() {
  return (
    <div>
      <AuthForm
        emptypasswordmessage="Please enter your password"
        title="Create New Password"
        subtitle="Set a strong new password to secure your account and continue."
        submitText="Reset Password"
        showAlter={true}
        mode="reset-password"
        onSubmit={() => (window.location.href = "/")}
      />
    </div>
  );
}
