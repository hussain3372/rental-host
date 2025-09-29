'use client'
import React from 'react';
import AuthForm from "@/app/auth-layout/AuthForm"

export default function Login() {
  return (
    <div>
       <AuthForm showAlter={true} mode="login" onSubmit={()=>window.location.href='/dashboard'} />
    </div>
  )
}
