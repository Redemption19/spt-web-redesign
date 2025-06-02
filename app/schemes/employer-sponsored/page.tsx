"use client"

import { SchemeLayout } from "@/components/scheme-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmployerSponsoredPage() {
  return (
    <SchemeLayout
      title="Employer Sponsored Schemes"
      description="Standard Pensions Trust provides comprehensive trustee services for the 2nd & 3rd Tier pensions, allowing establishments full ownership of their scheme while enjoying the advantage of having a corporate trustee."
      features={[
        "Full scheme ownership for establishments",
        "Professional corporate trustee services",
        "Flexible fee structure based on specific parameters",
        "Comprehensive management of both Tier 2 & 3 pensions",
      ]}
    >
      <div className="mt-12">
        <Card className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              Fees for this scheme are negotiated and varied based on specific parameters tailored to each organization&apos;s needs and requirements. Contact our team for a detailed discussion of your organization&apos;s needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </SchemeLayout>
  )
}
