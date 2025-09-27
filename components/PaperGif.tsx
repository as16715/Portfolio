"use client"

import { useEffect, useState } from "react"

interface PaperGifTextProps {
  words: string[]
  className?: string
}

export function PaperGifText({ words, className = "" }: PaperGifTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTextVisible, setIsTextVisible] = useState(false)

  useEffect(() => {
    // Initial delay to sync with first gif cycle
    const initialTimeout = setTimeout(() => {
      setIsTextVisible(true)
    }, 2000) // Text appears when paper uncrumbles (2 seconds into gif)

    const interval = setInterval(() => {
      // Hide text when paper starts crumbling again
      setIsTextVisible(false)
      
      // Change to next word after text disappears
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 300)
      
      // Show text when paper uncrumbles (2 seconds into each 3.5s cycle)
      setTimeout(() => {
        setIsTextVisible(true)
      }, 2000)
    }, 3500) // 3.5 second gif loop duration

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [words])

  return (
    <div className={`relative inline-block min-w-[200px] ${className}`}>
      {/* Background gif */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/Paper.gif"
          alt=""
          className="w-full h-auto object-contain"
          style={{ 
            imageRendering: "crisp-edges",
            filter: "drop-shadow(2px 2px 4px rgba(93, 78, 55, 0.2))"
          }}
        />
      </div>
      
      {/* Text overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[80px] px-4">
        <span
          className={`font-semibold text-lg transition-all duration-300 ease-out ${
            isTextVisible 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-2"
          }`}
          style={{ 
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)",
            color: "var(--foreground)"
          }}
        >
          {words[currentWordIndex]}
        </span>
      </div>
    </div>
  )
}
