"use client"

import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { useState } from "react"

export default function HeaderPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto">
        <header className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 mt-[3px]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 relative">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-base md:text-lg font-medium">Krenza</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-5 py-1.5">
              <ul className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="text-sm hover:opacity-80">
                    HOME
                  </Link>
                </li>
                <li className="text-gray-400">|</li>
                <li>
                  <Link href="/portfolio" className="text-sm hover:opacity-80">
                    PORTFOLIO
                  </Link>
                </li>
                <li className="text-gray-400">|</li>
                <li>
                  <Link href="/bts" className="text-sm hover:opacity-80">
                    BTS
                  </Link>
                </li>
                <li className="text-gray-400">|</li>
                <li>
                  <Link href="/contact" className="text-sm hover:opacity-80">
                    ABOUT
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Book Call Button */}
          <button className="hidden md:flex items-center gap-1.5 bg-white text-black rounded-full px-3 py-1 text-sm hover:bg-gray-200 transition-colors">
            <span>Book a Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </header>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <nav className="text-center">
              <ul className="flex flex-col space-y-6">
                <li>
                  <Link href="/" className="text-2xl hover:opacity-80" onClick={() => setIsMenuOpen(false)}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-2xl hover:opacity-80" onClick={() => setIsMenuOpen(false)}>
                    PORTFOLIO
                  </Link>
                </li>
                <li>
                  <Link href="/bts" className="text-2xl hover:opacity-80" onClick={() => setIsMenuOpen(false)}>
                    BTS
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-2xl hover:opacity-80" onClick={() => setIsMenuOpen(false)}>
                    ABOUT
                  </Link>
                </li>
              </ul>
            </nav>
            <button 
              className="mt-8 flex items-center gap-1.5 bg-white text-black rounded-full px-3 py-1 text-sm hover:bg-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Book a Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button 
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 