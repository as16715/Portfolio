"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorColor, setCursorColor] = useState("#e8a87c") // Default peach color

  const getContrastColor = (backgroundColor: string): string => {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 250, g: 245, b: 240 } // Default to background color
    }

    // Calculate luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const rgb = hexToRgb(backgroundColor)
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b)

    // Return contrasting colors based on luminance
    if (luminance > 0.5) {
      // Light background - use dark colors
      return luminance > 0.8 ? "#5d4e37" : "#8b7355" // Dark brown variations
    } else {
      // Dark background - use light colors
      return luminance < 0.2 ? "#faf5f0" : "#e8a87c" // Light peach variations
    }
  }

  const getBackgroundColor = (element: Element): string => {
    const computedStyle = window.getComputedStyle(element)
    let bgColor = computedStyle.backgroundColor

    // If transparent, check parent elements
    let currentElement = element.parentElement
    while (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
      if (!currentElement) break
      bgColor = window.getComputedStyle(currentElement).backgroundColor
      currentElement = currentElement.parentElement
    }

    // Convert rgba to hex if needed
    if (bgColor.startsWith("rgba") || bgColor.startsWith("rgb")) {
      const values = bgColor.match(/\d+/g)
      if (values && values.length >= 3) {
        const r = Number.parseInt(values[0])
        const g = Number.parseInt(values[1])
        const b = Number.parseInt(values[2])
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
      }
    }

    return bgColor || "#faf5f0" // Default to page background
  }

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY)
      if (elementUnderCursor) {
        const bgColor = getBackgroundColor(elementUnderCursor)
        const contrastColor = getContrastColor(bgColor)
        setCursorColor(contrastColor)
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener("mousemove", updateCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
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
      }}
    />
  )
}
