"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import type * as RadixSelect from "@radix-ui/react-select"
import type * as RadixRadioGroup from "@radix-ui/react-radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { testimonials, testimonialCategories, type Testimonial } from "@/lib/testimonials-data"
import { TestimonialCard } from "@/components/testimonial-card"

type Category = (typeof testimonialCategories)[number]["value"]
type Rating = "all" | "4" | "5"

export default function TestimonialsPage(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [selectedRating, setSelectedRating] = useState<Rating>("all")

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as Category)
  }

  const handleRatingChange = (value: string) => {
    setSelectedRating(value as Rating)
  }

  const filteredTestimonials = testimonials
    .filter((t: Testimonial) => selectedCategory === "all" || t.category === selectedCategory)
    .filter((t: Testimonial) => selectedRating === "all" || t.rating === parseInt(selectedRating))
    .sort((a: Testimonial, b: Testimonial) => b.rating - a.rating)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-background border-b">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Client Success Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how Standard Pensions Trust has helped businesses and individuals 
              across Ghana secure their financial future through expert pension management 
              and dedicated customer service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/50 border-b sticky top-0 z-10 backdrop-blur-sm">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {testimonialCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <RadioGroup
              defaultValue="all"
              value={selectedRating}
              onValueChange={handleRatingChange}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Ratings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="five" />
                <Label htmlFor="five">5 Stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="four" />
                <Label htmlFor="four">4 Stars</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                No testimonials found for the selected filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
