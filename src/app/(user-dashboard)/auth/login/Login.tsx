'use client'
import React from 'react';
import AuthForm from "@/app/auth-layout/AuthForm"

export default function Login() {
  return (
    <div>
       <AuthForm mode="login" onSubmit={()=>window.location.href='/'} />
    </div>
  )
}
