"use client"

import { useState } from "react"

export function ContactForm() {
  const [result, setResult] = useState("")

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult("Sending...")
    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "ea58de00-265f-4732-8eae-e2b8606295ee") 
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    if (data.success) {
      setResult("Form submitted successfully ✅")
      event.currentTarget.reset()
    } else {
      setResult("Error sending form ❌")
    }
  }

  return (
    <div className="bg-background/60 border-t border-border py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Contact Me!</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            required
            placeholder="Your message"
            rows={4}
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium"
          >
            Send
          </button>
          {result && <p className="text-sm text-muted-foreground">{result}</p>}
        </form>
      </div>
    </div>
  )
}
