"use client"

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
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setHasLoaded(true), 100)
  }, [])

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
      setIsScrolled(window.scrollY > window.innerHeight * 0.3)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    setIsHovering(true)
    setTimeout(() => setShowTilt(true), 150)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
    setShowTilt(false)
  }

  const imageTiltStyle = {
    transform:
      showTilt && isHovering
        ? `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${
            -mousePosition.y * 12
          }deg) scale(1.05)`
        : `perspective(1000px) rotateY(0) rotateX(0) scale(1)`,
    transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
  }

  const textParallaxStyle = {
    transform:
      showTilt && isHovering
        ? `perspective(1000px) rotateY(${mousePosition.x * 18}deg) rotateX(${
            -mousePosition.y * 18
          }deg) translateZ(80px) translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 15}px)`
        : `perspective(1000px) rotateY(0) rotateX(0) translateZ(0) translateX(0) translateY(0)`,
    transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
  }

  // Determine animation direction based on position
  const getAnimationDirection = (style: any) => {
    const left = style.left ? parseFloat(String(style.left)) : null
    const right = style.right ? parseFloat(String(style.right)) : null
    const top = style.top ? parseFloat(String(style.top)) : null
    const bottom = style.bottom ? parseFloat(String(style.bottom)) : null

    // Determine primary direction based on position
    if (left !== null && left < 30) return "left" // From left edge
    if (right !== null && right < 30) return "right" // From right edge
    if (top !== null && top < 30) return "top" // From top edge
    if (bottom !== null && bottom < 30) return "bottom" // From bottom edge
    
    // For middle elements, choose based on horizontal position
    if (left !== null && left >= 50) return "right"
    if (left !== null && left < 50) return "left"
    if (right !== null && right >= 50) return "left"
    
    return "top" // Default
  }

  const getInitialTransform = (direction: string) => {
    switch (direction) {
      case "left":
        return "translateX(-150%)"
      case "right":
        return "translateX(150%)"
      case "top":
        return "translateY(-150%)"
      case "bottom":
        return "translateY(150%)"
      default:
        return "translateX(-150%)"
    }
  }

  const renderDecorative = (
    id: string,
    src: string,
    style: React.CSSProperties,
    alt: string,
    index: number
  ) => {
    const isDimmed = hoveredId !== null && hoveredId !== id
    const direction = getAnimationDirection(style)
    const initialTransform = getInitialTransform(direction)
    
    return (
      <div
        key={id}
        onMouseEnter={() => setHoveredId(id)}
        onMouseLeave={() => setHoveredId(null)}
        className="absolute transition-all duration-300 ease-out"
        style={{
          ...style,
          filter: isDimmed ? "brightness(0.5)" : "brightness(1)",
          opacity: hasLoaded ? 1 : 0,
          transform: hasLoaded 
            ? style.transform || "none"
            : `${initialTransform} ${style.transform || ""}`,
          transition: `all ${0.8 + index * 0.05}s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.03}s, filter 0.3s ease-out`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={Number(style.width) || 200}
          height={Number(style.height) || 200}
          loading="lazy"
          placeholder="blur"
          blurDataURL="/tiny-placeholder.png"
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  const decorativeElements = [
    { id: "veil1", src: "/veil-1.webp", style: { top: "45%", left: "23%", width: 320, height: 384, transform: "rotate(-8deg)", zIndex: 26 } },
    { id: "veil2", src: "/veil-2.webp", style: { top: "21%", right: "60%", width: 256, height: 320, transform: "rotate(10deg)", zIndex: 25 } },
    { id: "veil3", src: "/veil-3.webp", style: { top: "-3%", right: "38%", width: 288, height: 320, transform: "rotate(12deg)", zIndex: 15 } },
    { id: "veil4", src: "/veil-4.webp", style: { top: "-5%", right: "60%", width: 192, height: 288, zIndex: 25 } },
    { id: "veil5", src: "/veil-5.webp", style: { top: "20%", left: "65%", width: 240, height: 304, zIndex: 25 } },
    { id: "veil6", src: "/veil-6.webp", style: { top: "73%", right: "0%", width: 280, height: 350, zIndex: 15 } },
    { id: "veil7", src: "/veil-7.webp", style: { top: "12%", left: "-2%", width: 270, height: 340, transform: "rotate(-5deg)", zIndex: 16 } },
    { id: "veil8", src: "/veil-8.webp", style: { top: "60%", left: "-4%", width: 500, height: 500, transform: "rotate(0deg)", zIndex: 16 } },
    { id: "veil9", src: "/veil-9.webp", style: { top: "40%", right: "10%", width: 250, height: 310, transform: "rotate(-12deg)", zIndex: 26 } },
    { id: "veil10", src: "/veil-10.webp", style: { top: "0%", left: "80%", width: 280, height: 350, transform: "rotate(6deg)", zIndex: 18 } },
    { id: "veil11", src: "/veil-11.webp", style: { top: "33%", left: "-3%", width: 240, height: 300, transform: "rotate(-10deg)", zIndex: 17 } },
    { id: "stamp", src: "/paris-stamp.webp", style: { bottom: "65%", left: "65%", width: 256, height: 288, transform: "rotate(6deg)", zIndex: 15 } },
    { id: "cutout1", src: "/Cutout.webp", style: { top: "79%", left: "0%", width: 220, height: 280, transform: "scaleX(-1)", zIndex: 15 } },
    { id: "cutout2", src: "/cutout 2.webp", style: { top: "0%", left: "-2%", width: 220, height: 280, zIndex: 15 } },
    { id: "cutout3", src: "/cutout 3.webp", style: { top: "0%", right: "-5%", width: 220, height: 280, transform: "scaleX(-1)", zIndex: 15 } },
    { id: "cutout4", src: "/cutout 4.webp", style: { top: "-5%", left: "60%", width: 260, height: 300, transform: "rotate(6deg)", zIndex: 12 } },
    { id: "cutout5", src: "/cutout 5.webp", style: { top: "0%", left: "35%", width: 220, height: 280, zIndex: 14 } },
    { id: "cutout6", src: "/cutout 6.webp", style: { top: "25%", left: "10%", width: 300, height: 300, transform: "rotate(-5deg)", zIndex: 17 } },
    { id: "cutout7", src: "/cutout 7.webp", style: { top: "25%", left: "70%", width: 500, height: 500, zIndex: 14 } },
    { id: "wild", src: "/Wild.webp", style: { top: "80%", right: "75%", width: 240, height: 260, zIndex: 16 } },
    { id: "butterfly", src: "/butterfly.webp", style: { top: "20%", left: "80%", width: 150, height: 150, zIndex: 18 } },
    { id: "bouquet", src: "/bouquet.webp", style: { top: "60%", right: "0%", width: 240, height: 260, zIndex: 15 } },
    { id: "booth", src: "/telephone-booth.webp", style: { bottom: "35%", right: "64%", width: 224, height: 320, zIndex: 25 } },
    { id: "bgmLayer", src: "/bgm Layer.webp", style: { top: "0%", left: "45%", width: 260, height: 300, zIndex: 11 } },
    { id: "bgmLayer2", src: "/bgm layer 2.webp", style: { top: "0%", left: "0", width: 400, height: 400, zIndex: 9 } },
    { id: "layer2", src: "/layer 2.webp", style: { top: "0%", left: "28%", width: 260, height: 300, zIndex: 8 } },
    { id: "liberty", src: "/liberty.webp", style: { top: "38%", left: "55%", width: 240, height: 320, transform: "scaleX(-1)", zIndex: 25 } },
  ]

  return (
    <section className="min-h-screen relative overflow-hidden bg-background pt-20">
      {/* Background */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/pink-bgm.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Decorative elements */}
      {decorativeElements.map((item, index) => 
        renderDecorative(item.id, item.src, item.style, item.id, index)
      )}

      {/* Stickers */}
      <div
        className="absolute top-20 left-1/4 w-32 h-32 transition-all duration-1000 ease-out"
        style={{ 
          transform: hasLoaded ? "rotate(25deg)" : "translateY(-200%) rotate(25deg)",
          opacity: hasLoaded ? 1 : 0,
          transitionDelay: "0.5s",
          zIndex: 10 
        }}
      >
        <Image src="/sticker.png" alt="" fill className="object-contain" loading="lazy" />
      </div>
      <div
        className="absolute bottom-32 right-1/4 w-28 h-28 transition-all duration-1000 ease-out"
        style={{ 
          transform: hasLoaded ? "rotate(-30deg)" : "translateY(200%) rotate(-30deg)",
          opacity: hasLoaded ? 1 : 0,
          transitionDelay: "0.6s",
          zIndex: 10 
        }}
      >
        <Image src="/sticker-2.png" alt="" fill className="object-contain" loading="lazy" />
      </div>

      {/* Central content */}
      <div className="relative flex items-center justify-center min-h-screen px-6 py-20 pointer-events-none">
        <div className="max-w-2xl mx-auto text-center">
          {/* Portrait tilt with 3D parallax text overlay */}
          <div
            className="relative mb-8 tilt-container transition-all duration-500 ease-out"
            ref={tiltRef}
            style={{
              zIndex: isHovering ? 999 : 20,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className={`relative w-[28rem] h-[28rem] mx-auto rounded-3xl shadow-2xl pointer-events-auto cursor-none transition-all duration-500 ease-out ${
                isHovering ? "scale-105 shadow-[0_20px_60px_rgba(0,0,0,0.45)]" : "scale-100"
              }`}
              style={{ transformStyle: "preserve-3d", overflow: "visible" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Image Layer */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={imageTiltStyle}
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

              {/* Floating 3D Text Layer */}
              <div
                className="absolute left-1/2 top-0 pointer-events-none"
                style={{
                  ...textParallaxStyle,
                  transform: `translateX(-50%) translateY(-3rem) ${textParallaxStyle.transform}`,
                  zIndex: 100,
                  willChange: "transform",
                }}
              >
                <div className="relative inline-block px-4 py-2 rounded-md shadow-lg">
                  <Image
                    src="/layer 2.webp"
                    alt="text background"
                    fill
                    className="absolute inset-0 w-full h-full object-cover rounded-md opacity-90"
                  />
                  <div className="relative z-10 text-center">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#5d4e37] leading-tight whitespace-nowrap">
                      Aysha Salma
                    </h2>
                    <p className="text-sm md:text-base text-[#6b5b46] mt-1 font-medium whitespace-nowrap italic">
                      Interaction Design Artist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrapbook text boxes */}
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
                <span className="text-primary text-5xl md:text-7xl">
                  I'm Aysha!
                </span>
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