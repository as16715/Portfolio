import { Card, CardContent } from "@/components/ui/card"

export function ProjectsSection() {
  const projects = [
    {
      title: "Interactive Game Design",
      description: "Immersive gaming experiences with innovative mechanics and stunning visuals.",
      category: "Games",
      image: "/modern-game-interface-design.jpg",
    },
    {
      title: "Product Innovation",
      description: "User-centered product designs that solve real-world problems with elegance.",
      category: "Products",
      image: "/sleek-product-design-mockup.jpg",
    },
    {
      title: "Robotic Systems",
      description: "Cutting-edge robotics projects combining functionality with aesthetic appeal.",
      category: "Robots",
      image: "/futuristic-robot-design.jpg",
    },
    {
      title: "3D Asset Creation",
      description: "High-quality 3D models and environments for games and interactive media.",
      category: "3D Assets",
      image: "/3d-rendered-objects-and-environments.jpg",
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
              className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50"
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
                  <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
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
