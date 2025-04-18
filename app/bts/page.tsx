import Image from "next/image"
import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"
import { batchFetchSanityData, urlFor } from "@/lib/sanity"

export default async function BTS() {
  // Batch fetch BTS sections from Sanity to reduce API requests
  const data = await batchFetchSanityData({
    btsSections: {
      query: '*[_type == "btsSection"] | order(order asc) { _id, title, subtitle, layout, backgroundColor, mainImage, videoUrl, images[] { _key, image, alt } }'
    }
  })

  // Extract data from batch response
  const btsSections = data.btsSections || []

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
          <div className="mb-16 text-center fade-in">
            <h1 className="text-4xl lg:text-6xl font-light mb-3 slide-up">Be High The Scene</h1>
            <p className="text-gray-400 text-lg slide-up delay-200 italic">A closer perspective</p>
            <div className="w-24 h-1 bg-white/20 mx-auto mt-6"></div>
          </div>

          {btsSections && btsSections.length > 0 ? (
            // Render BTS sections from Sanity
            <>
              {btsSections.map((section, index) => (
                <div key={section._id} className="mb-16 fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  {/* Section title */}
                  <div className="text-center mb-10 slide-up">
                    <h2 className="text-3xl lg:text-5xl font-light">{section.title || `BTS Session ${index + 1}`}</h2>
                    {section.subtitle && <p className="text-gray-400 mt-3 text-lg">{section.subtitle}</p>}
                    <div className="w-16 h-0.5 bg-white/20 mx-auto mt-5"></div>
                  </div>

                  {/* Layout 1: 1 large image + 4 small images */}
                  {section.layout === 'layout1' && (
                    <div className={`rounded-2xl p-6 lg:p-10 mb-16 shadow-lg ${section.backgroundColor ? '' : 'bg-[#1a1a1a]'}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                        {/* Large image */}
                        <div className="lg:col-span-3">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
                            {section.mainImage ? (
                              <Image
                                src={urlFor(section.mainImage).width(1200).height(800).url()}
                                alt={`${section.title} main image`}
                                fill
                                className="object-cover"
                              />
                            ) : section.videoUrl ? (
                              <iframe
                                src={section.videoUrl.includes('youtube.com') ?
                                  `${section.videoUrl.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${section.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1` :
                                  section.videoUrl.includes('youtu.be') ?
                                    `${section.videoUrl.replace('youtu.be/', 'youtube.com/embed/')}?autoplay=1&mute=1&loop=1&playlist=${section.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1` :
                                    section.videoUrl
                                }
                                title={section.title || 'BTS video'}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <Image
                                src="/placeholder.svg?height=800&width=1200"
                                alt="BTS main image"
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                        </div>

                        {/* Small images grid */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                          {section.images && section.images.slice(0, 4).map((img: any, i: number) => {
                            // Kiểm tra xem img có hợp lệ không
                            const validImage = img && (img.image?.asset || img.asset || (typeof img === 'object' && Object.keys(img).length > 0 && img._key))

                            return (
                              <div key={img?._key || `layout1-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <Image
                                  src={validImage ? urlFor(img.image || img).width(400).height(400).url() : '/placeholder.svg?height=400&width=400'}
                                  alt={img?.alt || `BTS image ${i + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )
                          })}

                          {/* Fallback images if not enough images */}
                          {section.images && section.images.length < 4 && Array.from({ length: 4 - (section.images.length || 0) }).map((_, i) => (
                            <div key={`fallback-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                              <Image
                                src="/placeholder.svg?height=400&width=400"
                                alt={`BTS image placeholder ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Layout 2: 3 images on left + 2 on right */}
                  {section.layout === 'layout2' && (
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      {/* Left side - 3 images */}
                      <div className="grid grid-cols-3 gap-4">
                        {section.images && section.images.slice(0, 3).map((img: any, i: number) => {
                          // Kiểm tra xem img có hợp lệ không
                          const validImage = img && (img.image?.asset || img.asset || (typeof img === 'object' && Object.keys(img).length > 0 && img._key))

                          return (
                            <div key={img?._key || `layout2-left-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                              <Image
                                src={validImage ? urlFor(img.image || img).width(300).height(300).url() : '/placeholder.svg?height=300&width=300'}
                                alt={img?.alt || `Gallery image ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )
                        })}

                        {/* Fallback images if not enough images */}
                        {section.images && section.images.length < 3 && Array.from({ length: 3 - (section.images.length || 0) }).map((_, i) => (
                          <div key={`fallback-left-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <Image
                              src="/placeholder.svg?height=300&width=300"
                              alt={`Gallery image placeholder ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Right side - 2 images */}
                      <div className="grid grid-cols-2 gap-4">
                        {section.images && section.images.slice(3, 5).map((img: any, i: number) => {
                          // Kiểm tra xem img có hợp lệ không
                          const validImage = img && (img.image?.asset || img.asset || (typeof img === 'object' && Object.keys(img).length > 0 && img._key))

                          return (
                            <div key={img?._key || `layout2-right-${i}`} className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                              <Image
                                src={validImage ? urlFor(img.image || img).width(500).height(300).url() : '/placeholder.svg?height=300&width=500'}
                                alt={img?.alt || `Gallery image ${i + 4}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )
                        })}

                        {/* Fallback images if not enough images */}
                        {section.images && (section.images.length < 5) && Array.from({ length: 2 - (Math.max(0, section.images.length - 3)) }).map((_, i) => (
                          <div key={`fallback-right-${i}`} className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <Image
                              src="/placeholder.svg?height=300&width=500"
                              alt={`Gallery image placeholder ${i + 4}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Layout 3: 5 hình ngang hàng */}
                  {section.layout === 'layout3' && (
                    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      {section.images && section.images.slice(0, 5).map((img: any, i: number) => {
                        // Kiểm tra xem img có hợp lệ không
                        const validImage = img && (img.image?.asset || img.asset || (typeof img === 'object' && Object.keys(img).length > 0 && img._key))

                        return (
                          <div key={img?._key || `layout3-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <Image
                              src={validImage ? urlFor(img.image || img).width(300).height(300).url() : '/placeholder.svg?height=300&width=300'}
                              alt={img?.alt || `Gallery image ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      })}

                      {/* Fallback images if not enough images */}
                      {section.images && section.images.length < 5 && Array.from({ length: 5 - (section.images.length || 0) }).map((_, i) => (
                        <div key={`fallback-row-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                          <Image
                            src="/placeholder.svg?height=300&width=300"
                            alt={`Gallery image placeholder ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Layout 4: 2 lớn + 3 nhỏ */}
                  {section.layout === 'layout4' && (
                    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      {/* 2 hình lớn */}
                      <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                        {section.images && section.images.slice(0, 2).map((img: any, i: number) => {
                          // Kiểm tra xem img có hợp lệ không
                          const validImage = img && (img.image?.asset || img.asset || (typeof img === 'object' && Object.keys(img).length > 0 && img._key))

                          return (
                            <div key={img?._key || `layout4-large-${i}`} className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                              <Image
                                src={validImage ? urlFor(img.image || img).width(600).height(400).url() : '/placeholder.svg?height=400&width=600'}
                                alt={img?.alt || `Gallery image ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )
                        })}

                        {/* Fallback images if not enough images */}
                        {section.images && section.images.length < 2 && Array.from({ length: 2 - (section.images.length || 0) }).map((_, i) => (
                          <div key={`fallback-large-${i}`} className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <Image
                              src="/placeholder.svg?height=400&width=600"
                              alt={`Gallery image placeholder ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* 3 hình nhỏ */}
                      <div className="grid grid-cols-1 gap-4">
                        {section.images && section.images.slice(2, 5).map((img: any, i: number) => {
                          // Kiểm tra xem img có hợp lệ không
                          const validImage = img && (img.image?.asset || img.asset || (typeof img === 'object' && Object.keys(img).length > 0 && img._key))

                          return (
                            <div key={img?._key || `layout4-small-${i}`} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                              <Image
                                src={validImage ? urlFor(img.image || img).width(400).height(300).url() : '/placeholder.svg?height=300&width=400'}
                                alt={img?.alt || `Gallery image ${i + 3}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )
                        })}

                        {/* Fallback images if not enough images */}
                        {section.images && (section.images.length < 5) && Array.from({ length: 3 - (Math.max(0, section.images.length - 2)) }).map((_, i) => (
                          <div key={`fallback-small-${i}`} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <Image
                              src="/placeholder.svg?height=300&width=400"
                              alt={`Gallery image placeholder ${i + 3}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Default layout if no layout specified */}
                  {!section.layout && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      {section.images && section.images.map((img: any, i: number) => {
                        // Kiểm tra xem img có hợp lệ không
                        const validImage = img && (img.image?.asset || img.asset || (typeof img === 'object' && Object.keys(img).length > 0 && img._key))

                        return (
                          <div key={img?._key || `default-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <Image
                              src={validImage ? urlFor(img.image || img).width(400).height(400).url() : '/placeholder.svg?height=400&width=400'}
                              alt={img?.alt || `BTS image ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      })}

                      {/* Fallback if no images */}
                      {(!section.images || section.images.length === 0) && Array.from({ length: 6 }).map((_, i) => (
                        <div key={`fallback-default-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                          <Image
                            src="/placeholder.svg?height=400&width=400"
                            alt={`BTS image placeholder ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            // Fallback if no BTS sections
            <>
              {/* First Image Grid */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 lg:p-10 mb-16 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
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
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={`fallback-grid-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
                        <Image
                          src="/placeholder.svg?height=400&width=400"
                          alt={`BTS image ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title Be High The Scene */}
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-light">Thuc Studio</h2>
                <div className="w-16 h-0.5 bg-white/20 mx-auto mt-5"></div>
              </div>

              {/* Second Image Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 bg-[#1a1a1a] p-6 lg:p-10 rounded-2xl shadow-lg">
                {/* Left side - 3 images */}
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`fallback-left-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt={`Gallery image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Right side - 2 images */}
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={`fallback-right-${i}`} className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt={`Gallery image ${i + 4}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  )
}
