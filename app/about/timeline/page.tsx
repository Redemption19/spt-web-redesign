import { Metadata } from 'next'
import Image from 'next/image'
import { timelineEvents } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Our Timeline',
  description: 'Explore the history and growth of Standard Pensions Trust from our founding to the present day.',
}

export default function TimelinePage() {
  return (
    <div className="container-custom py-18">
      {/* Hero Section */}
      <div className="text-center mb-30 relative">
        <div className="absolute inset-0 -z-10 opacity-10">
          <Image 
            src="https://images.pexels.com/photos/269790/pexels-photo-269790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Ghana Map Background"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Our Journey Through the Years</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Since our founding, Standard Pensions Trust has grown steadily, expanding our services and reach to better serve Ghanaians in their retirement planning journey.
        </p>
      </div>
      
      {/* Timeline Section */}
      <section className="mb-16 relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
        
        <div className="space-y-24 relative">
          {timelineEvents.map((event, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <h3 className="text-2xl font-bold text-primary mb-2">{event.year}</h3>
                <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
              
              <div className="w-2/12 flex justify-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-background"></div>
                </div>
              </div>
              
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Looking Ahead Section */}
      <section className="bg-card border border-border/50 rounded-lg p-8 shadow-sm">
        <h2 className="text-3xl font-semibold mb-6">Looking Ahead</h2>
        <p className="text-lg text-muted-foreground mb-6">
          As we continue to grow, Standard Pensions Trust remains committed to innovation and excellence in pension administration. Our future plans include:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Expanding our digital services with AI-powered retirement planning tools</p>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Opening additional branches in underserved regions to improve accessibility</p>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Developing specialized pension products for informal sector workers</p>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <p className="text-muted-foreground">Enhancing our ESG (Environmental, Social, Governance) investment options</p>
          </li>
        </ul>
      </section>
    </div>
  )
}