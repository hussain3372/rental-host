// import React from 'react'
import AuthForm from "@/app/layout/auth-layout/AuthForm";
// import toast from 'react-hot-toast'
export default function NewPassword() {
  return (
    <div>
      <AuthForm
        emptypasswordmessage="Please enter your password"
        title="Create New Password"
        subtitle="Set a strong new password to secure your account and continue."
        submitText="Reset Password"
        showAlter={false}
        mode="reset-password"
        onSubmit={() => (window.location.href = "/admin/dashboard")}
      />
    </div>
  );
}
