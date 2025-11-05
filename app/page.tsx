"use client"

import { useState } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects")

  return (
    <main className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation onCategorySelect={setSelectedCategory} />
      <HeroSection />
      <ProjectsSection selectedCategory={selectedCategory} />
      <ContactForm />
    </main>
  )
}