"use client"
import React from 'react'
import SubscriptionPlan from "./SubscriptionCard"
import NotificationPreferences from "./NotificationPreferences"
// import ApplyNowFilter from "./ApplyNowFilter"

export default function page() {
  return (
    <>
      <SubscriptionPlan/>
      <NotificationPreferences/>
      {/* <ApplyNowFilter/> */}
      </>
  )
}
