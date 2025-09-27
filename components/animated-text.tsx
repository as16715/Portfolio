"use client"

import { useEffect, useState } from "react"

interface AnimatedTextProps {
  words: string[]
  className?: string
}

export function AnimatedText({ words, className = "" }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className={`inline-block min-w-[200px] text-left ${className}`}>
      <span
        className={`animated-word transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {words[currentWordIndex]}
      </span>
    </span>
  )
}
