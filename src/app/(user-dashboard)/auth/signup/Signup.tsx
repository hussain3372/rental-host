import AuthForm from '@/app/auth-layout/AuthForm'
import React from 'react'

export default function Signup() {
  return (
    <div>
      <AuthForm showAlter={true} mode='signup' onAppleLogin={()=>{console.log("apple login")}} onGoogleLogin={()=>{console.log("Google login")}} onSubmit={()=>window.location.href="/auth/login"}/>
    </div>
  )
}