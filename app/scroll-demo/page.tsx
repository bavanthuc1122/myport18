'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollProvider, ScrollSection, ParallaxImage, ScrollTrigger } from '@/components/scroll';

export default function ScrollDemo() {
  return (
    <ScrollProvider>
      <div className="bg-black text-white min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">VThuc Photography</Link>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#intro" className="hover:text-gray-300">Intro</a></li>
                <li><a href="#parallax" className="hover:text-gray-300">Parallax</a></li>
                <li><a href="#gallery" className="hover:text-gray-300">Gallery</a></li>
                <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Intro Section */}
        <ScrollSection className="h-screen flex items-center justify-center relative" id="intro">
          <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-1">
            <Image 
              src="/placeholder.svg?height=1080&width=1920" 
              alt="Hero background" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollTrigger className="fade-in-bottom">
              <h1 className="text-6xl md:text-8xl font-bold mb-6">Smooth Scroll</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                Experience the power of Locomotive Scroll with beautiful parallax effects and smooth scrolling.
              </p>
            </ScrollTrigger>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </ScrollSection>

        {/* Parallax Section */}
        <ScrollSection className="py-32 relative" id="parallax">
          <div className="container mx-auto px-4">
            <ScrollTrigger className="text-center mb-16 fade-in-bottom">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Parallax Effects</h2>
              <p className="text-xl max-w-2xl mx-auto">
                Elements move at different speeds creating a sense of depth and dimension.
              </p>
            </ScrollTrigger>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div data-scroll data-scroll-speed="1" className="rounded-lg overflow-hidden">
                <Image 
                  src="/placeholder.svg?height=800&width=600&text=Speed+1" 
                  alt="Parallax image 1" 
                  width={600} 
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              
              <div>
                <ScrollTrigger className="fade-in-bottom">
                  <h3 className="text-3xl font-bold mb-4">Speed: 1</h3>
                  <p className="text-lg mb-6">
                    This element moves slightly faster than the scroll speed, creating a subtle parallax effect.
                  </p>
                  <div className="h-1 w-24 bg-white mb-6"></div>
                  <p className="text-lg">
                    The parallax effect is achieved by setting different scroll speeds to elements using the 
                    <code className="bg-gray-800 px-2 py-1 rounded mx-1">data-scroll-speed</code> attribute.
                  </p>
                </ScrollTrigger>
              </div>
              
              <div>
                <ScrollTrigger className="fade-in-bottom">
                  <h3 className="text-3xl font-bold mb-4">Speed: -0.5</h3>
                  <p className="text-lg mb-6">
                    This element moves slightly slower than the scroll speed, creating a reverse parallax effect.
                  </p>
                  <div className="h-1 w-24 bg-white mb-6"></div>
                  <p className="text-lg">
                    Negative values make elements move in the opposite direction of the scroll, enhancing the depth effect.
                  </p>
                </ScrollTrigger>
              </div>
              
              <div data-scroll data-scroll-speed="-0.5" className="rounded-lg overflow-hidden">
                <Image 
                  src="/placeholder.svg?height=800&width=600&text=Speed+-0.5" 
                  alt="Parallax image 2" 
                  width={600} 
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Gallery Section */}
        <ScrollSection className="py-32 bg-gray-900" id="gallery">
          <div className="container mx-auto px-4">
            <ScrollTrigger className="text-center mb-16 fade-in-bottom">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Scroll Animations</h2>
              <p className="text-xl max-w-2xl mx-auto">
                Elements animate into view as you scroll down the page.
              </p>
            </ScrollTrigger>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ScrollTrigger key={item} className="fade-in-bottom" threshold={0.2}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div data-scroll data-scroll-speed={item % 2 === 0 ? "0.1" : "-0.1"}>
                      <Image 
                        src={`/placeholder.svg?height=400&width=600&text=Image+${item}`}
                        alt={`Gallery image ${item}`}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Image Title {item}</h3>
                      <p className="text-gray-300">
                        This image has a subtle parallax effect and fades in when scrolled into view.
                      </p>
                    </div>
                  </div>
                </ScrollTrigger>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Contact Section */}
        <ScrollSection className="py-32 relative" id="contact">
          <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.3">
            <Image 
              src="/placeholder.svg?height=1080&width=1920&text=Parallax+Background" 
              alt="Contact background" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <ScrollTrigger className="text-center mb-16 fade-in-bottom">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
                <p className="text-xl">
                  Want to implement smooth scroll effects in your project?
                </p>
              </ScrollTrigger>
              
              <ScrollTrigger className="bg-black/50 backdrop-blur-sm p-8 rounded-lg scale-in">
                <div className="text-center">
                  <p className="text-xl mb-8">
                    Check out the full implementation in the source code or go back to the main site.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                      Back to Home
                    </Link>
                    <Link href="/page-with-scroll" className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                      View With Scroll
                    </Link>
                  </div>
                </div>
              </ScrollTrigger>
            </div>
          </div>
        </ScrollSection>

        {/* Footer */}
        <footer className="py-8 bg-black">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} VThuc Photography. All rights reserved.</p>
            <p className="text-gray-400 mt-2">Built with Next.js and Locomotive Scroll</p>
          </div>
        </footer>
      </div>
    </ScrollProvider>
  );
}
