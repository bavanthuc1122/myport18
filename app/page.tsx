import Image from "next/image"
import Link from "next/link"
import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"
import AboutUs from "@/components/homesessionabout/page"
import AnimatedSection from "@/components/animated-section"
import { urlFor } from "@/lib/sanity"

export default async function Home() {
  // Fetch data using batch request to reduce API calls
  const { batchFetchSanityData } = await import('@/lib/sanity');

  // Batch fetch data
  const data = await batchFetchSanityData({
    heroData: {
      query: `*[_type == "heroSection"][0]`
    },
    portfolioData: {
      query: `*[_type == "portfolioPreview"][0]`
    },
    aboutData: {
      query: `*[_type == "aboutSection"][0]`
    }
  });

  // Extract data from batch response
  const heroData = data.heroData;
  const portfolioData = data.portfolioData;
  const aboutData = data.aboutData;

  // Debug logs
  console.log('Portfolio data mediaType:', portfolioData?.mediaType);
  console.log('Portfolio data videoUrl:', portfolioData?.videoUrl);
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

        <main>
          {/* Hero Section */}
          <AnimatedSection className="relative h-screen w-full" delay={0.2} direction="up">
            <div className="absolute inset-0">
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
                  <h1 className="text-4xl lg:text-6xl font-light tracking-tight">
                    {heroData?.title || 'Photographer'}
                  </h1>
                  {heroData?.subtitle && (
                    <p className="text-xl lg:text-2xl mt-4">{heroData.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* About Us Section */}
          <AboutUs aboutData={aboutData} />

          {/* Portfolio Preview */}
          <AnimatedSection className="relative h-screen w-full flex flex-col items-center justify-center" delay={0.3} direction="up">
            {/* Background container */}
            {portfolioData?.mediaType === 'image' && portfolioData?.backgroundImage ? (
              <div className="absolute inset-0 z-0">
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

            {/* Console log để debug */}
            {console.log('Portfolio data:', portfolioData)}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <h2 className="text-3xl lg:text-4xl text-center font-light mb-16">
                {portfolioData?.title || 'Welcome to Portfolio'}
              </h2>

              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="w-full lg:w-1/3">
                  <h3 className="text-2xl lg:text-3xl font-light mb-4">
                    {portfolioData?.subtitle1 || 'I tell your story'}
                  </h3>
                  <p className="text-2xl lg:text-3xl font-light text-gray-400">
                    {portfolioData?.subtitle2 || 'in pictures'}
                  </p>
                </div>

                <div className="w-full lg:w-2/3 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                  {portfolioData?.previewImages && portfolioData.previewImages.length >= 3 ? (
                    // Positions for the three images
                    <>
                      {/* Image 1 */}
                      <Link
                        href={portfolioData.previewImages[0]?.link || portfolioData.portfolioLink || '/portfolio'}
                        className="absolute top-0 left-[10%] w-[35%] h-[85%] rounded-xl overflow-hidden transform -rotate-6 hover:scale-105 transition-transform"
                      >
                        <Image
                          src={urlFor(portfolioData.previewImages[0].image).width(500).height(800).url()}
                          alt={portfolioData.previewImages[0].alt || 'Portfolio image 1'}
                          width={500}
                          height={800}
                          className="object-cover w-full h-full"
                        />
                      </Link>

                      {/* Image 2 */}
                      <Link
                        href={portfolioData.previewImages[1]?.link || portfolioData.portfolioLink || '/portfolio'}
                        className="absolute top-[10%] left-[35%] w-[35%] h-[85%] rounded-xl overflow-hidden transform rotate-3 z-10 hover:scale-105 transition-transform"
                      >
                        <Image
                          src={urlFor(portfolioData.previewImages[1].image).width(500).height(800).url()}
                          alt={portfolioData.previewImages[1].alt || 'Portfolio image 2'}
                          width={500}
                          height={800}
                          className="object-cover w-full h-full"
                        />
                      </Link>

                      {/* Image 3 */}
                      <Link
                        href={portfolioData.previewImages[2]?.link || portfolioData.portfolioLink || '/portfolio'}
                        className="absolute top-[5%] right-[5%] w-[35%] h-[85%] rounded-xl overflow-hidden transform -rotate-3 hover:scale-105 transition-transform"
                      >
                        <Image
                          src={urlFor(portfolioData.previewImages[2].image).width(500).height(800).url()}
                          alt={portfolioData.previewImages[2].alt || 'Portfolio image 3'}
                          width={500}
                          height={800}
                          className="object-cover w-full h-full"
                        />
                      </Link>
                    </>
                  ) : (
                    // Fallback if no images in CMS
                    <>
                      <div className="absolute top-0 left-[10%] w-[35%] h-[85%] rounded-xl overflow-hidden transform -rotate-6 hover:scale-105 transition-transform">
                        <Image
                          src="/placeholder.svg?height=500&width=300"
                          alt="Portfolio image 1"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-[10%] left-[35%] w-[35%] h-[85%] rounded-xl overflow-hidden transform rotate-3 z-10 hover:scale-105 transition-transform">
                        <Image
                          src="/placeholder.svg?height=500&width=300"
                          alt="Portfolio image 2"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-[5%] right-[5%] w-[35%] h-[85%] rounded-xl overflow-hidden transform -rotate-3 hover:scale-105 transition-transform">
                        <Image
                          src="/placeholder.svg?height=500&width=300"
                          alt="Portfolio image 3"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </main>

        <Footer />
      </div>
    </div>
  )
}
