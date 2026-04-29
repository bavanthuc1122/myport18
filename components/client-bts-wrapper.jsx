'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import section slideshow component (client-side only)
const SectionSlideshow = dynamic(() => import('@/components/section-slideshow'), { ssr: false });

export default function ClientBtsWrapper({ btsSections }) {

  // Ghi log dữ liệu để kiểm tra
  useEffect(() => {
    if (btsSections && btsSections.length > 0) {
      console.log('BTS Sections data:', btsSections);
    } else {
      console.warn('No BTS sections data available');
    }
  }, [btsSections]);

  return (
    <div>
      {/* Content */}
      <motion.div
        className="grid-layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
          {btsSections && btsSections.length > 0 ? (
            // Render BTS sections from Sanity
            <>
              {btsSections.map((section, index) => (
                <motion.div
                  key={section._id}
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Section title */}
                  <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <h2 className="text-3xl lg:text-5xl font-light">{section.title || `BTS Session ${index + 1}`}</h2>
                    {section.subtitle && <p className="text-gray-400 mt-3 text-lg">{section.subtitle}</p>}
                    <div className="w-16 h-0.5 bg-white/20 mx-auto mt-5"></div>
                  </motion.div>

                  {/* Layout 1: 1 large image + 4 small images */}
                  {section.layout === 'layout1' && (
                    <div className={`rounded-2xl p-6 lg:p-10 mb-16 shadow-lg ${section.backgroundColor ? '' : 'bg-[#1a1a1a]'}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                        {/* Large image */}
                        <div className="lg:col-span-3">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
                            {section.mainImage ? (
                              <Image
                                src={section.mainImage.url}
                                alt={`${section.title} main image`}
                                fill
                                className="object-cover"
                              />
                            ) : section.videoUrl ? (
                              <div className="youtube-container">
                                <div className="preload-overlay"></div>
                                <iframe
                                  src={section.videoUrl && section.videoUrl.includes('youtube.com') ?
                                    `https://www.youtube.com/embed/${section.videoUrl.split('v=')[1]}?autoplay=1&mute=1&loop=1&playlist=${section.videoUrl.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                                    section.videoUrl && section.videoUrl.includes('youtu.be') ?
                                      `https://www.youtube.com/embed/${section.videoUrl.split('youtu.be/')[1]}?autoplay=1&mute=1&loop=1&playlist=${section.videoUrl.split('youtu.be/')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1` :
                                      section.videoUrl
                                  }
                                  title={section.title || 'BTS video'}
                                  className="youtube-iframe"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Small images grid */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                          {section.images && section.images.length > 0 ? section.images.slice(0, 4).map((img, i) => {
                            // Kiểm tra xem img có hợp lệ không
                            const validImage = img && img.url;

                            return (
                              <div key={img?._key || `layout1-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                {validImage ? (
                                  <img
                                    src={img.url}
                                    alt={img?.alt || `BTS image ${i + 1}`}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    <span className="text-gray-400">No image</span>
                                  </div>
                                )}
                              </div>
                            )
                          }) : (
                            <div className="col-span-2 text-center py-10">
                              <p className="text-gray-400">Không có hình ảnh nào được chọn</p>
                            </div>
                          )}

                          {/* Fallback images if not enough images */}
                          {section.images && section.images.length < 4 && Array.from({ length: 4 - (section.images.length || 0) }).map((_, i) => (
                            <div key={`fallback-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}



                  {/* Layout 3: 5 hình ngang hàng */}
                  {section.layout === 'layout3' && (
                    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      {section.images && section.images.length > 0 ? section.images.slice(0, 5).map((img, i) => {
                        // Kiểm tra xem img có hợp lệ không
                        const validImage = img && img.url;

                        return (
                          <div key={img?._key || `layout3-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            {validImage ? (
                              <img
                                src={img.url}
                                alt={img?.alt || `Gallery image ${i + 1}`}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                              </div>
                            )}
                          </div>
                        )
                      }) : (
                        <div className="col-span-5 text-center py-10">
                          <p className="text-gray-400">Không có hình ảnh nào được chọn</p>
                        </div>
                      )}

                      {/* Fallback images if not enough images */}
                      {section.images && section.images.length < 5 && Array.from({ length: 5 - (section.images.length || 0) }).map((_, i) => (
                        <div key={`fallback-row-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}



                  {/* Layout 5: Lưới hình ảnh tự động */}
                  {section.layout === 'layout5' && (
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${section.customLayout?.columns || 3} gap-${section.customLayout?.gap ? Math.floor(section.customLayout.gap/4) : 4} mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`}
                      style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}
                    >
                      {section.images && section.images.length > 0 ? section.images.map((img, i) => {
                        // Kiểm tra xem img có hợp lệ không
                        const validImage = img && img.url;

                        // Xác định aspect ratio
                        let aspectRatioClass = 'aspect-square';
                        if (section.customLayout?.aspectRatio === '16:9') aspectRatioClass = 'aspect-video';
                        else if (section.customLayout?.aspectRatio === '4:3') aspectRatioClass = 'aspect-[4/3]';
                        else if (section.customLayout?.aspectRatio === '9:16') aspectRatioClass = 'aspect-[9/16]';
                        else if (section.customLayout?.aspectRatio === '3:4') aspectRatioClass = 'aspect-[3/4]';
                        else if (section.customLayout?.aspectRatio === 'auto') aspectRatioClass = '';

                        // Xác định hiệu ứng hover
                        let hoverClass = 'hover-scale';
                        if (section.customLayout?.hoverEffect === 'none') hoverClass = '';
                        else if (section.customLayout?.hoverEffect === 'opacity') hoverClass = 'hover-opacity';
                        else if (section.customLayout?.hoverEffect === 'rotate') hoverClass = 'hover-rotate';
                        else if (section.customLayout?.hoverEffect === 'color') hoverClass = 'hover-color';

                        return (
                          <motion.div
                            key={img?._key || `layout5-${i}`}
                            className={`relative ${aspectRatioClass} rounded-[${section.customLayout?.roundedCorners || 8}px] overflow-hidden bg-gray-900 ${hoverClass} ${section.customLayout?.shadow ? 'shadow-xl' : ''}`}
                            whileHover={{ scale: hoverClass === 'hover-scale' ? 1.05 : 1 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          >
                            {validImage ? (
                              <Image
                                src={img.url}
                                alt={img?.alt || `Gallery image ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                              </div>
                            )}
                          </motion.div>
                        )
                      }) : (
                        <div className="col-span-3 text-center py-10">
                          <p className="text-gray-400">Không có hình ảnh nào được chọn</p>
                        </div>
                      )}

                      {/* Fallback images if not enough images */}
                      {(!section.images || section.images.length === 0) && Array.from({ length: 6 }).map((_, i) => {
                        // Xác định aspect ratio
                        let aspectRatioClass = 'aspect-square';
                        if (section.customLayout?.aspectRatio === '16:9') aspectRatioClass = 'aspect-video';
                        else if (section.customLayout?.aspectRatio === '4:3') aspectRatioClass = 'aspect-[4/3]';
                        else if (section.customLayout?.aspectRatio === '9:16') aspectRatioClass = 'aspect-[9/16]';
                        else if (section.customLayout?.aspectRatio === '3:4') aspectRatioClass = 'aspect-[3/4]';
                        else if (section.customLayout?.aspectRatio === 'auto') aspectRatioClass = '';

                        return (
                          <motion.div
                            key={`fallback-layout5-${i}`}
                            className={`relative ${aspectRatioClass} rounded-[${section.customLayout?.roundedCorners || 8}px] overflow-hidden bg-gray-900`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          >
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}

                  {/* Layout 6: Slideshow */}
                  {section.layout === 'layout6' && (
                    <div
                      className={`mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`}
                      style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}
                    >
                      <SectionSlideshow images={section.images} />
                    </div>
                  )}

                  {/* Layout 7: Masonry - xếp chồng */}
                  {section.layout === 'layout7' && (
                    <div
                      className={`mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`}
                      style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}
                    >
                      <div className="masonry-layout">
                        {section.images && section.images.length > 0 ? section.images.map((img, i) => {
                          const validImage = img && img.url;

                          // Xác định hiệu ứng hover
                          let hoverClass = 'hover-scale';
                          if (section.customLayout?.hoverEffect === 'none') hoverClass = '';
                          else if (section.customLayout?.hoverEffect === 'opacity') hoverClass = 'hover-opacity';
                          else if (section.customLayout?.hoverEffect === 'rotate') hoverClass = 'hover-rotate';
                          else if (section.customLayout?.hoverEffect === 'color') hoverClass = 'hover-color';

                          return (
                            <motion.div
                              key={img?._key || `masonry-${i}`}
                              className={`masonry-item rounded-[${section.customLayout?.roundedCorners || 8}px] overflow-hidden bg-gray-900 ${hoverClass} ${section.customLayout?.shadow ? 'shadow-xl' : ''}`}
                              whileHover={{ scale: hoverClass === 'hover-scale' ? 1.05 : 1 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                              {validImage ? (
                                <Image
                                  src={img.url}
                                  alt={img?.alt || `Gallery image ${i + 1}`}
                                  width={600}
                                  height={i % 3 === 0 ? 800 : i % 3 === 1 ? 600 : 400}
                                  className="object-cover w-full h-auto"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center p-4" style={{ minHeight: i % 3 === 0 ? '400px' : i % 3 === 1 ? '300px' : '200px' }}>
                                  <span className="text-gray-400">No image</span>
                                </div>
                              )}
                            </motion.div>
                          )
                        }) : (
                          <div className="text-center py-10">
                            <p className="text-gray-400">Không có hình ảnh nào được chọn</p>
                          </div>
                        )}

                        {/* Fallback images */}
                        {(!section.images || section.images.length === 0) && Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={`fallback-masonry-${i}`}
                            className={`masonry-item rounded-[${section.customLayout?.roundedCorners || 8}px] overflow-hidden bg-gray-900`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          >
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center p-4" style={{ minHeight: i % 3 === 0 ? '400px' : i % 3 === 1 ? '300px' : '200px' }}>
                              <span className="text-gray-400">No image</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Default layout if no layout specified */}
                  {!section.layout && section.layout !== 'layout1' && section.layout !== 'layout3' && section.layout !== 'layout5' && section.layout !== 'layout6' && section.layout !== 'layout7' && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 ${section.backgroundColor ? 'p-6 lg:p-10 rounded-2xl shadow-lg' : ''}`} style={section.backgroundColor ? { backgroundColor: section.backgroundColor.hex } : {}}>
                      {section.images && section.images.length > 0 ? section.images.map((img, i) => {
                        // Kiểm tra xem img có hợp lệ không
                        const validImage = img && img.url;

                        return (
                          <div key={img?._key || `default-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            {validImage ? (
                              <Image
                                src={img.url}
                                alt={img?.alt || `BTS image ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                              </div>
                            )}
                          </div>
                        )
                      }) : (
                        <div className="col-span-3 text-center py-10">
                          <p className="text-gray-400">Không có hình ảnh nào được chọn</p>
                        </div>
                      )}

                      {/* Fallback if no images */}
                      {(!section.images || section.images.length === 0) && Array.from({ length: 6 }).map((_, i) => (
                        <div key={`fallback-default-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </>
          ) : (
            // Fallback if no BTS sections
            <div className="text-center text-gray-400">
              <p>Không có dữ liệu hậu trường</p>
            </div>
          )}
        </motion.div>
    </div>
  );
}
