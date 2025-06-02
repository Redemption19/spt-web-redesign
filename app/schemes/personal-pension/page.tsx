"use client"

import { SchemeLayout } from "@/components/scheme-layout"

export default function PersonalPensionPage() {
  return (
    <SchemeLayout
      title="Best Personal Pensions Scheme (Tier 3)"
      description="A flexible long term investment scheme that guarantees contributors tax reliefs and functions as a financial vehicle for those who seek enhanced pension benefit."
      purpose="Designed for both formal and informal sector workers. Persons in the informal sector who are not covered by the mandatory Tier 1 & 2 can opt for the Tier 3. Contributors enjoy tax exemptions if withdrawals are done after 10 years for formal sector contributors (5 years for informal sector)."
      features={[
        "Guaranteed lump sum payment",
        "Tax reliefs for contributions up to 35% of gross salary",
        "Withdrawal options in line with Scheme rules",
        "Secure loans at competitive rates",
      ]}
    />
  )
}
