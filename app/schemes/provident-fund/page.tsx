"use client"

import { SchemeLayout } from "@/components/scheme-layout"

export default function ProvidentFundPage() {
  return (
    <SchemeLayout
      title="Best Provident Fund Scheme (Tier 3)"
      description="A fully funded and privately managed provident fund scheme that guarantees tax reliefs and serves as a financial vehicle for members who seek enhanced pension benefits."
      purpose="The scheme provides tax exemptions to scheme members if withdrawals are done after 10 years. The setting up of a Provident fund can be initiated either by the employer or employees in the formal sector or by mutual consensus by employees."
      features={[
        "Guaranteed lump sum payment",
        "Tax reliefs for contributions up to 35% of gross salary",
        "Withdrawal options in line with Scheme rules",
        "Secure loans at competitive rates",
      ]}
    />
  )
}
