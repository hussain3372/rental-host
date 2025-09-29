'use client'
import React from 'react';
import AuthForm from "@/app/auth-layout/AuthForm"

export default function Login() {
  return (
    <div>
       <AuthForm mode="login" showAlter={false} onSubmit={()=>window.location.href='/admin/dashboard'} />
    </div>
  )
}
