// import React from 'react'
import AuthForm from "@/app/auth-layout/AuthForm"
// import toast from 'react-hot-toast'
export default function NewPassword() {
  return (
    <div>
      <AuthForm showAlter={true} mode='reset-password' onSubmit={()=>window.location.href = '/'} />
    </div>
  )
}
