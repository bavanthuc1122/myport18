"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function AboutUs() {
  const tabletRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add a subtle animation to the tablet on load
    if (tabletRef.current) {
      tabletRef.current.style.opacity = "0"
      tabletRef.current.style.transform = "translateY(20px) rotate(5deg)"

      setTimeout(() => {
        if (tabletRef.current) {
          tabletRef.current.style.opacity = "1"
          tabletRef.current.style.transform = "translateY(0) rotate(5deg)"
        }
      }, 300)
    }
  }, [])

  return (
    <section className="relative h-screen w-full text-white flex flex-col items-center justify-center">
      {/* Background container - sẽ được thay thế bằng ảnh hoặc video */}
      <div className="absolute inset-0 bg-gray-500/90 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full rounded-3xl p-4 sm:p-6 md:p-12 overflow-hidden">

        <h1 className="text-4xl md:text-5xl font-light mb-8 md:mb-12 pl-4 md:pl-8">About Us</h1>


          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-16 relative z-10 max-h-[80vh] overflow-y-auto md:overflow-visible">
            {/* Left column with single image and text */}
            <div className="w-full md:w-1/3 flex flex-col">
              <div className="rounded-lg overflow-hidden shadow-xl mb-8">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  alt="Fashion portrait"
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light text-white">SKILL COLLECTION</h2>

                <ul className="space-y-2 text-white/90">
                  <li className="font-light">PORTRAIT</li>
                  <li className="font-light">FASHION</li>
                  <li className="font-light">COMMERCIAL</li>
                  <li className="font-light">PRODUCT</li>
                </ul>

                <Link href="/portfolio">
                  <button className="bg-white text-black rounded-full px-5 py-1 text-sm hover:bg-white/90 transition-colors">
                    See &gt;&gt;
                  </button>
                </Link>
              </div>
            </div>


            {/* Right column with tablet mockup */}
            <div
              ref={tabletRef}
              className="w-full md:w-2/3 transition-all duration-700 ease-out"
              style={{ transform: "rotate(5deg)" }}
            >
              <div className="bg-white rounded-3xl p-3 shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
                  {/* First row */}
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Model with veil"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Model in blue"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Model in purple"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Second row */}
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Model in green"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Model with spheres"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Model on yellow background"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Third row (only visible on mobile) */}
                  <div className="aspect-square overflow-hidden md:hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Model in red"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  )
}
