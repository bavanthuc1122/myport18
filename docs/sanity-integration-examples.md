# Ví dụ tích hợp Sanity CMS với Next.js

## Giới thiệu

Tài liệu này cung cấp các ví dụ cụ thể về cách hiển thị nội dung từ Sanity CMS trong các component của Next.js.

## 1. Hiển thị Hero Section với hỗ trợ cả hình ảnh và video

```jsx
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

export default function HeroSection({ heroData }) {
  if (!heroData) return null
  
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0">
        {heroData.mediaType === 'image' && heroData.backgroundImage && (
          <Image
            src={urlFor(heroData.backgroundImage).url()}
            alt={heroData.title}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {heroData.mediaType === 'video' && (
          <>
            {heroData.videoUrl ? (
              <iframe
                src={heroData.videoUrl}
                title={heroData.title}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : heroData.videoFile?.asset?.url ? (
              <video
                src={heroData.videoFile.asset.url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : null}
          </>
        )}
        
        {heroData.backgroundOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30">
            <div className="h-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight">{heroData.title}</h1>
              {heroData.subtitle && (
                <p className="text-xl lg:text-2xl mt-4">{heroData.subtitle}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
```

## 2. Hiển thị Portfolio Preview với 3 hình ảnh

```jsx
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioPreview({ portfolioData }) {
  if (!portfolioData) return null
  
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/80 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl lg:text-4xl text-center font-light mb-16">{portfolioData.title}</h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/3">
            <h3 className="text-2xl lg:text-3xl font-light mb-4">{portfolioData.subtitle1}</h3>
            <p className="text-2xl lg:text-3xl font-light text-gray-400">{portfolioData.subtitle2}</p>
          </div>
          
          <div className="w-full lg:w-2/3 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            {portfolioData.previewImages?.map((item, index) => {
              // Tính toán vị trí cho mỗi hình ảnh
              const positions = [
                { top: '0', left: '10%', width: '35%', height: '85%', rotate: '-6deg', zIndex: 0 },
                { top: '10%', left: '35%', width: '35%', height: '85%', rotate: '3deg', zIndex: 10 },
                { top: '5%', right: '5%', width: '35%', height: '85%', rotate: '-3deg', zIndex: 0 }
              ];
              
              const position = positions[index] || positions[0];
              
              return (
                <Link 
                  key={index} 
                  href={item.link || portfolioData.portfolioLink || '/portfolio'}
                  className="absolute hover:scale-105 transition-transform"
                  style={{
                    top: position.top,
                    left: position.left,
                    right: position.right,
                    width: position.width,
                    height: position.height,
                    transform: `rotate(${position.rotate})`,
                    zIndex: position.zIndex
                  }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(item.image).width(500).height(800).url()}
                      alt={item.alt || `Portfolio image ${index + 1}`}
                      width={500}
                      height={800}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

## 3. Hiển thị Portfolio Items với lọc theo danh mục

```jsx
'use client'

import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioGrid({ categories, portfolioItems }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredItems, setFilteredItems] = useState(portfolioItems)
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(portfolioItems)
    } else {
      setFilteredItems(
        portfolioItems.filter(item => item.category._id === selectedCategory)
      )
    }
  }, [selectedCategory, portfolioItems])
  
  return (
    <div className="mx-auto px-8 sm:px-16 lg:px-24">
      <div className="pt-32 pb-16">
        <h1 className="text-6xl font-bold mb-2">WORK IMAGE</h1>
        <p className="text-gray-400 text-lg">Darkness is core of light</p>
      </div>
      
      {/* Category Filter */}
      <div className="flex justify-center gap-12 mb-16">
        <button
          className={`text-base transition-colors duration-300 ${
            selectedCategory === 'all' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category._id}
            className={`text-base transition-colors duration-300 ${
              selectedCategory === category._id ? 'text-white' : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.title}
          </button>
        ))}
      </div>
      
      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Link 
            key={item._id} 
            href={item.behanceLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden"
          >
            <div className="aspect-[3/4] w-full bg-white relative">
              {item.imageSource === 'upload' && item.coverImage ? (
                <Image
                  src={urlFor(item.coverImage).width(600).height(800).url()}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              ) : item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <p className="text-white text-center p-4">No image available</p>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                <h3 className="text-white text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.category.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

## 4. Truy vấn dữ liệu từ Sanity

```javascript
// lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// Helper function for using GROQ to query Sanity
export async function fetchSanityData(query, params = {}) {
  return await client.fetch(query, params)
}

// Truy vấn Hero Section
export async function getHeroSection() {
  return await fetchSanityData(`*[_type == "heroSection"][0]`)
}

// Truy vấn Portfolio Preview
export async function getPortfolioPreview() {
  return await fetchSanityData(`*[_type == "portfolioPreview"][0]`)
}

// Truy vấn tất cả danh mục
export async function getAllCategories() {
  return await fetchSanityData(`*[_type == "category"] | order(title asc)`)
}

// Truy vấn tất cả mục portfolio
export async function getAllPortfolioItems() {
  return await fetchSanityData(`
    *[_type == "portfolioItem"] {
      _id,
      title,
      imageSource,
      coverImage,
      imageUrl,
      behanceLink,
      publishedAt,
      category->{
        _id,
        title
      }
    } | order(publishedAt desc)
  `)
}
```

## 5. Sử dụng trong trang chủ (app/page.js)

```jsx
import { getHeroSection, getAboutSection, getPortfolioPreview } from '@/lib/sanity'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import PortfolioPreview from '@/components/PortfolioPreview'
import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"

export default async function Home() {
  // Truy vấn dữ liệu từ Sanity
  const heroData = await getHeroSection()
  const aboutData = await getAboutSection()
  const portfolioData = await getPortfolioPreview()
  
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
          <HeroSection heroData={heroData} />

          {/* About Us Section */}
          <AboutSection aboutData={aboutData} />

          {/* Portfolio Preview */}
          <PortfolioPreview portfolioData={portfolioData} />
        </main>

        <Footer />
      </div>
    </div>
  )
}
```

## 6. Sử dụng trong trang Portfolio (app/portfolio/page.js)

```jsx
import { getAllCategories, getAllPortfolioItems } from '@/lib/sanity'
import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"
import PortfolioGrid from '@/components/PortfolioGrid'

export default async function PortfolioPage() {
  // Truy vấn dữ liệu từ Sanity
  const categories = await getAllCategories()
  const portfolioItems = await getAllPortfolioItems()
  
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <HeaderPortfolio />
      
      <PortfolioGrid 
        categories={categories} 
        portfolioItems={portfolioItems} 
      />
      
      <Footer />
    </div>
  )
}
```

## Lưu ý quan trọng

1. **Xử lý hình ảnh**:
   - Luôn sử dụng `urlFor()` để tạo URL cho hình ảnh từ Sanity
   - Chỉ định kích thước hình ảnh để tối ưu hiệu suất

2. **Xử lý video**:
   - Đối với video từ YouTube hoặc Vimeo, sử dụng iframe
   - Đối với video tải lên trực tiếp, sử dụng thẻ video

3. **Xử lý link**:
   - Đối với link bên ngoài (như Behance), sử dụng `target="_blank" rel="noopener noreferrer"`

4. **Tối ưu hóa hiệu suất**:
   - Sử dụng Next.js Image component để tối ưu hóa hình ảnh
   - Sử dụng lazy loading cho hình ảnh không nằm trong viewport ban đầu
