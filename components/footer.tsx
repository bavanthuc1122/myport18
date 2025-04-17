import Link from "next/link"
import { Instagram, Facebook, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram className="social-icon" />
            </Link>
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook className="social-icon" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <Linkedin className="social-icon" />
            </Link>
          </div>

          <nav className="flex items-center space-x-6 text-xs text-white/70">
            <Link href="/" className="hover:text-white">
              HOME
            </Link>
            <Link href="/portfolio" className="hover:text-white">
              PORTFOLIO
            </Link>
            <Link href="/bts" className="hover:text-white">
              BTS
            </Link>
            <Link href="/contact" className="hover:text-white">
              ABOUT
            </Link>
          </nav>

          <div className="text-xs text-white/50">All Copyrights © 2025</div>
        </div>
      </div>
    </footer>
  )
}
