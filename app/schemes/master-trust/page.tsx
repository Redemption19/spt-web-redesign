"use client"

import { SchemeLayout } from "@/components/scheme-layout"

export default function MasterTrustPage() {
  return (
    <SchemeLayout
      title="Best Pensions Master Trust Scheme (Tier 2)"
      description="A mandatory 5% contribution of basic salary which pays out a lump sum benefit to contributors at retirement or to a nominated beneficiary when the contributor dies before attaining retirement age."
      purpose="To provide income security at retirement to contributors. The scheme is mandatory and has no withdrawal option until attainment of retirement age."
      features={[
        "Superior investment returns on pension contributions",
        "Assignment of Tier 2 to secure a primary residential facility",
        "Discounts granted on insurance cover with Best Assurance",
      ]}
    />
  )
}
