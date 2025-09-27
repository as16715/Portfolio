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
    let currentTimeout: NodeJS.Timeout

    const startCycle = () => {
      // Show text 1 second into gif
      currentTimeout = setTimeout(() => {
        setIsTextVisible(true)
        
        // Hide text after 1 second of visibility (2 seconds into gif)
        currentTimeout = setTimeout(() => {
          setIsTextVisible(false)
          
          // Change to next word and start next cycle
          currentTimeout = setTimeout(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
            startCycle() // Start next cycle
          }, 890) // Wait 0.89 seconds before next cycle
        }, 1000) // Hide after 1 second of visibility
      }, 1000) // Show 1 second into gif
    }

    // Start the first cycle
    startCycle()

    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout)
      }
    }
  }, [words])

  return (
    <div className={`relative inline-block ${className}`} style={{ width: '180px', height: 'auto', lineHeight: '1', marginLeft: '-20px' }}>
      {/* Background gif container - positioned to align with text center */}
      <div 
        className="absolute flex items-center justify-center"
        style={{
          overflow: 'hidden',
          borderRadius: '2px',
          // Simple rectangle crop to remove grey background
          clipPath: 'inset(15% 10% 15% 10%)',
          // Position the GIF to align with text baseline
          top: '100%',
          left: '0',
          right: '0',
          height: '60px',
          transform: 'translateY(-80%)'
        }}
      >
        <img
          src="/Paper.gif"
          alt=""
          className="w-full h-full object-cover"
          style={{ 
            imageRendering: "crisp-edges",
            filter: "drop-shadow(1px 1px 3px rgba(93, 78, 55, 0.4))"
          }}
        />
      </div>
      
      {/* Text overlay - positioned to align with the paper center */}
      <div 
        className="absolute flex items-center justify-center z-10"
        style={{
          padding: '0 12px',
          pointerEvents: 'none',
          // Position the text to align with the GIF
          top: '100%',
          left: '0',
          right: '0',
          height: '60px',
          transform: 'translateY(-80%)'
        }}
      >
        <span
          className={`text-2xl md:text-3xl font-bold text-muted-foreground transition-all duration-300 ease-out ${
            isTextVisible 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-2"
          }`}
          style={{ 
            textAlign: 'center',
            lineHeight: '1.1'
          }}
        >
          {words[currentWordIndex]}
        </span>
      </div>
    </div>
  )
}