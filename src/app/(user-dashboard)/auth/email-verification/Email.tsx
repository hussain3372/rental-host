import React from 'react'
import AuthForm from '@/app/auth-layout/AuthForm'
export default function Email() {
  return (
    <div>
      <AuthForm mode='otp' onSubmit={()=>window.location.href="/auth/create-password"} />
    </div>
  )
}
