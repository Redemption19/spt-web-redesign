import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Linkedin } from 'lucide-react'
import { leadershipTeam } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Leadership Team',
  description: 'Meet the experienced professionals leading Standard Pensions Trust and guiding our mission to secure your financial future.',
}

export default function LeadershipPage() {
  return (
    <div className="container-custom py-12">
      {/* Intro Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Leadership</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet the professionals behind our pension services. Our leadership team brings decades of combined experience in finance, technology, and customer service to ensure we deliver the best retirement solutions for all Ghanaians.
        </p>
      </div>
      
      {/* Team Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((member, index) => (
            <Card key={index} className="overflow-hidden border-border/50">
              <div className="relative h-64 w-full">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-primary font-medium">{member.position}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
              <CardFooter>
                <Link href="https://linkedin.com" className="text-primary hover:text-primary/80 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Board of Trustees */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Board of Trustees</h2>
        <div className="bg-card border border-border/50 rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Dr. Kwame Adjei</h3>
              <p className="text-muted-foreground mb-6">
                Board Chairman, Former Deputy Governor of Bank of Ghana with over 30 years of experience in financial regulation and policy development.
              </p>
              
              <h3 className="text-xl font-medium mb-3">Mrs. Akua Danso</h3>
              <p className="text-muted-foreground mb-6">
                Independent Trustee, Chartered Accountant and Risk Management Specialist with extensive experience in corporate governance.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">Prof. Samuel Mensah</h3>
              <p className="text-muted-foreground mb-6">
                Independent Trustee, Professor of Economics and Finance at University of Ghana with expertise in pension systems and social security.
              </p>
              
              <h3 className="text-xl font-medium mb-3">Ms. Esi Oforiwaa</h3>
              <p className="text-muted-foreground">
                Member Representative Trustee, Labor Relations Expert with 15 years&apos; experience advocating for workers&apos; rights and benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="mb-16 text-center">
        <div className="bg-primary/5 rounded-lg p-10">
          <h2 className="text-3xl font-semibold mb-4">Our Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            With over 50 years of combined pension and finance experience, our leadership team brings unparalleled expertise to your retirement planning.
          </p>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="text-center">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
          <Link href="/contact">Contact Our Office</Link>
        </Button>
      </section>
    </div>
  )
}