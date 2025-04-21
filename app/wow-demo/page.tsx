'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollProvider, ScrollSection, ScrollReveal } from '@/components/scroll';

export default function WowDemo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-xl text-white">Preparing amazing effects...</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollProvider
      options={{
        smooth: true,
        lerp: 0.05,
        multiplier: 0.8,
        class: 'is-revealed',
        scrollFromAnywhere: true,
        touchMultiplier: 2,
        smoothMobile: true,
      }}
    >
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <ScrollSection className="h-screen flex items-center justify-center relative overflow-hidden" id="hero">
          <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.5">
            <Image 
              src="/placeholder.svg?height=1080&width=1920&text=WOW+EFFECTS" 
              alt="Hero background" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal 
              origin="top" 
              distance="100px" 
              duration={1200} 
              delay={300}
              opacity={0}
              scale={0.9}
              reset={false}
            >
              <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter">WOW</h1>
            </ScrollReveal>
            
            <ScrollReveal 
              origin="bottom" 
              distance="50px" 
              duration={1000} 
              delay={600}
              opacity={0}
              reset={false}
            >
              <p className="text-xl md:text-3xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Experience the most impressive scroll effects and animations for your portfolio
              </p>
            </ScrollReveal>
            
            <ScrollReveal 
              origin="bottom" 
              distance="30px" 
              duration={800} 
              delay={900}
              opacity={0}
              reset={false}
            >
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#gallery" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                  Explore Effects
                </a>
                <Link href="/scroll-options" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                  View Options
                </Link>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </ScrollSection>

        {/* Intro Section */}
        <ScrollSection className="py-32 relative" id="intro">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <ScrollReveal 
                  origin="left" 
                  distance="100px" 
                  duration={1000} 
                  delay={200}
                  opacity={0}
                  reset={false}
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">Smooth Scrolling</h2>
                  <p className="text-xl mb-6 leading-relaxed">
                    Locomotive Scroll provides buttery-smooth scrolling that transforms the user experience. 
                    Notice how elements glide into view with perfect timing and precision.
                  </p>
                  <div className="h-1 w-24 bg-white mb-6"></div>
                  <p className="text-lg">
                    The parallax effect creates depth by moving elements at different speeds, 
                    creating an immersive 3D-like experience as you scroll.
                  </p>
                </ScrollReveal>
              </div>
              
              <div data-scroll data-scroll-speed="0.3">
                <ScrollReveal 
                  origin="right" 
                  distance="100px" 
                  duration={1000} 
                  delay={400}
                  opacity={0}
                  scale={0.8}
                  reset={false}
                >
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                    <Image 
                      src="/placeholder.svg?height=800&width=600&text=Smooth+Scrolling" 
                      alt="Smooth scrolling" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Gallery Section */}
        <ScrollSection className="py-32 bg-gradient-to-b from-black to-gray-900" id="gallery">
          <div className="container mx-auto px-4">
            <ScrollReveal 
              origin="bottom" 
              distance="50px" 
              duration={1000} 
              delay={200}
              opacity={0}
              reset={false}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Animation Gallery</h2>
                <p className="text-xl max-w-2xl mx-auto">
                  Explore different animation effects that can be applied to your portfolio elements.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Fade In', class: 'fade-in', delay: 300 },
                { title: 'Slide Left', class: 'slide-in-left', delay: 400 },
                { title: 'Slide Right', class: 'slide-in-right', delay: 500 },
                { title: 'Zoom In', class: 'zoom-in', delay: 600 },
                { title: 'Rotate In', class: 'rotate-in', delay: 700 },
                { title: 'Scale In', class: 'scale-in', delay: 800 },
              ].map((item, index) => (
                <ScrollReveal 
                  key={index}
                  className={item.class}
                  delay={item.delay}
                  duration={1000}
                  opacity={0}
                  reset={false}
                  viewFactor={0.2}
                >
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl h-full">
                    <div className="h-48 bg-gray-700 relative">
                      <Image 
                        src={`/placeholder.svg?height=400&width=600&text=${item.title}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300 mb-4">
                        This element uses the <code className="bg-gray-900 px-2 py-1 rounded">{item.class}</code> animation class.
                      </p>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                        Try Effect
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Parallax Section */}
        <ScrollSection className="py-32 relative overflow-hidden" id="parallax">
          <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.3">
            <Image 
              src="/placeholder.svg?height=1080&width=1920&text=Parallax+Background" 
              alt="Parallax background" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal 
              origin="bottom" 
              distance="50px" 
              duration={1000} 
              delay={200}
              opacity={0}
              reset={false}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Parallax Magic</h2>
                <p className="text-xl max-w-2xl mx-auto">
                  Elements move at different speeds as you scroll, creating a sense of depth and dimension.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0.7, 0.4, 0.9].map((speed, index) => (
                <div key={index} data-scroll data-scroll-speed={speed}>
                  <ScrollReveal 
                    delay={300 + (index * 100)}
                    duration={1000}
                    opacity={0}
                    scale={0.9}
                    reset={false}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                      <div className="text-3xl font-bold mb-2">Speed: {speed}</div>
                      <p className="text-gray-300 mb-4">
                        This card moves at {speed}x the scroll speed, creating a parallax effect.
                      </p>
                      <div className="h-40 bg-gray-800 rounded-lg mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl font-bold">{speed}x</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">
                        Try scrolling up and down to see how this element moves differently.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Horizontal Section */}
        <ScrollSection className="py-32 bg-gradient-to-b from-gray-900 to-black" id="horizontal">
          <div className="container mx-auto px-4">
            <ScrollReveal 
              origin="bottom" 
              distance="50px" 
              duration={1000} 
              delay={200}
              opacity={0}
              reset={false}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Staggered Animations</h2>
                <p className="text-xl max-w-2xl mx-auto">
                  Elements can appear one after another with staggered timing for a dynamic effect.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="overflow-x-auto pb-8">
              <div className="flex space-x-6 min-w-max stagger-fast">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                  <ScrollReveal 
                    key={index}
                    className="fade-in"
                    delay={200 + (index * 100)}
                    duration={800}
                    opacity={0}
                    reset={false}
                  >
                    <div className="w-80 bg-gray-800 rounded-xl overflow-hidden shadow-xl flex-shrink-0">
                      <div className="h-48 bg-gray-700 relative">
                        <Image 
                          src={`/placeholder.svg?height=400&width=600&text=Item+${item}`}
                          alt={`Item ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">Item {item}</h3>
                        <p className="text-gray-300">
                          This item appears with a {200 + (index * 100)}ms delay after scrolling.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* CTA Section */}
        <ScrollSection className="py-32 relative" id="cta">
          <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.2">
            <Image 
              src="/placeholder.svg?height=1080&width=1920&text=Final+Section" 
              alt="CTA background" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal 
                origin="bottom" 
                distance="100px" 
                duration={1200} 
                delay={300}
                opacity={0}
                scale={0.8}
                reset={false}
              >
                <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to Wow Your Visitors?</h2>
                <p className="text-xl md:text-2xl mb-12 leading-relaxed">
                  Implement these stunning scroll effects in your portfolio to create an unforgettable user experience.
                </p>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/scroll-options" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Choose Your Style
                  </Link>
                  <Link href="/" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                    Back to Home
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollSection>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} VThuc Photography. All rights reserved.</p>
            <p className="text-gray-400 mt-2">Built with Next.js, Locomotive Scroll, and ScrollReveal</p>
          </div>
        </footer>
      </div>
    </ScrollProvider>
  );
}
