import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN || 'skGhxXJrFivXRBqmBdNtweu08hAVPxaQ1X09a7DrASDROnhCLXenvvUJBFibLROeEQvDphDd5ZkU9eL16xdzVOYCszfEuP2O0VcUsAki6hSl34iIUx3XZzrQGCtSNuk3FsepxzYy8yyIyblHGTFBoq1IFsqPJ2ECH40db8rMDJEPpb98YlWY',
  withCredentials: true,
  useCdn: process.env.NODE_ENV === 'production'
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => {
  // Create a placeholder image URL generator
  const placeholderImage = {
    width: (w) => ({
      height: (h) => ({
        url: () => `/placeholder.svg?width=${w}&height=${h}`
      })
    }),
    url: () => '/placeholder.svg'
  };

  // Check if source is valid
  if (!source) {
    return placeholderImage;
  }

  try {
    // Handle case where source might be nested in an object
    if (typeof source === 'object') {
      // Case 1: Direct asset reference
      if (source.asset && (source.asset._ref || source.asset._id)) {
        // This is the standard format, continue processing
      }
      // Case 2: Direct _ref (reference)
      else if (source._ref) {
        // This is also a standard format, continue processing
      }
      // Case 3: Nested image object
      else if (source.image && (source.image.asset || source.image._ref)) {
        source = source.image;
      }
      // Case 4: No asset or _ref at all
      else if (!source.asset && !source._ref) {
        return placeholderImage;
      }
    }

    return builder.image(source);
  } catch (error) {
    return placeholderImage;
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
  const hero = await fetchSanityData(`*[_type == "heroSection" && _id == "heroSection"][0]`);
  console.log('Hero section ID:', hero?._id);
  return hero;
}

// Truy vấn About Section
export async function getAboutSection() {
  return await fetchSanityData(`*[_type == "aboutSection" && _id == "aboutSection"][0]`)
}

// Truy vấn Portfolio Preview
export async function getPortfolioPreview() {
  return await fetchSanityData(`*[_type == "portfolioPreview" && _id == "portfolioPreview"][0]`)
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
  return await fetchSanityData(`*[_type == "contactInfo" && _id == "contactInfo"][0]`)
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

// Truy vấn tất cả dữ liệu trang chủ
export const getHomeData = async () => {
  // Fetch all data in a single batch request
  const data = await client.fetch(`{
    "heroData": *[_type == "heroSection" && _id == "heroSection"][0],
    "portfolioData": *[_type == "portfolioPreview" && _id == "portfolioPreview"][0],
    "aboutData": *[_type == "aboutSection" && _id == "aboutSection"][0]
  }`);

  return data;
};
