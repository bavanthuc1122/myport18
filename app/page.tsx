"use client";

import Image from "next/image"
import Link from "next/link"
import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"
import AboutUs from "@/components/homesessionabout/page"
import AnimatedSection from "@/components/animated-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1a1a1a] to-transparent opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <HeaderPortfolio />

        <main>
          {/* Hero Section */}
          <AnimatedSection className="relative h-screen w-full" delay={0.2} direction="up">
            <div className="absolute inset-0">
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Hero image"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30">
                <div className="h-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
                  <h1 className="text-4xl lg:text-6xl font-light tracking-tight">Photographer</h1>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* About Us Section */}
          <AboutUs />

          {/* Portfolio Preview */}
          <AnimatedSection className="relative h-screen w-full flex flex-col items-center justify-center" delay={0.3} direction="up">
            {/* Background container - sẽ được thay thế bằng ảnh hoặc video */}
            <div className="absolute inset-0 bg-black/80 z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <h2 className="text-3xl lg:text-4xl text-center font-light mb-16">Welcome to Portfolio</h2>

              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="w-full lg:w-1/3">
                  <h3 className="text-2xl lg:text-3xl font-light mb-4">I tell your story</h3>
                  <p className="text-2xl lg:text-3xl font-light text-gray-400">in pictures</p>
                </div>

                <div className="w-full lg:w-2/3 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                  <div className="absolute top-0 left-[10%] w-[35%] h-[85%] rounded-xl overflow-hidden transform -rotate-6 hover:scale-105 transition-transform">
                    <Image
                      src="/placeholder.svg?height=500&width=300"
                      alt="Portfolio image 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-[10%] left-[35%] w-[35%] h-[85%] rounded-xl overflow-hidden transform rotate-3 z-10 hover:scale-105 transition-transform">
                    <Image
                      src="/placeholder.svg?height=500&width=300"
                      alt="Portfolio image 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-[5%] right-[5%] w-[35%] h-[85%] rounded-xl overflow-hidden transform -rotate-3 hover:scale-105 transition-transform">
                    <Image
                      src="/placeholder.svg?height=500&width=300"
                      alt="Portfolio image 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </main>

        <Footer />
      </div>
    </div>
  )
}
