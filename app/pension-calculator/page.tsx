import { Metadata } from 'next'
import { PensionCalculator } from '@/components/pension-calculator'

export const metadata: Metadata = {
  title: 'Pension Calculator',
  description: 'Calculate your estimated pension benefits at retirement based on your current salary, age, and contribution levels.',
}

export default function PensionCalculatorPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pension Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Use our interactive pension calculator to estimate your monthly retirement income based on your current situation.
        </p>
      </div>
      
      <PensionCalculator />
      
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Understanding Your Pension Calculation</h2>
        <div className="space-y-6">
          <p>
            This calculator provides an estimate of your monthly pension at retirement based on your current
            age, salary, contribution percentage, and expected retirement age. The calculation includes:
          </p>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Mandatory Contributions (Tier 1 & 2)</h3>
            <p className="text-muted-foreground">
              The minimum mandatory contribution is 13.5% of your salary (5.5% from you and 8% from your employer).
              These contributions go to your basic pension fund and are invested until retirement.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Voluntary Contributions (Tier 3)</h3>
            <p className="text-muted-foreground">
              Any additional voluntary contributions you make provide tax benefits and significantly enhance your 
              retirement income. These contributions are also eligible for tax relief.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Important Notes</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>This calculator uses simplified assumptions and is meant for illustrative purposes only.</li>
              <li>Actual pension values will depend on investment performance, inflation rates, and regulatory changes.</li>
              <li>The calculation assumes consistent contributions throughout your working years.</li>
              <li>We recommend reviewing your pension plan regularly with a financial advisor.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}