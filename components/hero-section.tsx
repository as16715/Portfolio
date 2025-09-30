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

  const tiltStyle = {
    transform:
      showTilt && isHovering
        ? `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${
            -mousePosition.y * 15
          }deg) translateZ(50px)`
        : `perspective(1000px) rotateY(0) rotateX(0) translateZ(0)`,
    transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
  }

  /** Shared rendering function for decorative/veil images */
  const renderDecorative = (
    id: string,
    src: string,
    style: React.CSSProperties,
    alt: string
  ) => {
    const isDimmed = hoveredId !== null && hoveredId !== id
    return (
      <div
        key={id}
        onMouseEnter={() => setHoveredId(id)}
        onMouseLeave={() => setHoveredId(null)}
        className="absolute transition-all duration-300 ease-out"
        style={{
          ...style,
          filter: isDimmed ? "brightness(0.5)" : "brightness(1)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={Number(style.width) || 200}
          height={Number(style.height) || 200}
          loading="lazy"
          placeholder="blur"
          blurDataURL="/tiny-placeholder.png" // small base64 or tiny image placeholder
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

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

      {/* Decorative & Veil Elements */}
      {[
        { id: "veil1", src: "/veil-1.webp", style: { top: "45%", left: "23%", width: 320, height: 384, transform: "rotate(-8deg)", zIndex: 26 } },
        { id: "veil2", src: "/veil-2.webp", style: { top: "21%", right: "60%", width: 256, height: 320, transform: "rotate(10deg)", zIndex: 25 } },
        { id: "veil3", src: "/veil-3.webp", style: { top: "-3%", right: "38%", width: 288, height: 320, transform: "rotate(12deg)", zIndex: 15 } },
        { id: "veil4", src: "/veil-4.webp", style: { top: "-5%", right: "60%", width: 192, height: 288, zIndex: 25 } },
        { id: "veil5", src: "/veil-5.webp", style: { top: "20%", left: "65%", width: 240, height: 304, zIndex: 25 } },
        { id: "veil6", src: "/veil-6.webp", style: { top: "73%", right: "0%", width: 280, height: 350, zIndex: 15 } },
        { id: "stamp", src: "/paris-stamp.webp", style: { bottom: "65%", left: "65%", width: 256, height: 288, transform: "rotate(6deg)", zIndex: 15 } },
        { id: "cutout1", src: "/Cutout.webp", style: { top: "79%", left: "0%", width: 220, height: 280, transform: "scaleX(-1)", zIndex: 15 } },
        { id: "cutout2", src: "/cutout 2.webp", style: { top: "0%", left: "-2%", width: 220, height: 280, zIndex: 15 } },
        { id: "cutout3", src: "/cutout 3.webp", style: { top: "0%", right: "-5%", width: 220, height: 280, transform: "scaleX(-1)", zIndex: 15 } },
        { id: "cutout4", src: "/cutout 4.webp", style: { top: "-5%", left: "60%", width: 260, height: 300, transform: "rotate(6deg)", zIndex: 12 } },
        { id: "cutout5", src: "/cutout 5.webp", style: { top: "0%", left: "35%", width: 220, height: 280, zIndex: 14 } },
        { id: "wild", src: "/Wild.webp", style: { top: "80%", right: "75%", width: 240, height: 260, zIndex: 15 } },
        { id: "booth", src: "/telephone-booth.webp", style: { bottom: "35%", right: "64%", width: 224, height: 320, zIndex: 25 } },
        { id: "bgmLayer", src: "/bgm Layer.webp", style: { top: "0%", left: "45%", width: 260, height: 300, zIndex: 11 } },
        { id: "layer2", src: "/layer 2.webp", style: { top: "0%", left: "28%", width: 260, height: 300, zIndex: 8 } },
        { id: "liberty", src: "/liberty.webp", style: { top: "38%", left: "55%", width: 240, height: 320, transform: "scaleX(-1)", zIndex: 25 } },
      ].map((item) => renderDecorative(item.id, item.src, item.style, item.id))}

      {/* Stickers (static) */}
      <div
        className="absolute top-20 left-1/4 w-32 h-32"
        style={{ transform: "rotate(25deg)", zIndex: 10 }}
      >
        <Image src="/sticker.png" alt="" fill className="object-contain" loading="lazy" />
      </div>
      <div
        className="absolute bottom-32 right-1/4 w-28 h-28"
        style={{ transform: "rotate(-30deg)", zIndex: 10 }}
      >
        <Image src="/sticker-2.png" alt="" fill className="object-contain" loading="lazy" />
      </div>

      {/* Central content */}
      <div className="relative flex items-center justify-center min-h-screen px-6 py-20 pointer-events-none">
        <div className="max-w-2xl mx-auto text-center">
          {/* Portrait tilt */}
          <div className="relative mb-8 tilt-container" ref={tiltRef} style={{ zIndex: 20 }}>
            <div
              className="relative w-[28rem] h-[28rem] mx-auto rounded-3xl overflow-hidden shadow-2xl pointer-events-auto cursor-none"
              style={tiltStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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

          {/* Scrapbook text boxes */}
          <div className="relative space-y-6 z-40">
            <div
              className={`scrapbook-paper rounded-2xl p-8 shadow-lg transition-all duration-1000 ease-out relative ${
                isScrolled ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-128 scale-95"
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
                isScrolled ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-128 scale-95"
              }`}
              style={{ transform: "rotate(1deg)" }}
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
