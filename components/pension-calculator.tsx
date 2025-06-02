"use client"

import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { calculatePensionEstimate, calculateTier3Benefit, formatCurrency } from '@/lib/utils'

export function PensionCalculator() {
  const [age, setAge] = React.useState(30)
  const [salary, setSalary] = React.useState(5000)
  const [contributionPercentage, setContributionPercentage] = React.useState(13.5)
  const [additionalContribution, setAdditionalContribution] = React.useState(5)
  const [retirementAge, setRetirementAge] = React.useState(60)
  
  const [monthlyPension, setMonthlyPension] = React.useState(0)
  const [additionalPension, setAdditionalPension] = React.useState(0)
  const [showResults, setShowResults] = React.useState(false)
  
  const calculatePension = () => {
    const yearsToRetirement = retirementAge - age
    const basicMonthlyPension = calculatePensionEstimate(age, salary, contributionPercentage, retirementAge)
    const additionalMonthlyBenefit = calculateTier3Benefit(salary, additionalContribution, yearsToRetirement)
    
    setMonthlyPension(basicMonthlyPension)
    setAdditionalPension(additionalMonthlyBenefit)
    setShowResults(true)
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Enter your details to calculate your estimated pension.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="age">Current Age: {age}</Label>
                </div>
                <Slider
                  id="age"
                  min={18}
                  max={55}
                  step={1}
                  value={[age]}
                  onValueChange={(value) => setAge(value[0])}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="salary">Monthly Salary (GHS)</Label>
                <Input
                  id="salary"
                  type="number"
                  min={500}
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="input-field"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="contribution">Mandatory Contribution: {contributionPercentage}%</Label>
                </div>
                <Slider
                  id="contribution"
                  min={13.5}
                  max={20}
                  step={0.5}
                  value={[contributionPercentage]}
                  onValueChange={(value) => setContributionPercentage(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Mandatory contribution is 13.5% minimum (5.5% employee + 8% employer)
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="additional">Additional Tier 3 Contribution: {additionalContribution}%</Label>
                </div>
                <Slider
                  id="additional"
                  min={0}
                  max={20}
                  step={1}
                  value={[additionalContribution]}
                  onValueChange={(value) => setAdditionalContribution(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Voluntary contributions provide tax benefits and additional retirement income
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="retirement-age">Retirement Age: {retirementAge}</Label>
                </div>
                <Slider
                  id="retirement-age"
                  min={55}
                  max={65}
                  step={1}
                  value={[retirementAge]}
                  onValueChange={(value) => setRetirementAge(value[0])}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={calculatePension} className="w-full">
                Calculate Estimated Pension
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          {showResults ? (
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Your Pension Estimate</CardTitle>
                <CardDescription>
                  Based on your current information and contribution rates
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                <div className="space-y-8 py-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      Estimated Monthly Pension (Tier 1 & 2)
                    </h3>
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      {formatCurrency(monthlyPension)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on {contributionPercentage}% contribution over {retirementAge - age} years
                    </p>
                  </div>
                  
                  {additionalContribution > 0 && (
                    <div className="text-center pt-4 border-t border-border">
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        Additional Monthly Pension (Tier 3)
                      </h3>
                      <div className="text-4xl font-bold text-accent">
                        {formatCurrency(additionalPension)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Based on {additionalContribution}% additional voluntary contribution
                      </p>
                    </div>
                  )}
                  
                  <div className="text-center pt-4 border-t border-border">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      Total Monthly Pension
                    </h3>
                    <div className="text-5xl font-bold">
                      {formatCurrency(monthlyPension + additionalPension)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Estimated at retirement age {retirementAge}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  This is an estimate. Actual pension values may vary based on investment performance, 
                  inflation, and regulatory changes.
                </p>
                <Button variant="outline" onClick={() => setShowResults(false)} className="w-full">
                  Update Calculation
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-8 text-center bg-muted/30">
              <div className="max-w-sm mx-auto">
                <h3 className="text-xl font-medium mb-4">Your Pension Results</h3>
                <p className="text-muted-foreground mb-8">
                  Enter your information and click calculate to see your estimated monthly pension at retirement.
                </p>
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                  <div className="h-24 w-full rounded-md bg-muted animate-pulse" />
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}