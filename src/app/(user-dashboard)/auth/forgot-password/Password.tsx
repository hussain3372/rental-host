import React from 'react'
import AuthForm from '@/app/auth-layout/AuthForm'
export default function Password() {
  return (
    <div>
<AuthForm
showAlter={true}
  mode="forgot"
  onSubmit={() => {
    window.location.href = "/auth/email-verification";
  }}
/>
    </div>
  )
}
