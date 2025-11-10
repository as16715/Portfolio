"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectsSectionProps {
  selectedCategory?: string
}

export function ProjectsSection({ selectedCategory = "All Projects" }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Projects")

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory)
    }
  }, [selectedCategory])

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
      title: "All Routes Lead to death",
      description: "An interactive story where players navigate an empty stage haunted by memory and repetition. As the protagonist relives fragments of a forgotten crime, each choice draws her closer to uncovering the killer and to the inevitability of her own demise.",
      category: "Stories",
      image: "/story.webp",
      link: "https://ayshasalma.itch.io/all-routes-lead-to-death",
    },
    {
      title: "Campus Conspiracies",
      description: "A comedic scripted podcast, Campus Conspiracies follows an interviewer digging into how a student mysteriously aced a communication lab class uncovering absurd theories, over-the-top explanations, and campus-wide hilarity.",
      category: "Stories",
      image: "/podcast.webp",
      link: "https://ayshaalmheiri.github.io/CampusConspiracies-/index.html",
    },
    {
      title: "Professors Wrath",
      description: "An Interactive Storytelling comic where player choices determine survival of the scenario.",
      category: "Stories",
      image: "/Comic.webp",
      link: "https://maheat.github.io/comic/index.html",
    },
    {
      title: "Where's My cookie?",
      description: "An Interactive Storytelling Film where player choices determine survival of the scenario.",
      category: "Stories",
      image: "/Film.webp",
      link: "https://keys19.github.io/video_commlab/",
    },
    {
      title: "Memo The Recipe",
      description: "A memory cooking game where players need to remember the recipe to clear each round.",
      category: "Games",
      image: "/cooking game.webp",
      link: "https://ayshasalma.itch.io/guesstherecipe",
    },
    {
      title: "Maze Rush: Duel descent",
      description: "A two-player circular maze game emphasizing spatial precision and strategy, featuring power-ups, dynamic wall traps, and instant maze reset for rapid replay.",
      category: "Games",
      image: "/maze.webp",
      link: "https://ayshasalma.itch.io/maze-game-20",
    },
  ]

  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  // Filter projects based on selected category
  const filteredProjects = activeCategory === "All Projects" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const otherProjects = activeCategory === "All Projects" 
    ? [] 
    : projects.filter(project => project.category !== activeCategory)

  return (
    <section id="projects-section" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
            {activeCategory === "All Projects" ? "Featured" : activeCategory} <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {activeCategory === "All Projects" 
              ? "A collection of my creative work spanning games, products, robotics, 3D assets, and interactive stories."
              : `Showcasing my ${activeCategory.toLowerCase()} work`
            }
          </p>
        </div>

        {/* Filtered Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
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

        {/* Other Projects Section */}
        {otherProjects.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-bold text-balance">
                Other <span className="text-primary">Projects</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
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
        )}
      </div>
    </section>
  )
}