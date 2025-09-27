"use client"

import type React from "react"

import Image from "next/image"
import { PaperGifText } from "./PaperGifText"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const skills = ["robots", "stories", "games", "3D assets"]
  const tiltRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!tiltRef.current || !isHovering) return

      const rect = tiltRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)

      setMousePosition({ x: deltaX, y: deltaY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovering])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const triggerPoint = windowHeight * 0.3 // Trigger when scrolled 30% of viewport height
      
      setIsScrolled(scrollY > triggerPoint)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tiltStyle = {
    transform: isHovering
      ? `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg) translateZ(50px)`
      : `perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)`,
    transition: isHovering ? "none" : "transform 0.3s ease-out",
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 opacity-60">
        <Image src="/pink-bgm.png" alt="" fill className="object-cover" priority />
      </div>

      {/* Top Left - Veil 1 (two characters) */}
      <div
        className="absolute -top-10 -left-10 w-80 h-96 collage-asset hover-asset"
        style={
          {
            transform: "rotate(-8deg)",
            "--original-rotation": "-8deg",
          } as React.CSSProperties
        }
      >
        <Image src="/veil-1.png" alt="" fill className="object-contain" />
      </div>

      {/* Top Right - Veil 3 (profile sketch) */}
      <div
        className="absolute -top-5 -right-5 w-72 h-80 collage-asset hover-asset"
        style={
          {
            transform: "rotate(12deg)",
            "--original-rotation": "12deg",
          } as React.CSSProperties
        }
      >
        <Image src="/veil-3.png" alt="" fill className="object-contain" />
      </div>

      {/* Bottom Left - Paris Stamp */}
      <div
        className="absolute -bottom-8 -left-8 w-64 h-72 collage-asset hover-asset"
        style={
          {
            transform: "rotate(6deg)",
            "--original-rotation": "6deg",
          } as React.CSSProperties
        }
      >
        <Image src="/paris-stamp.png" alt="" fill className="object-contain" />
      </div>

      {/* Bottom Right - Telephone Booth */}
      <div
        className="absolute -bottom-10 -right-10 w-56 h-80 collage-asset hover-asset"
        style={
          {
            transform: "rotate(-10deg)",
            "--original-rotation": "-10deg",
          } as React.CSSProperties
        }
      >
        <Image src="/telephone-booth.png" alt="" fill className="object-contain" />
      </div>

      {/* Middle Left - Veil 2 (casual pose) */}
      <div
        className="absolute top-1/3 -left-12 w-64 h-80 collage-asset hover-asset"
        style={
          {
            transform: "rotate(15deg)",
            "--original-rotation": "15deg",
          } as React.CSSProperties
        }
      >
        <Image src="/veil-2.png" alt="" fill className="object-contain" />
      </div>

      {/* Middle Right - Veil 4 (orange sketch) */}
      <div
        className="absolute top-1/2 -right-8 w-48 h-72 collage-asset hover-asset"
        style={
          {
            transform: "rotate(-18deg)",
            "--original-rotation": "-18deg",
          } as React.CSSProperties
        }
      >
        <Image src="/veil-4.png" alt="" fill className="object-contain" />
      </div>

      {/* Scattered stickers */}
      <div className="absolute top-20 left-1/4 w-32 h-32 collage-asset" style={{ transform: "rotate(25deg)" }}>
        <Image src="/sticker.png" alt="" fill className="object-contain" />
      </div>

      <div className="absolute bottom-32 right-1/4 w-28 h-28 collage-asset" style={{ transform: "rotate(-30deg)" }}>
        <Image src="/sticker-2.png" alt="" fill className="object-contain" />
      </div>

      {/* Central content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative mb-8 tilt-container" ref={tiltRef}>
            <div className="relative inline-block">
              <div
                className="relative w-[28rem] h-[28rem] mx-auto rounded-3xl overflow-hidden shadow-2xl tilt-element"
                style={tiltStyle}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Image
                  src="/me.jpg"
                  alt="Aysha's portrait"
                  width={448}
                  height={448}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative space-y-6">
            <div 
              className={`scrapbook-paper rounded-2xl p-8 shadow-lg transition-all duration-1000 ease-out ${
                isScrolled 
                  ? "opacity-100 translate-x-0 scale-100" 
                  : "opacity-0 -translate-x-128 scale-95"
              }`}
              style={{ transform: isScrolled ? "rotate(-1deg)" : "rotate(-1deg)" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight text-foreground">
                <span className="block mb-2">Hello!</span>
                <span className="text-primary text-5xl md:text-7xl">I'm Aysha!</span>
                <span className="block mt-2">It's nice to meet you!</span>
              </h1>
            </div>

            <div 
              className={`scrapbook-paper rounded-xl p-6 shadow-md transition-all duration-1000 ease-out delay-300 ${
                isScrolled 
                  ? "opacity-100 translate-x-0 scale-100" 
                  : "opacity-0 translate-x-128 scale-95"
              }`}
              style={{ transform: isScrolled ? "rotate(1deg)" : "rotate(1deg)" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-muted-foreground">
                <span>I design and make </span>
                <PaperGifText words={skills} className="text-primary font-bold align-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
