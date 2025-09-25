"use client"
import React from 'react'
import SubscriptionPlan from "./SubscriptionCard"
import NotificationPreferences from "./NotificationPreferences"
import BillingHistoryTable from "./BillingHistoryTable"
export default function page() {
  return (
    <>
      <SubscriptionPlan />
      <BillingHistoryTable />
      <NotificationPreferences />
    </>
  )
}
