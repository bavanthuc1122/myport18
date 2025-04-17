import Image from "next/image"
import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"

export default function BTS() {
  // Sample BTS images
  const btsImages = [
    { id: 1, src: "/placeholder.svg?height=400&width=400", alt: "Behind the scenes 1" },
    { id: 2, src: "/placeholder.svg?height=400&width=400", alt: "Behind the scenes 2" },
    { id: 3, src: "/placeholder.svg?height=400&width=400", alt: "Behind the scenes 3" },
    { id: 4, src: "/placeholder.svg?height=400&width=400", alt: "Behind the scenes 4" },
    { id: 5, src: "/placeholder.svg?height=400&width=400", alt: "Behind the scenes 5" },
  ]

  // Sample architecture images
  const architectureImages = [
    { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Architecture 1" },
    { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Architecture 2" },
  ]

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1a1a1a] to-transparent opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <HeaderPortfolio />

        {/* Main content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          {/* Title section */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">Be High The Scene</h1>
            <p className="text-gray-400 text-lg">A closer perspective</p>
          </div>

          {/* First Image Grid */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 lg:p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Large image */}
              <div className="lg:col-span-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="BTS main image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Small images grid */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="BTS image 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="BTS image 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="BTS image 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="BTS image 4"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Title Be High The Scene */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light">Title Be High The Scene</h2>
          </div>

          {/* Second Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Left side - 3 images */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Gallery image 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Gallery image 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Gallery image 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right side - 2 images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Gallery image 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Gallery image 5"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
