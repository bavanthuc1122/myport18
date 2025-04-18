import { client } from './sanity';

// Hero Section
export async function getHeroSection() {
  return client.fetch(`*[_type == "heroSection"][0]`);
}

// Portfolio Preview
export async function getPortfolioPreview() {
  return client.fetch(`*[_type == "portfolioPreview"][0]`);
}

// Portfolio Categories
export async function getAllCategories() {
  return client.fetch(`*[_type == "category"] | order(title asc)`);
}

// Portfolio Items
export async function getAllPortfolioItems() {
  return client.fetch(`*[_type == "portfolioItem"] {
    _id,
    title,
    imageSource,
    coverImage,
    imageUrl,
    behanceLink,
    category->{_id, title}
  }`);
}

export async function getPortfolioItemsByCategory(categoryId) {
  return client.fetch(`*[_type == "portfolioItem" && category._ref == $categoryId] {
    _id,
    title,
    imageSource,
    coverImage,
    imageUrl,
    behanceLink,
    category->{_id, title}
  }`, { categoryId });
}

// BTS Sections
export async function getAllBtsSections() {
  return client.fetch(`*[_type == "btsSection"] | order(order asc) {
    _id,
    title,
    subtitle,
    layout,
    mainImage,
    images[] {
      _key,
      image,
      alt
    },
    videoUrl
  }`);
}

// Contact Information
export async function getContactInfo() {
  return client.fetch(`*[_type == "contactInfo"][0] {
    title,
    subtitle,
    photographerName,
    email,
    phone,
    contactImage,
    socialLinks[] {
      _key,
      platform,
      url
    }
  }`);
}
