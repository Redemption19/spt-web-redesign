"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Search, ArrowRight, Users, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { mockEvents } from '@/lib/mock-events';
import { cn } from '@/lib/utils';
import EventCountdown from '@/components/events/EventCountdown';

function formatEventDate(dateString: string) {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
}

function isEventSoldOut(event: typeof mockEvents[0]) {
  if (!event.registration?.maxParticipants || !event.registration?.registeredParticipants) return false;
  return event.registration.registeredParticipants >= event.registration.maxParticipants;
}

function getRegistrationStatus(event: typeof mockEvents[0]) {
  if (!event.registration?.maxParticipants || !event.registration?.registeredParticipants) return null;
  
  const { maxParticipants, registeredParticipants, waitingList } = event.registration;
  const availableSpots = maxParticipants - registeredParticipants;
  const isSoldOut = availableSpots <= 0;
  
  if (isSoldOut && waitingList) {
    return { type: 'waitlist', text: 'Join Waitlist' };
  } else if (isSoldOut) {
    return { type: 'sold-out', text: 'Sold Out' };
  } else if (availableSpots <= 10) {
    return { type: 'limited', text: `${availableSpots} spots left` };
  }
  
  return { type: 'available', text: 'Register Now' };
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={() => window.open(shareUrls.facebook, '_blank')}>
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.open(shareUrls.twitter, '_blank')}>
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.open(shareUrls.linkedin, '_blank')}>
        <Linkedin className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [showPastEvents, setShowPastEvents] = useState(false);

  const filteredUpcomingEvents = mockEvents.filter(event => {
    const isUpcoming = event.status === 'upcoming';
    const matchesSearch = searchTerm.toLowerCase().trim() === '' || 
                         event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventTypeFilter === 'all' || event.type === eventTypeFilter;
    const matchesRegion = regionFilter === 'all' || event.region === regionFilter;

    return isUpcoming && matchesSearch && matchesType && matchesRegion;
  });

  const filteredPastEvents = mockEvents.filter(event => {
    const isPast = event.status === 'past';
    const matchesSearch = searchTerm.toLowerCase().trim() === '' || 
                         event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventTypeFilter === 'all' || event.type === eventTypeFilter;
    const matchesRegion = regionFilter === 'all' || event.region === regionFilter;

    return isPast && matchesSearch && matchesType && matchesRegion;
  });

  // Find the next upcoming event for countdown
  const nextEvent = mockEvents.find(event => event.status === 'upcoming' && event.dateTime);

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="section-title">Events & Workshops</h2>
          <p className="section-subtitle mx-auto">
            Join us at our upcoming events to learn more about pension planning and financial wellness.
          </p>
        </div>

        {/* Next Event Countdown */}
        {nextEvent && nextEvent.dateTime && (
          <div className="mb-12">
            <Card className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl">Next Event</CardTitle>
                <CardDescription>{nextEvent.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <EventCountdown targetDateTime={nextEvent.dateTime} />
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Search and filter controls */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10"
                placeholder="Search events..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="physical">In-Person</SelectItem>
                  <SelectItem value="webinar">Virtual</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="max-w-7xl mx-auto mb-10">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {filteredUpcomingEvents.length === 0 && (
              <div className="text-center py-10 border border-border/50 rounded-lg bg-card/50">
                <h3 className="text-lg font-medium mb-2">No upcoming events found</h3>
                <p className="text-muted-foreground">Please try adjusting your search filters</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpcomingEvents.map((event) => (
                <Card key={event.id} className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group">
                  <div className="relative h-48 w-full overflow-hidden">
                    {event.banner ? (
                      <Image 
                        src={event.banner} 
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                        <Calendar className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className={event.type === 'webinar' ? 
                        "bg-accent text-white hover:bg-accent/90" : 
                        "bg-primary text-white hover:bg-primary/90"
                      }>
                        {event.type === 'webinar' ? 'Virtual' : 'In-Person'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/80 border-border">
                        {event.region === 'local' ? 'Local' : 
                         event.region === 'regional' ? 'Regional' : 'National'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <Link href={`/media/events/${event.slug}`} className="block hover:text-primary transition-colors">
                      <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{event.venue}</span>
                        </div>
                        {event.registration && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-accent" />
                            <span>{event.registration.registeredParticipants} / {event.registration.maxParticipants} registered</span>
                          </div>
                        )}
                      </div>

                      {/* Speakers Section */}
                      {event.speakers && event.speakers.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="text-sm font-medium mb-2">Featured Speakers:</h4>
                          <div className="flex flex-wrap gap-2">
                            {event.speakers.map((speaker, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                {speaker.photo && (
                                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                    <Image
                                      src={speaker.photo}
                                      alt={speaker.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <span className="text-sm">{speaker.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-4 flex items-center justify-between border-t">
                    <Button asChild variant="ghost" size="sm" className="group/button">
                      <Link href={`/media/events/${event.slug}`} className="flex items-center text-primary hover:text-primary/90">
                        {getRegistrationStatus(event)?.text || 'Learn More'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                      </Link>
                    </Button>
                    <ShareButtons 
                      url={`${process.env.NEXT_PUBLIC_BASE_URL}/media/events/${event.slug}`} 
                      title={event.title}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            {filteredPastEvents.length === 0 && (
              <div className="text-center py-10 border border-border/50 rounded-lg bg-card/50">
                <h3 className="text-lg font-medium mb-2">No past events found</h3>
                <p className="text-muted-foreground">Please try adjusting your search filters</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPastEvents.map((event) => (
                <Card key={event.id} className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group">
                  <div className="relative h-48 w-full overflow-hidden">
                    {event.banner ? (
                      <Image 
                        src={event.banner} 
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                        <Calendar className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-background/80 border-border">
                        {event.type === 'webinar' ? 'Virtual' : 'In-Person'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-muted text-foreground border border-border/50">
                        Archive
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <Link href={`/media/events/${event.slug}`} className="block hover:text-primary transition-colors">
                      <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      {/* Archive Materials */}
                      {event.archive && (
                        <div className="border-t pt-4">
                          <h4 className="text-sm font-medium mb-2">Available Materials:</h4>
                          <div className="space-y-2">
                            {event.archive.presentations?.map((presentation, idx) => (
                              <div key={idx} className="text-sm text-accent">
                                • {presentation.label}
                              </div>
                            ))}
                            {event.archive.videos?.map((video, idx) => (
                              <div key={idx} className="text-sm text-accent">
                                • {video.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Testimonials */}
                      {event.testimonials && event.testimonials.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="text-sm font-medium mb-2">Attendee Feedback:</h4>
                          <div className="space-y-2">
                            {event.testimonials.map((testimonial, idx) => (
                              <blockquote key={idx} className="text-sm italic text-muted-foreground">
                                "{testimonial.quote}"
                                <footer className="text-xs mt-1">- {testimonial.author}</footer>
                              </blockquote>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-4 flex items-center justify-between border-t">
                    <Button asChild variant="ghost" size="sm" className="group/button">
                      <Link href={`/media/events/${event.slug}`} className="flex items-center text-primary hover:text-primary/90">
                        View Archive
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                      </Link>
                    </Button>
                    <ShareButtons 
                      url={`${process.env.NEXT_PUBLIC_BASE_URL}/media/events/${event.slug}`} 
                      title={event.title}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}