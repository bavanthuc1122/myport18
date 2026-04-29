"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  ["Home", "/"],
  ["Portfolio", "/portfolio"],
  ["BTS", "/bts"],
  ["About", "/contact"],
]

export default function HeaderPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-white/5 text-xs font-black transition group-hover:bg-white/10">
            VT
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">VanThuc</span>
        </Link>

        <nav className="hidden bg-black/45 px-2 py-2 backdrop-blur-xl md:block">
          <ul className="flex items-center gap-1">
            {navItems.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/68 transition hover:bg-white hover:text-black">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact" className="hidden bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 transition hover:bg-white/10 hover:text-white md:block">
          Contact
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="grid h-10 w-10 place-items-center bg-black/45 text-white backdrop-blur-xl md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505] px-5 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">VanThuc</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="grid h-10 w-10 place-items-center bg-white/5"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-16">
            <ul>
              {navItems.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-6 text-5xl font-black uppercase leading-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
