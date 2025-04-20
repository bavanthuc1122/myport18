import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/vanthuc_photo" target="_blank" aria-label="Instagram">
              <Instagram className="social-icon" />
            </Link>
            <Link href="https://www.facebook.com/tnay.nhinten" target="_blank" aria-label="Facebook">
              <Facebook className="social-icon" />
            </Link>
            <Link href="https://www.behance.net/vanthucphoto" target="_blank" aria-label="Behance">
              <svg className="social-icon w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
              </svg>
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
