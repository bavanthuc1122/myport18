import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050505] px-4 py-8 text-[#f6f2ea] sm:px-6 lg:px-8">
      <div className="flex w-full flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.42em] text-white/40">VanThuc photography</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
            Editorial, commercial, and documentary frames shaped with quiet contrast.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="https://www.instagram.com/vanthuc_photo" target="_blank" aria-label="Instagram" className="grid h-10 w-10 place-items-center bg-white/5 text-white/65 transition hover:bg-white/10 hover:text-white">
            <Instagram className="h-4 w-4" />
          </Link>
          <Link href="https://www.facebook.com/tnay.nhinten" target="_blank" aria-label="Facebook" className="grid h-10 w-10 place-items-center bg-white/5 text-white/65 transition hover:bg-white/10 hover:text-white">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href="https://www.behance.net/vanthucphoto" target="_blank" aria-label="Behance" className="grid h-10 w-10 place-items-center bg-white/5 text-xs font-black text-white/65 transition hover:bg-white/10 hover:text-white">
            Be
          </Link>
        </div>

        <p className="text-xs uppercase tracking-[0.24em] text-white/35">All copyrights 2026</p>
      </div>
    </footer>
  )
}
