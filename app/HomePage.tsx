'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollProvider, ScrollSection, ScrollReveal } from '@/components/scroll';
import HeaderPortfolio from "@/components/header-portfolio";
import Footer from "@/components/footer";
import { urlFor } from "@/lib/sanity";

interface HomePageProps {
  heroData: any;
  portfolioData: any;
  aboutData: any;
  galleryData: any;
  ctaData: any;
}

export default function HomePage({ heroData, portfolioData, aboutData, galleryData, ctaData }: HomePageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-xl text-white">Preparing amazing effects...</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollProvider
      options={{
        smooth: true,
        lerp: 0.03, // Lower value for smoother scrolling
        multiplier: 0.7, // Slower scrolling for more control
        class: 'is-revealed',
        scrollFromAnywhere: true,
        touchMultiplier: 2,
        smoothMobile: true,
      }}
    >
      <div className="bg-black text-white min-h-screen">
        {/* Background pattern */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1a1a1a] to-transparent opacity-50"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <HeaderPortfolio />

          {/* Hero Section */}
          <ScrollSection className="h-screen flex items-center justify-center relative overflow-hidden" id="hero">
            <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.5">
              {heroData?.mediaType === 'image' && heroData?.backgroundImage ? (
                <Image
                  src={urlFor(heroData.backgroundImage).width(1920).height(1080).url()}
                  alt={heroData.title || 'Hero image'}
                  fill
                  className="object-cover"
                  priority
                />
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
                  ) : heroData.videoFile?.url ? (
                    <video
                      src={heroData.videoFile.url}
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
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
              <ScrollReveal
                origin="top"
                distance="100px"
                duration={1200}
                delay={300}
                opacity={0}
                scale={0.9}
                reset={false}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                  {heroData?.title || 'Photographer'}
                </h1>
              </ScrollReveal>

              <ScrollReveal
                origin="bottom"
                distance="50px"
                duration={1000}
                delay={600}
                opacity={0}
                reset={false}
              >
                <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
                  {heroData?.subtitle || 'Experience the world through my lens'}
                </p>
              </ScrollReveal>

              <ScrollReveal
                origin="bottom"
                distance="30px"
                duration={800}
                delay={900}
                opacity={0}
                reset={false}
              >
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="#portfolio" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    View Portfolio
                  </a>
                  <a href="#about" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                    About Me
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </ScrollSection>

          {/* About Section */}
          <ScrollSection className="py-16 md:py-32 relative overflow-hidden" id="about">
            {/* Background */}
            <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.2">
              {aboutData?.mediaType === 'image' && aboutData?.backgroundImage ? (
                <Image
                  src={urlFor(aboutData.backgroundImage).width(1920).height(1080).url()}
                  alt="Background image"
                  fill
                  className="object-cover"
                  priority
                />
              ) : aboutData?.mediaType === 'video' ? (
                {aboutData?.videoFile?.url ? (
                  // Ưu tiên sử dụng video upload
                  <>
                    <video
                      src={aboutData.videoFile.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ zIndex: 1 }}
                    />
                    <div className="video-container" onClick={() => console.log('About Video URL:', aboutData.videoFile.url)}>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={aboutData.videoFile.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </>
                ) : aboutData?.videoUrl ? (
                  // Sử dụng YouTube video nếu không có video upload
                  <div className="youtube-container">
                    <div className="preload-overlay"></div>
                    <iframe
                      src={aboutData.videoUrl && aboutData.videoUrl.includes('youtube.com') ?
                        `https://www.youtube.com/embed/${aboutData.videoUrl.split('v=')[1]}?autoplay=1&mute=1&loop=1&playlist=${aboutData.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                        aboutData.videoUrl && aboutData.videoUrl.includes('youtu.be') ?
                          `https://www.youtube.com/embed/${aboutData.videoUrl.split('youtu.be/')[1]}?autoplay=1&mute=1&loop=1&playlist=${aboutData.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                          aboutData.videoUrl
                      }
                      title="About background video"
                      className="youtube-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="eager"
                    />
                  </div>
                ) : null
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
              )}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div>
                  <ScrollReveal
                    origin="left"
                    distance="100px"
                    duration={1000}
                    delay={200}
                    opacity={0}
                    reset={false}
                  >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tighter">{aboutData?.title || 'About Me'}</h2>
                    <div className="prose prose-lg prose-invert">
                      <p className="text-xl mb-6 leading-relaxed">
                        {aboutData?.description || 'Professional photographer with a passion for capturing moments.'}
                      </p>
                    </div>
                    <div className="h-1 w-24 bg-white mb-6"></div>

                    {/* Skills Collection */}
                    <div className="mt-8">
                      <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{aboutData?.skillsTitle || 'Skills & Expertise'}</h3>
                      {aboutData?.skills && aboutData.skills.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                          {aboutData.skills.map((skill: string, index: number) => (
                            <div
                              key={index}
                              className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-sm hover:bg-white/20 transition-all duration-300 flex items-center"
                              data-scroll data-scroll-speed={0.1 + (index * 0.05)}
                            >
                              <span className="mr-2 text-lg">✦</span>
                              {skill}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                          {['Photography', 'Editing', 'Composition', 'Lighting', 'Portraiture', 'Storytelling'].map((skill, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-sm hover:bg-white/20 transition-all duration-300 flex items-center"
                              data-scroll data-scroll-speed={0.1 + (index * 0.05)}
                            >
                              <span className="mr-2 text-lg">✦</span>
                              {skill}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                </div>

                <div data-scroll data-scroll-speed="0.3">
                  <ScrollReveal
                    origin="right"
                    distance="100px"
                    duration={1000}
                    delay={400}
                    opacity={0}
                    scale={0.8}
                    reset={false}
                  >
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                      <Image
                        src={aboutData?.profileImage ?
                          urlFor(aboutData.profileImage).width(800).height(1000).url() :
                          "/placeholder.svg?height=1000&width=800&text=About+Me"
                        }
                        alt="About me"
                        fill
                        className="object-cover"
                        quality={98}
                      />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* Portfolio Preview Section */}
          <ScrollSection className="py-16 md:py-32 relative overflow-hidden" id="portfolio">
            {/* Animated overlay - sẽ trượt lên khi scroll đến */}
            <div className="absolute inset-0 z-10 bg-white transform translate-y-full transition-transform duration-1000 ease-in-out"
                 data-scroll data-scroll-class="translate-y-0" data-scroll-repeat="true" data-scroll-offset="10%"></div>

            <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.3">
              {portfolioData?.mediaType === 'image' && portfolioData?.backgroundImage ? (
                <Image
                  src={urlFor(portfolioData.backgroundImage).width(1920).height(1080).url()}
                  alt="Background image"
                  fill
                  className="object-cover"
                  priority
                />
              ) : portfolioData?.mediaType === 'video' ? (
                {portfolioData?.videoFile?.url ? (
                  // Ưu tiên sử dụng video upload
                  <>
                    <video
                      src={portfolioData.videoFile.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ zIndex: 1 }}
                    />
                    <div className="video-container" onClick={() => console.log('Portfolio Video URL:', portfolioData.videoFile.url)}>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={portfolioData.videoFile.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </>
                ) : portfolioData?.videoUrl ? (
                  // Sử dụng YouTube video nếu không có video upload
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
                ) : null
              ) : (
                <div
                  style={{ backgroundColor: portfolioData?.backgroundColor || '#000000' }}
                  className="absolute inset-0"
                ></div>
              )}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <ScrollReveal
                origin="bottom"
                distance="50px"
                duration={1000}
                delay={200}
                opacity={0}
                reset={false}
              >
                <div className="text-center mb-8 md:mb-16">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">{portfolioData?.title || 'Portfolio'}</h2>
                  <p className="text-xl max-w-2xl mx-auto">
                    {portfolioData?.subtitle1 ? `${portfolioData.subtitle1} ${portfolioData.subtitle2 || ''}` : 'Welcome to the world through my lens'}
                  </p>
                </div>
              </ScrollReveal>

              {/* Masonry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16">
                {/* Image 1 */}
                <div data-scroll data-scroll-speed="0.5">
                  <ScrollReveal
                    delay={300}
                    duration={1000}
                    opacity={0}
                    scale={0.9}
                    reset={false}
                  >
                    <div className="col-span-1 aspect-[4/5] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <Image
                          src={portfolioData?.previewImages && portfolioData.previewImages[0]?.image ?
                            urlFor(portfolioData.previewImages[0].image).width(800).height(1000).url() :
                            "/placeholder.svg?height=1000&width=800"}
                          alt={portfolioData?.previewImages?.[0]?.alt || "Portfolio image 1"}
                          width={800}
                          height={1000}
                          quality={98}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Image 2 */}
                <div data-scroll data-scroll-speed="0.7">
                  <ScrollReveal
                    delay={400}
                    duration={1000}
                    opacity={0}
                    scale={0.9}
                    reset={false}
                  >
                    <div className="col-span-1 aspect-[4/5] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <Image
                          src={portfolioData?.previewImages && portfolioData.previewImages[1]?.image ?
                            urlFor(portfolioData.previewImages[1].image).width(800).height(1000).url() :
                            "/placeholder.svg?height=1000&width=800"}
                          alt={portfolioData?.previewImages?.[1]?.alt || "Portfolio image 2"}
                          width={800}
                          height={1000}
                          quality={98}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Image 3 */}
                <div data-scroll data-scroll-speed="0.3">
                  <ScrollReveal
                    delay={500}
                    duration={1000}
                    opacity={0}
                    scale={0.9}
                    reset={false}
                  >
                    <div className="col-span-1 aspect-[4/5] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <Image
                          src={portfolioData?.previewImages && portfolioData.previewImages[2]?.image ?
                            urlFor(portfolioData.previewImages[2].image).width(800).height(1000).url() :
                            "/placeholder.svg?height=1000&width=800"}
                          alt={portfolioData?.previewImages?.[2]?.alt || "Portfolio image 3"}
                          width={800}
                          height={1000}
                          quality={98}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Image 4 - Wide */}
                <div className="sm:col-span-1 lg:col-span-2" data-scroll data-scroll-speed="0.6">
                  <ScrollReveal
                    delay={600}
                    duration={1000}
                    opacity={0}
                    scale={0.9}
                    reset={false}
                  >
                    <div className="aspect-[16/9] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
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
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Image 5 */}
                <div data-scroll data-scroll-speed="0.4">
                  <ScrollReveal
                    delay={700}
                    duration={1000}
                    opacity={0}
                    scale={0.9}
                    reset={false}
                  >
                    <div className="col-span-1 aspect-[4/5] rounded-md overflow-hidden transform hover:scale-[1.02] transition-all duration-500 shadow-lg">
                      <Link href={portfolioData?.portfolioLink || '/portfolio'} className="block w-full h-full">
                        <Image
                          src={portfolioData?.previewImages && portfolioData.previewImages[1]?.image ?
                            urlFor(portfolioData.previewImages[1].image).width(800).height(1000).url() :
                            "/placeholder.svg?height=1000&width=800"}
                          alt={portfolioData?.previewImages?.[1]?.alt || "Portfolio image 5"}
                          width={800}
                          height={1000}
                          quality={98}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              {/* Text Overlay Panel */}
              <ScrollReveal
                origin="bottom"
                distance="100px"
                duration={1200}
                delay={300}
                opacity={0}
                scale={0.8}
                reset={false}
              >
                <div className="w-full bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-md">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-4 md:mb-6">
                      {portfolioData?.title || 'Portfolio'}
                    </h2>

                    <p className="text-lg md:text-xl lg:text-2xl font-light mb-6 md:mb-8">
                      {portfolioData?.subtitle1 ? `${portfolioData.subtitle1} ${portfolioData.subtitle2 || ''}` : 'Welcome to the world through my lens'}
                    </p>

                    <Link href={portfolioData?.portfolioLink || '/portfolio'} className="inline-block">
                      <button className="uppercase text-lg md:text-xl tracking-widest border-b-2 border-white pb-1 hover:bg-white hover:text-black transition-all duration-300 px-4 py-2">
                        Explore Gallery
                      </button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollSection>

          {/* Gallery Highlights - Masonry Layout */}
          <ScrollSection className="py-16 md:py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" id="gallery">
            {/* Animated overlay - sẽ trượt lên khi scroll đến */}
            <div className="absolute inset-0 z-10 bg-white transform translate-y-full transition-transform duration-1000 ease-in-out"
                 data-scroll data-scroll-class="translate-y-0" data-scroll-repeat="true" data-scroll-offset="10%"></div>

            {/* Background */}
            <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.2">
              {galleryData?.mediaType === 'image' && galleryData?.backgroundImage ? (
                <Image
                  src={urlFor(galleryData.backgroundImage).width(1920).height(1080).url()}
                  alt="Background image"
                  fill
                  className="object-cover"
                  priority
                />
              ) : galleryData?.mediaType === 'video' && galleryData?.videoUrl ? (
                <div className="youtube-container">
                  <div className="preload-overlay"></div>
                  <iframe
                    src={galleryData.videoUrl && galleryData.videoUrl.includes('youtube.com') ?
                      `https://www.youtube.com/embed/${galleryData.videoUrl.split('v=')[1]}?autoplay=1&mute=1&loop=1&playlist=${galleryData.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                      galleryData.videoUrl && galleryData.videoUrl.includes('youtu.be') ?
                        `https://www.youtube.com/embed/${galleryData.videoUrl.split('youtu.be/')[1]}?autoplay=1&mute=1&loop=1&playlist=${galleryData.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                        galleryData.videoUrl
                    }
                    title="Background video"
                    className="youtube-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="eager"
                  />
                </div>
              ) : (
                <div
                  style={{ backgroundColor: galleryData?.backgroundColor || '#000000' }}
                  className="absolute inset-0"
                ></div>
              )}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container mx-auto px-4 relative z-20">
              <ScrollReveal
                origin="bottom"
                distance="50px"
                duration={1000}
                delay={200}
                opacity={0}
                reset={false}
              >
                <div className="text-center mb-8 md:mb-16">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">{galleryData?.title || 'Gallery Highlights'}</h2>
                  <p className="text-xl max-w-2xl mx-auto">
                    {galleryData?.subtitle || 'A selection of my best work with smooth reveal animations'}
                  </p>
                </div>
              </ScrollReveal>

              {/* Masonry Grid - 4 ảnh */}
              <div className="stagger-children" data-scroll data-scroll-class="is-revealed">
                <div className="my-masonry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px', gridAutoRows: '0' }}>
                  {galleryData?.galleryImages ? (
                    // Nếu có dữ liệu từ Sanity
                    galleryData.galleryImages.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="masonry-item"
                        data-scroll
                        data-scroll-speed={0.2 + (index * 0.1)}
                        style={{ gridRowEnd: `span ${item.rowSpan || 35}` }}
                      >
                        <ScrollReveal
                          delay={200 + (index * 100)}
                          duration={800}
                          opacity={0}
                          reset={false}
                        >
                          <div className="w-full h-full rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition-all duration-500">
                            {/* Debug: Log image data */}
                            {console.log('Gallery Image Item:', item)}
                            <Image
                              src={item.image && item.image.asset ?
                                urlFor(item.image).width(800).height(1000).url() :
                                `/placeholder.svg?height=1000&width=800&text=Gallery+${index + 1}`}
                              alt={item.alt || `Gallery image ${index + 1}`}
                              width={800}
                              height={1000}
                              className="w-full h-full object-cover"
                              quality={98}
                            />

                            {item.title && (
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                {item.description && <p className="text-sm text-gray-300">{item.description}</p>}
                              </div>
                            )}
                          </div>
                        </ScrollReveal>
                      </div>
                    ))
                  ) : (
                    // Fallback nếu không có dữ liệu
                    [38, 30, 42, 35].map((rowSpan, index) => (
                      <div
                        key={index}
                        className="masonry-item"
                        data-scroll
                        data-scroll-speed={0.2 + (index * 0.1)}
                        style={{ gridRowEnd: `span ${rowSpan}` }}
                      >
                        <ScrollReveal
                          delay={200 + (index * 100)}
                          duration={800}
                          opacity={0}
                          reset={false}
                        >
                          <div className="w-full h-full rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition-all duration-500">
                            <Image
                              src={portfolioData?.previewImages && portfolioData.previewImages[index % 3]?.image ?
                                urlFor(portfolioData.previewImages[index % 3].image).width(800).height(1000).url() :
                                `/placeholder.svg?height=1000&width=800&text=Gallery+${index + 1}`}
                              alt={`Gallery image ${index + 1}`}
                              width={800}
                              height={1000}
                              className="w-full h-full object-cover"
                              quality={98}
                            />
                          </div>
                        </ScrollReveal>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {galleryData?.buttonText && (
                <div className="text-center mt-12">
                  <Link href={galleryData.buttonLink || '/portfolio'} className="inline-block">
                    <button className="uppercase text-lg md:text-xl tracking-widest border-b-2 border-white pb-1 hover:bg-white hover:text-black transition-all duration-300 px-4 py-2">
                      {galleryData.buttonText}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </ScrollSection>

          {/* CTA Section - Ready to Work Together */}
          <ScrollSection className="py-16 md:py-32 relative overflow-hidden" id="cta">
            {/* Animated overlay - sẽ trượt lên khi scroll đến */}
            <div className="absolute inset-0 z-10 bg-white transform translate-y-full transition-transform duration-1000 ease-in-out"
                 data-scroll data-scroll-class="translate-y-0" data-scroll-repeat="true" data-scroll-offset="10%"></div>

            <div className="absolute inset-0 z-0" data-scroll data-scroll-speed="-0.2">
              {ctaData?.mediaType === 'video' && ctaData?.videoUrl ? (
                <>
                  <div className="youtube-container">
                    <div className="preload-overlay"></div>
                    <iframe
                      src={ctaData.videoUrl && ctaData.videoUrl.includes('youtube.com') ?
                        `https://www.youtube.com/embed/${ctaData.videoUrl.split('v=')[1]}?autoplay=1&mute=1&loop=1&playlist=${ctaData.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                        ctaData.videoUrl && ctaData.videoUrl.includes('youtu.be') ?
                          `https://www.youtube.com/embed/${ctaData.videoUrl.split('youtu.be/')[1]}?autoplay=1&mute=1&loop=1&playlist=${ctaData.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                          ctaData.videoUrl
                      }
                      title="CTA background video"
                      className="youtube-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="eager"
                    />
                  </div>
                </>
              ) : ctaData?.mediaType === 'image' && ctaData?.backgroundImage ? (
                <Image
                  src={urlFor(ctaData.backgroundImage).width(1920).height(1080).url()}
                  alt="CTA background"
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  style={{ backgroundColor: ctaData?.backgroundColor || '#000000' }}
                  className="absolute inset-0"
                ></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center px-4">
                <ScrollReveal
                  origin="bottom"
                  distance="100px"
                  duration={1200}
                  delay={300}
                  opacity={0}
                  scale={0.8}
                  reset={false}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8">{ctaData?.title || 'Ready to Work Together?'}</h2>
                  {ctaData?.subtitle && (
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-4">{ctaData.subtitle}</h3>
                  )}
                  {ctaData?.description ? (
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 leading-relaxed">{ctaData.description}</p>
                  ) : (
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 leading-relaxed">
                      Let's create something amazing together. Contact me to discuss your project.
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {ctaData?.primaryButtonText ? (
                      <Link href={ctaData.primaryButtonLink || '/contact'} className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        {ctaData.primaryButtonText}
                      </Link>
                    ) : (
                      <Link href="/contact" className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        Contact Me
                      </Link>
                    )}
                    {ctaData?.secondaryButtonText ? (
                      <Link href={ctaData.secondaryButtonLink || '/portfolio'} className="bg-transparent border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                        {ctaData.secondaryButtonText}
                      </Link>
                    ) : (
                      <Link href="/portfolio" className="bg-transparent border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                        View Full Portfolio
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollSection>

          <Footer />
        </div>
      </div>
    </ScrollProvider>
  );
}
