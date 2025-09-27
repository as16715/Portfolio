"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function Navigation() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)

  const projectCategories = ["Game Projects", "3D Fabrication", "Stories", "Robots", "All Projects"]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-12">
          {/* Home */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-lg font-medium text-foreground hover:text-primary transition-colors">Home</span>
            <div className="w-6 h-6 transition-transform group-hover:scale-110">🌸</div>
          </div>

          {/* Projects with Dropdown */}
          <div className="relative">
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            >
              <span className="text-lg font-medium text-foreground hover:text-primary transition-colors">Projects</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isProjectsOpen ? "rotate-180" : ""}`} />
              <div className="w-6 h-6 transition-transform group-hover:scale-110">🌺</div>
            </div>

            {isProjectsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg min-w-[180px] overflow-hidden">
                {projectCategories.map((category, index) => (
                  <div
                    key={category}
                    className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors text-sm font-medium text-foreground hover:text-primary"
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-lg font-medium text-foreground hover:text-primary transition-colors">Contact</span>
            <div className="w-6 h-6 transition-transform group-hover:scale-110">🌻</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
