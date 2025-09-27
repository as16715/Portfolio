import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <ProjectsSection />
    </main>
  )
}
