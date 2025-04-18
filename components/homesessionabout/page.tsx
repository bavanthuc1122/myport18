"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import AnimatedSection from "@/components/animated-section"
import { urlFor } from "@/lib/sanity"

// Định nghĩa kiểu dữ liệu cho About Section
interface AboutSectionData {
  title?: string;
  description?: string;
  profileImage?: any;
  skillsTitle?: string;
  skills?: string[];
  buttonText?: string;
  buttonLink?: string;
  galleryImages?: any[];
  mediaType?: 'image' | 'video' | 'color';
  backgroundColor?: string;
  backgroundImage?: any;
  videoUrl?: string;
}

interface AboutUsProps {
  aboutData?: AboutSectionData;
}

export default function AboutUs({ aboutData }: AboutUsProps) {
  const tabletRef = useRef<HTMLDivElement>(null)

  // Hiệu ứng animation cho tablet
  useEffect(() => {
    // Add a subtle animation to the tablet on load
    if (tabletRef.current) {
      tabletRef.current.style.opacity = "0"
      tabletRef.current.style.transform = "translateY(20px) rotate(5deg)"

      setTimeout(() => {
        if (tabletRef.current) {
          tabletRef.current.style.opacity = "1"
          tabletRef.current.style.transform = "translateY(0) rotate(5deg)"
        }
      }, 300)
    }
  }, [])

  return (
    <AnimatedSection className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-20" delay={0.2} direction="up">
      {/* Background container */}
      {aboutData?.mediaType === 'image' && aboutData?.backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(aboutData.backgroundImage).width(1920).height(1080).url()}
            alt="Background image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ) : aboutData?.mediaType === 'video' && aboutData?.videoUrl ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="youtube-container">
            <div className="preload-overlay"></div>
            <iframe
              src={aboutData.videoUrl.includes('youtube.com') ?
                `${aboutData.videoUrl.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${aboutData.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                aboutData.videoUrl.includes('youtu.be') ?
                  `${aboutData.videoUrl.replace('youtu.be/', 'youtube.com/embed/')}?autoplay=1&mute=1&loop=1&playlist=${aboutData.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                  aboutData.videoUrl
              }
              title="Background video"
              className="youtube-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: aboutData?.backgroundColor || '#505050', opacity: 0.9 }}
        ></div>
      )}

      {/* Console log để debug */}
      {console.log('About data:', aboutData)}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full rounded-3xl p-4 sm:p-6 md:p-12 overflow-hidden">

        <h1 className="text-4xl md:text-5xl font-light mb-8 md:mb-12 pl-4 md:pl-8 fade-in">
          {aboutData?.title || 'About Us'}
        </h1>


          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-16 relative z-10">
            {/* Left column with single image and text */}
            <div className="w-full md:w-1/3 flex flex-col">
              <div className="rounded-lg overflow-hidden shadow-xl mb-8 slide-in-left">
                {aboutData?.profileImage ? (
                  <Image
                    src={urlFor(aboutData.profileImage).width(400).height(600).url()}
                    alt="Fashion portrait"
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <Image
                    src="/placeholder.svg?height=600&width=400"
                    alt="Fashion portrait"
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>

              <div className="space-y-6 slide-in-left delay-200">
                <h2 className="text-3xl md:text-4xl font-light text-white">
                  {aboutData?.skillsTitle || 'SKILL COLLECTION'}
                </h2>

                <ul className="space-y-2 text-white/90">
                  {aboutData?.skills && aboutData.skills.length > 0 ? (
                    aboutData.skills.map((skill, index) => (
                      <li key={index} className="font-light">{skill}</li>
                    ))
                  ) : (
                    <>
                      <li className="font-light">PORTRAIT</li>
                      <li className="font-light">FASHION</li>
                      <li className="font-light">COMMERCIAL</li>
                      <li className="font-light">PRODUCT</li>
                    </>
                  )}
                </ul>

                <div className="mt-4">
                  <Link href={aboutData?.buttonLink || '/portfolio'}>
                    <button className="bg-white text-black rounded-full px-5 py-1 text-sm hover:bg-white/90 transition-colors hover-scale">
                      {aboutData?.buttonText || 'See >>'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>


            {/* Right column with tablet mockup */}
            <div
              ref={tabletRef}
              className="w-full md:w-2/3 transition-all duration-700 ease-out"
              style={{ transform: "rotate(5deg)" }}
            >
              <div className="bg-white rounded-3xl p-3 shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
                  {/* Hiển thị hình ảnh từ Portfolio Preview nếu có */}
                  {aboutData?.galleryImages && aboutData.galleryImages.length > 0 ? (
                    // Hiển thị hình ảnh từ CMS
                    aboutData.galleryImages.map((img, index) => (
                      <div key={index} className="aspect-square overflow-hidden">
                        <Image
                          src={urlFor(img).width(300).height(300).url()}
                          alt={`Gallery image ${index + 1}`}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    // Hiển thị hình ảnh mặc định nếu không có dữ liệu
                    <>
                      {/* First row */}
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Model with veil"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Model in blue"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Model in purple"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Second row */}
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Model in green"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Model with spheres"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Model on yellow background"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Third row (only visible on mobile) */}
                      <div className="aspect-square overflow-hidden md:hidden">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt="Model in red"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </AnimatedSection>
  )
}
