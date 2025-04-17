import Image from "next/image"
import HeaderPortfolio from "@/components/header-portfolio"

export default function About() {
  return (
    <div className="min-h-screen bg-[#000000] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/placeholder.svg?height=800&width=400')] bg-no-repeat bg-cover"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[url('/placeholder.svg?height=800&width=400')] bg-no-repeat bg-cover"></div>
      </div>

      {/* Main content container */}
      <div className="min-h-screen w-full max-w-[100vw] mx-auto bg-transparent relative z-10">
        <HeaderPortfolio />

        {/* Main content */}
        <main className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left column - Image */}
            <div className="relative aspect-square">
              <Image
                src="/placeholder.svg"
                alt="About me"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Right column - Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">About Me</h1>
                <p className="text-gray-300 text-sm md:text-base">Professional Photographer</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm md:text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Experience</h3>
                  <ul className="space-y-2 text-sm md:text-base">
                    <li>10+ Years in Photography</li>
                    <li>500+ Projects Completed</li>
                    <li>200+ Happy Clients</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Specialties</h3>
                  <ul className="space-y-2 text-sm md:text-base">
                    <li>Portrait Photography</li>
                    <li>Fashion Photography</li>
                    <li>Event Photography</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-white text-black px-6 py-2 rounded-full text-sm md:text-base hover:bg-gray-200 transition-colors">
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 