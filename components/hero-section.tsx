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
  const [showTilt, setShowTilt] = useState(false)

  // Mouse tilt effect
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

  // Scroll animation trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const triggerPoint = window.innerHeight * 0.3
      setIsScrolled(scrollY > triggerPoint)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hover tilt delay
  const handleMouseEnter = () => {
    setIsHovering(true)
    setTimeout(() => setShowTilt(true), 150)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
    setShowTilt(false)
  }

  const tiltStyle = {
    transform:
      showTilt && isHovering
        ? `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg) translateZ(50px)`
        : `perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)`,
    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-background pt-20">
      {/* Background */}
      <div className="absolute inset-0 opacity-60">
        <Image src="/pink-bgm.png" alt="" fill className="object-cover" priority />
      </div>

      {/* Decorative Veils */}
      {[
        { src: "/veil-1.png", top: "45%", left: "23%", w: 320, h: 384, rot: "-8deg", z: 26 },
        { src: "/veil-2.png", top: "21%", right: "60%", w: 256, h: 320, rot: "10deg", z: 25 },
        { src: "/veil-3.png", top: "-3%", right: "38%", w: 288, h: 320, rot: "12deg", z: 15 }, // behind me.jpg
        { src: "/veil-4.png", top: "-5%", right: "60%", w: 192, h: 288, rot: "0deg", z: 25 },
        { src: "/veil-5.png", top: "20%", left: "65%", w: 240, h: 304, rot: "0deg", z: 25 },
        { src: "/veil-6.png", top: "73%", right: "0%", w: 280, h: 350, rot: "0deg", z: 15 }, // behind me.jpg
      ].map((veil, i) => (
        <div
          key={i}
          className="absolute pointer-events-auto cursor-none transition-transform duration-300 ease-out hover:scale-110"
          style={{
            top: veil.top,
            left: veil.left,
            right: veil.right,
            width: `${veil.w}px`,
            height: `${veil.h}px`,
            transform: `rotate(${veil.rot})`,
            zIndex: veil.z,
          }}
        >
          <Image
            src={veil.src}
            alt={`Veil ${i + 1}`}
            width={veil.w}
            height={veil.h}
            className="w-full h-full object-contain pointer-events-auto"
          />
        </div>
      ))}

      {/* Other Decorative Elements */}
      <div
        className="absolute transition-transform duration-300 ease-out hover:scale-110"
        style={{
          bottom: "70%",
          left: "60%",
          width: "256px",
          height: "288px",
          transform: "rotate(6deg)",
          zIndex: 15, // behind me.jpg
        }}
      >
        <Image
          src="/paris-stamp.png"
          alt="Paris Stamp"
          width={256}
          height={288}
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="absolute transition-transform duration-300 ease-out hover:scale-110"
        style={{
          bottom: "35%",
          right: "64%",
          width: "224px",
          height: "320px",
          zIndex: 25, // in front of me.jpg
        }}
      >
        <Image
          src="/telephone-booth.png"
          alt="Telephone Booth"
          width={224}
          height={320}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Stickers (always behind me.jpg) */}
      <div
        className="absolute top-20 left-1/4 w-32 h-32"
        style={{ transform: "rotate(25deg)", zIndex: 10 }}
      >
        <Image src="/sticker.png" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute bottom-32 right-1/4 w-28 h-28"
        style={{ transform: "rotate(-30deg)", zIndex: 10 }}
      >
        <Image src="/sticker-2.png" alt="" fill className="object-contain" />
      </div>

      {/* Central content */}
      <div className="relative flex items-center justify-center min-h-screen px-6 py-20 pointer-events-none">
        <div className="max-w-2xl mx-auto text-center">
          {/* Portrait tilt (z-20) */}
          <div className="relative mb-8 tilt-container" ref={tiltRef} style={{ zIndex: 20 }}>
            <div
              className="relative w-[28rem] h-[28rem] mx-auto rounded-3xl overflow-hidden shadow-2xl tilt-element pointer-events-auto cursor-none"
              style={tiltStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src="/me.jpg"
                alt="Aysha's portrait"
                width={448}
                height={448}
                className="w-full h-full object-cover pointer-events-auto"
                priority
              />
            </div>
          </div>

          {/* Scrapbook text boxes (z-40 always on top) */}
          <div className="relative space-y-6 z-40">
            <div
              className={`scrapbook-paper rounded-2xl p-8 shadow-lg transition-all duration-1000 ease-out relative ${
                isScrolled
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 -translate-x-128 scale-95"
              }`}
              style={{ transform: "rotate(-1deg)" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                <span className="block mb-2">Hello!</span>
                <span className="text-primary text-5xl md:text-7xl">I'm Aysha!</span>
                <span className="block mt-2">It's nice to meet you!</span>
              </h1>
            </div>

            <div
              className={`scrapbook-paper rounded-xl p-6 shadow-md transition-all duration-1000 ease-out delay-300 relative ${
                isScrolled
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-128 scale-95"
              }`}
              style={{ transform: "rotate(1deg)" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-muted-foreground">
                <span>I design and make </span>
                <PaperGifText
                  words={skills}
                  className="text-primary font-bold align-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
