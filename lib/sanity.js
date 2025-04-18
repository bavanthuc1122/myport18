import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
  token: 'skGhxXJrFivXRBqmBdNtweu08hAVPxaQ1X09a7DrASDROnhCLXenvvUJBFibLROeEQvDphDd5ZkU9eL16xdzVOYCszfEuP2O0VcUsAki6hSl34iIUx3XZzrQGCtSNuk3FsepxzYy8yyIyblHGTFBoq1IFsqPJ2ECH40db8rMDJEPpb98YlWY'
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => {
  if (!source || (typeof source === 'object' && !source.asset && !source._ref)) {
    console.warn('Image source is invalid:', source)
    return {
      width: () => ({
        height: () => ({
          url: () => '/placeholder.svg'
        })
      }),
      url: () => '/placeholder.svg'
    }
  }
  try {
    return builder.image(source)
  } catch (error) {
    console.error('Error creating image URL:', error)
    return {
      width: () => ({
        height: () => ({
          url: () => '/placeholder.svg'
        })
      }),
      url: () => '/placeholder.svg'
    }
  }
}

// Batch query function to reduce requests
export async function batchFetchSanityData(queries) {
  const results = {};
  const promises = [];

  for (const [key, query] of Object.entries(queries)) {
    promises.push(
      client.fetch(query.query, query.params || {})
        .then(result => {
          results[key] = result;
        })
    );
  }

  await Promise.all(promises);
  return results;
}

// Helper function for using GROQ to query Sanity
export async function fetchSanityData(query, params = {}) {
  return await client.fetch(query, params)
}

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

// Truy vấn mục portfolio theo danh mục
export async function getPortfolioItemsByCategory(categoryId) {
  return await fetchSanityData(`
    *[_type == "portfolioItem" && category._ref == $categoryId] {
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
  `, { categoryId })
}

// Truy vấn thông tin liên hệ
export async function getContactInfo() {
  return await fetchSanityData(`*[_type == "contactInfo"][0]`)
}

// Truy vấn BTS Page
export async function getBTSPage() {
  return await fetchSanityData(`*[_type == "btsPage"][0]`)
}

// Truy vấn tất cả BTS Items
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

// Truy vấn tất cả BTS Sections
export async function getAllBtsSections() {
  return await fetchSanityData(`
    *[_type == "btsSection"] | order(order asc) {
      _id,
      title,
      subtitle,
      layout,
      mainImage,
      videoUrl,
      images[] {
        _key,
        image,
        alt
      }
    }
  `)
}
