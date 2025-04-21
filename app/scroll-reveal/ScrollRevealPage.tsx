'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import HeaderPortfolio from "@/components/header-portfolio";
import Footer from "@/components/footer";
import { urlFor } from "@/lib/sanity";
import { ScrollProvider, ScrollSection, ParallaxImage, ScrollReveal } from "@/components/scroll";

// Dữ liệu được truyền từ server component
interface ScrollRevealPageProps {
  heroData: any;
  portfolioData: any;
  aboutData: any;
}

export default function ScrollRevealPage({ heroData, portfolioData, aboutData }: ScrollRevealPageProps) {
  return (
    <ScrollProvider
      options={{
        smooth: true,
        lerp: 0.1,
        multiplier: 1,
        class: 'is-revealed',
        smartphone: {
          smooth: true,
          multiplier: 1,
        },
        tablet: {
          smooth: true,
          multiplier: 1,
        },
      }}
    >
      <div className="min-h-screen bg-[#000000] text-white">
        {/* Background pattern */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1a1a1a] to-transparent opacity-50"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <HeaderPortfolio />

          <main>
            {/* Hero Section */}
            <ScrollSection className="relative h-screen w-full" id="hero">
              <div className="absolute inset-0">
                {heroData?.mediaType === 'image' && heroData?.backgroundImage ? (
                  <div data-scroll data-scroll-speed="-1">
                    <Image
                      src={urlFor(heroData.backgroundImage).width(1920).height(1080).url()}
                      alt={heroData.title || 'Hero image'}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : heroData?.mediaType === 'video' ? (
                  <>
                    {heroData.videoUrl ? (
                      <div className="youtube-container">
                        <div className="preload-overlay"></div>
                        <iframe
                          src={heroData.videoUrl && heroData.videoUrl.includes('youtube.com') ?
                            `https://www.youtube.com/embed/${heroData.videoUrl.split('v=')[1]}?autoplay=1&mute=1&loop=1&playlist=${heroData.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                            heroData.videoUrl && heroData.videoUrl.includes('youtu.be') ?
                              `https://www.youtube.com/embed/${heroData.videoUrl.split('youtu.be/')[1]}?autoplay=1&mute=1&loop=1&playlist=${heroData.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                              heroData.videoUrl
                          }
                          title={heroData.title || 'Hero video'}
                          className="youtube-iframe"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="eager"
                        />
                      </div>
                    ) : heroData.videoFile?.asset?.url ? (
                      <video
                        src={heroData.videoFile.asset.url}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <Image
                        src="/placeholder.svg?height=1080&width=1920"
                        alt="Placeholder image"
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </>
                ) : (
                  <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Placeholder image"
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30">
                  <div className="h-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
                    <ScrollReveal origin="bottom" distance="50px" duration={1000} delay={200}>
                      <h1 className="text-4xl lg:text-6xl font-light tracking-tight">
                        {heroData?.title || 'Photographer'}
                      </h1>
                      {heroData?.subtitle && (
                        <p className="text-xl lg:text-2xl mt-4">{heroData.subtitle}</p>
                      )}
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </ScrollSection>

            {/* About Us Section */}
            <ScrollSection className="relative py-20" id="about">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                  <div className="w-full lg:w-1/2">
                    <ScrollReveal origin="left" distance="100px" duration={1000} delay={300}>
                      <h2 className="text-3xl lg:text-4xl font-light mb-6">
                        {aboutData?.title || 'About Me'}
                      </h2>
                      <div className="prose prose-lg prose-invert">
                        <p>{aboutData?.description || 'Professional photographer with a passion for capturing moments.'}</p>
                      </div>
                    </ScrollReveal>
                  </div>
                  
                  <div className="w-full lg:w-1/2">
                    <ScrollReveal origin="right" distance="100px" duration={1000} delay={500}>
                      <div data-scroll data-scroll-speed="0.5">
                        <Image
                          src={aboutData?.image ? urlFor(aboutData.image).width(800).height(1000).url() : "/placeholder.svg?height=1000&width=800"}
                          alt="About image"
                          width={800}
                          height={1000}
                          className="rounded-lg shadow-xl w-full h-auto"
                        />
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </ScrollSection>

            {/* Portfolio Preview - Masonry with Text Overlay */}
            <ScrollSection className="relative min-h-screen py-20" id="portfolio">
              {/* Background container */}
              {portfolioData?.mediaType === 'image' && portfolioData?.backgroundImage ? (
                <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.5">
                  <Image
                    src={urlFor(portfolioData.backgroundImage).width(1920).height(1080).url()}
                    alt="Background image"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              ) : portfolioData?.mediaType === 'video' && portfolioData?.videoUrl ? (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="youtube-container">
                    <div className="preload-overlay"></div>
                    <iframe
                      src={portfolioData.videoUrl && portfolioData.videoUrl.includes('youtube.com') ?
                        `https://www.youtube.com/embed/${portfolioData.videoUrl.split('v=')[1]}?autoplay=1&mute=1&loop=1&playlist=${portfolioData.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                        portfolioData.videoUrl && portfolioData.videoUrl.includes('youtu.be') ?
                          `https://www.youtube.com/embed/${portfolioData.videoUrl.split('youtu.be/')[1]}?autoplay=1&mute=1&loop=1&playlist=${portfolioData.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                          portfolioData.videoUrl
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
                  style={{ backgroundColor: portfolioData?.backgroundColor || '#000000', opacity: 0.6 }}
                ></div>
              )}

              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Masonry Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {/* Hình 1 - Kích thước lớn */}
                  <ScrollReveal origin="bottom" distance="30px" duration={800} delay={100}>
                    <div className="col-span-1 aspect-[3/4] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <div data-scroll data-scroll-speed="0.5">
                          <Image
                            src={portfolioData?.previewImages && portfolioData.previewImages[0]?.image ?
                              urlFor(portfolioData.previewImages[0].image).width(600).height(800).url() :
                              "/placeholder.svg?height=800&width=600"}
                            alt={portfolioData?.previewImages?.[0]?.alt || "Portfolio image 1"}
                            width={600}
                            height={800}
                            quality={98}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                  
                  {/* Hình 2 - Kích thước nhỏ */}
                  <ScrollReveal origin="bottom" distance="30px" duration={800} delay={200}>
                    <div className="col-span-1 aspect-[3/4] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <div data-scroll data-scroll-speed="0.7">
                          <Image
                            src={portfolioData?.previewImages && portfolioData.previewImages[1]?.image ?
                              urlFor(portfolioData.previewImages[1].image).width(400).height(600).url() :
                              "/placeholder.svg?height=600&width=400"}
                            alt={portfolioData?.previewImages?.[1]?.alt || "Portfolio image 2"}
                            width={400}
                            height={600}
                            quality={98}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                  
                  {/* Hình 3 - Kích thước lớn */}
                  <ScrollReveal origin="bottom" distance="30px" duration={800} delay={300}>
                    <div className="col-span-1 aspect-[3/4] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <div data-scroll data-scroll-speed="0.3">
                          <Image
                            src={portfolioData?.previewImages && portfolioData.previewImages[2]?.image ?
                              urlFor(portfolioData.previewImages[2].image).width(600).height(800).url() :
                              "/placeholder.svg?height=800&width=600"}
                            alt={portfolioData?.previewImages?.[2]?.alt || "Portfolio image 3"}
                            width={600}
                            height={800}
                            quality={98}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                  
                  {/* Hình 4 - Kích thước lớn, span 2 cột trên desktop */}
                  <ScrollReveal origin="bottom" distance="30px" duration={800} delay={400}>
                    <div className="sm:col-span-1 lg:col-span-2 aspect-[16/9] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <div data-scroll data-scroll-speed="0.6">
                          <Image
                            src={portfolioData?.previewImages && portfolioData.previewImages[0]?.image ?
                              urlFor(portfolioData.previewImages[0].image).width(1000).height(600).url() :
                              "/placeholder.svg?height=600&width=1000"}
                            alt={portfolioData?.previewImages?.[0]?.alt || "Portfolio image 4"}
                            width={1000}
                            height={600}
                            quality={98}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                  
                  {/* Hình 5 - Kích thước lớn */}
                  <ScrollReveal origin="bottom" distance="30px" duration={800} delay={500}>
                    <div className="col-span-1 aspect-[3/4] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <div data-scroll data-scroll-speed="0.4">
                          <Image
                            src={portfolioData?.previewImages && portfolioData.previewImages[1]?.image ?
                              urlFor(portfolioData.previewImages[1].image).width(600).height(800).url() :
                              "/placeholder.svg?height=800&width=600"}
                            alt={portfolioData?.previewImages?.[1]?.alt || "Portfolio image 5"}
                            width={600}
                            height={800}
                            quality={98}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
                
                {/* Text Overlay Panel */}
                <ScrollReveal origin="bottom" distance="50px" duration={1000} delay={600}>
                  <div className="w-full bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-md">
                    <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider mb-6">
                        {portfolioData?.title || 'Portfolio'}
                      </h2>
                      
                      <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8">
                        {portfolioData?.subtitle1 ? `${portfolioData.subtitle1} ${portfolioData.subtitle2 || ''}` : 'Welcome to the world through my lens'}
                      </p>
                      
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="inline-block">
                        <button className="uppercase text-lg md:text-xl tracking-widest border-b-2 border-white pb-1 hover:bg-white hover:text-black transition-all duration-300 px-4 py-2">
                          Explore
                        </button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollSection>
          </main>

          <Footer />
        </div>
      </div>
    </ScrollProvider>
  );
}
