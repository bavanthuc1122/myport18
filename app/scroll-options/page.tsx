'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ScrollOptions() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Scroll Effect Options</h1>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl mb-4">
            Choose from different scroll effect implementations for your portfolio website.
          </p>
          <p className="text-gray-400">
            Each option offers a unique scrolling experience with different animations and effects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-[1.02]">
            <div className="h-48 bg-gray-800 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Standard"
                alt="Standard scrolling"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Standard Scrolling</h2>
              <p className="text-gray-300 mb-6">
                Default browser scrolling behavior without any special effects.
              </p>
              <Link href="/" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors w-full text-center">
                View Standard
              </Link>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-[1.02]">
            <div className="h-48 bg-gray-800 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Locomotive+Scroll"
                alt="Locomotive Scroll"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Locomotive Scroll</h2>
              <p className="text-gray-300 mb-6">
                Smooth scrolling with parallax effects and scroll-triggered animations.
              </p>
              <Link href="/smooth-scroll" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors w-full text-center">
                View Locomotive
              </Link>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-[1.02]">
            <div className="h-48 bg-gray-800 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=ScrollReveal"
                alt="ScrollReveal"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">ScrollReveal</h2>
              <p className="text-gray-300 mb-6">
                Locomotive Scroll combined with ScrollReveal for enhanced reveal animations.
              </p>
              <Link href="/scroll-reveal" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors w-full text-center">
                View ScrollReveal
              </Link>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-[1.02]">
            <div className="h-48 bg-gray-800 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=WOW+Effects"
                alt="WOW Effects"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">WOW Effects</h2>
              <p className="text-gray-300 mb-6">
                The most impressive scroll effects and animations for maximum impact.
              </p>
              <Link href="/wow-demo" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors w-full text-center">
                View WOW Demo
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to see more examples?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/scroll-demo" className="inline-block bg-transparent border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
              View Demo Page
            </Link>
            <Link href="/wow-demo" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
              Experience WOW Effects
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Implementation Details</h3>
          <p className="text-gray-300 mb-4">
            These implementations use a combination of <code className="bg-gray-800 px-2 py-1 rounded">locomotive-scroll</code>, <code className="bg-gray-800 px-2 py-1 rounded">@studio-freight/react-locomotive-scroll</code>, and <code className="bg-gray-800 px-2 py-1 rounded">scrollreveal</code> packages.
          </p>
          <p className="text-gray-300">
            Each implementation is optimized for performance and provides a unique user experience.
          </p>
        </div>
      </div>
    </div>
  );
}
