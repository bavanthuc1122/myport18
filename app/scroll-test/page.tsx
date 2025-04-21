'use client';

import React from 'react';
import Link from 'next/link';

export default function ScrollTest() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Locomotive Scroll Test</h1>
      
      <div className="max-w-2xl text-center mb-12">
        <p className="text-xl mb-4">
          Compare the standard page with the Locomotive Scroll enhanced version.
        </p>
        <p className="text-gray-400">
          The enhanced version includes smooth scrolling, parallax effects, and scroll-triggered animations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Standard Version</h2>
          <p className="mb-6 text-gray-300">
            The original page with default browser scrolling behavior.
          </p>
          <Link href="/" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            View Standard Page
          </Link>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Enhanced Version</h2>
          <p className="mb-6 text-gray-300">
            The same page enhanced with Locomotive Scroll effects.
          </p>
          <Link href="/page-with-scroll" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            View Enhanced Page
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold mb-4">Want to see more examples?</h3>
        <Link href="/scroll-demo" className="inline-block bg-transparent border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
          View Demo Page
        </Link>
      </div>
      
      <div className="mt-16 text-center max-w-2xl">
        <h3 className="text-xl font-bold mb-4">Implementation Details</h3>
        <p className="text-gray-300 mb-4">
          This implementation uses <code className="bg-gray-800 px-2 py-1 rounded">locomotive-scroll</code> and <code className="bg-gray-800 px-2 py-1 rounded">@studio-freight/react-locomotive-scroll</code> packages.
        </p>
        <p className="text-gray-300">
          The ScrollProvider component wraps the entire application, while ScrollSection, ParallaxImage, and ScrollTrigger components are used to create various effects.
        </p>
      </div>
    </div>
  );
}
