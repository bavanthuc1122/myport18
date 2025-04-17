"use client"

import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import MasonryGrid from "../components/MasonryGrid"

export default function Portfolio() {
  const categories = ["All", "Portrait", "Wedding", "Event", "Commercial"]
  const [items, setItems] = useState<Array<{
    id: number;
    src: string;
    title: string;
    category: string;
  }>>([])
  const [loading, setLoading] = useState(true)
  
  const portfolioItems = [
    { id: 1, src: "/placeholder.svg", title: "Summer Collection", category: "Portrait" },
    { id: 2, src: "/placeholder.svg", title: "Wedding Day", category: "Wedding" },
    { id: 3, src: "/placeholder.svg", title: "Fashion Week", category: "Event" },
    { id: 4, src: "/placeholder.svg", title: "Product Launch", category: "Commercial" },
    { id: 5, src: "/placeholder.svg", title: "Street Style", category: "Portrait" },
    { id: 6, src: "/placeholder.svg", title: "Beach Wedding", category: "Wedding" },
    { id: 7, src: "/placeholder.svg", title: "Corporate Event", category: "Event" },
    { id: 8, src: "/placeholder.svg", title: "Brand Campaign", category: "Commercial" },
    { id: 9, src: "/placeholder.svg", title: "Portrait Series", category: "Portrait" },
    { id: 10, src: "/placeholder.svg", title: "Engagement", category: "Wedding" },
    { id: 11, src: "/placeholder.svg", title: "Music Festival", category: "Event" },
    { id: 12, src: "/placeholder.svg", title: "Lifestyle", category: "Commercial" },
  ]

  useEffect(() => {
    // Simulate loading delay
    const loadImages = async () => {
      setLoading(true)
      // Load images in chunks
      for (let i = 0; i < portfolioItems.length; i += 4) {
        const chunk = portfolioItems.slice(i, i + 4)
        setItems(prev => [...prev, ...chunk])
        await new Promise(resolve => setTimeout(resolve, 300)) // Delay between chunks
      }
      setLoading(false)
    }
    loadImages()
  }, [])

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <HeaderPortfolio />

      <main className="mx-auto px-8 sm:px-16 lg:px-24">
        <div className="pt-32 pb-16">
          <h1 className="text-6xl font-bold mb-2">WORK IMAGE</h1>
          <p className="text-gray-400 text-lg">Darkness is core of light</p>
        </div>

        <div className="flex justify-center gap-12 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              className="text-base hover:text-gray-400 transition-colors duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        <MasonryGrid items={items} />
      </main>

      <Footer />
    </div>
  )
}
