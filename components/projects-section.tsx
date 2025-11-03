"use client"

import { Card, CardContent } from "@/components/ui/card"

export function ProjectsSection() {
  const projects = [
    {
      title: "Capstone",
      description: "Explore my progress into project Inhuman, a robotic installation artwork to be showcased in spring 2026",
      category: "Robots",
      image: "/capstone.webp",
      link: "https://www.notion.so/Interactive-Media-Capstone-2026-263a9591f3f9804c8687edba212d5c1b",
    },
    {
      title: "Catch the Horse",
      description: "A hybrid interactive system integrating ultrasonic sensing, digital gameplay, and real-time mechanical output to investigate embodied control feedback, and player responsiveness.",
      category: "Games",
      image: "/horse game.webp",
      link: "https://www.notion.so/Catch-the-Horse-Bridging-Kinetic-Input-and-Digital-Response-in-Interactive-Design-2a0a9591f3f980b9a291c615b1f11cd1?source=copy_link",
    },
    {
      title: "How Fairies play the piano",
      description: "An interactive light-based piano that blends analog sensing and digital sound, using a glowing wand and photoresistors to control notes and octaves through light intensity.",
      category: "Products",
      image: "/piano.webp",
      link: "https://www.notion.so/Fairy-Piano-2a0a9591f3f98032b594c886accbf492?source=copy_link",
    },
    {
      title: "labyrinth game",
      description: "A competitive two-player maze game inspired by Greek mythology, featuring dynamic labyrinth generation, collision detection, and real-time elimination — where only one player can survive the ever-changing maze.",
      category: "Games",
      image: "/labyrinth.webp",
      link: "https://www.notion.so/Labyrinth-Game-2a0a9591f3f9801788a7dec10b3d0c35?source=copy_link",
    },
    {
      title: "Interactive Storytelling",
      description: "Compelling narratives brought to life through interactive digital experiences.",
      category: "Stories",
      image: "/digital-storytelling-interface.jpg",
    },
    {
      title: "Creative Exploration",
      description: "Experimental projects pushing the boundaries of design and technology.",
      category: "Exploration",
      image: "/abstract-creative-digital-art.jpg",
    },
  ]

  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my creative work spanning games, products, robotics, 3D assets, and interactive stories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 ${
                project.link ? 'cursor-pointer' : ''
              }`}
              onClick={() => handleProjectClick(project.link)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-primary font-medium">{project.category}</div>
                    {project.link && (
                      <svg 
                        className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}