# Hướng dẫn kết nối Sanity CMS với Next.js

## Giới thiệu

Tài liệu này hướng dẫn cách kết nối Sanity CMS với ứng dụng Next.js của bạn để hiển thị nội dung động.

## Cài đặt các gói cần thiết

```bash
npm install next-sanity @sanity/image-url
```

## Tạo file cấu hình Sanity Client

Tạo file `lib/sanity.js` với nội dung sau:

```javascript
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
```

## Truy vấn dữ liệu từ Sanity

### Trang chủ

```javascript
// Truy vấn Hero Section
export async function getHeroSection() {
  return await fetchSanityData(`*[_type == "heroSection"][0]`)
}

// Truy vấn About Section
export async function getAboutSection() {
  return await fetchSanityData(`*[_type == "aboutSection"][0]`)
}

// Truy vấn Portfolio Preview
export async function getPortfolioPreview() {
  return await fetchSanityData(`*[_type == "portfolioPreview"][0]`)
}
```

### Trang Portfolio

```javascript
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
      coverImage,
      behanceLink,
      publishedAt,
      category->{
        _id,
        title
      }
    } | order(publishedAt desc)
  `)
}

// Truy vấn mục portfolio theo danh mục
export async function getPortfolioItemsByCategory(categoryId) {
  return await fetchSanityData(`
    *[_type == "portfolioItem" && category._ref == $categoryId] {
      _id,
      title,
      coverImage,
      behanceLink,
      publishedAt,
      category->{
        _id,
        title
      }
    } | order(publishedAt desc)
  `, { categoryId })
}
```

### Trang BTS

```javascript
// Truy vấn cài đặt trang BTS
export async function getBTSPageSettings() {
  return await fetchSanityData(`*[_type == "btsPage"][0]`)
}

// Truy vấn tất cả mục BTS
export async function getAllBTSItems() {
  return await fetchSanityData(`
    *[_type == "btsItem"] {
      _id,
      title,
      description,
      mainImage,
      galleryImages,
      publishedAt,
      relatedPortfolioItem->{
        _id,
        title,
        behanceLink
      }
    } | order(publishedAt desc)
  `)
}
```

### Trang Contact

```javascript
// Truy vấn thông tin liên hệ
export async function getContactInfo() {
  return await fetchSanityData(`*[_type == "contactInfo"][0]`)
}
```

## Sử dụng dữ liệu trong các component

### Ví dụ: Hiển thị Hero Section

```jsx
import { getHeroSection } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

export default async function HeroSection() {
  const heroData = await getHeroSection()
  
  if (!heroData) return null
  
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0">
        <Image
          src={urlFor(heroData.backgroundImage).url()}
          alt={heroData.title}
          fill
          className="object-cover"
          priority
        />
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

### Ví dụ: Hiển thị Portfolio với lọc theo danh mục

```jsx
'use client'

import { useState, useEffect } from 'react'
import { getAllCategories, getAllPortfolioItems, getPortfolioItemsByCategory } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

export default function PortfolioPage() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      
      // Tải danh mục
      const categoriesData = await getAllCategories()
      setCategories([{ _id: 'all', title: 'All' }, ...categoriesData])
      
      // Tải mục portfolio
      const portfolioData = await getAllPortfolioItems()
      setItems(portfolioData)
      
      setLoading(false)
    }
    
    loadData()
  }, [])
  
  async function handleCategoryChange(categoryId) {
    setLoading(true)
    
    if (categoryId === 'all') {
      const portfolioData = await getAllPortfolioItems()
      setItems(portfolioData)
    } else {
      const filteredData = await getPortfolioItemsByCategory(categoryId)
      setItems(filteredData)
    }
    
    setSelectedCategory(categoryId)
    setLoading(false)
  }
  
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <main className="mx-auto px-8 sm:px-16 lg:px-24">
        <div className="pt-32 pb-16">
          <h1 className="text-6xl font-bold mb-2">WORK IMAGE</h1>
          <p className="text-gray-400 text-lg">Darkness is core of light</p>
        </div>
        
        {/* Category Filter */}
        <div className="flex justify-center gap-12 mb-16">
          {categories.map((category) => (
            <button
              key={category._id}
              className={`text-base transition-colors duration-300 ${
                selectedCategory === category._id ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => handleCategoryChange(category._id)}
            >
              {category.title}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <a 
                key={item._id} 
                href={item.behanceLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
              >
                <div className="aspect-[3/4] w-full bg-white relative">
                  <Image
                    src={urlFor(item.coverImage).width(600).height(800).url()}
                    alt={item.title}
                    width={600}
                    height={800}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white text-lg font-medium mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.category.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
```

## Cập nhật các trang khác

Sử dụng cách tương tự để cập nhật các trang BTS và Contact để hiển thị dữ liệu từ Sanity CMS.

## Lưu ý quan trọng

1. **Xử lý hình ảnh**:
   - Luôn sử dụng `urlFor()` để tạo URL cho hình ảnh từ Sanity
   - Chỉ định kích thước hình ảnh để tối ưu hiệu suất

2. **Xử lý lỗi**:
   - Thêm xử lý lỗi cho các truy vấn Sanity
   - Hiển thị trạng thái loading khi đang tải dữ liệu

3. **Tối ưu hóa**:
   - Sử dụng ISR (Incremental Static Regeneration) hoặc SSG (Static Site Generation) khi có thể
   - Cân nhắc sử dụng `next-sanity/preview` cho chế độ xem trước
