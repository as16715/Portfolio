"use client"

import { useEffect, useState, useRef } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorColor, setCursorColor] = useState("#c4895f") // Default darker peach
  const [cursorFill, setCursorFill] = useState("rgba(196, 137, 95, 0.3)") // Default semi-transparent fill
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const getComplementaryColor = (r: number, g: number, b: number): { border: string; fill: string } => {
    const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255

    // Check if it's in the peach/orange family
    const isPeachy = r > g && g > b && r > 180
    // Check if it's brownish
    const isBrownish = r > 100 && g > 60 && b < 100 && Math.abs(r - g) < 50
    // Check if it's very light (white/cream)
    const isLight = luminance > 0.85
    // Check if it's very dark (black/dark brown)
    const isDark = luminance < 0.2

    if (isPeachy) {
      // Peach areas -> Deep forest green
      return {
        border: "#2d5016",
        fill: "rgba(45, 80, 22, 0.3)"
      }
    } else if (isBrownish) {
      // Brown areas -> Soft sage green
      return {
        border: "#7d8471", 
        fill: "rgba(125, 132, 113, 0.3)"
      }
    } else if (isLight) {
      // White/cream areas -> Rich chocolate brown
      return {
        border: "#3c2415",
        fill: "rgba(60, 36, 21, 0.3)"
      }
    } else if (isDark) {
      // Black/dark areas -> Warm cream
      return {
        border: "#f5e6d3",
        fill: "rgba(245, 230, 211, 0.4)"
      }
    } else if (luminance > 0.6) {
      // Other light colors -> Warm terracotta
      return {
        border: "#c65d32",
        fill: "rgba(198, 93, 50, 0.3)"
      }
    } else {
      // Other medium/dark colors -> Soft peach
      return {
        border: "#e8a87c",
        fill: "rgba(232, 168, 124, 0.3)"
      }
    }
  }

  const samplePixelColor = async (x: number, y: number): Promise<{ r: number, g: number, b: number } | null> => {
    try {
      // Create a small canvas to capture the pixel
      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas')
        canvasRef.current.width = 1
        canvasRef.current.height = 1
      }
      
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return null

      // Use html2canvas-like approach - capture the area under the cursor
      // For now, let's try a different approach by checking what element we're over
      // and trying to get color information from it
      
      const elementUnderCursor = document.elementFromPoint(x, y)
      if (!elementUnderCursor) return null

      // Check if it's an image element
      if (elementUnderCursor instanceof HTMLImageElement) {
        // For images, we'll sample from the image data
        try {
          const rect = elementUnderCursor.getBoundingClientRect()
          const imgX = ((x - rect.left) / rect.width) * elementUnderCursor.naturalWidth
          const imgY = ((y - rect.top) / rect.height) * elementUnderCursor.naturalHeight
          
          // Draw the image to canvas and sample pixel
          canvas.width = elementUnderCursor.naturalWidth
          canvas.height = elementUnderCursor.naturalHeight
          ctx.drawImage(elementUnderCursor, 0, 0)
          
          const imageData = ctx.getImageData(Math.floor(imgX), Math.floor(imgY), 1, 1)
          const pixel = imageData.data
          
          return { r: pixel[0], g: pixel[1], b: pixel[2] }
        } catch (e) {
          // CORS or other image loading issue, fall back to computed style
          console.log('Image sampling failed, falling back to computed style')
        }
      }

      // Fall back to computed style approach for non-images
      const computedStyle = window.getComputedStyle(elementUnderCursor)
      let color = computedStyle.backgroundColor

      // If background is transparent, check text color or parent elements
      if (color === "rgba(0, 0, 0, 0)" || color === "transparent") {
        color = computedStyle.color
        
        let currentElement = elementUnderCursor.parentElement
        while ((color === "rgba(0, 0, 0, 0)" || color === "transparent") && currentElement) {
          const parentStyle = window.getComputedStyle(currentElement)
          color = parentStyle.backgroundColor
          if (color === "rgba(0, 0, 0, 0)" || color === "transparent") {
            color = parentStyle.color
          }
          currentElement = currentElement.parentElement
        }
      }

      // Parse the color
      if (color.startsWith("rgba") || color.startsWith("rgb")) {
        const values = color.match(/\d+/g)
        if (values && values.length >= 3) {
          return {
            r: Number.parseInt(values[0]),
            g: Number.parseInt(values[1]),
            b: Number.parseInt(values[2])
          }
        }
      } else if (color.startsWith('#')) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
        if (result) {
          return {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16)
          }
        }
      }

      // Default fallback
      return { r: 250, g: 245, b: 240 }
    } catch (e) {
      console.log('Color sampling failed:', e)
      return { r: 250, g: 245, b: 240 }
    }
  }

  useEffect(() => {
    const updateCursor = async (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const sampledRgb = await samplePixelColor(e.clientX, e.clientY)
      if (sampledRgb) {
        const complementaryColors = getComplementaryColor(sampledRgb.r, sampledRgb.g, sampledRgb.b)
        setCursorColor(complementaryColors.border)
        setCursorFill(complementaryColors.fill)
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener("mousemove", updateCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .hover-asset, .collage-asset')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", updateCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <div
      className={`custom-cursor ${isHovering ? "hover" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        borderColor: cursorColor,
        backgroundColor: cursorFill,
        boxShadow: `0 0 8px ${cursorFill}`,
        transition: 'border-color 0.15s ease-out, background-color 0.15s ease-out, box-shadow 0.15s ease-out',
      }}
    />
  )
}